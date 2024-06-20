import { Route } from "react-router-dom";
import AuthenticationLayout from "../layouts/Authentication";
import RouteElement from "../types/RouteElement";
import Login from "../pages/Login";
import Register from "../pages/Register";
const routes: Array<RouteElement> = [
  {
    path: "login",
    exact: true,
    public: true,
    element: <Login />,
  },
  {
    path: "register",
    exact: true,
    public: true,
    element: <Register />,
  },
];
const AuthRoutes = (
  <Route path="/auth" element={<AuthenticationLayout />}>
    {routes.map(({ path, element, ...rest }, index) => (
      <Route
        key={`auth_route_${index}`}
        index={path === ""}
        path={path}
        {...rest}
        element={element}
      />
    ))}
  </Route>
);

export default AuthRoutes;
