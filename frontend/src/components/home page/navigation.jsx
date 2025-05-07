import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = (role) => {
    if (role === "client") navigate("/Register");
    if (role === "barber") navigate("/RegisterB");
    if (role === "assistant") navigate("/RegisterAs");
  };

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            HajjemGo
          </a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#features" className="page-scroll">Features</a></li>
            <li><a href="#about" className="page-scroll">About</a></li>
            <li><a href="#services" className="page-scroll">Services</a></li>
            <li><a href="#portfolio" className="page-scroll">Gallery</a></li>
            <li><a href="#testimonials" className="page-scroll">Testimonials</a></li>
            <li><a href="#team" className="page-scroll">Team</a></li>
            <li><a href="#contact" className="page-scroll">Contact</a></li>

            {/* Login Icon */}
            <li>
              <a href="/login" className="page-scroll">
                <i className="fas fa-sign-in-alt" style={{ fontSize: "20px", color: "#555" }}></i>
              </a>
            </li>

            {/* Sign Up Dropdown */}
            <li
  style={{ position: "relative" }}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  <div
    className="page-scroll"
    style={{ padding: "15px 20px", cursor: "pointer" }}
    onClick={() => setIsHovered(!isHovered)} // toggles dropdown on mobile
  >
    <i className="fas fa-user-plus" style={{ fontSize: "20px", color: "#555" }}></i>
  </div>
  {isHovered && (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)", // ensures it appears right below the icon
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        zIndex: 9999,
        minWidth: "120px",
        display: "flex",
        flexDirection: "column",
        padding: "5px 0",
      }}
    >
      <button
        onClick={() => handleClick("client")}
        style={dropdownBtnStyle}
      >
        Client
      </button>
      <button
        onClick={() => handleClick("barber")}
        style={dropdownBtnStyle}
      >
        Barber
      </button>
      <button
        onClick={() => handleClick("assistant")}
        style={dropdownBtnStyle}
      >
        Assistant
      </button>
    </div>
  )}
</li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

const dropdownBtnStyle = {
  background: "transparent",
  border: "none",
  textAlign: "left",
  padding: "10px 20px",
  width: "100%",
  cursor: "pointer",
  fontSize: "14px",
  color: "#333",
  transition: "background 0.2s ease",
};

dropdownBtnStyle["&:hover"] = {
  background: "#f5f5f5"
};
