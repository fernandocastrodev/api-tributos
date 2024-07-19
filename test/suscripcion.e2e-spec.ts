import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as dotenv from 'dotenv';
dotenv.config();

describe('Crud Suscripcion', () => {
  let app: INestApplication;
  let token: string;
  let idPlan: number;
  let idSuscripcion: number;

  const planDto = {
    nombre: 'Plan Test suscrpcion',
    precio: 1000,
    descripcion: 'Acceso completo a todas las funciones Test suscripcion...',
    estado: true,
  };

  const suscripcionDto = {
    fechaSuscripcion: '2023-01-01T00:00:00',
    estadoSuscripcion: true,
    idUsuario: 1,
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

    const create = await request(app.getHttpServer())
      .post('/planes/')
      .set('Authorization', `Bearer ${token}`)
      .send(planDto)
      .expect(201);

    idPlan = create.body.Data.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('Crear Suscripcion', async () => {
    const crearSuscripcionDto = {
      ...suscripcionDto,
      idPlan: idPlan,
    };
    const create = await request(app.getHttpServer())
      .post('/suscripciones/')
      .set('Authorization', `Bearer ${token}`)
      .send(crearSuscripcionDto)
      .expect(201);
    const createResponse = create.body;
    expect(createResponse.statusCode).toBe(201);
    expect(createResponse.message).toBe('Suscripcion creada correctamente');

    idSuscripcion = createResponse.Data.id;
  });

  it('Buscar Suscripcion', async () => {
    const buscar = await request(app.getHttpServer())
      .get(`/suscripciones/${idSuscripcion}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const buscarResponse = buscar.body;
    expect(buscarResponse.message).toBe('Suscripcion encontrada correctamente');
  });

  it('Actualizar Suscripcion', async () => {
    const actualizarDto = {
      ...suscripcionDto,
      idPlan: idPlan,
      estadoSuscripcion: false,
    };
    const actualizar = await request(app.getHttpServer())
      .patch(`/suscripciones/${idSuscripcion}`)
      .set('Authorization', `Bearer ${token}`)
      .send(actualizarDto)
      .expect(200);
    const actualizarResponse = actualizar.body;
    expect(actualizarResponse.message).toBe(
      'Suscripcion actualizada correctamente',
    );
    expect(actualizarResponse.Data.id).toBe(idSuscripcion);
  });

  it('Listar Suscripciones', async () => {
    const listar = await request(app.getHttpServer())
      .get('/suscripciones/')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const listarResponse = listar.body;
    expect(listarResponse.message).toBe(
      'Suscripciones encontradas correctamente',
    );
  });

  it('Eliminar Suscripcion', async () => {
    const deleteResponse = await request(app.getHttpServer())
      .delete(`/suscripciones/${idSuscripcion}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(deleteResponse.body.statusCode).toBe(200);
    expect(deleteResponse.body.message).toBe(
      'Suscripcion eliminada correctamente',
    );
    expect(deleteResponse.body.Data.id).toBe(idSuscripcion);
  });

  it('Eliminar plan', async () => {
    const deleteResponse = await request(app.getHttpServer())
      .delete(`/planes/${idPlan}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(deleteResponse.body.statusCode).toBe(200);
    expect(deleteResponse.body.message).toBe('Plan eliminado correctamente');
    expect(deleteResponse.body.Data.id).toBe(idPlan);
  });
});
