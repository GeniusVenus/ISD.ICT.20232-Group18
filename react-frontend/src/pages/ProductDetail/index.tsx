import { Helmet } from "react-helmet";
import full_title from "../../utils/full_title";
import "./style.scss";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
// const product = {
//   id: 1,
//   name: "Harry Porter",
//   description: "Product description goes here.",
//   category: "Book",
//   author: "Me",
//   cover_type: "WTF",
//   publisher: "me",
//   publication_date: "2024-06-11",
//   number_of_page: 200,
//   language: "English",
//   genre: "Legend",
//   price: 49.99,
// };
const product = {
  id: 1,
  name: "Real G",
  description: "Product description goes here.",
  category: "CD",
  price: 49.99,
  albums: "Legend never dies",
  artist: "WOW",
  record_label: "What",
  track_list: "None",
  release_date: "2024-06-11",
  genre: "Legend",
};
// const product = {
//   id: 1,
//   name: "Wewewewewew",
//   description: "Product description goes here.",
//   category: "DVD",
//   disc_type: "Music",
//   director: "Who the hell",
//   runtime: "5 min",
//   language: "Chinese",
//   genre: "Legend",
//   studio: "We woo",
//   release_date: "2024-06-11",
//   price: 49.99,
// };

const ProductDetail = () => {
  const handleAddItem = () => {
    toast.success(`Add ${product.name} to cart successfully`);
  };
  const BookInfo = (
    <>
      <Card.Text>Author: {product?.author}</Card.Text>
      <Card.Text>Cover type: {product?.cover_type}</Card.Text>
      <Card.Text>Publisher: {product?.publisher}</Card.Text>
      <Card.Text>Publication date: {product?.publication_date}</Card.Text>
      <Card.Text>Number of page: {product?.number_of_page}</Card.Text>
      <Card.Text>Language: {product?.language}</Card.Text>
      <Card.Text>Genre: {product?.genre}</Card.Text>
    </>
  );
  const CDInfo = (
    <>
      <Card.Text>Albums: {product?.albums}</Card.Text>
      <Card.Text>Artist: {product?.artist}</Card.Text>
      <Card.Text>Record label: {product?.record_label}</Card.Text>
      <Card.Text>Track list: {product?.track_list}</Card.Text>
      <Card.Text>Genre: {product?.genre}</Card.Text>
      <Card.Text>Release date: {product?.release_date}</Card.Text>
    </>
  );
  const DVDInfo = (
    <>
      <Card.Text>Disc type: {product?.disc_type}</Card.Text>
      <Card.Text>Director: {product?.director}</Card.Text>
      <Card.Text>Studio: {product?.studio}</Card.Text>
      <Card.Text>Release date: {product?.release_date}</Card.Text>
      <Card.Text>Runtime: {product?.runtime}</Card.Text>
      <Card.Text>Language: {product?.language}</Card.Text>
      <Card.Text>Genre: {product?.genre}</Card.Text>
    </>
  );
  return (
    <>
      <Helmet>
        <title>{full_title("Product")}</title>
      </Helmet>
      <Container className="product-detail-page">
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img
                style={{ height: "300px", objectFit: "cover" }}
                src={
                  product.category === "CD"
                    ? "/cd.jpg"
                    : product.category === "Book"
                    ? "/book.jpg"
                    : "/dvd.jpg"
                }
              />
            </Card>
          </Col>
          <Col md={8}>
            <Card>
              <Card.Body>
                <Card.Title style={{ marginBottom: "20px" }}>
                  {product.name}
                </Card.Title>
                <Card.Text>Description: {product.description}</Card.Text>
                <Card.Text>Category: {product.category}</Card.Text>
                {product.category === "CD"
                  ? CDInfo
                  : product.category === "Book"
                  ? BookInfo
                  : DVDInfo}
                <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
                <Button variant="primary" onClick={handleAddItem}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetail;
