import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { UsersController } from './users/users.controller';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
