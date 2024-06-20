import { Routes } from "react-router";
import AuthRoutes from "./routes/AuthRoutes";
import HomeRoutes from "./routes/HomeRoutes";
import UserRoutes from "./routes/UserRoutes";
import ManageRoutes from "./routes/ManageRoutes";

function App() {
  return (
    <>
      <Routes>
        {AuthRoutes}
        {HomeRoutes}
        {UserRoutes}
        {ManageRoutes}
      </Routes>
    </>
  );
}

export default App;
