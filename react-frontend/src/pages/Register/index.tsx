import { Helmet } from "react-helmet";
import full_title from "../../utils/full_title";
import "./style.scss";
import { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import AIMS from "../../assets/icons/AIMS";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <Helmet>
        <title>{full_title("Register")}</title>
      </Helmet>
      <Container className="register-page">
        {AIMS}
        <Form onSubmit={handleSubmit} className="register-form">
          <Form.Group controlId="formUsername" className="form-input">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="form-input">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="form-input">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="form-input">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
          <p className="text-right mb-0">
            Have an account? <Link to="/auth/login">Sign in</Link>
          </p>
        </Form>
      </Container>
    </>
  );
};

export default Register;
