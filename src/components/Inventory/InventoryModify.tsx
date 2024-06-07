import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

function InventoryModify() {
  const location = useLocation();
  const { id, item, quantity, price } = location.state;

  const returnToInventory = () => {
    window.location.assign("/inventario");
  };

  const handleSubmit = async (data: any) => {
    try {
      await axios.put(`http://localhost:8000/api/update/product/${id}`, data);
      returnToInventory();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const buildSubmit = () => {
    var itemValue = (document.getElementById("item") as HTMLInputElement).value;
    var quantityValue = (
      document.getElementById("quantity") as HTMLInputElement
    ).value;
    var priceValue = (document.getElementById("price") as HTMLInputElement)
      .value;

    if (itemValue === "") {
      itemValue = item;
    }
    if (quantityValue === "" || quantityValue.startsWith("-")) {
      quantityValue = quantity;
    }
    if (price === "" || priceValue.startsWith("-")) {
      priceValue = price;
    }

    const data = {
      nombre: itemValue || item,
      precio: priceValue || price,
      cantidadDispo: quantityValue || quantity,
    };
    console.log(data);
    handleSubmit(data);
  };

  return (
    <div id="inventoryForm" className="fullscreen">
      <h1 id="manipulateProductHeader">Modificar producto</h1>
      <div className="formContainer">
        <Form className="bg-body-tertiary" data-bs-theme="dark">
          <Form.Label>
            <h2>ID:</h2>
          </Form.Label>
          <Form.Control id="id" type="text" value={id} readOnly />
          <Form.Label>
            <h2>Artículo:</h2>
          </Form.Label>
          <Form.Control id="item" type="text" placeholder={item} />
          <Form.Label>
            <h2>Cantidad:</h2>
          </Form.Label>
          <Form.Control id="quantity" type="text" placeholder={quantity} />
          <Form.Label>
            <h2>Precio:</h2>
          </Form.Label>
          <Form.Control id="price" type="text" placeholder={price} />
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

export default InventoryModify;
