import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.20.208.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'tech',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
