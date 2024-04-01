type FormType = "NEW" | "VIEW" | "EDIT";

export interface IMovieForm {
  type: FormType;
}

export interface IMovie {
  name: string;
  categorie: MovieCategories  | null;
  directorId: string | null;
  votes: number | null
}

export enum MovieCategories {
  action,
  romance,
  sify,
}
