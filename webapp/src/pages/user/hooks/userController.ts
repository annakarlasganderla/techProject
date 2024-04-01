/* eslint-disable react-hooks/rules-of-hooks */
import { useFormik } from "formik";
import { useState } from "react";
import { IProfile, IUpdateUser } from "../utils/userForm.types";
import UserApi from "../../../api/User";
import useAuth from "../../../context/hooks/useAuth";
import { useQuery } from "react-query";

export const userController = () => {
	const { user } = useAuth();
	const [error, setError] = useState();
	const userApi = UserApi();

	const userForm = useFormik<IUpdateUser>({
		initialValues: {
			name: "",
			email: "",
			userName: "",
		},
		validateOnChange: false,
		onSubmit: (value) => {
			userApi.updateUser(value, user.id);
		},
	});

	useQuery(["find-user", { user }], {
		queryFn: () => {
			if (user.id && user.id !== "") {
				return userApi.getUserById(user.id);
			}
			return null;
		},
		onSuccess: (data: IProfile) => {
			if (data) {
				userForm.setValues({
					name: data.name,
					email: data.email,
					userName: data.userName,
				});
			}
		},
	});

	return { userForm, error, user };
};