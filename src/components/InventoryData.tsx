import { Button } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";

type Props = {
  id: number;
  item: string;
  type: string;
  name: string;
  quantity: number;
  price: number;
};

function InventoryData({ id, item, type, name, quantity, price }: Props) {
  return (
    <tr>
      <td>{id}</td>
      <td>{item}</td>
      <td>{type}</td>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{price}</td>
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
