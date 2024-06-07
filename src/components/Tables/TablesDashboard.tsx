import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { PlusCircle, DashCircle } from "react-bootstrap-icons";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import TableDetail from "./TableDetail";
import Table from "./assets/table.png";
import axios from "axios";
import "./TablesStyle.css";

const colorChoser = (status: any) => {
  return status === "1" ? "rgb(238, 78, 78)" : "rgb(121, 147, 81)";
};

const TableItem = ({ table, index, onClick }: any) => (
  <div className="gridItem square container">
    <img
      className="centerImage image"
      src={Table}
      alt=""
      onClick={onClick}
      style={{ backgroundColor: colorChoser(table.status) }}
    />
    <div className="centerText">Mesa {index + 1}</div>
  </div>
);

function ErrorToastExample() {
  const [showMsg, setShow] = useState(true);
  const changeShow = (newStatus: boolean) => setShow(newStatus);
  return (
    <div className="relative">
      <ToastContainer>
        <Toast
          bg="danger"
          autohide={true}
          show={showMsg}
          onClose={() => changeShow(false)}
        >
          <Toast.Header>
            <h4>
              <b>Error</b>
            </h4>
          </Toast.Header>
          <Toast.Body>No se puede eliminar una mesa ocupada.</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

function TablesDashboard() {
  const [tableInfo, setTableInfo] = useState([
    {
      id: 1,
      status: "0",
      productos: [],
    },
  ]);
  const [selectedTableIndex, setSelectedTableIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/get/mesa");
        const data = await response.json();
        const mappedData = data.map((mesa: any) => ({
          _id: mesa._id,
          id: mesa.idMesa,
          status: mesa.status,
          productos: [],
        }));
        for (let i = 0; i < data.length; i++) {
          const productos = await fetch(
            `http://localhost:8000/api/get/mesaD/${data[i].idMesa}`
          );
          const productosData = await productos.json();
          const mappedProductos = productosData.map((producto: any) => [
            producto.idProducto,
            producto.cantidad,
          ]);
          mappedData[i].productos = mappedProductos;
        }
        setTableInfo(mappedData); // Handling JSON response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchItems();
  }, []);

  // Toggles the status of a table in the database
  const toggleStatus = async (mesaID: number) => {
    try {
      await axios.put(`http://localhost:8000/api/update/mesa/${mesaID}`);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleTableClick = (index: number) => {
    const newTableInfo = [...tableInfo];
    if (newTableInfo[index].status === "0") {
      newTableInfo[index].status = "1";
      toggleStatus(newTableInfo[index].id);
    }
    setTableInfo(newTableInfo);

    if (newTableInfo[index].status === "1") {
      setSelectedTableIndex(index);
    }
    if (selectedTableIndex === index) {
      // TODO - Update database
      setSelectedTableIndex(null);
    }
  };

  const generateNTables = (tables: any) =>
    tables.map((table: any, index: number) => (
      <TableItem
        key={index}
        table={table}
        index={index}
        onClick={() => handleTableClick(index)}
      />
    ));

  const addTableDB = async (newMesaID: number) => {
    try {
      const data = {
        idMesa: newMesaID,
      };
      await axios.post("http://localhost:8000/api/create/mesa", data);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const removeTableDB = async (oldMesaID: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete/mesa/${oldMesaID}`);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const addTable = () => {
    addTableDB(tableInfo.length + 1);
    const newTable = {
      id: tableInfo.length + 1,
      status: "0",
      productos: [],
    };
    setTableInfo([...tableInfo, newTable]);
  };

  const removeTable = () => {
    removeTableDB(tableInfo.length);
    // Check if table is available, if not, don't remove

    if (tableInfo.length > 0) {
      if (tableInfo[tableInfo.length - 1].status === "0") {
        const newTableInfo = tableInfo.slice(0, -1);
        setTableInfo(newTableInfo);
        if (
          selectedTableIndex !== null &&
          selectedTableIndex >= newTableInfo.length
        ) {
          setSelectedTableIndex(null);
        }
      } else {
        // Show toast
        ReactDOM.render(
          <ErrorToastExample />,
          document.getElementById("errorContainer")
        );
      }
    }
  };

  const handleTableDetailClose = () => {
    setSelectedTableIndex(null);
  };

  const handleTableFinishDB = async (mesaID: number) => {
    try {
      await axios.post(`http://localhost:8000/api/transMesaRecibo/${mesaID}`, {
        fecha: new Date(),
        estado: "Pendiente",
        comprador: "Anónimo",
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleTableFinish = () => {
    handleTableFinishDB(tableInfo[selectedTableIndex || 0].id);
    toggleStatus(tableInfo[selectedTableIndex || 0].id);
    const newTableInfo = [...tableInfo];
    newTableInfo[selectedTableIndex || 0].status = "0";
    newTableInfo[selectedTableIndex || 0].productos = [];
    setTableInfo(newTableInfo);
    setSelectedTableIndex(null);
  };

  return (
    <div className="gridContainer">
      <div className="gridItem twoColumnsItem borderedItem">
        <h1 id="tablesHeader">Mesas</h1>
        <div className="gridContainer">{generateNTables(tableInfo)}</div>
        <div className="buttonContainer" id="buttonsMesas">
          <button className="transparentBtn" onClick={addTable}>
            <PlusCircle size={20} />
          </button>
          Mesas
          <button className="transparentBtn" onClick={removeTable}>
            <DashCircle size={20} />
          </button>
          <div id="errorContainer"></div>
        </div>
      </div>
      <div className="gridItem borderedItem" id="tableDetail">
        {selectedTableIndex !== null && (
          <TableDetail
            open={true}
            tableIndex={selectedTableIndex}
            tableInfo={tableInfo}
          />
        )}
        {selectedTableIndex !== null && (
          <div className="buttonContainer">
            <button className="btnContrast" onClick={() => handleTableFinish()}>
              Cerrar cuenta
            </button>
            <button
              className="btnContrast"
              onClick={() => handleTableDetailClose()}
            >
              Salir de mesa
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TablesDashboard;
