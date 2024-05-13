import { Button } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";

type Props = {
  id: number;
  name: string;
  lastName: string;
  username: string;
};

function InventoryData({ id, name, lastName, username }: Props) {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{lastName}</td>
      <td>{username}</td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary">
            <Pencil></Pencil>
          </Button>
          <Button variant="secondary">
            <Trash></Trash>
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
}

export default InventoryData;
