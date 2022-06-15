import React from "react";

import ReactDOM from "react-dom";
import { StrictMode } from "react";

import { version } from "antd";

import App from "./App";

import "antd/dist/antd.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <>
      <h1>antd version: {version}</h1>
      <App />
    </>
  </StrictMode>,
  rootElement
);
