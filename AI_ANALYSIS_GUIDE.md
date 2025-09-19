# AI Complaint Analysis Module

## Overview

The AI Complaint Analysis module provides intelligent analysis of citizen complaints to help administrators and super administrators understand patterns, identify urgent issues, and make data-driven decisions for better governance.

## Features

### 🧠 **Intelligent Analysis**

- **Keyword Analysis**: Identifies most frequently mentioned issues
- **Category Distribution**: Shows complaint breakdown by categories
- **Priority Analysis**: Analyzes urgency levels across complaints
- **Department Workload**: Shows distribution across government departments
- **Location-Based Insights**: Provides area-specific analysis

### 📊 **Comprehensive Reporting**

- **AI-Generated Summary**: Natural language overview of complaint patterns
- **Major Concerns**: Top issues affecting citizens
- **Recommended Actions**: Actionable insights for authorities
- **Urgent Issues**: Priority complaints requiring immediate attention

## API Endpoints

### 1. Analyze Complaints Batch

**POST** `/api/v1/ai/analyze-batch`

Analyzes a specific set of complaints by their IDs.

**Authentication**: Admin or Super Admin required

**Request Body**:

```json
{
  "complaintIds": [
    "60d9c4e4f3b4b544b8b8d1c5",
    "60d9c4e4f3b4b544b8b8d1c6",
    "60d9c4e4f3b4b544b8b8d1c7"
  ],
  "location": {
    "thana": "Mirpur",
    "district": "Dhaka"
  }
}
```

**Response Example**:

```json
{
  "success": true,
  "message": "Complaints analyzed successfully",
  "data": {
    "totalComplaints": 15,
    "location": {
      "thana": "Mirpur",
      "district": "Dhaka"
    },
    "commonIssues": [
      {
        "category": "Infrastructure",
        "count": 8,
        "percentage": 53
      },
      {
        "category": "Utilities",
        "count": 4,
        "percentage": 27
      }
    ],
    "priorityDistribution": [
      {
        "priority": "high",
        "count": 6,
        "percentage": 40
      },
      {
        "priority": "medium",
        "count": 7,
        "percentage": 47
      }
    ],
    "departmentDistribution": [
      {
        "department": "road-infrastructure",
        "count": 5,
        "percentage": 33
      },
      {
        "department": "water-supply",
        "count": 4,
        "percentage": 27
      }
    ],
    "aiSummary": {
      "overview": "Analysis of 15 complaints from Mirpur, Dhaka. Most frequently mentioned issues involve: road, water, damage, supply, infrastructure...",
      "majorConcerns": [
        "Road (mentioned 12 times)",
        "Water (mentioned 8 times)",
        "Infrastructure (mentioned 7 times)"
      ],
      "recommendedActions": [
        "Immediate attention required for 6 urgent complaints",
        "Focus resources on road-infrastructure department (5 complaints)",
        "Implement preventive measures based on recurring complaint patterns"
      ],
      "urgentIssues": [
        "Road damage causing accidents - road-infrastructure department",
        "Water contamination in residential area - water-supply department"
      ]
    },
    "analysisDate": "2025-09-19T10:30:00.000Z"
  }
}
```

### 2. Analyze Complaints by Location

**POST** `/api/v1/ai/analyze-location`

Analyzes all complaints from a specific geographic location.

**Authentication**: Admin or Super Admin required

**Request Body**:

```json
{
  "location": {
    "thana": "Mirpur",
    "district": "Dhaka",
    "division": "Dhaka"
  }
}
```

**Note**: At least one location parameter is required.

## Usage Examples

### For Admins

```bash
# Analyze complaints in your department's area
curl -X POST http://localhost:5000/api/v1/ai/analyze-location \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "location": {
      "thana": "Tejgaon",
      "district": "Dhaka"
    }
  }'
```

### For Super Admins

```bash
# Analyze specific complaints across departments
curl -X POST http://localhost:5000/api/v1/ai/analyze-batch \
  -H "Authorization: Bearer YOUR_SUPERADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "complaintIds": ["id1", "id2", "id3"]
  }'
```

## Implementation Details

### 🔧 **Current Implementation**

- **Keyword Extraction**: Simple text processing to identify frequent terms
- **Statistical Analysis**: Mathematical calculations for distributions
- **Pattern Recognition**: Basic algorithmic analysis of complaint patterns

### 🚀 **Future AI Integration**

The module is designed to easily integrate with AI services like:

- **OpenAI GPT**: For advanced natural language processing
- **Google Cloud AI**: For sentiment analysis and topic modeling
- **Custom ML Models**: For domain-specific complaint categorization

### 📝 **Sample AI Integration** (Future)

```typescript
// Replace the mock AI function with actual AI service
const generateAISummary = async (complaints: TComplaintForAnalysis[]) => {
  const prompt = `Analyze these citizen complaints and provide insights...`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });

  return parseAIResponse(response.choices[0].message.content);
};
```

## Benefits for Administrators

### 📈 **Data-Driven Decision Making**

- Understand citizen priorities and concerns
- Allocate resources based on complaint patterns
- Track department performance and workload

### ⚡ **Rapid Response**

- Quickly identify urgent issues requiring immediate attention
- Spot trends before they become major problems
- Prioritize responses based on community impact

### 🎯 **Strategic Planning**

- Plan preventive measures based on recurring issues
- Optimize department responsibilities and resource allocation
- Improve citizen satisfaction through targeted interventions

## Access Control

- **Admin**: Can analyze complaints within their department's jurisdiction
- **Super Admin**: Can analyze any complaints across all departments and locations
- **Users**: No access to AI analysis features

## Performance Considerations

- **Batch Size Limit**: Maximum 100 complaints per analysis request
- **Response Time**: Optimized for sub-2-second response times
- **Caching**: Results can be cached for frequently analyzed areas
- **Rate Limiting**: Standard API rate limits apply

## Error Handling

The module includes comprehensive error handling for:

- Invalid complaint IDs
- Insufficient permissions
- Missing location parameters
- Database connectivity issues
- Analysis processing failures

All errors return structured responses with appropriate HTTP status codes and descriptive messages.
