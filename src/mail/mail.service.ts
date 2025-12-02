import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendTestEmail(to?: string, subject?: string, message?: string) {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: to || process.env.MAIL_TO,
      subject: subject || 'Nodemailer Test Email',
      text:
        message || 'Hello! This is a test email from NestJS using Nodemailer.',
      html: message
        ? `<p>${message}</p>`
        : '<h1>Hello!</h1><p>This is a <b>test email</b> from NestJS using Nodemailer.</p>',
    };

    try {
      /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
      const info: nodemailer.SentMessageInfo =
        await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email sent: ${info.messageId as string}`);
      return {
        success: true,
        messageId: info.messageId as string,
        accepted: info.accepted as string[],
        rejected: info.rejected as string[],
      };
      /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Failed to send email: ${errorMessage}`);
      throw error;
    }
  }
}
