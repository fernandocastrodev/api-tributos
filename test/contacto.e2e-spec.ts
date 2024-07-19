import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as dotenv from 'dotenv';
dotenv.config();

describe('Crud Contacto', () => {
  let app: INestApplication;
  let idContacto: number;

  const contactoDto = {
    nombre: 'Testing',
    correo: 'persona@example.com',
    fono: '912341234',
    descripcion: 'necesito contactarme para...',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Crear contacto', async () => {
    const create = await request(app.getHttpServer())
      .post('/contactos/')
      .send(contactoDto)
      .expect(201);
    const createResponse = create.body;
    expect(createResponse.statusCode).toBe(201);
    expect(createResponse.message).toBe('Contacto creado con éxito');
    expect(createResponse.Data.nombreContacto).toBe(contactoDto.nombre);

    idContacto = createResponse.Data.id;
  });

  it('Buscar Contacto', async () => {
    const buscar = await request(app.getHttpServer())
      .get(`/contactos/${idContacto}`)
      .expect(200);
    const buscarResponse = buscar.body;
    expect(buscarResponse.message).toBe('Contacto encontrado correctamente');
    expect(buscarResponse.Data.nombre).toBe(contactoDto.nombre);
  });

  it('Actualizar contacto', async () => {
    const actualizarDto = {
      ...contactoDto,
      descripcion: 'necesito contactarme para act...',
    };
    const actualizar = await request(app.getHttpServer())
      .patch(`/contactos/${idContacto}`)
      .send(actualizarDto)
      .expect(200);
    const actualizarResponse = actualizar.body;
    expect(actualizarResponse.message).toBe(
      'Contacto actualizado correctamente',
    );
    expect(actualizarResponse.Data.nombreContacto).toBe(contactoDto.nombre);
  });

  it('Listar contactos', async () => {
    const listar = await request(app.getHttpServer())
      .get('/contactos/')
      .expect(200);
    const listarResponse = listar.body;
    expect(listarResponse.message).toBe('Contactos encontrados correctamente');
  });

  it('Eliminar contacto', async () => {
    const deleteResponse = await request(app.getHttpServer())
      .delete(`/contactos/${idContacto}`)
      .expect(200);
    expect(deleteResponse.body.statusCode).toBe(200);
    expect(deleteResponse.body.message).toBe(
      'Contacto eliminado correctamente',
    );
    expect(deleteResponse.body.Data.id).toBe(idContacto);
  });
});
