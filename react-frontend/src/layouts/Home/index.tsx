import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { ToastContainer } from "react-toastify";
import "./style.scss";
import { Outlet } from "react-router-dom";
const HomeLayout = () => {
  return (
    <>
      <ToastContainer autoClose={2000} />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
