import { Helmet } from "react-helmet";
import "./style.scss";
import full_title from "../../utils/full_title";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import TableItems from "../../components/TableItems";

const OrderDetail = () => {
  const navigate = useNavigate();
  const order = {
    id: "12",
    customer: "John Doe",
    items: [
      { id: 1, name: "Book 1", category: "Book", price: 10.99, quantity: 2 },
      { id: 2, name: "DVD 2", category: "DVD", price: 19.99, quantity: 2 },
      { id: 3, name: "CD 3", category: "CD", price: 7.5, quantity: 2 },
    ],
  };
  const subTotal = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingFee = 5;
  const totalPrice = (subTotal + shippingFee) * 1.1;
  return (
    <>
      {" "}
      <Helmet>
        <title>{full_title("Order")}</title>
      </Helmet>
      <Container className="order-detail-page">
        <h1>Order Detail </h1>
        <h5>Order ID: {order.id}</h5>
        <h5>Customer: {order.customer}</h5>
        <TableItems items={order.items} />
        <h5>Subtotal: ${subTotal}</h5>
        <h5>Shipping fee: ${shippingFee}</h5>
        <h4 style={{ color: "red" }}>
          Total: ${totalPrice} {`VAT(10%)`}
        </h4>
      </Container>
    </>
  );
};

export default OrderDetail;
