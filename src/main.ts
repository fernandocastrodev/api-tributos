import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './common/services/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(LoggerService);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('api-base-nestJS')
    .setDescription('Api creada para base de futuras apis')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const swaggerOptions = {
    swaggerOptions: {
      tagsSorter: (a, b) => {
        const order = ['Login', 'Perfiles', 'Usuarios', 'Paginas', 'Permisos']; // Orden deseado
        return order.indexOf(a) - order.indexOf(b);
      },
    },
  };

  SwaggerModule.setup('api', app, document, swaggerOptions);

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
