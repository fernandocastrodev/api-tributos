import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './common/services/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(LoggerService);

  // Habilitar CORS
  app.enableCors({
    origin: '*', // Permitir todas las solicitudes de origen
    methods: 'GET,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Permitir el envío de cookies con las solicitudes
  });

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  setupSwagger(app);

  try {
    const port = process.env.PORT || 3000;

    // Escuchar en el puerto configurado
    await app.listen(port);
    logger.logInfo(`API iniciada y escuchando en el puerto: ${port}`);
    logger.logDatabaseConnection();

    // Manejar cierre de la aplicación
    process.on('SIGTERM', async () => {
      await app.close();
      logger.logInfo('Aplicación cerrada');
    });

    process.on('SIGINT', async () => {
      await app.close();
      logger.logInfo('Aplicación cerrada');
    });
  } catch (error) {
    logger.logError('Error al iniciar la aplicación: ' + error);
    console.error('Error details:', error);
  }
}
bootstrap();
