import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Loading from "../components/Loading/Loading";
//import { AuthProvider } from "../context/AuthContext";
//import ProtectedRoute from "./ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedUserRoute from "./ProtectedUserRoute";
import { AuthorizationInterceptor } from "../api/Api";

import Login from "../pages/login";
import User from "../pages/user";
import MoviesList from "../pages/movies/list";
import Menu from "../components/Menu";
import Profile from "../pages/profile/form";
import ProfileList from "../pages/profile/list";
import MoviesForm from "../pages/movies/form";

export function AppRoutes() {
  return (
    <AuthProvider>
      <AuthorizationInterceptor />
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="w-screen h-screen flex items-center justify-center">
              <Loading />
            </div>
          }
        >
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<Menu />}>
                <Route path="movies" element={<MoviesList />} />
                <Route path="user/form/:id" element={<User type={"VIEW"} />} />
                <Route
                  path="user/form/EDIT/:id"
                  element={<User type={"EDIT"} />}
                />
                <Route
                  path="movies/VIEW/:id"
                  element={<MoviesForm type="VIEW" />}
                />

                <Route element={<ProtectedUserRoute />}>
                  <Route
                    path="profile/new"
                    element={<Profile type={"NEW"} />}
                  />
                  <Route path="profile/list" element={<ProfileList />} />
                  <Route
                    path="movies/new"
                    element={<MoviesForm type="NEW" />}
                  />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
