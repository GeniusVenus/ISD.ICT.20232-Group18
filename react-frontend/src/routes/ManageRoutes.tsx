import { Route } from "react-router-dom";
import RouteElement from "../types/RouteElement";
import ManageLayout from "../layouts/Manage";
import CreateProduct from "../pages/CreateProduct";
import UpdateProduct from "../pages/UpdateProduct";
import ProductList from "../pages/ProductList";
const routes: Array<RouteElement> = [
  {
    path: "",
    exact: true,
    public: true,
    element: <ProductList />,
  },
  {
    path: "create",
    exact: true,
    public: true,
    element: <CreateProduct />,
  },
  {
    path: "edit/:product_id",
    exact: true,
    public: true,
    element: <UpdateProduct />,
  },
];
const ManageRoutes = (
  <Route path="/manage-product" element={<ManageLayout />}>
    {routes.map(({ path, element, ...rest }, index) => (
      <Route
        key={`manage_route_${index}`}
        index={path === ""}
        path={path}
        {...rest}
        element={element}
      />
    ))}
  </Route>
);

export default ManageRoutes;
