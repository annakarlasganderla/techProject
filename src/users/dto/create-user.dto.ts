import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
}
