import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { ToastContainer } from "react-toastify";
import "./style.scss";
import { Outlet } from "react-router-dom";
const ManageLayout = () => {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default ManageLayout;
