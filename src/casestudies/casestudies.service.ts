import { Injectable } from '@nestjs/common';
import { CreateCaseStudyDto } from './dto/create-casestudy.dto';
import { UpdateCasestudyDto } from './dto/update-casestudy.dto';
import { CaseStudies } from '../entities/casestudies.entity';
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

  async findAll(): Promise<CaseStudies[]> {
    return await this.casestudyrepository.find();
  }

  async findOne(id: number): Promise<CaseStudies> {
    const casestudy = await this.casestudyrepository.findOne({ where: { id } });
    if (!casestudy) {
      throw new Error(`CaseStudy with id ${id} not found`);
    }
    return casestudy;
  }

  async update(
    id: number,
    updateCaseStudyDto: UpdateCasestudyDto,
  ): Promise<CaseStudies> {
    const casestudyForUpdate = await this.casestudyrepository.findOne({
      where: { id },
    });
    if (!casestudyForUpdate) {
      throw new Error(`CaseStudy with id ${id} not found`);
    }
    await this.casestudyrepository.update(id, updateCaseStudyDto);
    const casestudy = await this.casestudyrepository.findOne({ where: { id } });
    if (!casestudy) {
      throw new Error(`CaseStudy with id ${id} not found`);
    }
    return casestudy;
  }

  async remove(id: number): Promise<void> {
    const casestudy = await this.casestudyrepository.findOne({
      where: { id },
    });
    if (!casestudy) {
      throw new Error(`CaseStudy with id ${id} not found`);
    }
    await this.casestudyrepository.delete(id);
    
  }
}
