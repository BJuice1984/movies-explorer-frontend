import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes({ loggedIn }) {
  return loggedIn ? <Outlet /> : <Navigate replace to='/' />
}

export default ProtectedRoutes;