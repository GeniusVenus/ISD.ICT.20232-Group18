import { Helmet } from "react-helmet";
import "./style.scss";
import full_title from "../../utils/full_title";
import { Button, Card, Container, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import useOrderDetail from "../../service/api/order/useOrderDetail";
import centerDiv from "../../styles/centerDiv";
import usePayment from "../../service/api/order/usePayment";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useMemo } from "react";

const OrderDetail = () => {
  const { order_id } = useParams();
  const navigate = useNavigate();
  const { data: order, isLoading, isError } = useOrderDetail(order_id);
  const { mutate: Pay } = usePayment();
  console.log(order);
  const subTotal = useMemo(
    () =>
      (order?.order_items ? order?.order_items : []).reduce(
        (total: any, item: any) =>
          total + item?.product?.price * item?.quantity,
        0
      ),
    [isLoading, order]
  );
  const shippingFee = 5;
  const handlePay = (orderInfo: string, amount: string | number | null) => {
    Pay({
      orderInfo: orderInfo,
      amount: amount,
    });
  };
  return (
    <>
      {" "}
      <Helmet>
        <title>{full_title("Order")}</title>
      </Helmet>
      <Container className="order-detail-page">
        {isError ? (
          "Something wrong happened"
        ) : isLoading ? (
          <div className="loading-section">
            {" "}
            <LoadingSpinner />{" "}
          </div>
        ) : (
          <>
            {" "}
            <h5>Order ID: {order?.id}</h5>
            <span>Status: {order?.payment?.status.toUpperCase()}</span>
            <span>Customer: {order?.customerName}</span>
            <span>Phone number: {order?.phoneNumber}</span>
            <span>City: {order?.city}</span>
            <span>Address: {order?.address}</span>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>
                    {" "}
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
                {order?.order_items.map((item: any, index: any) => (
                  <tr key={item.id}>
                    <td>
                      {" "}
                      <div style={centerDiv}>{index + 1}</div>
                    </td>
                    <td>
                      <div style={centerDiv}>
                        {" "}
                        <Card.Img
                          width={40}
                          style={{
                            width: "80px",
                            height: "80px",
                            cursor: "pointer",
                            objectFit: "cover",
                          }}
                          src={
                            item?.product?.category?.name === "cd"
                              ? "/cd.jpg"
                              : item?.product?.category?.name === "book"
                              ? "/book.jpg"
                              : "/dvd.jpg"
                          }
                          onClick={() =>
                            navigate(`/product/${item?.product?.id}`)
                          }
                        />
                      </div>
                    </td>
                    <td>{item?.product?.name}</td>
                    <td>
                      <div style={centerDiv}>
                        ${item?.product?.price.toFixed(2)}
                      </div>
                    </td>
                    <td>
                      <div style={centerDiv}>
                        <span
                          style={{
                            marginLeft: "12px",
                            marginRight: "12px",
                            cursor: "pointer",
                          }}
                        >
                          {item?.quantity}
                        </span>
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div style={centerDiv}>
                        ${(item?.product?.price * item.quantity).toFixed(2)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <h5> Subtotal: ${subTotal}</h5>
            <h5> Shipping fee: ${shippingFee}</h5>
            <h4 style={{ color: "red" }}>
              Total: ${order?.payment?.amount.toFixed(2)} {`VAT(10%)`}
            </h4>
            {order?.payment?.status === "pending" && (
              <Button
                onClick={() =>
                  handlePay(order?.id, order?.payment?.amount * 25000)
                }
              >
                {" "}
                Pay
              </Button>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default OrderDetail;
