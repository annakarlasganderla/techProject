import { AbstractClass } from 'src/database/Abstract/AbstractClass.class';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends AbstractClass {
  @Column()
  name: string;

  @Column({unique: true})
  userName: string;

  @Column({unique: true})
  password: string;

  @Column({unique: true})
  email: string;

  @Column()
  userType: number;
}
