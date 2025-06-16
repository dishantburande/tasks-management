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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [task, setTask] = useState([]);
  const [user, setUser] = useState({});
  const [ taskType, setTaskType] = useState("Tasks")

  useEffect(() => {
    const handleGetIUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/user/me",
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
  }, [isAuthenticated]);

  return (
    <Router>
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        task={task}
        setTask={setTask}
        setTaskType={setTaskType}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              task={task}
              setTask={setTask}
              isAuthenticated={isAuthenticated}
              taskType={taskType}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />

        <Route
          path="/register"
          element={
            <Register
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />

        <Route
          path="/profile"
          element={<Profile user={user} isAuthenticated={isAuthenticated} />}
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
