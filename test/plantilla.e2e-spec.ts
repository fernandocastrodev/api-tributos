import { getTestUserCredentials } from './test-credentials';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as dotenv from 'dotenv';
dotenv.config();

describe('Crud Plantilla', () => {
  let app: INestApplication;
  let token: string;
  let idPlantilla: number;

  const plantillaDto = {
    nombre: 'Correo Bienvenida Test',
    correo: 'test.user@example.com',
    descripcion: 'Binvenido a nuestro sistema Test...',
    estado: true,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(getTestUserCredentials())
      .expect(200);
    token = loginResponse.body.Data.token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('Crear plantilla', async () => {
    const create = await request(app.getHttpServer())
      .post('/plantillas/')
      .set('Authorization', `Bearer ${token}`)
      .send(plantillaDto)
      .expect(201);
    const createResponse = create.body;
    expect(createResponse.statusCode).toBe(201);
    expect(createResponse.message).toBe('Plantilla creada con éxito');
    expect(createResponse.Data.nombrePlantilla).toBe(plantillaDto.nombre);

    idPlantilla = createResponse.Data.id;
  });

  it('Buscar Plantilla', async () => {
    const buscar = await request(app.getHttpServer())
      .get(`/plantillas/${idPlantilla}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const buscarResponse = buscar.body;
    expect(buscarResponse.message).toBe('Plantilla encontrada correctamente');
    expect(buscarResponse.Data.nombre).toBe(plantillaDto.nombre);
  });

  it('Actualizar contacto', async () => {
    const actualizarDto = {
      ...plantillaDto,
      descripcion: 'Binvenido a nuestro sistema Test act...',
    };
    const actualizar = await request(app.getHttpServer())
      .patch(`/plantillas/${idPlantilla}`)
      .set('Authorization', `Bearer ${token}`)
      .send(actualizarDto)
      .expect(200);
    const actualizarResponse = actualizar.body;
    expect(actualizarResponse.message).toBe(
      'Plantilla actualizada correctamente',
    );
    expect(actualizarResponse.Data.nombrePlantilla).toBe(plantillaDto.nombre);
  });

  it('Listar plantillas', async () => {
    const listar = await request(app.getHttpServer())
      .get('/plantillas/')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const listarResponse = listar.body;
    expect(listarResponse.message).toBe('Plantillas encontradas correctamente');
  });

  it('Eliminar plantilla', async () => {
    const deleteResponse = await request(app.getHttpServer())
      .delete(`/plantillas/${idPlantilla}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(deleteResponse.body.statusCode).toBe(200);
    expect(deleteResponse.body.message).toBe(
      'Plantilla eliminada correctamente',
    );
    expect(deleteResponse.body.Data.id).toBe(idPlantilla);
  });
});
