import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import InventoryData from "./InventoryData";

function InventoryDataTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/get/product");
        const data = await response.json();
        const mappedData = data.map((product: any) => ({
          _id: product._id,
          id: product.idProducto,
          item: product.nombre,
          quantity: product.cantidadDispo,
          price: product.precio,
        }));
        setData(mappedData); // Handling JSON response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchItems();
  }, []);

  const maxID = data.reduce((max, data) => (data.id > max ? data.id : max), 0);

  return (
    <div className="backgroundGrey datatable">
      <h3>Inventario</h3>
      <div className="datatable">
        <Table striped bordered hover data-bs-theme="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Artículo</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <InventoryData key={data.id} {...data} />
            ))}
          </tbody>
        </Table>
        <div className="backgroundGrey">
          <Link to={"/inventario/agregar"} state={maxID + 1}>
            <Button variant="secondary" id="addProductBtn">
              <PlusCircle size={40} />
              <p>
                <br />
              </p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InventoryDataTable;
