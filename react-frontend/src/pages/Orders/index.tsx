import { Helmet } from "react-helmet";
import full_title from "../../utils/full_title";
import "./style.scss";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import ReactPaginate from "react-paginate";
import { useMemo, useState } from "react";
import useOrders from "../../service/api/order/useOrders";
import centerDiv from "../../styles/centerDiv";
import LoadingSpinner from "../../components/LoadingSpinner";
import transformISOToDateString from "../../utils/transformISOToDateString";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faHourglassHalf,
  faCreditCard,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import usePayment from "../../service/api/order/usePayment";
import useDeleteOrder from "../../service/api/order/useDeleteOrder";

const Orders = () => {
  const navigate = useNavigate();
  const { data: orders, isLoading, isError } = useOrders();
  const { mutate: Pay } = usePayment();
  const { mutate: DeleteOrder } = useDeleteOrder();
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  console.log(orders);
  const ordersPerPage = 10;

  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * ordersPerPage;
  const currentOrders = orders?.slice(offset, offset + ordersPerPage);
  const pageCount = useMemo(
    () => Math.ceil(orders?.length / ordersPerPage),
    [isLoading, orders]
  );

  const handlePay = (orderInfo: string, amount: string) => {
    Pay({ orderInfo, amount });
  };

  const handleDeleteOrder = (order_id: string | null) => {
    setOrderToDelete(order_id);
    setShowModal(true);
  };

  const confirmDeleteOrder = () => {
    DeleteOrder(orderToDelete);
    setShowModal(false);
  };

  const handleClose = () => setShowModal(false);

  return (
    <>
      <Helmet>
        <title>{full_title("Orders")}</title>
      </Helmet>
      <Container className="orders-page">
        <h2>Orders History</h2>
        <br />
        {isError ? (
          "Something wrong happened"
        ) : isLoading ? (
          <div className="loading-section">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>
                    <div style={centerDiv}>Order ID</div>
                  </th>
                  <th>
                    <div style={centerDiv}>Date</div>
                  </th>
                  <th>
                    <div style={centerDiv}>Total</div>
                  </th>
                  <th>
                    <div style={centerDiv}>Status</div>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order: any) => (
                  <tr key={order.id}>
                    <td>
                      <div
                        style={{ ...centerDiv, cursor: "pointer" }}
                        onClick={() => navigate(`/user/orders/${order?.id}`)}
                      >
                        {order?.id}
                      </div>
                    </td>
                    <td>
                      <div style={centerDiv}>
                        {transformISOToDateString(order?.createAt)}
                      </div>
                    </td>
                    <td>
                      <div style={centerDiv}>${order?.total.toFixed(2)}</div>
                    </td>
                    <td>
                      <div style={{ ...centerDiv, marginTop: "3px" }}>
                        {order?.payment?.status === "paid" ? (
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            style={{ color: "green" }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faHourglassHalf}
                            style={{ color: "orange" }}
                          />
                        )}
                      </div>
                    </td>
                    <td>
                      {order?.payment?.status === "pending" && (
                        <div
                          style={{
                            ...centerDiv,
                            marginTop: "3px",
                            gap: "12px",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faCreditCard}
                            style={{ cursor: "pointer", color: "blue" }}
                            onClick={() =>
                              handlePay(order?.id, order?.total * 25000)
                            }
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleDeleteOrder(order?.id)}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakLinkClassName={"page-link"}
            />
          </>
        )}
      </Container>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete order {orderToDelete}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteOrder}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Orders;
