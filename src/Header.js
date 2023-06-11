import React from "react";
import logo from "./picture/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {

  return (
    <header
      style={{
        height: "18vh",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row-reverse",
      }}
    >
      <img
   
        src={logo}
        alt="Logo"
        style={{ width: "10vw", height: "18vh" }}
      />
      <p style={{ fontSize: "3rem", margin: "0", padding: "0" }}>
        Find Your Job
      </p>
    </header>
  );
};

export default Header;
