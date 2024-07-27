import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Perfil } from '../modules/perfiles/perfil.entity';
import { Usuario } from '../modules/usuarios/usuario.entity';
import { Pagina } from '../modules/paginas/pagina.entity';
import { Permiso } from '../modules/permisos/permiso.entity';
import { LoggerService } from '../common/services/logger.service';
import { Contacto } from '../tribute-spaces/contactos/contacto.entity';
import { Plantilla } from '../tribute-spaces/plantillas/plantilla.entity';
import { Plan } from '../tribute-spaces/planes/plan.entity';
import { Suscripcion } from '../tribute-spaces/suscripciones/suscripcion.entity';
import { Pago } from '../tribute-spaces/pagos/pago.entity';
import { Tributo } from 'src/tribute-spaces/tributos/tributo.entity';
dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [
    Perfil,
    Usuario,
    Pagina,
    Permiso,
    Contacto,
    Plantilla,
    Plan,
    Suscripcion,
    Pago,
    Tributo,
  ],
  synchronize: true,
  logging: true,
  logger: new LoggerService(),
};
