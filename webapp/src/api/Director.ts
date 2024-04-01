import { listAll, getById } from "./Common";

const DirectorApi = () => {
	const url = "/directors";

	const listDirectors = async () => {
		return await listAll(url);
	};

	const getDirectorById = async (id: string) => {
		return await getById(url, id);
	}

	return { listDirectors, getDirectorById };
};

export default DirectorApi;