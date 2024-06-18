import { Helmet } from "react-helmet";
import full_title from "../../utils/full_title";
import "./style.scss";
import { useMemo, useState } from "react";
import { Container, Button, Form, Modal, Card, Table } from "react-bootstrap";
import centerDiv from "../../styles/centerDiv";
import useCart from "../../service/api/cart/useCart";
import LoadingSpinner from "../../components/LoadingSpinner";
import usePlaceOrder from "../../service/api/order/usePlaceOrder";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../service/redux/auth/authSlice";

const PlaceOrder = () => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const { data: cartItems, isLoading, isError } = useCart();
  const { mutate: placeOrder } = usePlaceOrder();
  const user_id = useSelector(selectCurrentUserId);
  const subTotal = useMemo(
    () =>
      (cartItems ? cartItems : []).reduce(
        (total: any, item: any) => total + item.product.price * item.quantity,
        0
      ),
    [cartItems, isLoading]
  );
  console.log(cartItems);
  const shippingFee = 5;
  const totalPrice = useMemo(() => (subTotal + shippingFee) * 1.1, [subTotal]);
  const handlePlaceOrder = () => {
    let items: any[] = [];
    cartItems.forEach((item: any) => {
      items.push({
        product: {
          id: item?.product?.id,
        },
        quantity: item?.quantity,
      });
    });
    const values = {
      user: {
        id: user_id,
      },
      total: totalPrice,
      payment: {
        amount: totalPrice,
        provider: "VISA",
        status: "pending",
      },
      orderItems: items,
      customerName: customerName,
      phoneNumber: phoneNumber,
      city: city,
      address: address,
    };
    console.log(values);
    placeOrder(values);
  };
  const handleCloseInvoice = () => {
    setShowInvoiceModal(false);
  };
  const handleOpenInvoice = () => {
    setShowInvoiceModal(true);
  };
  const handleConfirmOrder = () => {
    handlePlaceOrder();
    handleCloseInvoice();
  };
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
  const table = isError ? (
    "Something wrong happened"
  ) : isLoading ? (
    <div className="loading-section">
      <LoadingSpinner />
    </div>
  ) : (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>
            <div style={centerDiv}>#</div>
          </th>
          <th>
            <div style={centerDiv}>Image</div>
          </th>
          <th>
            <div style={centerDiv}>Name</div>
          </th>
          <th>
            <div style={centerDiv}>Price</div>
          </th>
          <th>
            <div style={centerDiv}>Quantity</div>
          </th>
          <th>
            <div style={centerDiv}>Total</div>
          </th>
        </tr>
      </thead>
      <tbody>
        {(cartItems ? cartItems : []).map((item: any) => (
          <tr key={item.id}>
            <td>
              <div style={centerDiv}>{item?.id}</div>
            </td>
            <td>
              <div style={centerDiv}>
                <Card.Img
                  width={40}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                  src={
                    item.product.category.name === "cd"
                      ? "/cd.jpg"
                      : item.product.category.name === "book"
                      ? "/book.jpg"
                      : "/dvd.jpg"
                  }
                />
              </div>
            </td>
            <td>{item.product.name}</td>
            <td>
              <div style={centerDiv}>${item.product.price.toFixed(2)}</div>
            </td>
            <td>
              <div style={centerDiv}>
                <span>{item.quantity}</span>
              </div>
            </td>
            <td>
              <div style={centerDiv}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
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
        {table}
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
        {table}
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
