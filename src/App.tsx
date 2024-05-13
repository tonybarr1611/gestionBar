import InventoryNavBar from "./components/InventoryNavBar";
import InventoryDataTable from "./components/InventoryDataTable";
import React, { useLayoutEffect } from "react";

function App() {
  return (
    <div>
      <InventoryNavBar></InventoryNavBar>
      <InventoryDataTable></InventoryDataTable>
    </div>
  );
}

export default App;
