import type React from "react";

interface RouteBase {
  path: string;
  title: string;
  name: string;
  requireAuth?: boolean;
}

export interface RouteWithChild extends RouteBase {
  children: MyRoute[];
}

export interface RouteWithComponent extends RouteBase {
  element: React.FunctionComponent;
}

export type MyRoute = RouteWithComponent | RouteWithChild;
