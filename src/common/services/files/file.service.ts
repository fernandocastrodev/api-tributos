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
        return { message: `Folder '${folderName}' created successfully`, fullPath };
      } else {
        throw new InternalServerErrorException('Folder creation failed');
      }
    } catch (error) {
      throw new InternalServerErrorException('Could not create folder');
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
        throw new InternalServerErrorException('File buffer is empty');
      }

      // Escribir el archivo en el sistema de archivos
      await fs.writeFile(filePath, file.buffer);

      return filePath;
    } catch (error) {
      console.error('Error al guardar el archivo:', error);
      throw new InternalServerErrorException('Could not save file');
    }
  }

  async verifyFolder(folderName: string) {
    try {
      const fullPath = path.join(this.baseFolderPath, folderName);
      // Verifica si realmente existe
      if (fs.existsSync(fullPath)) {
        return { message: `Folder '${folderName}' Folder verify`, fullPath };
      } else {
        throw new InternalServerErrorException('Folder verify failed');
      }
    } catch (error) {
      console.error('Error details:', error);
      throw new InternalServerErrorException('Folder does not exist');
    }
  }
  
}
