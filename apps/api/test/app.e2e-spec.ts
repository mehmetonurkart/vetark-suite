import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import bcrypt from 'bcryptjs';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { configureApp } from './../src/configure-app';
import { LoginRepository } from './../src/modules/login/login.repository';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let sessionCookie: string;

  beforeAll(async () => {
    const passwordHash = await bcrypt.hash('vetark4154', 4);
    const loginRepositoryMock = {
      findByUsername: jest.fn((username: string) => {
        if (username !== 'vetark') {
          return null;
        }

        return {
          id: 1,
          username: 'vetark',
          displayName: 'Vetark Admin',
          role: 'admin',
          passwordHash,
        };
      }),
      findById: jest.fn((id: number) => {
        if (id !== 1) {
          return null;
        }

        return {
          id: 1,
          username: 'vetark',
          displayName: 'Vetark Admin',
          role: 'admin',
        };
      }),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(LoginRepository)
      .useValue(loginRepositoryMock)
      .compile();

    app = moduleFixture.createNestApplication();
    configureApp(app);
    await app.init();
  });

  it('/api/health (GET)', () => {
    return request(app.getHttpServer()).get('/api/health').expect(200).expect({
      service: 'api',
      status: 'ok',
    });
  });

  it('/api/login (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/login')
      .send({
        username: 'vetark',
        password: 'vetark4154',
      })
      .expect(201);

    expect(response.body).toEqual({
      user: {
        id: 1,
        username: 'vetark',
        displayName: 'Vetark Admin',
        role: 'admin',
      },
    });

    expect(response.headers['set-cookie']).toEqual(
      expect.arrayContaining([expect.stringContaining('vetark_session=')]),
    );

    sessionCookie = response.headers['set-cookie'][0];
  });

  it('/api/login/me (GET) returns 401 without cookie', () => {
    return request(app.getHttpServer()).get('/api/login/me').expect(401);
  });

  it('/api/login/me (GET) returns current user with cookie', async () => {
    if (!sessionCookie) {
      const loginResponse = await request(app.getHttpServer())
        .post('/api/login')
        .send({
          username: 'vetark',
          password: 'vetark4154',
        })
        .expect(201);

      sessionCookie = loginResponse.headers['set-cookie'][0];
    }

    await request(app.getHttpServer())
      .get('/api/login/me')
      .set('Cookie', sessionCookie)
      .expect(200)
      .expect({
        user: {
          id: 1,
          username: 'vetark',
          displayName: 'Vetark Admin',
          role: 'admin',
        },
      });
  });

  it('/api/login/logout (POST) clears the session cookie', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/login/logout')
      .expect(201);

    expect(response.body).toEqual({
      success: true,
    });

    expect(response.headers['set-cookie']).toEqual(
      expect.arrayContaining([expect.stringContaining('vetark_session=;')]),
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
