import { Navigate, useSearchParams } from "react-router-dom";
import { Container, Card, ListGroup } from "react-bootstrap";
import Helmet from "react-helmet";
import "./style.scss"; // Make sure to include necessary styles
import centerDiv from "../../styles/centerDiv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import usePayOrder from "../../service/api/order/usePayOrder";
import useOrderDetail from "../../service/api/order/useOrderDetail";
const formatCurrency = (amount: any) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount / 100);
};
const formatDateTime = (dateTimeString: string) => {
  const year = dateTimeString.substring(0, 4);
  const month = dateTimeString.substring(4, 6);
  const day = dateTimeString.substring(6, 8);
  const hour = dateTimeString.substring(8, 10);
  const minute = dateTimeString.substring(10, 12);
  const second = dateTimeString.substring(12, 14);
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
const Notification = () => {
  const [searchParams] = useSearchParams();
  const { mutate: payOrder } = usePayOrder();
  const paramsObject = {};
  searchParams.forEach((value, key) => {
    paramsObject[key] = value;
  });
  const isSuccess = paramsObject?.vnp_TransactionNo !== "0";
  if (
    paramsObject?.vnp_TransactionNo === null ||
    paramsObject?.vnp_TransactionNo === undefined
  )
    return <Navigate to="/" />;
  const {
    data: order,
    isLoading,
    isError,
  } = useOrderDetail(paramsObject?.vnp_OrderInfo);
  console.log(order);
  useEffect(() => {
    if (
      !isLoading &&
      !isError &&
      order &&
      paramsObject?.vnp_OrderInfo &&
      paramsObject?.vnp_TransactionNo
    ) {
      if (
        order?.payment?.status === "pending" &&
        paramsObject?.vnp_TransactionNo !== "0"
      ) {
        payOrder(paramsObject?.vnp_OrderInfo);
      }
    }
  }, [
    isLoading,
    isError,
    order,
    paramsObject?.vnp_OrderInfo,
    paramsObject?.vnp_TransactionNo,
  ]);
  return (
    <>
      <Helmet>
        <title>Payment Notification</title>
      </Helmet>
      <Container className="notification-page" style={{ padding: "30px 0" }}>
        <div style={{ ...centerDiv, flexDirection: "column", gap: "8px" }}>
          {isSuccess ? (
            <>
              <FontAwesomeIcon
                icon={faCheckCircle}
                size="2x"
                style={{ color: "green" }}
              />
              <span
                style={{ color: "green", fontSize: "18px", fontWeight: "600" }}
              >
                {" "}
                Payment Successful
              </span>
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faTimesCircle}
                size="2x"
                style={{ color: "red" }}
              />
              <span
                style={{ color: "red", fontSize: "18px", fontWeight: "600" }}
              >
                {" "}
                Payment Failed{" "}
              </span>
            </>
          )}
        </div>
        <Card className="mt-4">
          <Card.Header>
            <h4>Transaction Details</h4>
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Order:</strong> {paramsObject?.vnp_OrderInfo}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Amount:</strong>{" "}
              {formatCurrency(paramsObject?.vnp_Amount)}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Transaction Date:</strong>{" "}
              {formatDateTime(paramsObject?.vnp_PayDate)}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Bank Code:</strong> {paramsObject?.vnp_BankCode}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Card Type:</strong> {paramsObject?.vnp_CardType}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Transaction Status:</strong>{" "}
              {paramsObject?.vnp_TransactionStatus}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Response Code:</strong> {paramsObject?.vnp_ResponseCode}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Transaction Reference:</strong> {paramsObject?.vnp_TxnRef}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Container>
    </>
  );
};

export default Notification;
