import { AbstractClass } from "src/database/Abstract/AbstractClass.class";
import { MovieCategories } from "../enum/movieCategories.enum";
import { Director } from "src/directors/entities/director.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Movie extends AbstractClass {
    @Column()
    name: string;

    @Column()
    categorie: MovieCategories;

    @ManyToOne(() => Director, (dir) => dir.movies)
    director: Director;

    votes: number;
}
