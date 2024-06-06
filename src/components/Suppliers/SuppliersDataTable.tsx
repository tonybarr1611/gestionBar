import { Button, Table } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import SuppliersData from "./SuppliersData";

function SuppliersDataTable() {
  const mockData = [
    {
      id: 1,
      name: "Cervecería de Costa Rica",
      email: "cerveceria@fifco.com",
      phone: 123123123,
    },
    // Add more mock data here
  ];

  const maxID = mockData.reduce(
    (max, data) => (data.id > max ? data.id : max),
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
            {mockData.map((data) => (
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
