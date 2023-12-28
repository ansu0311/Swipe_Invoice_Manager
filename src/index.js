import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import InvoiceSlicer from "./Redux/InvoiceSlicer/InvoiceSlicer";

const store = configureStore({
  reducer: {
    invoices: InvoiceSlicer,
  },
});

// Added Redux store usng provider function

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
