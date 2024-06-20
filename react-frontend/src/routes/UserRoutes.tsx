import { Route } from "react-router-dom";
import RouteElement from "../types/RouteElement";
import UserLayout from "../layouts/User";
import OrderDetail from "../pages/OrderDetail";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
const routes: Array<RouteElement> = [
  {
    path: "profile",
    exact: true,
    public: true,
    element: <Profile />,
  },
  {
    path: "orders/:order_id",
    exact: true,
    public: true,
    element: <OrderDetail />,
  },
  {
    path: "orders",
    exact: true,
    public: true,
    element: <Orders />,
  },
];
const UserRoutes = (
  <Route path="/user" element={<UserLayout />}>
    {routes.map(({ path, element, ...rest }, index) => (
      <Route
        key={`user_route_${index}`}
        index={path === ""}
        path={path}
        {...rest}
        element={element}
      />
    ))}
  </Route>
);

export default UserRoutes;
