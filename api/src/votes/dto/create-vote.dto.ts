import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Column } from 'typeorm';

export class CreateVoteDto {
  @ApiProperty({
    example: '1',
  })
  @Column()
  userId: string;

  @ApiProperty({
    example: '2',
  })
  @Column()
  movieId: string;

  @ApiProperty({
    example: '4',
  })
  @Column()
  @IsNumber()
  numberVote: number;
}
