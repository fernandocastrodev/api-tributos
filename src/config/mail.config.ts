import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();
export default registerAs('mail', () => ({
  host: process.env.MAIL_HOST,
  port: +process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE === 'true', // true para SSL
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
}));
