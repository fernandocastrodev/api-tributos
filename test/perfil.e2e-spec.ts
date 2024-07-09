import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

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

    token = loginResponse.body.token;

    const searchResponse = await request(app.getHttpServer())
      .get(`/perfiles/name/${perfilDto.nombre}`)
      .set('Authorization', `Bearer ${token}`);

    if (searchResponse.status === 200) {
      const perifId = searchResponse.body.idPerfil;

      const deleteResponse = await request(app.getHttpServer())
        .delete(`/perfiles/${perifId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(deleteResponse.body).toEqual({
        message: `Perfil ${perfilDto.nombre} de id: ${idPerfil} fue Eliminado con exito`,
      });
    } else if (searchResponse.status === 404) {
      expect(searchResponse.body.error).toEqual('nombre perfil no encontrado');
    } else {
      throw new Error('Unexpected status code');
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('Crear perfil', async () => {
    const createPerfilResponse = await request(app.getHttpServer())
      .post('/perfiles/')
      .set('Authorization', `Bearer ${token}`)
      .send(perfilDto)
      .expect(201);

    idPerfil = createPerfilResponse.body.idPerfil;
  });

  it('Buscar perfil', async () => {
    const buscarPerfil = await request(app.getHttpServer())
      .get(`/perfiles/id/${idPerfil}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const buscarPaginaresponse = buscarPerfil.body;
    expect(buscarPaginaresponse.nombre).toBe(perfilDto.nombre);
  });

  it('Actualizar perfil', async () => {
    const actualizarPerfilDto = {
      ...perfilDto,
      descripcion: 'Test perfil actualizado',
    };
    await request(app.getHttpServer())
      .patch(`/perfiles/${idPerfil}`)
      .set('Authorization', `Bearer ${token}`)
      .send(actualizarPerfilDto)
      .expect(200);
  });

  it('Listar perfiles', async () => {
    await request(app.getHttpServer())
      .get('/perfiles/')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('Eliminar perfil', async () => {
    const deleteResponse = await request(app.getHttpServer())
      .delete(`/perfiles/${idPerfil}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(deleteResponse.body).toEqual({
      message: `Perfil ${perfilDto.nombre} de id: ${idPerfil} fue Eliminado con exito`,
    });
  });
});
