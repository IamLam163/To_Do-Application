import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Logout() {
  const navigate = useNavigate();

  const logoutUser = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;

    try {
      await axios.get("/logout");
      // Clear local storage
      localStorage.clear();
      toast.success("Logged Out Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const containerStyle = {
    textAlign: "right",
    marginTop: "20px",
    marginRight: "20px",
  };

  const headerStyle = {
    fontSize: "18px",
    marginBottom: "10px",
  };

  const buttonStyle = {
    backgroundColor: "#006600",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "14px",
  };

  const buttonHoverStyle = {
    backgroundColor: "#d32f2f",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}></h1>
      <button
        onClick={logoutUser}
        style={buttonStyle}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = buttonStyle.backgroundColor;
        }}
      >
        Logout
      </button>
    </div>
  );
}
