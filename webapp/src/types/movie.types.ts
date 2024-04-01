import { MovieCategories } from "../pages/movies/form/utils/movieForm.types";

export interface MovieDto {
  name: string;
  categorie: number | null;
  directorId: string | null;
  votes: number | null;
}

export interface IMovieResponse {
  id: number;
  createdAt: string;
  updatedAt?: null;
  deletedAt?: null;
  name: string;
  votes: number;
  categorie: number;
  director?: Director | null;
}

export interface Director {
  id: number;
  createdAt: string;
  updatedAt?: null;
  deletedAt?: null;
  name: string;
}

export interface WhereDto {
  name?: string;
  directorId?: string;
  categorie?: MovieCategories | null;
}
