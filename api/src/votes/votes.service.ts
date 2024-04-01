import { Injectable, Logger } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { MoviesService } from 'src/movies/movies.service';
import { UsersService } from 'src/users/services/users.service';
import { handleErrors } from 'src/commons/services/common.service';
import { Repository } from 'typeorm';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
  ) {}
  
  async create(createVoteDto: CreateVoteDto) {
    try {
      const {userId, movieId} = createVoteDto;

      const newVote = new Vote();
      newVote.movieId = movieId;
      newVote.userId = userId;
      newVote.createdAt = new Date();
      newVote.numberVote = createVoteDto.numberVote;

      await this.voteRepository.insert(newVote);
      return { message: `Movie voted successfully` };
    } catch (e) {
      handleErrors(e.message, e.code);
    }
  }

  async findMovieVotes(id: string) {
    try {
      
      // todos os votos do filme
      const movieVotes = await this.voteRepository.find({
        where: {movieId: id}
      })

      if (movieVotes.length == 0) return 0;

      const sumVotes = movieVotes.reduce((sumVotes: number, movieVotes: Vote) => {
        sumVotes += Number(movieVotes.numberVote)

        return sumVotes
      }, 0)

      return sumVotes/movieVotes.length;
    } catch (e) {
      handleErrors(e.message, e.code);
    }
  }
}
