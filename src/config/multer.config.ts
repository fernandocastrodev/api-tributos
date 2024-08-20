import { memoryStorage } from 'multer';

export const multerOptions = {
  storage: memoryStorage(), // Almacena los archivos en memoria
  limits: {
    fileSize: 10 * 1024 * 1024, // Tamaño máximo del archivo (por ejemplo, 10 MB)
  },
};