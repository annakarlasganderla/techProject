import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { Public } from 'src/auth/decorators/auth.decorators';
import { ApiTags } from '@nestjs/swagger';

@Public()
@ApiTags('votes')
@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post('/create')
  create(@Body() createVoteDto: CreateVoteDto) {
    return this.votesService.create(createVoteDto);
  }

}
