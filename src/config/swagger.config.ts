import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('api-base-nestJS')
    .setDescription('Api creada para sistemas de tributos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const swaggerOptions = {
    swaggerOptions: {
      tagsSorter: (a, b) => {
        const order = [
          'Login',
          'Perfiles',
          'Usuarios',
          'Paginas',
          'Permisos',
          'Contactos',
          'Plantillas',
          'Planes',
          'Suscripciones',
          'Pagos',
          'Tributos',
          'Tipo-Galerias',
          'Galerias',
          'Imagenes',
          'Videos',
          'Textos',
        ]; // Orden deseado
        return order.indexOf(a) - order.indexOf(b);
      },
    },
  };

  SwaggerModule.setup('api', app, document, swaggerOptions);
};
