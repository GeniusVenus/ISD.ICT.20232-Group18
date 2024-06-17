import { NavDropdown } from "react-bootstrap";
import "./style.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AIMS from "../../assets/icons/AIMS";
import { selectCurrentIsSignedIn } from "../../service/redux/auth/authSlice";
import useSignOut from "../../service/api/authentication/useSignOut";
const NavBar = () => {
  const isSignedIn = useSelector(selectCurrentIsSignedIn);
  const authContent = (
    <>
      <Nav.Link as={Link} to="/auth/login">
        Login
      </Nav.Link>
      <Nav.Link as={Link} to="/auth/register">
        Register
      </Nav.Link>
    </>
  );
  const { mutate: signOut } = useSignOut();
  const handleLogOut = () => {
    signOut();
  };
  const userContent = (
    <NavDropdown title="User" id="basic-nav-dropdown">
      <NavDropdown.Item as={Link} to="/user/profile">
        Profile
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/user/orders">
        Orders
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/manage-product">
        Manage
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={() => handleLogOut()}>
        Log out
      </NavDropdown.Item>
    </NavDropdown>
  );
  return (
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/">{AIMS} AIMS</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
            <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              {isSignedIn &&  
              <Nav.Link as={Link} to="/cart">
                Cart
              </Nav.Link>
              }
              {!isSignedIn ? authContent : userContent}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
