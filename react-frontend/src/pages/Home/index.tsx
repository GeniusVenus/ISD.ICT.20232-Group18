import full_title from "../../utils/full_title";
import Helmet from "react-helmet";
import "./style.scss";
import { useState } from "react";
import { Container, Row, Col, Card, Form, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import centerDiv from "../../styles/centerDiv";
import { useNavigate } from "react-router";
const categories = ["All", "Book", "DVD", "CD"];
type ProductType = {
  id: number;
  name: any;
  price: number;
  category: string;
};
const products = [
  { id: 1, name: "The Rings", price: 10, category: "Book" },
  { id: 2, name: "Yes sir", price: 20, category: "DVD" },
  { id: 3, name: "Move theater", price: 30, category: "CD" },
  { id: 4, name: "Harry Porter", price: 30, category: "Book" },
];
const Home = () => {
  const navigate = useNavigate();
  const [filterCategory, setFilterCategory] = useState("All");
  const [search, setSearch] = useState("");
  const filteredProducts = products.filter(
    (product) =>
      product.category.includes(
        filterCategory === "All" ? "" : filterCategory
      ) && product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleAddItem = (item: ProductType) => {
    console.log("Add item", item);
    toast.success(`Add ${item.name} to cart successfully`);
  };
  return (
    <>
      <Helmet>
        <title>{full_title("Home")}</title>
      </Helmet>
      <Container className="home-page">
        <Row className="filter">
          <Col md={2}>
            <Form.Group controlId="formCategory">
              <Form.Label>Category </Form.Label>
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
          <Col md={6}>
            <Form.Group controlId="formSearch">
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search products"
                value={search}
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product.id} sm={6} md={4} lg={3}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Img
                    src={
                      product.category === "CD"
                        ? "/cd.jpg"
                        : product.category === "Book"
                        ? "/book.jpg"
                        : "/dvd.jpg"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>Price: ${product.price}</Card.Text>
                  <Card.Text>Category: {product.category}</Card.Text>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      zIndex: "999",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        ...centerDiv,
                        backgroundColor: "#0d6efd",
                        padding: "10px",
                        borderRadius: "50%",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        color="white"
                        onClick={() => handleAddItem(product)}
                      />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
