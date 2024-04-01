import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface AuthData {
	isAuthenticated: boolean;
	token: string | null;
	user: User;
	setToken: (token: string | null) => void;
	logout: () => void;
}

interface AuthProviderProps {
	children: ReactNode;
}

interface TokenPayload {
	sub: string;
	exp: number;
	username: string;
	userType: number;
}

interface User {
	id: string;
	username: string;
	fullAccess: boolean | null;
}

const AuthContext = createContext<AuthData | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

	const [user, setUser] = useState<User>({
		id: "",
		username: "",
		fullAccess: false
	});

	const isAuthenticated = useMemo(() => {
		return token ? true : false;
	}, [token]);

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		if (storedToken) {
			const { exp, username, sub, userType } = parseToken(storedToken);

			if (exp && exp * 1000 > Date.now()) {
				setToken(storedToken);
				setUser({
					id: sub,
					username: username,
					fullAccess: userType == 2 ? true : false
				});
			} else {
				logout();
			}
		}
	}, []);

	const parseToken = (token: string) => {
		const decodedToken = jwt_decode<TokenPayload>(token);
		return decodedToken;
	};

	const handleSetToken = (newToken: string | null) => {
		if (newToken) {
			const { username, sub, userType } = parseToken(newToken);
			localStorage.setItem("token", newToken);
			setToken(newToken);
			setUser({
				id: sub,
				username: username,
				fullAccess: userType == 2 ? true : false
			});
		} else {
			logout();
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setToken(null);
		setUser({
			id: "",
			username: "",
			fullAccess: null
		});
		navigate('/')
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, token, user, setToken: handleSetToken, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;