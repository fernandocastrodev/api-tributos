import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

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
      .send({ correo: process.env.TEST_USER_EMAIL, claveAcceso: process.env.TEST_USER_PASSWORD })
      .expect(200);

    token = loginResponse.body.token;

    const searchResponse = await request(app.getHttpServer())
      .get(`/paginas/name/${paginaDto.nombrePagina}`)
      .set('Authorization', `Bearer ${token}`);

    if (searchResponse.status === 200) {
      const paginaId = searchResponse.body.idPagina;

      const deleteResponse = await request(app.getHttpServer())
        .delete(`/paginas/${paginaId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(deleteResponse.body).toEqual({
        message: `Pagina ${paginaDto.nombrePagina} de id: ${idPagina} fue Eliminada con exito`,
      });
    } else if (searchResponse.status === 404) {
      expect(searchResponse.body.error).toEqual('nombre pagina no encontrada');
    } else {
      throw new Error('Unexpected status code');
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('Crear pagina', async () => {
    const createUsuarioResponse = await request(app.getHttpServer())
      .post('/paginas/')
      .set('Authorization', `Bearer ${token}`)
      .send(paginaDto)
      .expect(201);

    idPagina = createUsuarioResponse.body.idPagina;
  });

  it('Buscar pagina', async () => {
    const buscarPagina = await request(app.getHttpServer())
      .get(`/paginas/id/${idPagina}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const buscarPaginaponse = buscarPagina.body;
    expect(buscarPaginaponse.nombrePagina).toBe(paginaDto.nombrePagina);
  });

  it('Actualizar pagina', async () => {
    const actualizarPaginaDto = {
      ...paginaDto,
      descripcionPagina: 'Testing para paginas actualizada',
    };
    await request(app.getHttpServer())
      .patch(`/paginas/${idPagina}`)
      .set('Authorization', `Bearer ${token}`)
      .send(actualizarPaginaDto)
      .expect(200);
  });

  it('Listar paginas', async () => {
    await request(app.getHttpServer())
      .get('/paginas/')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('Eliminar pagina', async () => {
    const deleteResponse = await request(app.getHttpServer())
      .delete(`/paginas/${idPagina}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(deleteResponse.body).toEqual({
      message: `Pagina ${paginaDto.nombrePagina} de id: ${idPagina} fue Eliminada con exito`,
    });
  });
});
