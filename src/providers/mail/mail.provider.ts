import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import mailConfig from '../../config/mail.config';

const mailConfigInstance = mailConfig();

export const MailProvider: Provider = {
  provide: 'MAIL_TRANSPORT',
  useFactory: async (configService: ConfigService) => {
    const mailConfig = configService.get('mail') || mailConfigInstance;
    const transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.secure,
      auth: {
        user: mailConfig.auth.user,
        pass: mailConfig.auth.pass,
      },
    });

    await transporter.verify();

    return transporter;
  },
  inject: [ConfigService],
};
