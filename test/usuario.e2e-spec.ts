import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as dotenv from 'dotenv';
dotenv.config();
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
    token = loginResponse.body.Data.token;

    const searchResponse = await request(app.getHttpServer())
      .get(`/usuarios/rut/${usuarioDto.rut}`)
      .set('Authorization', `Bearer ${token}`);

    if (searchResponse.status === 200) {
      const userId = searchResponse.body.Data.idUsuario;

      const deleteResponse = await request(app.getHttpServer())
        .delete(`/usuarios/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(deleteResponse.body.message).toBe(
        `Usuario eliminado correctamente`,
      );
    } else if (searchResponse.status === 404) {
      expect(searchResponse.body.message).toEqual('Not Found');
    } else {
      console.log('Unexpected status code');
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('Crear usuario', async () => {
    const createUsuario = await request(app.getHttpServer())
      .post('/usuarios/')
      .set('Authorization', `Bearer ${token}`)
      .send(usuarioDto)
      .expect(201);
    const crearUsuarioresponse = createUsuario.body;
    expect(crearUsuarioresponse.statusCode).toBe(201);
    expect(crearUsuarioresponse.message).toBe('Usuario creado con éxito');
    expect(crearUsuarioresponse.Data.nombreCompleto).toBe(
      `${usuarioDto.nombre} ${usuarioDto.apellido}`,
    );
    idUsuario = crearUsuarioresponse.Data.id;
  });

  it('Buscar usuario', async () => {
    const buscarUsuario = await request(app.getHttpServer())
      .get(`/usuarios/id/${idUsuario}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const buscarUsuarioresponse = buscarUsuario.body;
    expect(buscarUsuarioresponse.message).toBe(
      'Usuario encontrado correctamente',
    );
    expect(buscarUsuarioresponse.Data.nombre).toBe(usuarioDto.nombre);
  });

  it('Actualizar usuario', async () => {
    const actualizarUsuarioDto = {
      ...usuarioDto,
      apellido: 'Salas actualizado',
    };
    const actualizarUsuario = await request(app.getHttpServer())
      .patch(`/usuarios/${idUsuario}`)
      .set('Authorization', `Bearer ${token}`)
      .send(actualizarUsuarioDto)
      .expect(200);
    const actualizarUsuarioresponse = actualizarUsuario.body;
    expect(actualizarUsuarioresponse.message).toBe(
      'Usuario actualizado correctamente',
    );
    expect(actualizarUsuarioresponse.Data.nombreCompleto).toBe(
      `${usuarioDto.nombre} ${actualizarUsuarioDto.apellido}`,
    );
  });

  it('Listar usuarios', async () => {
    const listarUsuarios = await request(app.getHttpServer())
      .get('/usuarios/')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const listarUsuariosresponse = listarUsuarios.body;
    expect(listarUsuariosresponse.message).toBe(
      'Usuarios encontrados correctamente',
    );
  });

  it('Eliminar usuario', async () => {
    const deleteResponse = await request(app.getHttpServer())
      .delete(`/usuarios/${idUsuario}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(deleteResponse.body.statusCode).toBe(200);
    expect(deleteResponse.body.message).toBe('Usuario eliminado correctamente');
    expect(deleteResponse.body.Data.id).toBe(idUsuario);
  });
});
