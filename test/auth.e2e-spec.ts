import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Authentication system (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handels signup request', () => {
    const testEmail = `test${Date.now()}@example.com`;

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: testEmail, password: '123456789a' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toBe(testEmail);
      });
  });

  afterEach(async () => {
    await app.close();
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'test@test.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'test' })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie as string[])
      .expect(200);

    expect(body.email).toBe(email);
  });
});
