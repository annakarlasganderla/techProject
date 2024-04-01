/* eslint-disable react-hooks/rules-of-hooks */
import { useFormik } from "formik";
import { useState } from "react";
import { IProfile, IRegisterUser } from "../utils/profileForm.types";
import UserApi from "../../../../api/User";
import useAuth from "../../../../context/hooks/useAuth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

export const profileController = () => {
	const { user } = useAuth();
	const [error, setError] = useState();
	const userApi = UserApi();
	const navigate = useNavigate();

	const userForm = useFormik<IRegisterUser>({
		initialValues: {
			name: "",
			email: "",
			userName: "",
			confirmPassword: "",
			password: "",
			createdAt: new Date(),
			userType: 1
		},
		validateOnChange: false,
		onSubmit: (value) => {
			const { confirmPassword, ...restValues } = value;
			userApi.postUser(restValues).then((value) => {
				userForm.resetForm({ values: userForm.initialValues });
				navigate('/profile/list')
			});
		},
	});

	return { userForm, error, user };
};