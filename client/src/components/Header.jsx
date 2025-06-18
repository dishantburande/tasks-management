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
import Form from "react-bootstrap/Form";

function Header({ setTask, setIsAuthenticated, isAuthenticated, setTaskType }) {
  const [allTask, setAllTask] = useState([]);
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");

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
    setSearchQuery("");
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = allTask.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
    );

    setTask(filtered);
    setTaskType("Search Results");
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
              className="text-decoration-none d-flex align-items-center header-link"
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
              className={`bg-transparent border-0 header-link ${
                theme === "dark" ? "text-light" : "text-dark"
              }`}
              onClick={handleLogout}
            >
              LOGOUT
            </Button>

            <Button
              className={`ms-2 theme-toggle-btn btn btn-dark ${
                theme === "dark" ? "btn-light btn btn-primary" : "btn-dark"
              }`}
              onClick={toggleTheme}
            >
              {theme === "dark" ? "Light Theme" : "Dark Theme"}
            </Button>

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search Tasks"
                className="me-2"
                value={searchQuery}
                onChange={handleSearch}
              />
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
