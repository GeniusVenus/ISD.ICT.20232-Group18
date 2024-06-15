import { useState } from "react";
import { Container, Table, Button, Modal, Form, Card } from "react-bootstrap";
import full_title from "../../utils/full_title";
import centerDiv from "../../styles/centerDiv";
import "./style.scss";
import Helmet from "react-helmet";
import { useNavigate } from "react-router";
import TableItems from "../../components/TableItems";
const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      category: "Book",
      name: "Book 1",
      price: 10.99,
      quantity: 1,
      availableQuantity: 5,
    },
    {
      id: 2,
      category: "DVD",
      name: "DVD 1",
      price: 14.99,
      quantity: 2,
      availableQuantity: 10,
    },
    {
      id: 3,
      category: "CD",
      name: "CD 1",
      price: 9.99,
      quantity: 3,
      availableQuantity: 8,
    },
  ]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // Add item
  const handleAddItem = (itemId: number) => {};
  // Delete Item
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedItem(null);
  };
  const handleOpenDeleteModal = (item) => {
    console.log("Open", item);
    setSelectedItem(item);
    setShowDeleteModal(true);
  };
  const handleDecreaseItem = (itemId: number) => {
    console.log("Decrease,", itemId);
    const num = cartItems.find((item) => item.id === itemId)?.quantity;
    if (num <= 1) {
      handleOpenDeleteModal(cartItems.find((item) => item.id === itemId));
    }
  };
  const handleDeleteItem = () => {
    console.log("Delete item");
  };
  const handleConfirmDelete = () => {
    handleCloseDeleteModal();
    handleDeleteItem();
  };
  // Update item
  const handleUpdateItem = (itemId: number, quantity: number) => {};

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedItem(null);
    setNewQuantity(0);
  };

  const handleOpenUpdateModal = (item) => {
    setSelectedItem(item);
    setNewQuantity(item.quantity);
    setShowUpdateModal(true);
  };

  const handleConfirmUpdate = (selectedItem, newQuantity) => {
    const { id, availableQuantity } = selectedItem;
    if (newQuantity === 0) {
      handleCloseUpdateModal();
      handleOpenDeleteModal(selectedItem);
    } else if (newQuantity <= availableQuantity) {
      handleUpdateItem(id, newQuantity);
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
              min="1"
              max={selectedItem && selectedItem?.availableQuantity}
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
        <Modal.Title>Delete cart item</Modal.Title>
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
  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalPrice = subTotal * 1.1;
  return (
    <>
      <Helmet>
        <title>{full_title("Cart")}</title>
      </Helmet>
      <Container className="cart-page">
        <h1 style={{ marginBottom: "20px" }}>Cart</h1>
        <TableItems items={cartItems} />
        <div
          className="text-right mt-3"
          style={{ ...centerDiv, flexDirection: "column", gap: "8px" }}
        >
          <h5>Subtotal: ${subTotal}</h5>
          <h4 style={{ color: "red" }}>
            Total Price: ${totalPrice.toFixed(2)} {`VAT(10%)`}
          </h4>
          <Button variant="primary" onClick={() => navigate("/place-order")}>
            Place Order
          </Button>
        </div>
        {updateModal}
        {deleteModal}
      </Container>
    </>
  );
};

export default Cart;
