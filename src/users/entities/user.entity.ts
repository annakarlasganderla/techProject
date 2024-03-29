import { AbstractClass } from 'src/database/Abstract/AbstractClass.class';
import { Entity, Column } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class User extends AbstractClass {
  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  userName: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  email: string;
}
