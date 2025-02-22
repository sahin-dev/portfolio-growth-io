import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
  ): Promise<any> {
    try {
      const casestudy = this.casestudyrepository.create(createCasestudyDto);
      const savedCasestudy = await this.casestudyrepository.save(casestudy);
      return {
        success: true,
        message: 'Case study created successfully.',
        data: savedCasestudy,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        'An error occurred while creating the case study.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<any> {
    try {
      const caseStudies = await this.casestudyrepository.find();
      return {
        success: true,
        message: 'Fetched all case studies successfully.',
        data: caseStudies,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        'An error occurred while fetching all case studies.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const casestudy = await this.casestudyrepository.findOne({ where: { id } });
      if (!casestudy) {
        throw new HttpException(
          `Case study with id ${id} not found.`,
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        message: 'Case study fetched successfully.',
        data: casestudy,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'An unexpected error occurred while fetching the case study.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateCaseStudyDto: UpdateCasestudyDto,
  ): Promise<any> {
    try {
      const casestudyForUpdate = await this.casestudyrepository.findOne({
        where: { id },
      });
      if (!casestudyForUpdate) {
        throw new HttpException(
          `Case study with id ${id} not found.`,
          HttpStatus.NOT_FOUND,
        );
      }
      await this.casestudyrepository.update(id, updateCaseStudyDto);
      const updatedCasestudy = await this.casestudyrepository.findOne({ where: { id } });
      if (!updatedCasestudy) {
        throw new HttpException(
          `Case study with id ${id} not found after update.`,
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        message: 'Case study updated successfully.',
        data: updatedCasestudy,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'An error occurred while updating the case study.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const casestudy = await this.casestudyrepository.findOne({ where: { id } });
      if (!casestudy) {
        throw new HttpException(
          `Case study with id ${id} not found.`,
          HttpStatus.NOT_FOUND,
        );
      }
      await this.casestudyrepository.delete(id);
      return {
        success: true,
        message: `Case study with id ${id} deleted successfully.`,
        statusCode: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      throw new HttpException(
        error.message || `An error occurred while deleting the case study with id ${id}.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
