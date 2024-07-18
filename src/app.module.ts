import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { PerfilesModule } from './modules/perfiles/perfiles.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { LoggerService } from './common/services/logger.service';
import { HelmetMiddleware } from './common/middlewares/helmet.middleware';
import { RateLimitMiddleware } from './common/middlewares/rate-limit.middleware';
import { CompressionMiddleware } from './common/middlewares/compression.middleware';
import { PaginasModule } from './modules/paginas/paginas.module';
import { PermisosModule } from './modules/permisos/permisos.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ContactosModule } from './tribute-spaces/contactos/contactos.module';
import { PlantillasModule } from './tribute-spaces/plantillas/plantillas.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    PerfilesModule,
    UsuariosModule,
    AuthModule,
    PaginasModule,
    PermisosModule,
    ContactosModule,
    PlantillasModule,
  ],

  controllers: [],
  providers: [
    LoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
  exports: [LoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(HelmetMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(RateLimitMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(CompressionMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
