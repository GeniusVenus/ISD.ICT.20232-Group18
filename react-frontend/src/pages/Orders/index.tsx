import { Helmet } from "react-helmet";
import full_title from "../../utils/full_title";
import "./style.scss";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const Orders = () => {
  const navigate = useNavigate();
  const orders = [
    { id: 1, date: "2024-05-01", total: 49.99 },
    { id: 2, date: "2024-05-03", total: 74.5 },
    { id: 3, date: "2024-05-05", total: 102.25 },
    { id: 4, date: "2024-05-07", total: 89.99 },
    { id: 5, date: "2024-05-09", total: 56.75 },
    { id: 6, date: "2024-05-11", total: 99.99 },
    { id: 7, date: "2024-05-13", total: 110.5 },
    { id: 8, date: "2024-05-15", total: 67.89 },
    { id: 9, date: "2024-05-17", total: 45.0 },
    { id: 10, date: "2024-05-19", total: 58.25 },
    { id: 11, date: "2024-05-21", total: 75.0 },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const ordersPerPage = 5;

  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * ordersPerPage;
  const currentOrders = orders.slice(offset, offset + ordersPerPage);
  const pageCount = Math.ceil(orders.length / ordersPerPage);

  return (
    <>
      <Helmet>
        <title>{full_title("Orders")}</title>
      </Helmet>
      <Container className="orders-page">
        <h1>Orders History</h1>
        <br />
        {orders.length > 0 ? (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
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
        ) : (
          <p>No order history found</p>
        )}
      </Container>
    </>
  );
};

export default Orders;
