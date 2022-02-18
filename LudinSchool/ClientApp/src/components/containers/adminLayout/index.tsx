import * as React from "react";

import { Outlet } from "react-router";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { Layout } from "antd";

const { Content } = Layout;

const AdminLayout = () => {
  return (
    <>
      {/* <AdminHeader /> */}
      <Layout>
        <AdminSidebar />
        <Content>
          <div className="adminContainer">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default AdminLayout;
