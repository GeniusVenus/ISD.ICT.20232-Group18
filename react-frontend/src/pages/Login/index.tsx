import { Helmet } from "react-helmet";
import full_title from "../../utils/full_title";
import "./style.scss";
import { Button, Container, Form } from "react-bootstrap";
import AIMS from "../../assets/icons/AIMS";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <Helmet>
        <title>{full_title("Login")}</title>
      </Helmet>
      <Container className="login-page">
        {AIMS}
        <Form onSubmit={handleSubmit} className="login-form">
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
          <Button variant="primary" type="submit">
            Login
          </Button>
          <p className="text-right mb-0">
            Don't have any account? <Link to="/auth/register">Sign up</Link>
          </p>
        </Form>
      </Container>
    </>
  );
};

export default Login;
