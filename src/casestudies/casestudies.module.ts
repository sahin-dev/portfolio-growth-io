import { Module } from '@nestjs/common';
import { CasestudiesService } from './casestudies.service';
import { CasestudiesController } from './casestudies.controller';
import { CaseStudies } from '../entities/Casestudies.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([CaseStudies])],
  controllers: [CasestudiesController],
  providers: [CasestudiesService],
  exports: [TypeOrmModule],
})
export class CasestudiesModule {}
