import { listAll, post, remove, update, getById } from "./Common";
import { UpdateUsersDto, UsersDto } from "../types/user.types";
import toast from "react-hot-toast";

const UserApi = () => {
	const url = "/users";

	const listUsers = async () => {
		return await listAll(url);
	};

	const postUser = async (obj: UsersDto) => {
		return await post(url, obj).then(() => toast.success("User created successfully"));
	};

	const getUserById = async (id: string) => {
		return await getById(url, id);
	}

	const updateUser = async (obj: UpdateUsersDto, id: string) => {
		return await update(url, obj, id).then(() =>
			toast.success("User updated successfully"),
		);
	};

	const deleteUser = async (id: string) => {
		return await remove(url, id).then(() => toast.success("User deleted successfully"));
	};

	return { listUsers, postUser, getUserById, updateUser, deleteUser };
};

export default UserApi;