import Table from "react-bootstrap/Table";
import InventoryData from "./InventoryData";

function InventoryDataTable() {
  const mockData = [
    {
      id: 1,
      item: "Item 1",
      type: "Type 1",
      name: "Name 1",
      quantity: 10,
      price: 100,
    },
    {
      id: 2,
      item: "Item 2",
      type: "Type 2",
      name: "Name 2",
      quantity: 20,
      price: 200,
    },
    {
      id: 3,
      item: "Item 3",
      type: "Type 3",
      name: "Name 3",
      quantity: 30,
      price: 300,
    },
    // Add more mock data here
  ];

  return (
    <div>
      <Table striped bordered hover data-bs-theme="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Artículo</th>
            <th>Tipo</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((data) => (
            <InventoryData key={data.id} {...data} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default InventoryDataTable;
