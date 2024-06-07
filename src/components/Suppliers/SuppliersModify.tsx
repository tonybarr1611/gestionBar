import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

function SuppliersModify() {
  const location = useLocation();
  const { id, name, email, phone } = location.state;

  const returnToSuppliers = () => {
    window.location.assign("/proveedores");
  };

  const handleSubmit = async (data: any) => {
    try {
      await axios.put(`http://localhost:8000/api/update/proveedor/${id}`, data);
      returnToSuppliers();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const buildSubmit = () => {
    var nameValue = (document.getElementById("name") as HTMLInputElement).value;
    var emailValue = (document.getElementById("email") as HTMLInputElement)
      .value;
    var phoneValue = (document.getElementById("phone") as HTMLInputElement)
      .value;

    if (nameValue === "") {
      nameValue = name;
    }
    if (emailValue === "") {
      emailValue = email;
    }
    if (phoneValue === "" || phoneValue.startsWith("-")) {
      phoneValue = phone;
    }

    const data = {
      nombre: nameValue || name,
      correo: emailValue || email,
      telefono: phoneValue || phone,
    };
    console.log(data);
    handleSubmit(data);
  };

  return (
    <div id="inventoryForm" className="fullscreen">
      <h1 id="manipulateProductHeader">Modificar proveedor</h1>
      <div className="formContainer">
        <Form className="bg-body-tertiary" data-bs-theme="dark">
          <Form.Label>
            <h2>ID:</h2>
          </Form.Label>
          <Form.Control id="id" type="text" value={id} readOnly />
          <Form.Label>
            <h2>Nombre:</h2>
          </Form.Label>
          <Form.Control id="name" type="text" placeholder={name} />
          <Form.Label>
            <h2>Correo electrónico:</h2>
          </Form.Label>
          <Form.Control id="email" type="text" placeholder={email} />
          <Form.Label>
            <h2>Teléfono:</h2>
          </Form.Label>
          <Form.Control id="phone" type="text" placeholder={phone} />
          <Button
            className="formSubmitButton"
            variant="secondary"
            onClick={buildSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SuppliersModify;
