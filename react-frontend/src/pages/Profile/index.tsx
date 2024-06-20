import { Helmet } from "react-helmet";
import "./style.scss";
import { Button, Container, Form } from "react-bootstrap";
import React, { useState } from "react";
import full_title from "../../utils/full_title";

const Profile = () => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      {" "}
      <Helmet>
        <title>{full_title("Profile")}</title>
      </Helmet>
      <Container className="profile-page">
        <h1>Profile</h1>
        <Form onSubmit={handleSubmit} className="profile-form">
          <Form.Group controlId="formCustomerName" className="form-input">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPhoneNumber" className="form-input">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formCity" className="form-input">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formAddress" className="form-input">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Profile;
