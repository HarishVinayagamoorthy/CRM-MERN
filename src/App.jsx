import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouters from "./routes/AppRouters";
import ContextProvider from "./components/context/ContextProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

function App() {
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <AppRouters />
        </BrowserRouter>
      </ContextProvider>
    </>
  );
}

export default App;
