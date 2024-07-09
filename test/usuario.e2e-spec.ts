import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Crud Usuario', () => {
  let app: INestApplication;
  let token: string;
  let idUsuario: number;

  const usuarioDto = {
    rut: '1000000-9',
    nombre: 'Juan',
    apellido: 'Perez',
    claveAcceso: 'clave_ficticia_123',
    correo: 'persona@example.com',
    genero: 'm',
    idPerfil: 1,
    estado: 1,
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
      .get(`/usuarios/rut/${usuarioDto.rut}`)
      .set('Authorization', `Bearer ${token}`);

    if (searchResponse.status === 200) {
      const userId = searchResponse.body.idUsuario;

      const deleteResponse = await request(app.getHttpServer())
        .delete(`/usuarios/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(deleteResponse.body).toEqual({
        message: `Usuario ${usuarioDto.nombre} de id: ${userId} fue Eliminado con exito`,
      });
    } else if (searchResponse.status === 404) {
      expect(searchResponse.body.error).toEqual('rut de usuario no encontrado');
    } else {
      throw new Error('Unexpected status code');
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('Crear usuario', async () => {
    const createUsuarioResponse = await request(app.getHttpServer())
      .post('/usuarios/')
      .set('Authorization', `Bearer ${token}`)
      .send(usuarioDto)
      .expect(201);

    idUsuario = createUsuarioResponse.body.idUsuario;
  });

  it('Buscar usuario', async () => {
    const buscarUsuario = await request(app.getHttpServer())
      .get(`/usuarios/id/${idUsuario}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const buscarUsuarioresponse = buscarUsuario.body;
    expect(buscarUsuarioresponse.nombre).toBe(usuarioDto.nombre);
  });

  it('Actualizar usuario', async () => {
    const actualizarUsuarioDto = {
      ...usuarioDto,
      apellido: 'Salas actualizado',
    };
    await request(app.getHttpServer())
      .patch(`/usuarios/${idUsuario}`)
      .set('Authorization', `Bearer ${token}`)
      .send(actualizarUsuarioDto)
      .expect(200);
  });

  it('Listar usuarios', async () => {
    await request(app.getHttpServer())
      .get('/usuarios/')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('Eliminar usuario', async () => {
    const deleteResponse = await request(app.getHttpServer())
      .delete(`/usuarios/${idUsuario}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(deleteResponse.body).toEqual({
      message: `Usuario ${usuarioDto.nombre} de id: ${idUsuario} fue Eliminado con exito`,
    });
  });
});
