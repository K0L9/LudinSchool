import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import NotPermittedPage from "../components/pages/notPermittedPage";
// import { useTypedSelector } from "src/hooks/useTypedSelector";

// import { Constants } from "src/constants";

const AdminBasedRoute = () => {
  //   const { user } = useTypedSelector((redux) => redux.auth);
  //   const isAdmin = user?.role === Constants.AdminRole;

  return (
    <>
      <Outlet />
    </>
  );
};

export default AdminBasedRoute;
