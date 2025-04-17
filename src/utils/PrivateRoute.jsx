import { Navigate, Outlet } from "react-router-dom";
import { API_TOKEN } from "./constants";

const PrivateRoute = () => {
  return localStorage.getItem(API_TOKEN) ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateRoute;
