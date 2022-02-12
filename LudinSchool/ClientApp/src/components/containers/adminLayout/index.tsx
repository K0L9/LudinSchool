import * as React from "react";

import { Outlet } from "react-router";
import AdminHeader from "./header";

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
};

export default AdminLayout;
