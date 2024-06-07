import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useEffect } from "react";

function InventoryAdd() {
  const location = useLocation();
  const id = location.state;

  const returnToInventory = () => {
    window.location.assign("/inventario");
  };

  const handleSubmit = async (data: any) => {
    try {
      await axios.post("http://localhost:8000/api/create/product", data);
      returnToInventory();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const buildSubmit = () => {
    const item = document.getElementById("item") as HTMLInputElement;
    const quantity = document.getElementById("quantity") as HTMLInputElement;
    const price = document.getElementById("price") as HTMLInputElement;

    if (
      item.value === "" ||
      quantity.value.startsWith("-") ||
      quantity.value === "0" ||
      price.value.startsWith("-") ||
      price.value === "0"
    ) {
      alert("Por favor, llene todos los campos");
      return;
    }

    const data = {
      idProducto: id,
      nombre: item.value || "",
      precio: price.value || 0,
      cantidadDispo: quantity.value || 0,
    };
    console.log(data);
    handleSubmit(data);
  };

  return (
    <div id="inventoryForm" className="fullscreen">
      <h1 id="manipulateProductHeader">Agregar producto</h1>
      <div className="formContainer">
        <Form className="bg-body-tertiary" data-bs-theme="dark">
          <Form.Label>
            <h2>ID:</h2>
          </Form.Label>
          <Form.Control id="id" type="text" value={id} readOnly />
          <Form.Label>
            <h2>Artículo:</h2>
          </Form.Label>
          <Form.Control id="item" type="text" />
          <Form.Label>
            <h2>Cantidad:</h2>
          </Form.Label>
          <Form.Control id="quantity" type="number" />
          <Form.Label>
            <h2>Precio:</h2>
          </Form.Label>
          <Form.Control id="price" type="number" />
          <div style={{ textAlign: "center", alignItems: "center" }}>
            <Button
              className="formSubmitButton"
              variant="secondary"
              onClick={buildSubmit}
            >
              Agregar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default InventoryAdd;
