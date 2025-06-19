// useFetchTasks.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../components/context/AppContext";
import toast from "react-hot-toast";

const useFetchTasks = (isAuthenticated) => {
  const { setTask } = useAppContext();
  const [fetchedTasks, setFetchedTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!isAuthenticated) return;

      try {
     const { data } = await axios.get("http://localhost:8000/api/v1/task/my", {
          withCredentials: true,
        });
        setTask(data.tasks);
        setFetchedTasks(data.tasks); // set for local use
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch tasks");
      }
    };

    fetchTasks();
  }, [isAuthenticated, setTask]);

  return fetchedTasks;
};

export default useFetchTasks;
