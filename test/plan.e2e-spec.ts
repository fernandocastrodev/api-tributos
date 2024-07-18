import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as dotenv from 'dotenv';
dotenv.config();

describe('Crud PLan', () => {
  let app: INestApplication;
  let token: string;
  let idPlan: number;

  const planDto = {
    nombre: 'Plan Test',
    precio: 1000,
    descripcion: 'Acceso completo a todas las funciones Test...',
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
      .send({ correo: process.env.TEST_USER_EMAIL, claveAcceso: process.env.TEST_USER_PASSWORD })
      .expect(200);
    token = loginResponse.body.Data.token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('Crear plan', async () => {
    const create = await request(app.getHttpServer())
      .post('/planes/')
      .set('Authorization', `Bearer ${token}`)
      .send(planDto)
      .expect(201);
    const createResponse = create.body;
    expect(createResponse.statusCode).toBe(201);
    expect(createResponse.message).toBe('Plan creado con éxito');
    expect(createResponse.Data.nombrePlan).toBe(planDto.nombre);

    idPlan = createResponse.Data.id;
  });

  it('Buscar Plan', async () => {
    const buscar = await request(app.getHttpServer())
      .get(`/planes/${idPlan}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const buscarResponse = buscar.body;
    expect(buscarResponse.message).toBe('Plan encontrado correctamente');
    expect(buscarResponse.Data.nombre).toBe(planDto.nombre);
  });

  it('Actualizar plan', async () => {
    const actualizarDto = {
      ...planDto,
      descripcion: 'Acceso completo a todas las funciones act...',
    };
    const actualizar = await request(app.getHttpServer())
      .patch(`/planes/${idPlan}`)
      .set('Authorization', `Bearer ${token}`)
      .send(actualizarDto)
      .expect(200);
    const actualizarResponse = actualizar.body;
    expect(actualizarResponse.message).toBe('Plan actualizado correctamente');
    expect(actualizarResponse.Data.nombrePLan).toBe(planDto.nombre);
  });

  it('Listar planes', async () => {
    const listar = await request(app.getHttpServer())
      .get('/planes/')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const listarResponse = listar.body;
    expect(listarResponse.message).toBe('Planes encontrados correctamente');
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
