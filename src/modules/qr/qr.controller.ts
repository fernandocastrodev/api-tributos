import { Controller, Get, HttpCode, HttpStatus, Query, Res, UseGuards } from '@nestjs/common';
import { QrService } from './qr.service';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { SwaggerDocumentation } from '../../common/decorators/swagger-qr.decorator';

@UseGuards(AuthGuard)
@Controller('qr')
@ApiTags('QR')
@ApiBearerAuth()
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('qr', 'Crear un qr de la url del Tributo')
  async generateCustomQr(@Query('url') url: string, @Res() res: Response) {
    try {
      const qrCodeBuffer = await this.qrService.generateCustomQrCode(url);
      res.setHeader('Content-Type', 'image/png');
      res.send(qrCodeBuffer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
