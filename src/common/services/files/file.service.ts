import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';

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
