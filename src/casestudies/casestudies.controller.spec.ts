import { Test, TestingModule } from '@nestjs/testing';
// import { CasestudiesController } from './casestudies.controller';
// import { CasestudiesService } from './casestudies.service';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CaseStudies} from "../entities/Casestudies.entity";
import {CasestudiesModule} from "./casestudies.module";
import { INestApplication } from '@nestjs/common';


// test case steps

// 1 : describe to group the test cases

describe('CaseStudiesController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<CaseStudies>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [CaseStudies],
          synchronize: true, // Auto-sync schema for testing
        }),
        CasestudiesModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    
    repository = moduleFixture.get<Repository<CaseStudies>>(getRepositoryToken(CaseStudies));
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await repository.clear(); // Clean database before each test
  });

  it('should create a new case study (POST/casestudies)', async () => {
    const newCaseStudy = {
      title: 'AI in Healthcare',
      field: 'Artificial Intelligence',
      time: '12:00:00',
      date: '2024-02-19',
    };

    const response = await request(app.getHttpServer())
      .post('/casestudies')
      .send(newCaseStudy)
      .expect(201);

    expect(response.body).toMatchObject(newCaseStudy);
  });

  it('should fail to create a case study with missing fields', async () => {
    const response = await request(app.getHttpServer())
      .post('/casestudies')
      .send({ title: '', field: '',time:'',date:'' }) // Missing required fields
      .expect(400);

    expect(response.body.message).toContain('title should not be empty');
    expect(response.body.message).toContain('field should not be empty');
    expect(response.body.message).toContain('time should not be empty');
    expect(response.body.message).toContain('date should not be empty');
  });

  // it('should get all case studies (GET /casestudies)', async () => {
  //   await repository.save([
  //     { title: 'AI', field: 'Tech', time: '10:00:00', date: '2024-02-19' },
  //     { title: 'Blockchain', field: 'Finance', time: '11:00:00', date: '2024-02-20' },
  //   ]);

  //   const response = await request(app.getHttpServer())
  //     .get('/casestudies')
  //     .expect(200);

  //     expect(response.body.length).toBeGreaterThan(0);
  //     expect(response.body[0]).toHaveProperty('title');
  //     expect(response.body[0]).toHaveProperty('field');
  //     expect(response.body[0]).toHaveProperty('time');
  //     expect(response.body[0]).toHaveProperty('date');
  // });
});