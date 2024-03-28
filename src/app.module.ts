import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.30.64.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'tech',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
