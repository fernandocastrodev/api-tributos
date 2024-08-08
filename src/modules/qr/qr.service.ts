import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as QRCode from 'qrcode';
import * as sharp from 'sharp';

@Injectable()
export class QrService {
  private readonly logoPath = path.join(process.cwd(), 'public', 'images', 'logo.svg');

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
}
