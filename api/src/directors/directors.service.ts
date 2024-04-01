import { HttpException, Injectable } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { Director } from './entities/director.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { handleErrors } from 'src/commons/services/common.service';

@Injectable()
export class DirectorsService {

  constructor(
    @InjectRepository(Director)
    private directorRepository: Repository<Director>,
  ) {}

  async findAll() {
    try {
      return this.directorRepository.find();
    } catch (e) {
      handleErrors(e.message, e.code);
    }
  }

  async findOne(id: string): Promise<Director> {
    try {
      const director = await this.directorRepository.findOne({ where: { id, deletedAt:  null }});

      if (!director) throw new HttpException('user_not_found', 404);

      return {
        ...director
      }

    } catch (e) {
      handleErrors(e.message, e.code);
    }
  }
}
