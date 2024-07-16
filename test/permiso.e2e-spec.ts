import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as dotenv from 'dotenv';
dotenv.config();

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
    token = loginResponse.body.Data.token;

    const searchResponse = await request(app.getHttpServer())
      .get(`/paginas/name/${paginaDto.nombrePagina}`)
      .set('Authorization', `Bearer ${token}`);

    if (searchResponse.status === 200) {
      idPagina = searchResponse.body.Data.idPagina;
    } else if (searchResponse.status === 404) {
      const createPaginaTest = await request(app.getHttpServer())
        .post('/paginas/')
        .set('Authorization', `Bearer ${token}`)
        .send(paginaDto)
        .expect(201);

      idPagina = createPaginaTest.body.Data.id;
    } else {
      throw new Error('Unexpected status code');
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('Crear permiso', async () => {
    const crearPermisoDto = {
      ...permisoDto,
      idPagina: idPagina,
    };
    const crearPermiso = await request(app.getHttpServer())
      .post('/permisos/')
      .set('Authorization', `Bearer ${token}`)
      .send(crearPermisoDto)
      .expect(201);
    const crearPermisoresponse = crearPermiso.body;
    expect(crearPermisoresponse.statusCode).toBe(201);
    expect(crearPermisoresponse.message).toBe('Permiso creado con éxito');

    idPermiso = crearPermisoresponse.Data.id;
  });

  it('Buscar permiso', async () => {
    const buscarPermiso = await request(app.getHttpServer())
      .get(`/permisos/${idPermiso}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const buscarPermisoresponse = buscarPermiso.body;
    expect(buscarPermisoresponse.message).toBe(
      'Permiso encontrado correctamente',
    );
    expect(buscarPermisoresponse.Data.ver).toBe(permisoDto.ver);
  });

  it('Actualizar permiso', async () => {
    const actualizarPermisoDto = {
      ...permisoDto,
      idPagina: idPagina,
      actualizar: true,
    };
    const actualizarPermiso = await request(app.getHttpServer())
      .patch(`/permisos/${idPermiso}`)
      .set('Authorization', `Bearer ${token}`)
      .send(actualizarPermisoDto)
      .expect(200);

    const actualizarPermisoresponse = actualizarPermiso.body;
    expect(actualizarPermisoresponse.message).toBe(
      'Permiso actualizado correctamente',
    );
    expect(actualizarPermisoresponse.Data.id).toBe(idPermiso);
  });

  it('Listar permisos', async () => {
    const listarPermisos = await request(app.getHttpServer())
      .get('/permisos/')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const listarPaginasresponse = listarPermisos.body;
    expect(listarPaginasresponse.message).toBe(
      'Permisos encontrados correctamente',
    );
  });

  it('Eliminar permiso', async () => {
    const deleteResponse = await request(app.getHttpServer())
      .delete(`/permisos/${idPermiso}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(deleteResponse.body.statusCode).toBe(200);
    expect(deleteResponse.body.message).toBe('Permiso eliminado correctamente');
    expect(deleteResponse.body.Data.id).toBe(idPermiso);
  });

  it('Eliminar pagina test permiso', async () => {
    const deleteResponse = await request(app.getHttpServer())
      .delete(`/paginas/${idPagina}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(deleteResponse.body.statusCode).toBe(200);
    expect(deleteResponse.body.message).toBe('Pagina eliminada correctamente');
    expect(deleteResponse.body.Data.id).toBe(idPagina);
  });
});
