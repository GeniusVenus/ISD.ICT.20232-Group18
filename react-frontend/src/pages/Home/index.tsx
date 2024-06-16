import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Helmet from "react-helmet";
import full_title from "../../utils/full_title";
import ReactPaginate from "react-paginate";
import "./style.scss";
import LoadingSpinner from "../../components/LoadingSpinner";
import useAllProducts from "../../service/api/product/useAllProducts";
const categories = ["All", "Book", "DVD", "CD"];
// const products = [
//   { id: 1, name: "The Rings", price: 10, category: "Book" },
//   { id: 2, name: "Yes sir", price: 20, category: "DVD" },
//   { id: 3, name: "Move theater", price: 30, category: "CD" },
//   { id: 4, name: "Harry Porter", price: 30, category: "Book" },
//   { id: 5, name: "Product 5", price: 40, category: "CD" },
//   { id: 6, name: "Product 6", price: 50, category: "DVD" },
//   { id: 7, name: "Product 7", price: 60, category: "Book" },
//   { id: 8, name: "Product 8", price: 70, category: "CD" },
//   { id: 9, name: "Product 9", price: 80, category: "DVD" },
//   { id: 10, name: "Product 10", price: 90, category: "Book" },
//   { id: 11, name: "Product 11", price: 100, category: "CD" },
//   { id: 12, name: "Product 12", price: 110, category: "DVD" },
// ];

const Home = () => {
  const navigate = useNavigate();
  const [filterCategory, setFilterCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { data: products, isLoading, isError } = useAllProducts();
  const itemsPerPage = 12; // Number of items per page
  const offset = currentPage * itemsPerPage;

  const filteredProducts = (products ? products : []).filter(
    (product: any) =>
      product.category.includes(
        filterCategory === "All" ? "" : filterCategory
      ) && product.name.toLowerCase().includes(search.toLowerCase())
  );

  const currentPageItems = filteredProducts.slice(
    offset,
    offset + itemsPerPage
  );
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAddItem = (item: any) => {
    console.log("Add item", item);
    toast.success(`Added ${item.name} to cart successfully`);
  };

  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected);
  };

  return (
    <>
      <Helmet>
        <title>{full_title("Home")}</title>
      </Helmet>
      <Container className="home-page">
        <Row className="filter mb-2">
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
        {isLoading ? (
          <div className="loading-section">
            {" "}
            <LoadingSpinner />{" "}
          </div>
        ) : (
          <>
            <Row>
              {currentPageItems.map((product: any) => (
                <Col key={product.id} sm={6} md={4} lg={3}>
                  <Card className="mb-4 card-item">
                    <Card.Img
                      src={
                        product.category === "CD"
                          ? "/cd.jpg"
                          : product.category === "Book"
                          ? "/book.jpg"
                          : "/dvd.jpg"
                      }
                      className="product-image"
                      onClick={() => navigate(`/product/${product.id}`)}
                    />
                    <Card.Body>
                      <Card.Title className="mt-2 mb-2 card-title">
                        {product.name}
                      </Card.Title>
                      <Card.Text className="text-muted mb-1">
                        Category: {product.category}
                      </Card.Text>
                      <Card.Text className="text-muted mb-1">
                        Price: ${product.price}
                      </Card.Text>
                      <div
                        className="add-to-cart-container"
                        onClick={() => handleAddItem(product)}
                      >
                        <div className="add-to-cart-button">
                          <FontAwesomeIcon
                            icon={faCartShopping}
                            color="white"
                          />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <Row>
              <Col>
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
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};
export default Home;
