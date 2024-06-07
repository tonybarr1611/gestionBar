import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Filter } from "react-bootstrap-icons";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BillingData from "./BillingData"; // Ensure you have this component

function BillingDataTable() {
  const [billingData, setBillingData] = useState<any[]>([]);
  const [BottomDate, setBottomDate] = useState(new Date());
  const [TopDate, setTopDate] = useState(new Date());
  const [Consecutive, setConsecutive] = useState("");
  const [SearchBy, setSearchBy] = useState(-1);

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/get/recibo"
        );
        const fetchedData = response.data.map((recibo: any) => ({
          id: recibo.idRecibo,
          ammount: recibo.monto,
          client: recibo.comprador,
          date: new Date(recibo.fecha),
          status: recibo.estado,
        }));
        setBillingData(fetchedData);
      } catch (error) {
        console.error("Error fetching billing data:", error);
      }
    };

    fetchBillingData();
  }, []);

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
      <h3>Facturación</h3>
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
                onChange={(date: Date) => setBottomDate(date)}
              />
              <p>
                <br />
                Fecha de fin:
              </p>
              <DatePicker
                selected={TopDate}
                onChange={(date: Date) => setTopDate(date)}
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
            {billingData
              .filter(
                (row) =>
                  (SearchBy === 0 &&
                    row.date >= BottomDate &&
                    row.date <= TopDate) ||
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
