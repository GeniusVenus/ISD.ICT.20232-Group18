import { useMemo, useState } from "react";
import { Container, Table, Button, Modal, Form, Card } from "react-bootstrap";
import full_title from "../../utils/full_title";
import centerDiv from "../../styles/centerDiv";
import "./style.scss";
import Helmet from "react-helmet";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../../components/LoadingSpinner";
import useCart from "../../service/api/cart/useCart";
import useAddProductToCart from "../../service/api/cart/useAddProductToCart";
import useDeleteProductFromCart from "../../service/api/cart/useDeleteProductFromCart";
import useUpdateCart from "../../service/api/cart/useUpdateCart";
import { useSelector } from "react-redux";
import { selectCurrentSessionId } from "../../service/redux/auth/authSlice";
const Cart = () => {
  const navigate = useNavigate();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { data: cartItems, isLoading, isError } = useCart();
  const { mutate: addProductToCart } = useAddProductToCart();
  const { mutate: deleteProductFromCart } = useDeleteProductFromCart();
  const { mutate: updateCart } = useUpdateCart();
  const session_id = useSelector(selectCurrentSessionId);
  console.log(cartItems);
  const handleAddItem = (item: any) => {
    if (item?.quantity < item?.product?.quantity) {
      addProductToCart({
        product_id: item?.product?.id,
        session_id: session_id,
      });
    }
  };

  const handleDecreaseItem = (item: any) => {
    if (item?.quantity == 1) {
      handleOpenDeleteModal(item);
      return;
    }
    updateCart({
      session_id: session_id,
      product_id: item?.product?.id,
      quantity: item?.quantity - 1,
    });
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  const handleOpenDeleteModal = (item: any) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteProductFromCart({
      product_id: selectedItem?.product?.id,
      session_id: session_id,
    });
    handleCloseDeleteModal();
  };

  const handleUpdateItem = (itemId: any, quantity: any) => {
    updateCart({
      session_id: session_id,
      product_id: itemId,
      quantity: quantity ? quantity : 0,
    });
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedItem(null);
    setNewQuantity(0);
  };

  const handleOpenUpdateModal = (item: any) => {
    setSelectedItem(item);
    setNewQuantity(item.quantity);
    setShowUpdateModal(true);
  };

  const handleConfirmUpdate = (selectedItem: any, newQuantity: any) => {
    if (newQuantity === 0) {
      handleCloseUpdateModal();
      handleOpenDeleteModal(selectedItem);
    } else if (newQuantity <= selectedItem?.product?.quantity) {
      handleUpdateItem(selectedItem?.product?.id, newQuantity);
      handleCloseUpdateModal();
    } else {
      alert("Quantity exceeds available quantity.");
    }
  };

  const updateModal = (
    <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
      <Modal.Header closeButton>
        <Modal.Title>Update Quantity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              min="0"
              max={selectedItem && selectedItem?.product?.quantity}
              value={newQuantity}
              onChange={(e) => setNewQuantity(parseInt(e.target.value, 10))}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseUpdateModal}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => handleConfirmUpdate(selectedItem, newQuantity)}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const deleteModal = (
    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete cart item {selectedItem?.id}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseDeleteModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => handleConfirmDelete()}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const subTotal = useMemo(
    () =>
      (cartItems ? cartItems : []).reduce(
        (total: any, item: any) => total + item.product.price * item.quantity,
        0
      ),
    [cartItems, isLoading]
  );

  return (
    <>
      <Helmet>
        <title>{full_title("Cart")}</title>
      </Helmet>
      <Container className="cart-page">
        <h1 style={{ marginBottom: "20px" }}>Cart</h1>
        {isError ? (
          "Something wrong happened"
        ) : isLoading ? (
          <div className="loading-section">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>
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
                {(cartItems ? cartItems : []).map((item: any) => (
                  <tr key={item.id}>
                    <td>
                      <div style={centerDiv}>{item?.id}</div>
                    </td>
                    <td>
                      <div style={centerDiv}>
                        <Card.Img
                          width={40}
                          style={{
                            width: "80px",
                            height: "80px",
                            cursor: "pointer",
                            objectFit: "cover",
                          }}
                          src={
                            item.product.category.name === "cd"
                              ? "/cd.jpg"
                              : item.product.category.name === "book"
                              ? "/book.jpg"
                              : "/dvd.jpg"
                          }
                          onClick={() =>
                            navigate(`/product/${item.product.id}`)
                          }
                        />
                      </div>
                    </td>
                    <td>{item.product.name}</td>
                    <td>
                      <div style={centerDiv}>
                        ${item.product.price.toFixed(2)}
                      </div>
                    </td>
                    <td>
                      <div style={centerDiv}>
                        <Button
                          size="sm"
                          className="button-minus"
                          style={{ background: "red", border: "none" }}
                          onClick={() => handleDecreaseItem(item)}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </Button>
                        <span
                          style={{
                            marginLeft: "12px",
                            marginRight: "12px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleOpenUpdateModal(item)}
                        >
                          {item.quantity}
                        </span>
                        <Button
                          size="sm"
                          className="button-plus"
                          style={{ background: "green", border: "none" }}
                          onClick={() => handleAddItem(item)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                      </div>
                    </td>
                    <td>
                      <div style={centerDiv}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div
              className="text-right mt-3"
              style={{ ...centerDiv, flexDirection: "column", gap: "8px" }}
            >
              <h4>Subtotal: ${subTotal.toFixed(2)}</h4>
              <Button
                variant="primary"
                onClick={() => navigate("/place-order")}
              >
                Place Order
              </Button>
            </div>
            {updateModal}
            {deleteModal}
          </>
        )}
      </Container>
    </>
  );
};

export default Cart;
