import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import SuppliersData from "./SuppliersData";

function SuppliersDataTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/get/proveedor");
        const data = await response.json();
        const mappedData = data.map((supplier: any) => ({
          _id: supplier._id,
          id: supplier.idProveedor,
          name: supplier.nombre,
          email: supplier.correo,
          phone: supplier.telefono,
        }));
        setData(mappedData); // Handling JSON response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchItems();
  }, []);

  const maxID = data.reduce(
    (max: any, data: any) => (data.id > max ? data.id : max),
    0
  );

  return (
    <div className="backgroundGrey datatable">
      <h3>Proveedores</h3>
      <div className="datatable">
        <Table striped bordered hover data-bs-theme="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo electrónico</th>
              <th>Teléfono</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((data: any) => (
              <SuppliersData key={data.id} {...data} />
            ))}
          </tbody>
        </Table>
        <div className="backgroundGrey">
          <Link to={"/proveedores/agregar"} state={maxID + 1}>
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

export default SuppliersDataTable;
