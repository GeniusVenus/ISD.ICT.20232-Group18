import { Helmet } from "react-helmet";
import full_title from "../../utils/full_title";
import "./style.scss";
import { useState } from "react";
import { Container, Button, Form, Modal } from "react-bootstrap";
import centerDiv from "../../styles/centerDiv";
import TableItems from "../../components/TableItems";

const PlaceOrder = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      category: "Book",
      name: "Book 1",
      price: 10.99,
      quantity: 1,
      availableQuantity: 5,
    },
    {
      id: 2,
      category: "DVD",
      name: "DVD 1",
      price: 14.99,
      quantity: 2,
      availableQuantity: 10,
    },
    {
      id: 3,
      category: "CD",
      name: "CD 1",
      price: 9.99,
      quantity: 1,
      availableQuantity: 8,
    },
  ]);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const handleCloseInvoice = () => {
    setShowInvoiceModal(false);
  };
  const handleOpenInvoice = () => {
    setShowInvoiceModal(true);
  };
  const handleConfirmOrder = () => {
    handleCloseInvoice();
  };
  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingFee = 5;
  const totalPrice = (subTotal + shippingFee) * 1.1;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleOpenInvoice();
  };
  const costDisplay = (
    <div
      className="text-right mt-3 mb-3"
      style={{ ...centerDiv, flexDirection: "column", gap: "8px" }}
    >
      <h5>Subtotal: ${subTotal}</h5>
      <h5>Shipping fee: ${shippingFee}</h5>
      <h4 style={{ color: "red" }}>
        Total Price: ${totalPrice.toFixed(2)} {`VAT(10%)`}
      </h4>
    </div>
  );
  const InvoiceModal = (
    <Modal
      size="xl"
      style={{ width: "150% !important" }}
      show={showInvoiceModal}
      onHide={handleCloseInvoice}
    >
      <Modal.Header closeButton>
        <Modal.Title>Invoice</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="invoice-form" style={{ marginBottom: "20px" }}>
          <Form.Group controlId="customerName" className="form-input">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              disabled={true}
            />
          </Form.Group>
          <Form.Group controlId="phoneNumber" className="form-input">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={true}
            />
          </Form.Group>
          <Form.Group controlId="city" className="form-input">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={true}
            />
          </Form.Group>
          <Form.Group controlId="address" className="form-input">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={true}
            />
          </Form.Group>
        </Form>
        <TableItems items={cartItems} />
        {costDisplay}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseInvoice}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => handleConfirmOrder()}>
          Confirm order
        </Button>
      </Modal.Footer>
    </Modal>
  );
  return (
    <>
      {" "}
      <Helmet>
        <title>{full_title("Place Order")}</title>
      </Helmet>
      <Container className="place-order-page">
        <h1 style={{ marginBottom: "20px" }}>Place Order</h1>
        <TableItems items={cartItems} />
        {costDisplay}
        <Form onSubmit={handleSubmit} className="place-order-form">
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
            Confirm info
          </Button>
        </Form>
        {InvoiceModal}
      </Container>
    </>
  );
};

export default PlaceOrder;
