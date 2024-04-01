import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Director } from 'src/directors/entities/director.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { User } from 'src/users/entities/user.entity';
import { Vote } from 'src/votes/entities/vote.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.22.64.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'tech',
      entities: [User, Movie, Director, Vote],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
