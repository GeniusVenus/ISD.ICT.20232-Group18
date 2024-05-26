import { Helmet } from "react-helmet";
import full_title from "../../utils/full_title";
import "./style.scss";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router";

const Orders = () => {
  const navigate = useNavigate();
  const orders = [
    { id: 1, date: "2024-05-01", total: 49.99 },
    { id: 2, date: "2024-05-03", total: 74.5 },
    { id: 3, date: "2024-05-05", total: 102.25 },
  ];
  return (
    <>
      {" "}
      <Helmet>
        <title>{full_title("Orders")}</title>
      </Helmet>
      <Container className="orders-page">
        <h1>Orders History </h1>
        <br />
        {orders.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/user/orders/${order.id}`)}
                >
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>${order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No order history found </p>
        )}
      </Container>
    </>
  );
};

export default Orders;
