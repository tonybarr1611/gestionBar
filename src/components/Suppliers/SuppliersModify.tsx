import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SuppliersModify() {
  const location = useLocation();
  const { id, name, email, phone } = location.state;
  return (
    <div id="inventoryForm" className="fullscreen">
      <h1 id="manipulateProductHeader">Modificar proveedor</h1>
      <div id="formContainer">
        <Form className="bg-body-tertiary" data-bs-theme="dark">
          <Form.Label>
            <h2>ID:</h2>
          </Form.Label>
          <Form.Control type="text" value={id} readOnly />
          <Form.Label>
            <h2>Nombre:</h2>
          </Form.Label>
          <Form.Control type="text" placeholder={name} />
          <Form.Label>
            <h2>Correo electrónico:</h2>
          </Form.Label>
          <Form.Control type="text" placeholder={email} />
          <Form.Label>
            <h2>Teléfono:</h2>
          </Form.Label>
          <Form.Control type="text" placeholder={phone} />
          <Button
            className="formSubmitButton"
            variant="secondary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SuppliersModify;
