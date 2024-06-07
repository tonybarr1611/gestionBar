import NavBar from "./components/NavBar";
import InventoryDataTable from "./components/Inventory/InventoryDataTable";
import InventoryModify from "./components/Inventory/InventoryModify";
import InventoryAdd from "./components/Inventory/InventoryAdd";
import BillingDataTable from "./components/Billing/BillingDataTable";
import SuppliersDataTable from "./components/Suppliers/SuppliersDataTable";
import SuppliersModify from "./components/Suppliers/SuppliersModify";
import SuppliersAdd from "./components/Suppliers/SuppliersAdd";
import TablesDashboard from "./components/Tables/TablesDashboard";
import RequestsForm from "./components/Requests/RequestsForm";
import RequestSummary from "./components/Requests/RequestSummary";
import DailyReports from "./components/DailyReports/DailyReports";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* This is temporary due to the lack of a homepage */}
        <Route path="/" Component={InventoryDataTable}></Route>
        <Route path="/inventario" Component={InventoryDataTable} />
        <Route path="/inventario/modificar" Component={InventoryModify}></Route>
        <Route path="/inventario/agregar" Component={InventoryAdd}></Route>
        <Route path="/proveedores" Component={SuppliersDataTable}></Route>
        <Route
          path="/proveedores/modificar"
          Component={SuppliersModify}
        ></Route>
        <Route path="/proveedores/agregar" Component={SuppliersAdd}></Route>
        <Route path="/solicitudes" Component={RequestsForm}></Route>
        <Route path="/solicitudes/resumen" Component={RequestSummary}></Route>
        <Route path="/mesas" Component={TablesDashboard}></Route>
        <Route path="/facturacion" Component={BillingDataTable}></Route>
        <Route path="/reportes" Component={DailyReports}></Route>
      </Routes>
    </Router>
  );
}

export default App;
