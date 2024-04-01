import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectorsModule } from 'src/directors/directors.module';
import { VotesModule } from 'src/votes/votes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), DirectorsModule, VotesModule],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService]
})
export class MoviesModule {}
