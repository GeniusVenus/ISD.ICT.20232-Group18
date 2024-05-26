import { Link } from "react-router-dom";
import "./style.scss";
const Footer = () => {
  return (
    <>
      <footer className="bg-body-tertiary text-center text-lg-start">
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgb(33,37,41)", color: "white" }}
        >
          © 2024 Copyright :<Link to="/"> AIMS </Link>- Group 18
        </div>
      </footer>
    </>
  );
};

export default Footer;
