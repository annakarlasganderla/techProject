import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Public } from 'src/auth/decorators/auth.decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { UserType } from 'src/users/enum/user-type.enum';
import { WhereDto } from './dto/response-movie.dto';

@Public()
@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('create')
  @Roles(UserType.Admin)
  @ApiResponse({ status: 201 })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Post('list-all')
  @ApiResponse({ status: 201 })
  findAll(@Body() whereDto: WhereDto) {
    return this.moviesService.findAll(whereDto);
  }

  @Get('get/:id')
  @ApiResponse({ status: 201 })
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

}
