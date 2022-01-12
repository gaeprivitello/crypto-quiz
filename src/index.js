import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AccountContext from "./context/AccountContext";
import { Header } from "./components/layouts/Header";

ReactDOM.render(
  <React.StrictMode>
    <AccountContext>
      <Header />
      <App />
    </AccountContext>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
