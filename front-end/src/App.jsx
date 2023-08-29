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
import { UserContextProvider } from "./context/userContext.jsx";

axios.defaults.baseURL = "https://my-to-do-api.onrender.com/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <UserContextProvider>
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
      </UserContextProvider>
    </>
  );
}

export default App;
