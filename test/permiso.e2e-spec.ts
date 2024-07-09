import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Crud Permiso', () => {
  let app: INestApplication;
  let token: string;
  let idPagina: number;
  let idPermiso: number;

  const paginaDto = {
    nombrePagina: 'Testing permiso',
    descripcionPagina: 'Testing para paginas permiso',
    urlPagina: 'mantPermisosTest.html',
    iconoPagina: 'image/TestingPermiso.svg',
    orden: 97,
  };

  const permisoDto = {
    ver: true,
    crear: false,
    eliminar: false,
    actualizar: false,
    idPerfil: 1,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ correo: process.env.TEST_USER_EMAIL, claveAcceso: process.env.TEST_USER_PASSWORD })
      .expect(200);

    token = loginResponse.body.token;

    const createPaginaTest = await request(app.getHttpServer())
      .post('/paginas/')
      .set('Authorization', `Bearer ${token}`)
      .send(paginaDto)
      .expect(201);

    idPagina = createPaginaTest.body.idPagina;
  });

  afterAll(async () => {
    await app.close();
  });

  it('Crear permiso', async () => {
    const crearPermisoDto = {
      ...permisoDto,
      idPagina: idPagina,
    };
    const createUsuarioResponse = await request(app.getHttpServer())
      .post('/permisos/')
      .set('Authorization', `Bearer ${token}`)
      .send(crearPermisoDto)
      .expect(201);

    idPermiso = createUsuarioResponse.body.idPermiso;
  });

  it('Buscar permiso', async () => {
    const buscarPermiso = await request(app.getHttpServer())
      .get(`/permisos/${idPermiso}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const buscarPermisoresponse = buscarPermiso.body;
    expect(buscarPermisoresponse.ver).toBe(permisoDto.ver);
  });

  it('Actualizar permiso', async () => {
    const actualizarPermisoDto = {
      ...permisoDto,
      actualizar: true,
    };
    await request(app.getHttpServer())
      .patch(`/permisos/${idPermiso}`)
      .set('Authorization', `Bearer ${token}`)
      .send(actualizarPermisoDto)
      .expect(200);
  });

  it('Listar permisos', async () => {
    await request(app.getHttpServer())
      .get('/permisos/')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('Eliminar permiso', async () => {
    const deleteResponse = await request(app.getHttpServer())
      .delete(`/permisos/${idPermiso}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(deleteResponse.body).toEqual({
      message: `Permiso id: ${idPermiso}, fue Eliminado con exito`,
    });
  });

  it('Eliminar pagina test permiso', async () => {
    const deleteResponse = await request(app.getHttpServer())
      .delete(`/paginas/${idPagina}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(deleteResponse.body).toEqual({
      message: `Pagina ${paginaDto.nombrePagina} de id: ${idPagina} fue Eliminada con exito`,
    });
  });
});
