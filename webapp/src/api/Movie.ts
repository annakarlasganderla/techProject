import { listAllByFilters, post, getById } from "./Common";
import toast from "react-hot-toast";
import { MovieDto, WhereDto } from "../types/movie.types";

const MovieApi = () => {
	const url = "/movies";

	const listMovies = async (obj: WhereDto) => {
		return await listAllByFilters(url, obj);
	};

	const postMovies = async (obj: MovieDto) => {
		return await post(url, obj).then(() => toast.success("Movie created successfully"));
	};

	const getMovieById = async (id: string) => {
		return await getById(url, id);
	}

	return { listMovies, postMovies, getMovieById };
};

export default MovieApi;