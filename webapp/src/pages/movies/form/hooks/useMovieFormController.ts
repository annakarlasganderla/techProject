/* eslint-disable react-hooks/rules-of-hooks */
import { useFormik } from "formik";
import { useState } from "react";
import useAuth from "../../../../context/hooks/useAuth";
import { useQuery } from "react-query";
import MovieApi from "../../../../api/Movie";
import { IMovie, MovieCategories } from "../utils/movieForm.types";
import DirectorApi from "../../../../api/Director";
import { useNavigate, useParams } from "react-router-dom";
import VoteApi from "../../../../api/Vote";
import { IVote } from "../../../../types/vote.types";

export const useMovieFormController = (type) => {
  const { user } = useAuth();
  const [error, setError] = useState();
  const [directorsList, setDirectorsList] = useState<any[]>();
  const movieApi = MovieApi();
  const voteApi = VoteApi();
  const directorApi = DirectorApi();
  const { id } = useParams();
  const navigate = useNavigate();

  const movieForm = useFormik<IMovie>({
    initialValues: {
      name: "",
      categorie: null,
      directorId: null,
      votes: 0,
    },
    validateOnChange: false,
    onSubmit: (value) => {
      const { votes, ...restValues } = value;
      movieApi.postMovies(restValues);
    },
  });

  const voteMovie = (value: number) => {
    console.log(value);
    const voteValues: IVote = {
      movieId: id,
      userId: user.id,
      numberVote: value,
    };

    voteApi.postVote(voteValues).then(() => {
      navigate("/movies");
    });
  };

  const { isFetching } = useQuery(["director-list"], {
    queryFn: async () => await directorApi.listDirectors(),
    onSuccess: (data) => {
      if (data) {
        return setDirectorsList(data as unknown[]);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (type == "VIEW") {
    useQuery(["get-movie"], {
      queryFn: async () => await movieApi.getMovieById(id as string),
      onSuccess: (data) => {
        if (data) {
          movieForm.setValues({
            categorie: data.categorie,
            directorId: data.director.id,
            name: data.name,
            votes: data.votes,
          });
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }

  const movieCategoryOptions = [
    { name: "Action", value: MovieCategories.action },
    { name: "Sify", value: MovieCategories.sify },
    { name: "Romance", value: MovieCategories.romance },
  ];

  return {
    movieForm,
    error,
    user,
    movieCategoryOptions,
    directorsList,
    voteMovie,
  };
};
