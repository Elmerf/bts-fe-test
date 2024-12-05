import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";

import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </CssBaseline>
  </StrictMode>
);
