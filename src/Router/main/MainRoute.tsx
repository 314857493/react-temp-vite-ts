import React from "react";
import { Routes } from "react-router-dom";
import routes from "./mainRoutes";
import Sider from "@/page/Main/Sider";
import { generateRoute } from "../utils";
const MainRoute = () => {
  return (
    <>
      <Sider />
      <div style={{ flex: 1 }}>
        <Routes>{generateRoute(routes)}</Routes>
      </div>
    </>
  );
};

export default MainRoute;
