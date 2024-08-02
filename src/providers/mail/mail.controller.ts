import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendEmailDto } from './dto/send-email.dto';
import { SwaggerDocumentation } from '../../common/decorators/swagger-mail.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('mail')
@ApiTags('Correos')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('sendEmail', 'Enviar un nuevo correo')
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    try {
      const info = await this.mailService.sendMail(sendEmailDto);
      return {
        message: 'Correo enviado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: info,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }
}
