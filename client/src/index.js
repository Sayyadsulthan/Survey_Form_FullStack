import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./provider/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <App />
    </AuthProvider>
  </React.StrictMode>
);
