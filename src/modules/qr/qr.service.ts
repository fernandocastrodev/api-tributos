import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import * as QRCode from 'qrcode';
import * as sharp from 'sharp';
import { FileService} from '../../common/services/files/file.service'


@Injectable()
export class QrService {
  private readonly logoPath = join(process.cwd(), 'public', 'images', 'logo.svg');
  constructor(private readonly fileService: FileService) {}

  async generateCustomQrCode(url: string, qrSize: number = 300, logoScale: number = 0.2): Promise<Buffer> {
    try {

      // Verificar si el archivo del logo SVG existe
      if (!fs.existsSync(this.logoPath)) {
        throw new Error(`Logo file not found at path: ${this.logoPath}`);
      }

      // Generar el código QR como string SVG
      const qrSvg = await QRCode.toString(url, {
        type: 'svg',
        width: qrSize,
        margin: 2
      });

      // Convertir el SVG del QR a PNG usando sharp
      let qrBuffer = await sharp(Buffer.from(qrSvg))
        .png({ quality: 100 })
        .toBuffer();

      // Leer el logo SVG y redimensionarlo manteniendo las proporciones
      const logoBuffer = await sharp(fs.readFileSync(this.logoPath))
        .resize({
          width: Math.floor(qrSize * logoScale),
          withoutEnlargement: true
        })
        .toBuffer();

      // Componer el logo en el centro del QR
      const finalBuffer = await sharp(qrBuffer)
        .composite([{
          input: logoBuffer,
          gravity: 'center'
        }])
        .toBuffer();

      return finalBuffer;
    } catch (error) {
      throw new Error(`Failed to generate custom QR code: ${error.message}`);
    }
  }

  async saveQrCodeToFile(url: string, userId: string, tributoId: string, qrSize: number = 300, logoScale: number = 0.2): Promise<string> {
    try {
      const qrBuffer = await this.generateCustomQrCode(url, qrSize, logoScale);

      const filePath = await this.fileService.saveQrImage(qrBuffer, userId, tributoId);

      return filePath;
    } catch (error) {
      throw new Error(`Failed to save QR code to file: ${error.message}`);
    }
  }

}
