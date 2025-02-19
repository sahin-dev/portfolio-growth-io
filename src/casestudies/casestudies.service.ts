import { Injectable } from '@nestjs/common';
import { CreateCaseStudyDto } from './dto/create-casestudy.dto';
import { UpdateCasestudyDto } from './dto/update-casestudy.dto';
import { CaseStudies } from '../entities/Casestudies.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CasestudiesService {
  constructor(
    @InjectRepository(CaseStudies)
    private readonly casestudyrepository: Repository<CaseStudies>,
  ) {}

  async createCaseStudy(
    createCasestudyDto: CreateCaseStudyDto,
  ): Promise<CaseStudies> {
    const casestudy = this.casestudyrepository.create(createCasestudyDto);
    return this.casestudyrepository.save(casestudy);
  }

  findAll() {
    return `This action returns all casestudies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} casestudy`;
  }

  update(id: number, updateCasestudyDto: UpdateCasestudyDto) {
    return `This action updates a #${id} casestudy`;
  }

  remove(id: number) {
    return `This action removes a #${id} casestudy`;
  }
}
