import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMovieDto } from './create-movie.dto';
import { MovieCategories } from '../enum/movieCategories.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';


export class UpdateMovieDto {
  @ApiProperty({
    example: 'Vingadores',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '2',
  })
  @IsString()
  @IsNotEmpty()
  directorId: string;

  @ApiProperty({
    example: MovieCategories.action,
  })
  @IsEnum(MovieCategories)
  @IsNotEmpty()
  categorie: MovieCategories;
}
