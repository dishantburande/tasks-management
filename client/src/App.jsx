import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Header from "./components/Header.jsx";
import Profile from "./components/Profile.jsx";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { useAppContext } from "../src/components/context/AppContext.jsx";


function App() {

 const {
  setIsAuthenticated,
  setUser, 
} = useAppContext();


  useEffect(() => {
    const handleGetIUser = async () => {
      try {
        const { data } = await axios.get(
          "https://tasks-management-8w5a.onrender.com/api/v1/user/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(data.user);
      } catch (error) {
        console.log("User Is not Authenticated");
        setIsAuthenticated(false);
        setUser({});
      }
    };
    handleGetIUser();
  },[]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
