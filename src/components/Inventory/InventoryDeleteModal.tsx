import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function InventoryDeleteModal() {
  const location = useLocation();
  const { id, item, type, name, quantity, price } = location.state;
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Desea eliminar el siguiente producto:</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5>ID</h5>
          <p>{id}</p>
          <h5>Item</h5>
          <p>{item}</p>
          <h5>Type</h5>
          <p>{type}</p>
          <h5>Name</h5>
          <p>{name}</p>
          <h5>Quantity</h5>
          <p>{quantity}</p>
          <h5>Price</h5>
          <p>{price}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default InventoryDeleteModal;
