import { Button, Table } from "react-bootstrap";
import { Filter } from "react-bootstrap-icons";
import { useState } from "react";
import BillingData from "./BillingData";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function BillingDataTable() {
  const mockData = [
    {
      id: 1,
      ammount: 10000,
      client: "Anonymous",
      date: new Date("2024-01-01"),
      status: "Pendiente",
    },
    {
      id: 2,
      ammount: 20000,
      client: "Anonymous",
      date: new Date("2021-10-02"),
      status: "Cancelado",
    },
    {
      id: 3,
      ammount: 30000,
      client: "Anonymous",
      date: new Date("2021-10-03"),
      status: "Pendiente",
    },
    {
      id: 4,
      ammount: 40000,
      client: "Anonymous",
      date: new Date("2021-10-05"),
      status: "Pendiente",
    },
    {
      id: 5,
      ammount: 50000,
      client: "Anonymous",
      date: new Date("2021-10-07"),
      status: "Cancelado",
    },
    {
      id: 6,
      ammount: 60000,
      client: "Anonymous",
      date: new Date("2021-11-21"),
      status: "Pendiente",
    },
    {
      id: 7,
      ammount: 70000,
      client: "Anonymous",
      date: new Date("2021-09-01"),
      status: "Pendiente",
    },
    // Add more mock data here
  ];

  const [BottomDate, setBottomDate] = useState(new Date());
  const [TopDate, setTopDate] = useState(new Date());
  const [Consecutive, setConsecutive] = useState("");
  const [SearchBy, setSearchBy] = useState(-1);

  function toggleDiv() {
    setSearchBy(-1);
    var x = document.getElementById("filters") || document.createElement("div");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function toggleSearchBy(updatedSearchBy: number) {
    setSearchBy(updatedSearchBy);
    var c =
      document.getElementById("consecutivepicker") ||
      document.createElement("div");
    var d =
      document.getElementById("datepickers") || document.createElement("div");
    if (updatedSearchBy === 0) {
      c.style.display = "none";
      d.style.display = "block";
    } else if (updatedSearchBy === 1) {
      c.style.display = "block";
      d.style.display = "none";
    }
  }

  return (
    <div className="backgroundGrey datatable">
      <h3>Facturacion</h3>
      <Button variant="secondary" onClick={toggleDiv} className="toggleBtn">
        <Filter />
      </Button>
      <div className="pickersContainer" id="filters">
        <div className="pickersRow">
          <div className="datepickersCont">
            <input
              type="radio"
              name="picker"
              id="fechas"
              onChange={() => toggleSearchBy(0)}
            />
            <label htmlFor="fechas">‎ Buscar por fechas:</label>
            <div id="datepickers">
              <p>Fecha de inicio:</p>
              <DatePicker
                selected={BottomDate}
                onChange={(date: Date) => (
                  setBottomDate(date),
                  console.log(date.getDate()),
                  console.log(date.getUTCMonth() + 1),
                  console.log(date.getFullYear()),
                  console.log(date.toJSON())
                )}
              />
              <p>
                <br />
                Fecha de fin:
              </p>
              <DatePicker
                selected={TopDate}
                onChange={(date: Date) => (
                  setTopDate(date),
                  console.log(date.getDate()),
                  console.log(date.getUTCMonth() + 1),
                  console.log(date.getFullYear()),
                  console.log(date.toJSON())
                )}
              />
            </div>
          </div>
          <div className="consecutivePickerCont">
            <input
              type="radio"
              name="picker"
              id="consecutivo"
              onChange={() => toggleSearchBy(1)}
            />
            <label htmlFor="consecutivo">‎ Buscar por consecutivo:</label>
            <div id="consecutivepicker">
              <p>Consecutivo</p>
              <input
                type="text"
                onChange={(e) => setConsecutive(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="datatable">
        <Table striped bordered hover data-bs-theme="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Monto</th>
              <th>Comprador</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mockData
              .filter(
                (row) =>
                  (SearchBy === 0 &&
                    row.date.toJSON() >= BottomDate.toJSON() &&
                    row.date.toJSON() <= TopDate.toJSON()) ||
                  (SearchBy === 1 && row.id.toString() === Consecutive) ||
                  SearchBy === -1
              )
              .map((data) => (
                <BillingData key={data.id} {...data} />
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default BillingDataTable;
