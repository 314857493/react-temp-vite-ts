import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import RouteWrapper from "../RouteWrapper";
import type { MyRoute, RouteWithChild, RouteWithComponent } from "../types";

const generateRoute: any = (routers: MyRoute[]) => {
  return routers.map((item) => {
    if ((item as RouteWithChild).children) {
      return generateRoute((item as RouteWithChild).children);
    }
    const { element: Element } = item as RouteWithComponent;

    return (
      <Route
        path={item.path}
        key={item.name}
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <RouteWrapper element={<Element />} title={item.title} />
          </Suspense>
        }
      />
    );
  });
};

export { generateRoute };
