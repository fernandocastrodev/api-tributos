# API Tributos

API Tributos es una API backend modular desarrollada con NestJS 10 y TypeScript para la gestión de tributos digitales. Implementa autenticación y autorización, gestión de usuarios, contenido multimedia, generación de códigos QR, planes, suscripciones y registros de pagos, con persistencia en MySQL.

## Características principales

- **Acceso y usuarios:** registro, inicio de sesión, verificación, perfiles y permisos.
- **Tributos:** creación y consulta de espacios digitales con URL propia y código QR.
- **Contenido:** páginas, galerías, imágenes, videos, textos y almacenamiento local de archivos.
- **Gestión:** contactos, plantillas, planes, suscripciones y registros de pagos.
- **Correo:** envío por SMTP, incluido el correo de registro.

## Tecnologías

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)

### Datos

![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=flat-square&logo=typeorm&logoColor=white)

### Seguridad y API

![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Swagger / OpenAPI](https://img.shields.io/badge/Swagger%20%2F%20OpenAPI-85EA2D?style=flat-square&logo=swagger&logoColor=black)
![Helmet](https://img.shields.io/badge/Helmet-222222?style=flat-square)

### Integraciones

![Nodemailer](https://img.shields.io/badge/Nodemailer-0069AC?style=flat-square)
![QR Code](https://img.shields.io/badge/QR_Code-333333?style=flat-square)

### Calidad

![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white)
![Supertest](https://img.shields.io/badge/Supertest-555555?style=flat-square)
![Winston](https://img.shields.io/badge/Winston-333333?style=flat-square)

## Arquitectura y organización

El proyecto sigue la estructura modular de NestJS. Cada dominio reúne controladores, servicios, entidades y DTOs según sus necesidades. `src/common/` contiene guards, decoradores, validadores, interceptores, filtros, middlewares y servicios compartidos; `src/config/` concentra la configuración de la aplicación.

```text
src/
├── common/           # componentes y servicios compartidos
├── config/           # base de datos, JWT, correo, Swagger y archivos
├── modules/          # autenticación, usuarios, perfiles, permisos, páginas y QR
├── providers/mail/   # envío de correos
└── tribute-spaces/   # tributos, contenido, contactos, planes, suscripciones y pagos
```

## Seguridad

La autenticación usa JWT y un guard para proteger rutas. La aplicación valida DTOs con `class-validator`, aplica Helmet y limitación de solicitudes mediante middlewares, y centraliza el tratamiento de excepciones en un filtro global. También incluye servicios para hash y comparación de contraseñas y para cifrado de datos. Las claves y credenciales se obtienen de variables de entorno.

## Documentación de la API

Swagger/OpenAPI se configura en `src/config/swagger.config.ts` y se expone en `/api`. Los endpoints de la aplicación usan el prefijo `/api/v1`.

## Configuración

```bash
git clone https://github.com/fernandocastrodev/api-tributos.git
cd api-tributos
npm ci
cp .env.example .env
```

Completa el nuevo `.env` con valores de tu entorno; el archivo local está excluido de Git. `.env.example` documenta las variables para MySQL (`MYSQL_*`), correo (`MAIL_*`), `JWT_SECRET`, `ENCRYPTION_KEY`, `WEBQR`, `PORT` y las credenciales de pruebas `TEST_USER_EMAIL` y `TEST_USER_PASSWORD`. Se necesita una instancia de MySQL para las operaciones con datos. `WEBQR` define la URL base usada para los enlaces de tributos y verificación.

## Ejecución

```bash
npm run start:dev
npm run build
npm run start
```

También existe `npm run start:prod` para ejecutar el código compilado.

## Pruebas

```bash
npm run test:e2e
```

El repositorio incluye ocho archivos de pruebas e2e en `test/`. Su ejecución requiere MySQL, SMTP para los flujos de correo y un usuario de prueba configurado mediante `TEST_USER_EMAIL` y `TEST_USER_PASSWORD`. La suite necesita preparar esos servicios y datos locales antes de ejecutarse.

## Autor

**Fernando Castro**\
Senior Software Developer | Backend & Full Stack\
Node.js · NestJS · TypeScript · .NET · AWS

GitHub: [fernandocastrodev](https://github.com/fernandocastrodev)