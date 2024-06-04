import React from "react";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function InventoryAdd() {
  const location = useLocation();
  const id = location.state;
  return (
    <div id="inventoryForm" className="fullscreen">
      <h1 id="manipulateProductHeader">Agregar producto</h1>
      <div id="formContainer">
        <Form className="bg-body-tertiary" data-bs-theme="dark">
          <Form.Label>
            <h2>ID:</h2>
          </Form.Label>
          <Form.Control type="text" value={id} readOnly />
          <Form.Label>
            <h2>Item:</h2>
          </Form.Label>
          <Form.Control type="text" />
          <Form.Label>
            <h2>Type:</h2>
          </Form.Label>
          <Form.Control type="text" />
          <Form.Label>
            <h2>Name:</h2>
          </Form.Label>
          <Form.Control type="text" />
          <Form.Label>
            <h2>Quantity:</h2>
          </Form.Label>
          <Form.Control type="text" />
          <Form.Label>
            <h2>Price:</h2>
          </Form.Label>
          <Form.Control type="text" />
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

export default InventoryAdd;
