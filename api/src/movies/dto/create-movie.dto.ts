import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MovieCategories } from '../enum/movieCategories.enum';
import { AbstractClass } from 'src/database/Abstract/AbstractClass.class';

export class CreateMovieDto extends AbstractClass {
  @ApiProperty({
    example: 'Vingadores',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: MovieCategories.action,
  })
  @IsEnum(MovieCategories)
  @IsNotEmpty()
  categorie: MovieCategories;

  @ApiProperty({
    example: 1,
  })
  @IsString()
  @IsNotEmpty()
  directorId: string;
}
