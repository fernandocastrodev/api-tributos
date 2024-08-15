import { Injectable, Inject } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './dto/send-email.dto';
import { PlantillasService } from '../../tribute-spaces/plantillas/plantillas.service';
import * as dotenv from 'dotenv';
import { EncryptionService} from '../../common/services/encryptions/encryption.service'

dotenv.config();


@Injectable()
export class MailService {
  constructor(
    @Inject('MAIL_TRANSPORT')
    private readonly transporter: nodemailer.Transporter,
    private readonly plantillaService: PlantillasService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async sendMail(sendEmailDto: SendEmailDto): Promise<string> {
    const mailOptions = {
      from: sendEmailDto.sender || process.env.MAIL_USER,
      to: sendEmailDto.recipient,
      subject: sendEmailDto.subject,
      text: sendEmailDto.content,
      html: sendEmailDto.content,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info.response;
    } catch (error) {
      throw new Error('Error al enviar correo: ' + error.message);
    }
  }

  async correoRegistro(correoUsuario: string, nombreUsuario: string) {
    const web = process.env.WEBQR + 'verify/'

    const token = this.encryptionService.encrypt(correoUsuario)

    const datosCorreo = {
      nombreUsuario: nombreUsuario,
      emailUsuario: correoUsuario,
      sistema: 'Tributos QR',
      fechaRegistro: new Date().toLocaleDateString(),
      verificacion: web + token
    };

    const plantillaRegistro = await this.plantillaService.findOne('e58d3b9e-7e31-43b2-bf21-2f0943c0c8e8');

    const contenido = await this.renderTemplate(
      plantillaRegistro.descripcion,
      datosCorreo,
    );

    const mailOptions = {
      sender: plantillaRegistro.correo,
      recipient: correoUsuario,
      subject: `¡Bienvenido a Tributos QR!`,
      content: contenido,
    };
    this.sendMail(mailOptions);
  }

  async renderTemplate(
    template: string,
    variables: { [key: string]: string },
  ): Promise<string> {
    let rendered = template;
    for (const key in variables) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      rendered = rendered.replace(regex, variables[key]);
    }
    return rendered;
  }
}
