import { Route } from "react-router-dom";
import RouteElement from "../types/RouteElement";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import HomeLayout from "../layouts/Home";
import PlaceOrder from "../pages/PlaceOrder";
import ProductDetail from "../pages/ProductDetail";
const routes: Array<RouteElement> = [
  {
    path: "",
    exact: true,
    public: true,
    element: <Home />,
  },
  {
    path: "cart",
    exact: true,
    public: true,
    element: <Cart />,
  },
  {
    path: "place-order",
    exact: true,
    public: true,
    element: <PlaceOrder />,
  },
  {
    path: "product/:product_id",
    exact: true,
    public: true,
    element: <ProductDetail />,
  },
];
const HomeRoutes = (
  <Route path="/" element={<HomeLayout />}>
    {routes.map(({ path, element, ...rest }, index) => (
      <Route
        key={`home_route_${index}`}
        index={path === ""}
        path={path}
        {...rest}
        element={element}
      />
    ))}
  </Route>
);

export default HomeRoutes;
