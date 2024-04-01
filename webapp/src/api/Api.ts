import axios, { AxiosInstance, AxiosResponse } from "axios";
import useAuth from "../context/hooks/useAuth";
import { useEffect } from "react";

const token = localStorage.getItem("token");

const api: AxiosInstance = axios.create({
	baseURL: "http://localhost:3000/",
	headers: {
		Authorization: `${token}`,
	},
});

const AuthorizationInterceptor: React.FC = () => {
	const { logout } = useAuth();

	useEffect(() => {
		const requestInterceptor = api.interceptors.request.use(
			(config) => {
				if (token) {
					config.headers!.Authorization = `${token}`;
				}
				return config;
			},
			(error) => {
				return Promise.reject(error);
			},
		);

		const responseInterceptor = api.interceptors.response.use(
			(response: AxiosResponse) => response,
			(error) => {
				if (error.response?.status === 401) {
					logout();
				}
				return Promise.reject(error);
			},
		);

		return () => {
			api.interceptors.request.eject(requestInterceptor);
			api.interceptors.response.eject(responseInterceptor);
		};
	}, [token]);

	return null;
};

export default api;

export { AuthorizationInterceptor };