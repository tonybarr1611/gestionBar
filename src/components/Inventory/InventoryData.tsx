import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import axios from "axios";

type Props = {
  id: number;
  item: string;
  quantity: number;
  price: number;
};

function InventoryData({ id, item, quantity, price }: Props) {
  // State for the modify route
  const stateForRoute = { id, item, quantity, price };
  // State for the modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function returnToInventory() {
    window.location.assign("/inventario");
  }

  const deleteProduct = async (idToDelete: number) => {
    try {
      console.log("Deleting product with ID:", idToDelete);
      const url =
        `http://localhost:8000/api/delete/product/` + idToDelete.toString();
      await axios.delete(url);
      returnToInventory();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDelete = (id: number) => {
    console.log("Deleting product with ID:", id);
    deleteProduct(id);
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{item}</td>
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
                <h5>ID:</h5>
                <p>{id}</p>
                <h5>Artículo:</h5>
                <p>{item}</p>
                <h5>Cantidad:</h5>
                <p>{quantity}</p>
                <h5>Precio</h5>
                <p>{price}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cerrar
                </Button>
                <Button variant="primary" onClick={() => handleDelete(id)}>
                  Eliminar
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
