import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import "./DailyReports.css";

function DailyReports() {
  const [ventasTotales, setVentasTotales] = useState(0);
  const [montoTotal, setMontoTotal] = useState(0);
  const [desgloseVentas, setDesgloseVentas] = useState([]);

  useEffect(() => {
    const fetchVentasTotales = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/get/cantidad"
        );
        setVentasTotales(response.data.total);
      } catch (error) {
        console.error("Error fetching ventas totales:", error);
      }
    };

    const fetchMontoTotal = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/get/total");
        setMontoTotal(response.data.total);
      } catch (error) {
        console.error("Error fetching monto total:", error);
      }
    };

    const fetchDesgloseVentas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/get/resumen"
        );
        setDesgloseVentas(response.data);
      } catch (error) {
        console.error("Error fetching desglose ventas:", error);
      }
    };

    // Fetch all data
    fetchVentasTotales();
    fetchMontoTotal();
    fetchDesgloseVentas();
  }, []);

  return (
    <div className="centered">
      <h5 className="title">Reportes diarios</h5>
      <div className="containerReports">
        <div className="oneCellItem">
          <h5>Ventas totales</h5>
          <p> {ventasTotales} </p>
        </div>
        <div className="oneCellItem">
          <h5>Monto total</h5>
          <p>{montoTotal}</p>
        </div>
        <div className="twoCellItem">
          <h5>Desglose de ventas</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad vendida</th>
                <th>Monto vendido</th>
              </tr>
            </thead>
            <tbody>
              {desgloseVentas.map((venta: any) => (
                <tr key={venta.nombre}>
                  <td>{venta.nombre}</td>
                  <td>{venta.cantidad}</td>
                  <td>{venta.monto}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default DailyReports;
