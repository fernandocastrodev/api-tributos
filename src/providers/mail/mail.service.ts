import { Injectable, Inject } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class MailService {
  constructor(
    @Inject('MAIL_TRANSPORT')
    private readonly transporter: nodemailer.Transporter,
  ) {}

  async sendMail(sendEmailDto: SendEmailDto): Promise<string> {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: sendEmailDto.recipient,
      subject: sendEmailDto.subject,
      text: sendEmailDto.content,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info.response;
    } catch (error) {
      throw new Error('Error al enviar correo: ' + error.message);
    }
  }
}
