import { ToastContainer } from "react-toastify";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import "./style.scss";
import { Outlet } from "react-router-dom";
const AuthenticationLayout = () => {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default AuthenticationLayout;
