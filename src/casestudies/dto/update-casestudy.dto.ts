import { PartialType } from '@nestjs/mapped-types';
import { CreateCaseStudyDto } from './create-casestudy.dto';

export class UpdateCasestudyDto extends PartialType(CreateCaseStudyDto) {}
