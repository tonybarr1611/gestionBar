import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

type Props = {
  id: number;
  item: string;
  type: string;
  name: string;
  quantity: number;
  price: number;
};

function InventoryData({ id, item, type, name, quantity, price }: Props) {
  // State for the modify route
  const stateForRoute = { id, item, type, name, quantity, price };
  // State for the modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <tr>
      <td>{id}</td>
      <td>{item}</td>
      <td>{type}</td>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{price}</td>
      <td>
        <ButtonGroup aria-label="CRUD buttons">
          {/* Modify button */}
          <Button variant="secondary">
            <Link to="/inventario/modificar" state={stateForRoute}>
              <Pencil />
            </Link>
          </Button>
          <>
            {/* Delete button */}
            <Button variant="secondary" onClick={handleShow}>
              <Trash />
            </Button>
            {/* Delete modal; it it's hidden most of the time, but ready to be rendered when needed */}
            <Modal show={show} onHide={handleClose}>
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
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </ButtonGroup>
      </td>
    </tr>
  );
}

export default InventoryData;
