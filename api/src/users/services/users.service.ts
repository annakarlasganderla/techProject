import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto, UpdateUserResponse } from '../dto/update-user.dto';
import { handleErrors } from '../../commons/services/common.service';
import { GetUserResponse } from '../dto/get-user.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { IsNull, Repository } from 'typeorm';
import { CreatedEntity } from 'src/commons/dto/default-responses.dto';
import { PasswordHash } from '../../commons/services/common.service';

@Injectable()
export class UsersService {
  private logger = new Logger('User');
  private passwordHash = PasswordHash();

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreatedEntity> {
    try {
      const { password } = createUserDto;
      const hashedPassword = await this.passwordHash.hashPassword(password);

      createUserDto.createdAt = new Date();
      const newUser = {
        ...createUserDto,
        password: hashedPassword,
        recoverCode: null,
      };

      const user = await this.usersRepository.insert(newUser);

      this.logger.debug('User created successfully');

      return { message: `User ${newUser.name} created successfully` };
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.usersRepository.find({
        where: {
          deletedAt: IsNull(),
        },
      });
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async findById(id: string): Promise<GetUserResponse> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id, deletedAt: null },
      });

      if (!user) throw new HttpException('user_not_found', 404);

      return {
        name: user.name,
        email: user.email,
        userName: user.userName,
      };
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async findByLogin(userName: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({
        where: { userName, deletedAt: null },
      });

      if (user == null) throw new HttpException('user_not_found', 404);

      return user;
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id, deletedAt: null },
      });

      if (!user) throw new HttpException('user_not_found', 404);

      user.name = updateUserDto.name;
      user.email = updateUserDto.email;
      user.userName = updateUserDto.userName;
      user.updatedAt = new Date();

      await this.usersRepository.update(id, user);

      this.logger.debug('User updated successfully');

      return {
        name: user.name,
        email: user.email,
        userName: user.userName,
      };
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async softDelete(id: string): Promise<any> {
    try {
      const user = await this.usersRepository.findOneBy({ id }).then((user) => {
        user.deletedAt = new Date();
        return this.usersRepository.save(user);
      });

      return { message: `User ${user.name} deleted successfully` };
    } catch (e) {
      handleErrors(e.message, e.code);
    }
  }
}
