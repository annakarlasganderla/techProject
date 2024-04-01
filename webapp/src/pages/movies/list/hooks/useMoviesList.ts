/* eslint-disable react-hooks/rules-of-hooks */
import { useFormik } from "formik";
import { useState } from "react";
import UserApi from "../../../../api/User";
import useAuth from "../../../../context/hooks/useAuth";
import { useQuery } from "react-query";
import { IMovieResponse, WhereDto } from "../../../../types/movie.types";
import MovieApi from "../../../../api/Movie";
import DirectorApi from "../../../../api/Director";
import { MovieCategories } from "../../form/utils/movieForm.types";

export const moviesListController = () => {
  const { user } = useAuth();
  const [moviesList, setMoviesList] = useState<IMovieResponse[]>([]);
  const [directorsList, setDirectorsList] = useState<any[]>([]);
  const [error, setError] = useState();
  const movieApi = MovieApi();
  const directorApi = DirectorApi();
  const [filter, setFilter] = useState<WhereDto>({ })

  const { isFetching } = useQuery<IMovieResponse[]>(["movies-list", { filter }], {
    queryFn: async () => await movieApi.listMovies(filter),
    onSuccess: (data) => {
      setMoviesList(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useQuery(["director-list"], {
    queryFn: async () => await directorApi.listDirectors(),
    onSuccess: (data) => {
      if (data) {
        return setDirectorsList(data as any[]);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const movieCategoryOptions = [
    { name: "Action", value: MovieCategories.action },
    { name: "Sify", value: MovieCategories.sify },
    { name: "Romance", value: MovieCategories.romance },
  ];

  return { moviesList, error, user, directorsList, movieCategoryOptions, setFilter, filter };
};
