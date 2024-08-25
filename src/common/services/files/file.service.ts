import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as crypto from 'crypto';
@Injectable()
export class FileService {
  private readonly baseFolderPath = path.join(process.cwd(), 'public', 'clientes');

  async createFolder(folderName: string): Promise<{ message: string, fullPath: string }> {
    try {
      const fullPath = path.join(this.baseFolderPath, folderName);
      
      // Intenta crear la carpeta
      await fs.ensureDir(fullPath);
      
      // Verifica si realmente existe
      if (fs.existsSync(fullPath)) {
        return { message: `Carpeta '${folderName}' Carpeta creada correctamente`, fullPath };
      } else {
        throw new InternalServerErrorException('Error al crear la carpeta');
      }
    } catch (error) {
      throw new InternalServerErrorException('No se pudo crear la carpeta');
    }
  }

  async saveFile(file: Express.Multer.File, userId: string, tributoId: string): Promise<string> {
    try {
      const folderPath = path.join(this.baseFolderPath, userId, tributoId, 'images');
      
      // Crear la carpeta si no existe
      await fs.ensureDir(folderPath);

      const fileName = `${Date.now()}-${crypto.randomBytes(16).toString('hex')}${path.extname(file.originalname)}`;
      const filePath = path.join(folderPath, fileName);

      if (!file.buffer || file.buffer.length === 0) {
        throw new InternalServerErrorException('El búfer del archivo está vacío');
      }

      // Escribir el archivo en el sistema de archivos
      await fs.writeFile(filePath, file.buffer);

      return filePath;
    } catch (error) {
      throw new InternalServerErrorException('No se pudo guardar el archivo');
    }
  }

  async saveQrImage(qrBuffer: Buffer, userId: string, tributoId: string): Promise<string> {
    try {
      const folderPath = path.join(this.baseFolderPath, userId, tributoId, 'qr');
      await fs.ensureDir(folderPath);

      const fileName = `${Date.now()}-qr.png`;
      const filePath = path.join(folderPath, fileName);

      if (!qrBuffer || qrBuffer.length === 0) {
        throw new InternalServerErrorException('El búfer del código QR está vacío');
      }

      await fs.writeFile(filePath, qrBuffer);

      return filePath;
    } catch (error) {
      throw new InternalServerErrorException('No se pudo guardar el código QR como imagen');
    }
  }

  async verifyFolder(folderName: string) {
    try {
      const fullPath = path.join(this.baseFolderPath, folderName);
      // Verifica si realmente existe
      if (fs.existsSync(fullPath)) {
        return { message: `Carpeta '${folderName}' Carpeta existe`, fullPath };
      } else {
        throw new InternalServerErrorException('Carpeta no encontrada');
      }
    } catch (error) {
      throw new InternalServerErrorException('La carpeta no existe');
    }
  }
  
}
