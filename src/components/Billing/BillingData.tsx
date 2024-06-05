import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { CreditCard } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

type Props = {
  id: number;
  ammount: number;
  client: string;
  date: Date;
  status: string;
};

function InventoryData({ id, ammount, client, date, status }: Props) {
  // State for the modify route
  const stateForRoute = { id, ammount, client, date, status };

  const [show, setShow] = useState(false);

  const pending = status === "Pendiente";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <tr>
      <td>{id}</td>
      <td>
        {/* Transforms the number to a currency-like string using colones */}
        {ammount.toLocaleString("es-CR", {
          style: "currency",
          currency: "CRC",
        })}
      </td>
      <td>{client}</td>
      <td>{date.toDateString()}</td>
      <td>{status}</td>
      <td>
        <ButtonGroup aria-label="CRUD buttons">
          {/* Modify button */}

          <>
            <Button
              variant="secondary"
              onClick={handleShow}
              disabled={!pending}
            >
              <CreditCard />
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Pagar factura</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                La factura pertenece a {client} y tiene un monto de {ammount}.{" "}
                <div id="methods">
                  <p>Seleccione el metodo de pago:</p>
                  <div id="methodsRow">
                    <div className="methodsCell">
                      <input type="radio" name="method" id="tarjeta" />
                      <label htmlFor="tarjeta">‎ Tarjeta </label>
                    </div>
                    <div className="methodsCell">
                      <input type="radio" name="method" id="sinpe" />
                      <label htmlFor="cheque"> ‎ Sinpe </label>
                    </div>
                    <div className="methodsCell">
                      <input type="radio" name="method" id="efectivo" />
                      <label htmlFor="efectivo"> ‎ Efectivo </label>
                    </div>
                  </div>
                </div>
                <div id="payConfirmCont">
                  <p>Ingrese el comprobante de pago:</p>
                  <input
                    type="text"
                    name="paymentconfirmation"
                    id="payConfirmEntry"
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Confirmar pago
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </ButtonGroup>
      </td>
    </tr>
  );
}

export default InventoryData;
