import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppContext } from "../components/context/AppContext.jsx";

const useFetchTasks = (shouldFetch = true) => {
  const { setTask } = useAppContext();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/v1/task/mytask", {
          withCredentials: true,
        });
        setTask(data.tasks);
      } catch (error) {
        toast.error("Failed to fetch tasks");
        console.error("Error fetching tasks:", error);
      }
    };

    if (shouldFetch) fetchTasks();
  }, [shouldFetch, setTask]);
};

export default useFetchTasks;
