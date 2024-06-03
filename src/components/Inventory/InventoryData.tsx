import { Button } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

type Props = {
  id: number;
  item: string;
  type: string;
  name: string;
  quantity: number;
  price: number;
};

function InventoryData({ id, item, type, name, quantity, price }: Props) {
  const stateForRoute = { id, item, type, name, quantity, price };
  return (
    <tr>
      <td>{id}</td>
      <td>{item}</td>
      <td>{type}</td>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{price}</td>
      <td>
        <ButtonGroup aria-label="CRUD buttons">
          <Button variant="secondary">
            <Link to="/inventario/modificar" state={stateForRoute}>
              <Pencil />
            </Link>
          </Button>
          <Button variant="secondary">
            <Trash />
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
}

export default InventoryData;
