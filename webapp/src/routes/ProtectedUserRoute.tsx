import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/hooks/useAuth";

const ProtectedUserRoute = () => {
	const {  user } = useAuth();

	return user.fullAccess ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedUserRoute;