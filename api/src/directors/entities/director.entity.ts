import { AbstractClass } from "src/database/Abstract/AbstractClass.class";
import { Movie } from "src/movies/entities/movie.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Director extends AbstractClass {
    @Column()
    name: string;

    @OneToMany(() => Movie, (movie) => movie.director)
    movies: Movie[];
}
