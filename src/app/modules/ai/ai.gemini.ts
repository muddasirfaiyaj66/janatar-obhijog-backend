import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../../config';
import { TComplaintForAnalysis } from './ai.interface';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(config.gemini_api_key as string);

// Get the Gemini model
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const generateComplaintAnalysis = async (
  complaints: TComplaintForAnalysis[],
): Promise<{
  overview: string;
  majorConcerns: string[];
  recommendedActions: string[];
  urgentIssues: string[];
}> => {
  try {
    // Prepare the complaint data for analysis
    const complaintsText = complaints
      .map(
        (complaint, index) =>
          `Complaint ${index + 1}:
Title: ${complaint.title}
Description: ${complaint.description}
Category: ${complaint.category}
Priority: ${complaint.priority}
Department: ${complaint.department}
Location: ${complaint.thana}, ${complaint.district}, ${complaint.division}
Status: ${complaint.status}
---`,
      )
      .join('\n\n');

    // Create a comprehensive prompt for Gemini
    const prompt = `You are an AI assistant helping government administrators analyze citizen complaints to improve public services. 

Please analyze the following ${complaints.length} complaints and provide insights:

${complaintsText}

Based on this data, please provide a JSON response with the following structure:
{
  "overview": "A 2-3 sentence summary of the overall complaint situation, mentioning location and key patterns",
  "majorConcerns": ["List of 5-8 main issues mentioned frequently with their frequency counts, format: 'Issue name (mentioned X times)'"],
  "recommendedActions": ["List of 4-6 specific, actionable recommendations for authorities based on the complaint patterns"],
  "urgentIssues": ["List of 3-5 most critical complaints that need immediate attention, format: 'Brief description - department'"]
}

Focus on:
1. Identifying common patterns and recurring issues
2. Prioritizing based on urgency and frequency
3. Providing actionable insights for government departments
4. Highlighting location-specific concerns
5. Suggesting preventive measures

Please ensure the response is in valid JSON format and be specific and practical in your recommendations.`;

    // Generate content using Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    let parsedResponse;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      console.log('Raw response:', text);

      // Fallback to simple analysis if JSON parsing fails
      return generateFallbackAnalysis(complaints);
    }

    return {
      overview:
        parsedResponse.overview ||
        'Analysis completed for the provided complaints.',
      majorConcerns: parsedResponse.majorConcerns || [],
      recommendedActions: parsedResponse.recommendedActions || [],
      urgentIssues: parsedResponse.urgentIssues || [],
    };
  } catch (error) {
    console.error('Error calling Gemini API:', error);

    // Fallback to simple analysis if API call fails
    return generateFallbackAnalysis(complaints);
  }
};

// Fallback analysis in case Gemini API fails
const generateFallbackAnalysis = (
  complaints: TComplaintForAnalysis[],
): {
  overview: string;
  majorConcerns: string[];
  recommendedActions: string[];
  urgentIssues: string[];
} => {
  const totalComplaints = complaints.length;
  const location = complaints[0]
    ? `${complaints[0].thana}, ${complaints[0].district}`
    : 'various locations';

  // Simple keyword analysis
  const keywords: { [key: string]: number } = {};
  const commonWords = [
    'the',
    'and',
    'or',
    'but',
    'in',
    'on',
    'at',
    'to',
    'for',
    'of',
    'with',
    'by',
  ];

  complaints.forEach((complaint) => {
    const text = `${complaint.title} ${complaint.description}`.toLowerCase();
    const words = text.match(/\b\w+\b/g) || [];

    words.forEach((word) => {
      if (word.length > 3 && !commonWords.includes(word)) {
        keywords[word] = (keywords[word] || 0) + 1;
      }
    });
  });

  const topKeywords = Object.entries(keywords)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  const urgentComplaints = complaints.filter(
    (c) => c.priority === 'urgent' || c.priority === 'high',
  );

  return {
    overview: `Analysis of ${totalComplaints} complaints from ${location}. Key issues identified through automated analysis. Gemini AI currently unavailable, using fallback analysis.`,
    majorConcerns: topKeywords.map(
      ([word, count]) =>
        `${word.charAt(0).toUpperCase() + word.slice(1)} (mentioned ${count} times)`,
    ),
    recommendedActions: [
      'Review and prioritize high-priority complaints immediately',
      'Allocate additional resources to departments with multiple complaints',
      'Implement tracking system for recurring issues',
      'Conduct citizen feedback surveys to assess satisfaction',
      'Establish preventive maintenance programs for infrastructure',
    ],
    urgentIssues: urgentComplaints
      .slice(0, 5)
      .map((c) => `${c.title} - ${c.department} department`),
  };
};
