import InventoryNavBar from "./components/NavBar";
import InventoryDataTable from "./components/Inventory/InventoryDataTable";
import InventoryModify from "./components/Inventory/InventoryModify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <InventoryNavBar />
      <Routes>
        {/* This is temporary due to the lack of a homepage */}
        <Route path="/" Component={InventoryDataTable}></Route>
        <Route path="/inventario" Component={InventoryDataTable} />
        <Route path="/inventario/modificar" Component={InventoryModify}></Route>
        <Route path="/proveedores"></Route>
        <Route path="/cotizaciones"></Route>
        <Route path="/pedidos"></Route>
        <Route path="/mesas"></Route>
        <Route path="/facturacion"></Route>
      </Routes>
    </Router>
  );
}

export default App;
