import { Routes } from "react-router";
import AuthRoutes from "./routes/AuthRoutes";
import HomeRoutes from "./routes/HomeRoutes";
import UserRoutes from "./routes/UserRoutes";

function App() {
  return (
    <>
      <Routes>
        {AuthRoutes}
        {HomeRoutes}
        {UserRoutes}
      </Routes>
    </>
  );
}

export default App;
