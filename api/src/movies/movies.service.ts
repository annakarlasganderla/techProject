import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { handleErrors } from 'src/commons/services/common.service';
import { Director } from 'src/directors/entities/director.entity';
import { DirectorsService } from 'src/directors/directors.service';
import { VotesService } from 'src/votes/votes.service';
import { WhereDto } from './dto/response-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    private directorService: DirectorsService,
    private voteService: VotesService
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    try {

      const {directorId} = createMovieDto;

      const director = await this.directorService.findOne(directorId);

      if (!director) throw new HttpException('director_not_found', 404);

      const newMovie = new Movie();

      newMovie.name = createMovieDto.name;
      newMovie.categorie = createMovieDto.categorie;
      newMovie.createdAt = new Date();
      newMovie.director = director;
      
      await this.movieRepository.insert(newMovie);
      return { message: `Movie ${createMovieDto.name} created successfully` };
    } catch (e) {
      handleErrors(e.message, e.code);
    }
  }

  async findAll(whereDto: WhereDto) {
    try {

      const {directorId} = whereDto;

      const director = await this.directorService.findOne(directorId);

      if (!director) throw new HttpException('director_not_found', 404);

      return await this.movieRepository.find({ where: {
        name: whereDto.name ? ILike(`${whereDto.name}%`) : null, 
        director: director,
        categorie: whereDto.categorie
      }, relations: ['director']});
    } catch (e) {
      handleErrors(e.message, e.code);
    }
  }

  async findOne(id: string): Promise<Movie> {
    try {
      const movie = await this.movieRepository.findOne({
        where: { id, deletedAt: null },
        relations: ['director'],
      });

      if (!movie) throw new HttpException('movie_not_found', 404);

      const movieVotes = await this.voteService.findMovieVotes(movie.id);

      return {
        ...movie,
        name: movie.name,
        categorie: movie.categorie,
        director: movie.director,
        votes: movieVotes
      };

    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

}
