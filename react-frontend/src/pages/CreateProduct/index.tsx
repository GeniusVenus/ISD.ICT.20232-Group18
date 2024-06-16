import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "./style.scss";
import { Helmet } from "react-helmet";
import full_title from "../../utils/full_title";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useCreateProduct from "../../service/api/product/useCreateProduct";
const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    sku: "",
    price: 0,
    categoryName: "",
    quantity: 0,
    language: "",
    genre: "",
    // DVD field
    studio: "",
    director: "",
    discType: "",
    runtime: "",
    // Book fields
    coverType: "",
    numberOfPage: 0,
    publicationDate: "",
    publisher: "",
    author: "",
    // CD fields
    albums: "",
    trackList: "",
    recordLabel: "",
    artist: "",
    releaseDate: "",
  });
  const { mutate: createProduct } = useCreateProduct();
  const [category, setCategory] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
    setProduct({ ...product, categoryName: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(product);
    createProduct(product);
  };
  return (
    <>
      <Helmet>
        <title>{full_title("Create Product")}</title>
      </Helmet>
      <Container className="create-product">
        <Link to="/manage-product">
          {" "}
          <FontAwesomeIcon icon={faChevronLeft} /> Back to product list
        </Link>
        <Form className="create-form mt-3" onSubmit={(e) => handleSubmit(e)}>
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="categoryName"
              value={category}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select Category</option>
              <option value="CD">CD</option>
              <option value="Book">Book</option>
              <option value="Dvd">DVD</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formSku">
            <Form.Label>SKU</Form.Label>
            <Form.Control
              type="text"
              name="sku"
              value={product.sku}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Conditionally render fields based on selected category */}
          {category === "CD" && (
            <>
              <Form.Group controlId="formAlbums">
                <Form.Label>Albums</Form.Label>
                <Form.Control
                  type="text"
                  name="albums"
                  value={product.albums}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formTrackList">
                <Form.Label>Track List</Form.Label>
                <Form.Control
                  type="text"
                  name="trackList"
                  value={product.trackList}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formRecordLabel">
                <Form.Label>Record Label</Form.Label>
                <Form.Control
                  type="text"
                  name="recordLabel"
                  value={product.recordLabel}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formGenre">
                <Form.Label>Genre</Form.Label>
                <Form.Control
                  type="text"
                  name="genre"
                  value={product.genre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formArtist">
                <Form.Label>Artist</Form.Label>
                <Form.Control
                  type="text"
                  name="artist"
                  value={product.artist}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formReleaseDate">
                <Form.Label>Release Date</Form.Label>
                <Form.Control
                  type="date"
                  name="releaseDate"
                  value={product.releaseDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </>
          )}

          {category === "Book" && (
            <>
              <Form.Group controlId="formGenre">
                <Form.Label>Genre</Form.Label>
                <Form.Control
                  type="text"
                  name="genre"
                  value={product.genre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formLanguage">
                <Form.Label>Language</Form.Label>
                <Form.Control
                  type="text"
                  name="language"
                  value={product.language}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formCoverType">
                <Form.Label>Cover Type</Form.Label>
                <Form.Control
                  type="text"
                  name="coverType"
                  value={product.coverType}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formNumberOfPage">
                <Form.Label>Number of Pages</Form.Label>
                <Form.Control
                  type="number"
                  name="numberOfPage"
                  value={product.numberOfPage}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPublicationDate">
                <Form.Label>Publication Date</Form.Label>
                <Form.Control
                  type="date"
                  name="publicationDate"
                  value={product.publicationDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPublisher">
                <Form.Label>Publisher</Form.Label>
                <Form.Control
                  type="text"
                  name="publisher"
                  value={product.publisher}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formAuthor">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  value={product.author}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </>
          )}

          {category === "Dvd" && (
            <>
              <Form.Group controlId="formLanguage">
                <Form.Label>Language</Form.Label>
                <Form.Control
                  type="text"
                  name="language"
                  value={product.language}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formGenre">
                <Form.Label>Genre</Form.Label>
                <Form.Control
                  type="text"
                  name="genre"
                  value={product.genre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formStudio">
                <Form.Label>Studio</Form.Label>
                <Form.Control
                  type="text"
                  name="studio"
                  value={product.studio}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDirector">
                <Form.Label>Director</Form.Label>
                <Form.Control
                  type="text"
                  name="director"
                  value={product.director}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDiscType">
                <Form.Label>Disc Type</Form.Label>
                <Form.Control
                  type="text"
                  name="discType"
                  value={product.discType}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formRuntime">
                <Form.Label>Runtime</Form.Label>
                <Form.Control
                  type="text"
                  name="runtime"
                  value={product.runtime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formReleaseDate">
                <Form.Label>Release Date</Form.Label>
                <Form.Control
                  type="date"
                  name="releaseDate"
                  value={product.releaseDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </>
          )}

          <Button variant="primary" type="submit">
            Add new product
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default CreateProduct;
