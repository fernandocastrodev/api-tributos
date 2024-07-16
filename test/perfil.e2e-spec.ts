import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as dotenv from 'dotenv';
dotenv.config();

describe('Crud Perfil', () => {
  let app: INestApplication;
  let token: string;
  let idPerfil: number;

  const perfilDto = {
    nombre: 'Testing',
    descripcion: 'test de prueba',
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
      .get(`/perfiles/name/${perfilDto.nombre}`)
      .set('Authorization', `Bearer ${token}`);

    if (searchResponse.status === 200) {
      const perifId = searchResponse.body.Data.idPerfil;

      const deleteResponse = await request(app.getHttpServer())
        .delete(`/perfiles/${perifId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(deleteResponse.body.message).toEqual(
        'Perfil eliminado correctamente',
      );
    } else if (searchResponse.status === 404) {
      expect(searchResponse.body.message).toEqual('Not Found');
    } else {
      throw new Error('Unexpected status code');
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('Crear perfil', async () => {
    const createPerfil = await request(app.getHttpServer())
      .post('/perfiles/')
      .set('Authorization', `Bearer ${token}`)
      .send(perfilDto)
      .expect(201);
    const createPerfilResponse = createPerfil.body;
    expect(createPerfilResponse.statusCode).toBe(201);
    expect(createPerfilResponse.message).toBe('Perfil creado con éxito');
    expect(createPerfilResponse.Data.nombrePerfil).toBe(perfilDto.nombre);
    idPerfil = createPerfilResponse.Data.id;
  });

  it('Buscar perfil', async () => {
    const buscarPerfil = await request(app.getHttpServer())
      .get(`/perfiles/id/${idPerfil}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const buscarPaginaresponse = buscarPerfil.body;
    expect(buscarPaginaresponse.message).toBe(
      'Perfil encontrado correctamente',
    );
    expect(buscarPaginaresponse.Data.nombre).toBe(perfilDto.nombre);
  });

  it('Actualizar perfil', async () => {
    const actualizarPerfilDto = {
      ...perfilDto,
      descripcion: 'Test perfil actualizado',
    };
    const actualizarPerfil = await request(app.getHttpServer())
      .patch(`/perfiles/${idPerfil}`)
      .set('Authorization', `Bearer ${token}`)
      .send(actualizarPerfilDto)
      .expect(200);
    const actualizarPerfilresponse = actualizarPerfil.body;
    expect(actualizarPerfilresponse.message).toBe(
      'Perfil actualizado correctamente',
    );
    expect(actualizarPerfilresponse.Data.nombrePerfil).toBe(perfilDto.nombre);
  });

  it('Listar perfiles', async () => {
    const listarPerfiles = await request(app.getHttpServer())
      .get('/perfiles/')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const listarUsuariosresponse = listarPerfiles.body;
    expect(listarUsuariosresponse.message).toBe(
      'Perfiles encontrados correctamente',
    );
  });

  it('Eliminar perfil', async () => {
    const deleteResponse = await request(app.getHttpServer())
      .delete(`/perfiles/${idPerfil}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(deleteResponse.body.statusCode).toBe(200);
    expect(deleteResponse.body.message).toBe('Perfil eliminado correctamente');
    expect(deleteResponse.body.Data.id).toBe(idPerfil);
  });
});
