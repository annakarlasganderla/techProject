import { AbstractClass } from "src/database/Abstract/AbstractClass.class";
import { Column, Entity } from "typeorm";

@Entity()
export class Vote extends AbstractClass {
    @Column()
    userId: string;

    @Column()
    movieId: string;

    @Column()
    numberVote: number;
}
