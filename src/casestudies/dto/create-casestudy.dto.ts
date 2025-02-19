import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateCaseStudyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  field: string;

  @IsDateString()
  time: string;

  @IsDateString()
  date: string;
}
