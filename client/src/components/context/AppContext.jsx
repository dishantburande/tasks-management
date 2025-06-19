import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [task, setTask] = useState([]);
  const [taskType, setTaskType] = useState("Tasks");

  // Get current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("https://tasks-management-8w5a.onrender.com/api/v1/user/me", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
        setUser(data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };

    fetchUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        task,
        setTask,
        taskType,
        setTaskType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 🔁 Custom Hook to use context
export const useAppContext = () => useContext(AppContext);
