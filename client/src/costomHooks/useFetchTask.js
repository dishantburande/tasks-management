import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppContext } from "../components/context/AppContext.jsx";

const useFetchTasks = (shouldFetch = true) => {
  const { setTask } = useAppContext();
  const [tasks, setTasks] = useState([]); // ✅ Local state to return

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(
          "https://tasks-management-8w5a.onrender.com/api/v1/task/mytask",
          {
            withCredentials: true,
          }
        );
        setTask(data.tasks);    // ✅ Update global context
        setTasks(data.tasks);   // ✅ Update local state
      } catch (error) {
        toast.error("Failed to fetch tasks");
        console.error("Error fetching tasks:", error);
        setTasks([]); // fallback to empty
      }
    };

    if (shouldFetch) fetchTasks();
  }, [shouldFetch, setTask]);

  return tasks; // ✅ return the fetched tasks
};

export default useFetchTasks;
