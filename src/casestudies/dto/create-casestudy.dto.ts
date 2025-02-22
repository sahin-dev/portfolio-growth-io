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

  @IsString()
  @IsNotEmpty()
  introduction: string;

  @IsString()
  @IsNotEmpty()
  challenge: string;

  @IsString()
  @IsNotEmpty()
  solution: string;

  @IsString()
  @IsNotEmpty()
  result: string;

  @IsString()
  @IsNotEmpty()
  conclusion: string;
}
