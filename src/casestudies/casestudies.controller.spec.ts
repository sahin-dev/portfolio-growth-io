import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaseStudies } from '../entities/casestudies.entity';
import { CasestudiesModule } from './casestudies.module';
import { INestApplication } from '@nestjs/common';

describe('CaseStudiesController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<CaseStudies>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',  // In-memory DB for tests
          entities: [CaseStudies],
          synchronize: true,  // Automatically sync DB schema
        }),
        CasestudiesModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    
    repository = moduleFixture.get<Repository<CaseStudies>>(getRepositoryToken(CaseStudies));
  });

  afterAll(async () => {
    await app.close(); // Close the app server
    await repository.manager.connection.close(); // Close the database connection
  });

  beforeEach(async () => {
    await repository.clear(); // Clean database before each test
  });

  it('should create a new case study (POST /casestudies)', async () => {
    const newCaseStudy = {
      title: 'AI in Healthcare',
      field: 'Artificial Intelligence',
      time: '12:00:00',
      date: '2024-02-19',
    };

    const response = await request(app.getHttpServer())
      .post('/casestudies')
      .send(newCaseStudy)
      .expect(201); // Expect 201 Created

    expect(response.body).toMatchObject(newCaseStudy); // Check if response matches sent data
  });

  it('should fail to create a case study with missing fields (POST /casestudies)', async () => {
    const response = await request(app.getHttpServer())
      .post('/casestudies')
      .send({ title: '', field: '', time: '', date: '' })  // Missing required fields
      .expect(400);  // Expect 400 Bad Request

    // Ensure validation messages are present for missing fields
    expect(response.body.message).toContain('title should not be empty');
    expect(response.body.message).toContain('field should not be empty');
    expect(response.body.message).toContain('time should not be empty');
    expect(response.body.message).toContain('date should not be empty');
  });

  // it('should get all case studies (GET /casestudies)', async () => {
  //   // Create two sample case studies before calling GET endpoint
  //   await repository.save([
  //     { title: 'AI in Healthcare', field: 'AI', time: '10:00:00', date: '2024-02-19' },
  //     { title: 'Blockchain in Finance', field: 'Finance', time: '11:00:00', date: '2024-02-20' },
  //   ]);

  //   const response = await request(app.getHttpServer())
  //     .get('/casestudies')
  //     .expect(200);  // Expect 200 OK

  //   // Ensure we receive an array of case studies
  //   expect(response.body.length).toBeGreaterThan(0);
  //   expect(response.body[0]).toHaveProperty('title');
  //   expect(response.body[0]).toHaveProperty('field');
  //   expect(response.body[0]).toHaveProperty('time');
  //   expect(response.body[0]).toHaveProperty('date');
  // });
});
