import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "@/page/Login";
import Home from "@/page/Home";
import NoMatch from "@/page/NoMatch";
import Layout from "@/Layout";
import MainRoute from "./main/MainRoute";
import RouteWrapper from "./RouteWrapper";
// const MainRoute = lazy(() => import("./main/MainRoute"));

const RouteBox = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<RouteWrapper element={<Login />} title="登录" />}
      />
      <Route path="/">
        <Route
          index
          element={<RouteWrapper element={<Home />} title={"首页"} />}
        />
        <Route path="/index" element={<Navigate to="/" />} />
        <Route
          path="/main/*"
          element={
            <Layout>
              <MainRoute />
            </Layout>
          }
        />
      </Route>
      <Route
        path="*"
        element={<RouteWrapper element={<NoMatch />} title="404" />}
      />
    </Routes>
  );
};

export default RouteBox;
