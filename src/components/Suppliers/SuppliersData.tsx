import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

type Props = {
  id: number;
  name: string;
  email: string;
  phone: number;
};

function SuppliersData({ id, name, email, phone }: Props) {
  // State for the modify route
  const stateForRoute = { id, name, email, phone };
  // State for the modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <ButtonGroup aria-label="CRUD buttons">
          {/* Modify button */}
          <Button variant="secondary">
            <Link to="/proveedores/modificar" state={stateForRoute}>
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
                <Modal.Title>
                  Desea eliminar el siguiente proveedor:
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h5>ID:</h5>
                <p>{id}</p>
                <h5>Nombre:</h5>
                <p>{name}</p>
                <h5>Correo electrónico:</h5>
                <p>{email}</p>
                <h5>Teléfono:</h5>
                <p>{phone}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cerrar
                </Button>
                <Button variant="primary" onClick={handleClose}>
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

export default SuppliersData;
