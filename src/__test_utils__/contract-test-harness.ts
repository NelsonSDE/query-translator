import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import * as request from 'supertest';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
export class ContractTestHarness {
  app: INestApplication;

  async sendPostAndExpectSuccess(
    endpoint: string,
    payload: any,
    statusCode = 200,
  ) {
    const response = await request(this.app.getHttpServer())
      .post(endpoint)
      .send(payload);

    expect(response.status).toBe(statusCode);
    expect(response.body).toMatchSnapshot();
    return response.body;
  }

  async sendPostAndExpectError(
    endpoint: string,
    payload: any,
    statusCode = 400,
  ) {
    const response = await request(this.app.getHttpServer())
      .post(endpoint)
      .send(payload);

    expect(response.status).toBe(statusCode);
    expect(response.body).toMatchSnapshot();
    return response.body;
  }
}

const testHarness = new ContractTestHarness();

export function withContractTestHarness() {
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        validationError: { target: true, value: true },
        validateCustomDecorators: true,
        forbidUnknownValues: false,
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
    testHarness.app = app;
  });

  afterAll(async () => {
    await testHarness.app.close();
  });
  return testHarness;
}
