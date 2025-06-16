// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Button} from "react-bootstrap";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";

// function Header({ setTask, setIsAuthenticated, isAuthenticated, setTaskType }) {
//   const [allTask, setAllTask] = useState([]);
//   // Fetch tasks from the server when the component mounts
//   useEffect(() => {
//     fetchTasks();
//   }, [isAuthenticated]);

//   // Fetch tasks from the server
//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/v1/task/mytask",
//         { withCredentials: true }
//       );
//       setAllTask(response.data.tasks);
//       setTask(response.data.tasks); // Update tasks with fetched tasks
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:8000/api/v1/user/logout",
//         { withCredentials: "true" }
//       );
//       toast.success(data.message);
//       setIsAuthenticated(false);
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   const filterTasks = (filterType) => {
//     let filteredTasks = [];

//     switch (filterType) {
//       case "completed":
//         filteredTasks = allTask.filter((task) => task.status === "completed");
//         setTaskType("Completed Tasks");
//         break;
//       case "incomplete":
//         filteredTasks = allTask.filter((task) => task.status === "incomplete");
//         setTaskType("Incomplete Tasks");
//         break;
//       case "archived":
//         filteredTasks = allTask.filter((task) => task.archived === true);
//         setTaskType("Archived Tasks");
//         break;
//       case "all":
//         filteredTasks = allTask;
//         setTaskType("Tasks");
//         break;
//       default:
//         filteredTasks = allTask;
//     }
//     setTask(filteredTasks);
//   };

//   return (
//     <Navbar
//       expand="lg"
//       className={`bg-body-tertiary ${!isAuthenticated ? "d-none" : ""}`}
//     >
//       <Container>
//         <Navbar.Brand href="#home">TASK MANAGER</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Link
//               to={"/"}
//               className="text-decoration-none d-flex align-items-center link-light  "
//             >
//               Home
//             </Link>
//             <NavDropdown title="Filter Tasks" id="basic-nav-dropdown">
//               <NavDropdown.Item onClick={() => filterTasks("all")}>
//                 All Tasks
//               </NavDropdown.Item>
//               <NavDropdown.Item onClick={() => filterTasks("completed")}>
//                 Completed Tasks
//               </NavDropdown.Item>
//               <NavDropdown.Item onClick={() => filterTasks("incomplete")}>
//                 Incomplete Tasks
//               </NavDropdown.Item>
//               <NavDropdown.Item onClick={() => filterTasks("archived")}>
//                 Archived Tasks
//               </NavDropdown.Item>
//             </NavDropdown>
//             <Link
//               to={"/profile"}
//               className="text-decoration-none d-flex align-items-center link-light  "
//             >
//               Profile
//             </Link>
//             <Button
//               className="bg-transparent border-0"
//               style={{ width: "fit-content" }}
//               onClick={handleLogout}
//             >
//               LOGOUT
//             </Button>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Header;










import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Header({ setTask, setIsAuthenticated, isAuthenticated, setTaskType }) {
  const [allTask, setAllTask] = useState([]);
  const [theme, setTheme] = useState("light");

  // Apply theme class to the body
  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-theme" : "light-theme";
  }, [theme]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/task/mytask",
        { withCredentials: true }
      );
      setAllTask(response.data.tasks);
      setTask(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/user/logout",
        { withCredentials: "true" }
      );
      toast.success(data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const filterTasks = (filterType) => {
    let filteredTasks = [];

    switch (filterType) {
      case "completed":
        filteredTasks = allTask.filter((task) => task.status === "completed");
        setTaskType("Completed Tasks");
        break;
      case "incomplete":
        filteredTasks = allTask.filter((task) => task.status === "incomplete");
        setTaskType("Incomplete Tasks");
        break;
      case "archived":
        filteredTasks = allTask.filter((task) => task.archived === true);
        setTaskType("Archived Tasks");
        break;
      case "all":
      default:
        filteredTasks = allTask;
        setTaskType("Tasks");
    }

    setTask(filteredTasks);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Navbar
      expand="lg"
      className={`bg-body-tertiary ${!isAuthenticated ? "d-none" : ""}`}
    >
      <Container>
        <Navbar.Brand href="#home">TASK MANAGER</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center gap-2">
            <Link
              to={"/"}
              className="text-decoration-none d-flex align-items-center link-light"
            >
              Home
            </Link>
            <NavDropdown title="Filter Tasks" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => filterTasks("all")}>
                All Tasks
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTasks("completed")}>
                Completed Tasks
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTasks("incomplete")}>
                Incomplete Tasks
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTasks("archived")}>
                Archived Tasks
              </NavDropdown.Item>
            </NavDropdown>
            <Link
              to={"/profile"}
              className="text-decoration-none d-flex align-items-center link-light"
            >
              Profile
            </Link>
            <Button
              className="bg-transparent border-0"
              style={{ width: "fit-content" }}
              onClick={handleLogout}
            >
              LOGOUT
            </Button>
            <Button
              className="ms-2"
              variant={theme === "dark" ? "light" : "dark"}
              onClick={toggleTheme}
            >
              {theme === "dark" ? "Light Theme" : "Dark Theme"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
