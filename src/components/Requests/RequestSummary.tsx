import React from "react";
import { useLocation } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./RequestsStyle.css";
import Logo from "../../assets/logo.svg";

function RequestSummary() {
  const location = useLocation();
  const { summary } = location.state || {};
  const { type, suppliers, products } = summary || {};

  console.log(type);
  console.log(suppliers);
  console.log(products);

  if (!summary || !summary.suppliers.length || !summary.products.length) {
    window.location.assign("/solicitudes");
    alert("No se encontró la solicitud");
  }

  const sendRequest = async () => {
    try {
      const solicitudDiv = document.getElementById("solicitud");
      const canvas = await html2canvas(solicitudDiv || document.body);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.setFillColor(43, 48, 53);
      pdf.rect(
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight(),
        "F"
      );
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      const pdfBlob = pdf.output("blob");

      // Create form data to send to the backend
      const formData = new FormData();
      formData.append("file", pdfBlob, "solicitud.pdf");
      // open the PDF in a new tab
      window.open(URL.createObjectURL(pdfBlob));

      // // Replace with your backend URL
      // const response = await fetch("/api/send-request", {
      //   method: "POST",
      //   body: formData,
      // });

      // if (response.ok) {
      //   alert("Solicitud enviada con éxito");
      // } else {
      //   alert("Error al enviar la solicitud");
      // }
    } catch (error) {
      console.error("Error generating PDF: ", error);
      alert("Error al generar el PDF");
    }
  };

  return (
    <div id="inventoryForm">
      <div className="formContainer">
        <div id="solicitud">
          <div className="solicitud-header">
            <h5>Resumen de solicitud</h5>
            <img src={Logo} alt="Logo" className="header-image" />
          </div>
          <br /> <br />
          <h5>Tipo de solicitud: {type}</h5>
          <br />
          <h5>Artículos:</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <br />
        <h5>Proveedores a los que se enviará:</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier: any) => (
              <tr key={supplier.id}>
                <td>{supplier.name}</td>
                <td>{supplier.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="BtnContainer">
          <Button
            variant=""
            className="submitBtn"
            id="submitB"
            onClick={sendRequest}
          >
            Enviar solicitud
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RequestSummary;
