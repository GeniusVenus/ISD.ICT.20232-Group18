import { Helmet } from "react-helmet";
import "./style.scss";
import full_title from "../../utils/full_title";
import { Card, Container, Table } from "react-bootstrap";
import centerDiv from "../../styles/centerDiv";
import { useNavigate } from "react-router";

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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <div style={centerDiv}> Item ID</div>{" "}
              </th>
              <th>
                <div style={centerDiv}> Image</div>
              </th>
              <th>
                <div style={centerDiv}> Item Name</div>
              </th>
              <th>
                <div style={centerDiv}> Price</div>
              </th>
              <th>
                <div style={centerDiv}> Quantity</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} onClick={() => navigate(`/product/${item.id}`)}>
                <td>
                  <div style={centerDiv}>{item.id}</div>
                </td>
                <td>
                  <div style={centerDiv}>
                    {" "}
                    <Card.Img
                      width={40}
                      style={{
                        width: "100px",
                        height: "auto",
                        cursor: "pointer",
                      }}
                      src={
                        item.category === "CD"
                          ? "/cd.jpg"
                          : item.category === "Book"
                          ? "/book.jpg"
                          : "/dvd.jpg"
                      }
                      onClick={() => navigate(`/product/${item.id}`)}
                    />
                  </div>
                </td>
                <td>{item.name}</td>
                <td>
                  <div style={centerDiv}> ${item.price.toFixed(2)}</div>
                </td>
                <td>
                  {" "}
                  <div style={centerDiv}> {item.quantity} </div>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
