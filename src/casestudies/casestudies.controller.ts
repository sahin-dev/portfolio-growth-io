import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CasestudiesService } from './casestudies.service';
import { CreateCaseStudyDto } from './dto/create-casestudy.dto';
import { UpdateCasestudyDto } from './dto/update-casestudy.dto';

@Controller('casestudies')
export class CasestudiesController {
  constructor(private readonly casestudiesService: CasestudiesService) {}

  @Post()
  create(@Body() createCasestudyDto: CreateCaseStudyDto) {
    return this.casestudiesService.createCaseStudy(createCasestudyDto);
  }

  @Get()
  findAll() {
    return this.casestudiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.casestudiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCasestudyDto: UpdateCasestudyDto) {
    return this.casestudiesService.update(+id, updateCasestudyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.casestudiesService.remove(+id);
  }
}
