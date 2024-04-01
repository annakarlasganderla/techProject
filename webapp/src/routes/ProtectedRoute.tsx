import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/hooks/useAuth";

const ProtectedRoute = () => {
	const { isAuthenticated, user } = useAuth();

	return isAuthenticated || !user.fullAccess ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoute;