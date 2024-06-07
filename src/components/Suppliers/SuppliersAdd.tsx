import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

function SuppliersAdd() {
  const location = useLocation();
  const id = location.state;

  const returnToSuppliers = () => {
    window.location.assign("/proveedores");
  };

  const handleSubmit = async (data: any) => {
    try {
      await axios.post("http://localhost:8000/api/create/proveedor", data);
      returnToSuppliers();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const buildSubmit = () => {
    const name = document.getElementById("name") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const phone = document.getElementById("phone") as HTMLInputElement;

    if (
      name.value === "" ||
      email.value === "" ||
      phone.value.startsWith("-") ||
      phone.value === "0"
    ) {
      alert("Por favor, llene todos los campos");
      return;
    }

    const data = {
      idProveedor: id,
      nombre: name.value || "",
      correo: email.value || "",
      telefono: phone.value || 0,
    };
    console.log(data);
    handleSubmit(data);
  };

  return (
    <div id="inventoryForm" className="fullscreen">
      <h1 id="manipulateProductHeader">Agregar Proveedor</h1>
      <div className="formContainer">
        <Form className="bg-body-tertiary" data-bs-theme="dark">
          <Form.Label>
            <h2>ID:</h2>
          </Form.Label>
          <Form.Control id="id" type="text" value={id} readOnly />
          <Form.Label>
            <h2>Nombre:</h2>
          </Form.Label>
          <Form.Control id="name" type="text" />
          <Form.Label>
            <h2>Correo electrónico:</h2>
          </Form.Label>
          <Form.Control
            id="email"
            type="email"
            placeholder="nombre@ejemplo.com"
          />
          <Form.Label>
            <h2>Teléfono:</h2>
          </Form.Label>
          <Form.Control id="phone" type="tel" />
          <Button
            className="formSubmitButton"
            variant="secondary"
            onClick={buildSubmit}
          >
            Agregar
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SuppliersAdd;
