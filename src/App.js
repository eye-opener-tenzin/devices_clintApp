import React from "react";
// import { Router, Route } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TableContent } from "./components/TableContent/TableContent";
import AddDevices from "./components/AddDevice/AddDevices";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TableContent />} />
          <Route path="addDevices" element={<AddDevices />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
