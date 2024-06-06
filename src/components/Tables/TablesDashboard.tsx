import React, { useState } from "react";
import ReactDOM from "react-dom";
import { PlusCircle, DashCircle } from "react-bootstrap-icons";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import TableDetail from "./TableDetail";
import Table from "./assets/table.png";
import "./TablesStyle.css";

const initialTableInfo = [
  {
    id: 1,
    status: "0",
    productos: [],
  },
];

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
  const [tableInfo, setTableInfo] = useState(initialTableInfo);
  const [selectedTableIndex, setSelectedTableIndex] = useState<number | null>(
    null
  );

  const handleTableClick = (index: number) => {
    const newTableInfo = [...tableInfo];
    newTableInfo[index].status = "1";
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

  const addTable = () => {
    // TODO - Update database
    const newTable = {
      id: tableInfo.length + 1,
      status: "0",
      productos: [],
    };
    setTableInfo([...tableInfo, newTable]);
  };

  const removeTable = () => {
    // TODO - Update database
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

  const handleTableFinish = () => {
    // TODO - Update database
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
