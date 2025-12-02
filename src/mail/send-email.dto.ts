import { ApiPropertyOptional } from '@nestjs/swagger';

export class SendEmailDto {
  @ApiPropertyOptional({ description: 'Recipient email address' })
  to?: string;

  @ApiPropertyOptional({ description: 'Email subject' })
  subject?: string;

  @ApiPropertyOptional({ description: 'Email message body' })
  message?: string;
}
