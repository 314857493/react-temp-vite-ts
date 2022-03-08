import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import RouteWrapper from "../RouteWrapper";
import type { MyRoute, RouteWithChild, RouteWithComponent } from "../types";

function isRouteWithChild(
  response: RouteWithChild | RouteWithComponent
): response is RouteWithChild {
  return (response as RouteWithChild).children !== undefined;
}

const generateRoute: any = (routers: MyRoute[]) => {
  return routers.map((item) => {
    if (isRouteWithChild(item)) {
      return generateRoute(item.children);
    }
    const { element: Element } = item;

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
