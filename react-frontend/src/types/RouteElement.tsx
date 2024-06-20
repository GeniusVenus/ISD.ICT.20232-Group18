import { ReactNode } from "react";

type RouteElement = {
  path: string;
  exact: boolean;
  public: boolean;
  element: ReactNode;
};
export default RouteElement;
