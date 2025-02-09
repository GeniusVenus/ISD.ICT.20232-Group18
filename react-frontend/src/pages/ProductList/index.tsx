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
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet";
import full_title from "../../utils/full_title";
import "./style.scss";
import useAllProducts from "../../service/api/product/useAllProducts";
import LoadingSpinner from "../../components/LoadingSpinner";
import useDeleteProduct from "../../service/api/product/useDeleteProduct";

const categories = ["All", "Book", "DVD", "CD"];
// const products = [
//   { id: 1, name: "The Rings", price: 10, quantity: 10, category: "Book" },
//   { id: 2, name: "Yes sir", price: 20, quantity: 9, category: "DVD" },
//   { id: 3, name: "Move theater", price: 30, quantity: 8, category: "CD" },
//   { id: 4, name: "Harry Porter", price: 30, quantity: 5, category: "Book" },
//   // Add more products as needed
// ];

const ProductList = () => {
  const navigate = useNavigate();
  const [filterCategory, setFilterCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const { data: products, isLoading, isError } = useAllProducts();
  const { mutate: deleteProduct } = useDeleteProduct();
  const itemsPerPage = 12;
  console.log(products);
  const filteredProducts = (products ? products : []).filter(
    (product: any) =>
      (filterCategory === "All" || product.category === filterCategory) &&
      product.name.toLowerCase().includes(search.toLowerCase())
  );

  const offset = currentPage * itemsPerPage;
  const currentPageItems = filteredProducts.slice(
    offset,
    offset + itemsPerPage
  );
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(0); // Reset to the first page when search changes
  };

  const handleCategoryChange = (category: string) => {
    setFilterCategory(category);
    setCurrentPage(0); // Reset to the first page when category changes
  };

  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected);
  };
  const handleDeleteClick = (product_id: string) => {
    setProductToDelete(product_id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    // Add your delete logic here
    console.log("Product deleted:", productToDelete);
    deleteProduct(productToDelete);
    setProductToDelete(null);
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
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
                      onClick={() => handleCategoryChange(category)}
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
        {isError ? (
          "Something wrong happend"
        ) : isLoading ? (
          <div className="loading-section">
            {" "}
            <LoadingSpinner />{" "}
          </div>
        ) : (
          <>
            {" "}
            <Table striped bordered hover responsive>
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
                {currentPageItems.map((product: any) => (
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
                          product.category.name === "cd"
                            ? "/cd.jpg"
                            : product.category.name === "book"
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
                    <td style={{ textAlign: "center" }}>
                      {product.category.name}
                    </td>
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
                        onClick={() => handleDeleteClick(product.id.toString())}
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
          </>
        )}
        <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the product {productToDelete}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default ProductList;
