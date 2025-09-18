import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string, subject: string) => {
  try {
    if (!config.mail_sent_Email || !config.mail_sent_pass) {
      throw new Error(
        'Email configuration is missing. Please check EMAIL_SEND_USER_EMAIL and EMAIL_SEND_USER_PASS in environment variables.',
      );
    }

    console.log(' Attempting to send email to:', to);
    console.log(' From:', config.mail_sent_Email);
    console.log(' Subject:', subject);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: config.mail_sent_Email,
        pass: config.mail_sent_pass,
      },
      debug: true,
    });

    await transporter.verify();
    console.log(' SMTP transporter verified successfully');

    const result = await transporter.sendMail({
      from: config.mail_sent_Email,
      to,
      subject: subject,
      text: '',
      html,
    });

    console.log(' Email sent successfully to', to, result.messageId);
    return result;
  } catch (error) {
    console.error(' Email send failed:', error);
    throw error;
  }
};
