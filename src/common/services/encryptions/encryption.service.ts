import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-cbc'; // Algoritmo de cifrado

  constructor() {}

  // Método para generar una clave de 32 bytes desde una clave proporcionada
  private generateKey(key: string): Buffer {
    return crypto.createHash('sha256').update(key).digest(); // Genera una clave de 32 bytes
  }

  // Método para cifrar texto
  encrypt(text: string): string {
    const key = process.env.ENCRYPTION_KEY; // Usa una clave por defecto si no está en env
    const secretKey = this.generateKey(key); // Genera una clave adecuada
    const iv = crypto.randomBytes(16); // Genera un nuevo IV para cada cifrado

    const cipher = crypto.createCipheriv(this.algorithm, secretKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return `${iv.toString('hex')}:${encrypted}`; // Concatenar IV y texto cifrado
  }

  // Método para descifrar texto
  decrypt(encryptedText: string): string {
    const key = process.env.ENCRYPTION_KEY; // Usa una clave por defecto si no está en env
    const secretKey = this.generateKey(key); // Genera una clave adecuada
    const [ivText, encrypted] = encryptedText.split(':');
    const iv = Buffer.from(ivText, 'hex');

    const decipher = crypto.createDecipheriv(this.algorithm, secretKey, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  // Método para hashear contraseñas
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Número de rondas de sal
    return await bcrypt.hash(password, saltRounds);
  }

  // Método para verificar contraseñas hasheadas
  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
