import React from "react";

import "./styles/global.scss";

import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router } from "react-router-dom";

import AppProvider from "./hooks";

import Routes from "./routes";

import { ChakraProvider } from "@chakra-ui/react";
import SideBar from "./components/SideBar";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Router>
      <ChakraProvider>
        <AppProvider>
          <SideBar>
            <Routes />
          </SideBar>
          <ToastContainer />
        </AppProvider>
      </ChakraProvider>
    </Router>
  );
};

export default App;
