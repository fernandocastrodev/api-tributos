import { getTestUserCredentials } from './test-credentials';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as dotenv from 'dotenv';
dotenv.config();

describe('Crud Pagina', () => {
  let app: INestApplication;
  let token: string;
  let idPagina: number;

  const paginaDto = {
    nombrePagina: 'Testing',
    descripcionPagina: 'Testing para paginas',
    urlPagina: 'mantTesting.html',
    iconoPagina: 'image/Testing.svg',
    orden: 98,
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

    const searchResponse = await request(app.getHttpServer())
      .get(`/paginas/name/${paginaDto.nombrePagina}`)
      .set('Authorization', `Bearer ${token}`);

    if (searchResponse.status === 200) {
      const paginaId = searchResponse.body.Data.idPagina;

      const deleteResponse = await request(app.getHttpServer())
        .delete(`/paginas/${paginaId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(deleteResponse.body.message).toEqual(
        'Pagina eliminada correctamente',
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

  it('Crear pagina', async () => {
    const createPagina = await request(app.getHttpServer())
      .post('/paginas/')
      .set('Authorization', `Bearer ${token}`)
      .send(paginaDto)
      .expect(201);
    const crearPaginaresponse = createPagina.body;
    expect(crearPaginaresponse.statusCode).toBe(201);
    expect(crearPaginaresponse.message).toBe('Pagina creada con éxito');
    expect(crearPaginaresponse.Data.nombrePagina).toBe(paginaDto.nombrePagina);

    idPagina = crearPaginaresponse.Data.id;
  });

  it('Buscar pagina', async () => {
    const buscarPagina = await request(app.getHttpServer())
      .get(`/paginas/id/${idPagina}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const buscarPaginaponse = buscarPagina.body;
    expect(buscarPaginaponse.message).toBe('Pagina encontrada correctamente');
    expect(buscarPaginaponse.Data.nombrePagina).toBe(paginaDto.nombrePagina);
  });

  it('Actualizar pagina', async () => {
    const actualizarPaginaDto = {
      ...paginaDto,
      descripcionPagina: 'Testing para paginas actualizada',
    };
    const actualizarPagina = await request(app.getHttpServer())
      .patch(`/paginas/${idPagina}`)
      .set('Authorization', `Bearer ${token}`)
      .send(actualizarPaginaDto)
      .expect(200);
    const actualizarPaginaresponse = actualizarPagina.body;
    expect(actualizarPaginaresponse.message).toBe(
      'Pagina actualizada correctamente',
    );
    expect(actualizarPaginaresponse.Data.nombrePgina).toBe(
      paginaDto.nombrePagina,
    );
  });

  it('Listar paginas', async () => {
    const listarPaginas = await request(app.getHttpServer())
      .get('/paginas/')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const listarPaginasresponse = listarPaginas.body;
    expect(listarPaginasresponse.message).toBe(
      'Paginas encontradas correctamente',
    );
  });

  it('Eliminar pagina', async () => {
    const deleteResponse = await request(app.getHttpServer())
      .delete(`/paginas/${idPagina}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(deleteResponse.body.statusCode).toBe(200);
    expect(deleteResponse.body.message).toBe('Pagina eliminada correctamente');
    expect(deleteResponse.body.Data.id).toBe(idPagina);
  });
});
