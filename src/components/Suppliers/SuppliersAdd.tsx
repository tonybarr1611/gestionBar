import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SuppliersAdd() {
  const location = useLocation();
  const id = location.state;
  return (
    <div id="inventoryForm" className="fullscreen">
      <h1 id="manipulateProductHeader">Agregar Proveedor</h1>
      <div className="formContainer">
        <Form className="bg-body-tertiary" data-bs-theme="dark">
          <Form.Label>
            <h2>ID:</h2>
          </Form.Label>
          <Form.Control type="text" value={id} readOnly />
          <Form.Label>
            <h2>Nombre:</h2>
          </Form.Label>
          <Form.Control type="text" />
          <Form.Label>
            <h2>Correo electrónico:</h2>
          </Form.Label>
          <Form.Control type="email" placeholder="nombre@ejemplo.com" />
          <Form.Label>
            <h2>Teléfono:</h2>
          </Form.Label>
          <Form.Control type="tel" />
          <Button
            className="formSubmitButton"
            variant="secondary"
            type="submit"
            onClick={() => (
              window.location.assign("/proveedores"),
              alert("Proveedor agregado")
            )}
          >
            Agregar
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SuppliersAdd;
