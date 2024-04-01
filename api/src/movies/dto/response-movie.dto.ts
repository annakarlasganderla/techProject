import { MovieCategories } from "../enum/movieCategories.enum";

export interface WhereDto {
  name?: string;
  directorId?: string;
  categorie?: MovieCategories;
}

