import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AbstractClass } from 'src/database/Abstract/AbstractClass.class';

export class CreateUserDto {
  @ApiProperty({
    example: 'usuario_teste@teste.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'usuario_teste',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'testando123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'user_test',
  })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    example: '2024-03-29 11:31:55.176',
  })
  @IsNotEmpty()
  createdAt: Date;
}
