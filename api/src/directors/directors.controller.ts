import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { Public } from 'src/auth/decorators/auth.decorators';
import { ApiTags } from '@nestjs/swagger';

@Controller('directors')
@ApiTags('directors')
@Public()
export class DirectorsController {
  constructor(private readonly directorsService: DirectorsService) {}

  @Get('list-all')
  findAll() {
    return this.directorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directorsService.findOne(id);
  }

}
