import React, { useState } from "react";
import {
  Button,
  Container,
  Table,
  Card,
  Form,
  Dropdown,
  Col,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet";
import full_title from "../../utils/full_title";
import "./style.scss";

const categories = ["All", "Book", "DVD", "CD"];
const products = [
  { id: 1, name: "The Rings", price: 10, quantity: 10, category: "Book" },
  { id: 2, name: "Yes sir", price: 20, quantity: 9, category: "DVD" },
  { id: 3, name: "Move theater", price: 30, quantity: 8, category: "CD" },
  { id: 4, name: "Harry Porter", price: 30, quantity: 5, category: "Book" },
  // Add more products as needed
];

const ProductList = () => {
  const navigate = useNavigate();
  const [filterCategory, setFilterCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4; // Number of items per page

  const filteredProducts = products.filter(
    (product) =>
      (filterCategory === "All" || product.category === filterCategory) &&
      product.name.toLowerCase().includes(search.toLowerCase())
  );

  const offset = currentPage * itemsPerPage;
  const currentPageItems = filteredProducts.slice(
    offset,
    offset + itemsPerPage
  );
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(0); // Reset to the first page when search changes
  };

  const handleCategoryChange = (category) => {
    setFilterCategory(category);
    setCurrentPage(0); // Reset to the first page when category changes
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <>
      <Helmet>
        <title>{full_title("Product List")}</title>
      </Helmet>
      <Container className="product-list">
        <Row className="filter mb-4">
          <Col md={6} style={{ display: "flex", gap: "12px" }}>
            <Form.Group controlId="formSearch" style={{ flex: 1 }}>
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search products"
                value={search}
                onChange={handleSearchChange}
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="category-dropdown">
                  {filterCategory}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categories.map((category) => (
                    <Dropdown.Item
                      key={category}
                      active={filterCategory === category}
                      onClick={() => setFilterCategory(category)}
                    >
                      {category}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </Col>
        </Row>
        <Button
          variant="primary"
          className="mb-4"
          onClick={() => navigate("/manage-product/create")}
        >
          Create new product
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>ID</th>
              <th style={{ textAlign: "center" }}>Image</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Price</th>
              <th style={{ textAlign: "center" }}>Quantity</th>
              <th style={{ textAlign: "center" }}>Category</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((product) => (
              <tr key={product.id}>
                <td style={{ textAlign: "center" }}>{product.id}</td>
                <td style={{ textAlign: "center" }}>
                  <Card.Img
                    width={40}
                    style={{
                      width: "80px",
                      height: "80px",
                      cursor: "pointer",
                      objectFit: "cover",
                    }}
                    src={
                      product.category === "CD"
                        ? "/cd.jpg"
                        : product.category === "Book"
                        ? "/book.jpg"
                        : "/dvd.jpg"
                    }
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
                </td>
                <td>{product.name}</td>
                <td style={{ textAlign: "center" }}>
                  ${product.price.toFixed(2)}
                </td>
                <td style={{ textAlign: "center" }}>{product.quantity}</td>
                <td style={{ textAlign: "center" }}>{product.category}</td>
                <td style={{ textAlign: "center" }}>
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                    onClick={() =>
                      navigate(`/manage-product/edit/${product.id}`)
                    }
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => {}}
                  />
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
      </Container>
    </>
  );
};

export default ProductList;
