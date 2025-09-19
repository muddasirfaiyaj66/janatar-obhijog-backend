import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string, subject: string) => {
  try {
    if (!config.mail_sent_Email || !config.mail_sent_pass) {
      throw new Error(
        'Email configuration is missing. Please check EMAIL_SEND_USER_EMAIL and EMAIL_SEND_USER_PASS in environment variables.',
      );
    }

    if (!config.mail_sent_Email.includes('@')) {
      throw new Error(
        'Invalid email configuration: EMAIL_SEND_USER_EMAIL must be a valid email address.',
      );
    }

    console.log('📧 Attempting to send email to:', to);
    console.log('📧 From:', config.mail_sent_Email);
    console.log('📧 Subject:', subject);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: config.mail_sent_Email,
        pass: config.mail_sent_pass,
      },
      debug: false, // Reduce debug output
      tls: {
        rejectUnauthorized: false, // Allow less secure connections if needed
      },
    });

    // Verify connection configuration
    await transporter.verify();
    console.log('✅ SMTP transporter verified successfully');

    const mailOptions = {
      from: `"জনতার অভিযোগ" <${config.mail_sent_Email}>`,
      to,
      subject: subject,
      text: '',
      html,
    };

    const result = await transporter.sendMail(mailOptions);

    console.log(
      '✅ Email sent successfully to',
      to,
      'Message ID:',
      result.messageId,
    );
    return result;
  } catch (error) {
    console.error('❌ Email send failed:', error);

    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        throw new Error(
          'Email authentication failed. Please check EMAIL_SEND_USER_EMAIL and EMAIL_SEND_USER_PASS.',
        );
      }
      if (error.message.includes('connection refused')) {
        throw new Error(
          'SMTP connection failed. Please check your internet connection and email settings.',
        );
      }
      if (error.message.includes('configuration is missing')) {
        throw error; // Re-throw configuration errors as-is
      }
    }

    throw new Error(
      `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};
