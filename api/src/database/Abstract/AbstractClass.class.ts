import { Injectable } from '@nestjs/common';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@Injectable()
export abstract class AbstractClass {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  createdAt: Date;

  @Column({nullable: true})
  updatedAt: Date;

  @Column({nullable: true})
  deletedAt: Date;
}
