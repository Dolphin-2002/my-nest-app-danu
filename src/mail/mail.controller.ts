import { Controller, Get, Query } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}
  @Get('send-test-email')
  async sendTestEmail(@Query('to') to?: string) {
    return this.mailService.sendTestEmail(to);
  }
}
