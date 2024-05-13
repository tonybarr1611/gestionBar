import Table from "react-bootstrap/Table";
import InventoryData from "./InventoryData";

function InventoryDataTable() {
  return (
    <div>
      <Table striped bordered hover data-bs-theme="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <InventoryData id={1} name="John" lastName="Doe" username="johndoe" />
          <InventoryData id={2} name="Jane" lastName="Doe" username="janedoe" />
        </tbody>
      </Table>
    </div>
  );
}

export default InventoryDataTable;
