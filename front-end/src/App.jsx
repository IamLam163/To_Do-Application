// import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./components/home/home.jsx";
import Login from "./components/pages/Login";
import Todo from "./components/pages/todo.jsx";
import axios from "axios";
import Register from "./components/pages/Register.jsx";
import Logout from "./components/pages/Logout.jsx";
import Application from "./components/pages/application.jsx";

axios.defaults.baseURL = "http://localhost:7000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app/todo/:id" element={<Application />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/todo/:id" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
