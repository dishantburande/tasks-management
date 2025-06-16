import axios from 'axios';
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { MdEdit, MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Button, Card, Stack } from "react-bootstrap";

import CreateTaskModal from "../components/CreateTaskModel.jsx";
import UpdateTaskModal from './UpdateTaskModal.jsx';
import ViewTaskModal from './ViewTaskModal.jsx';
import toast from 'react-hot-toast';


const Home = ({ task,setTask, isAuthenticated, taskType}) => {
   const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTaskId, setViewTaskId] = useState(null);
  const [updatedTaskId, setUpdateTaskId] = useState(null)

  const deleteTask = async(id)=>{
await axios.delete(`http://localhost:8000/api/v1/task/delete/${id}`, { withCredentials: true, }).then((res)=> {
  toast.success(res.data.message);
  setTask((prevTask) => prevTask.filter((task) => task._id !== id));
}).catch((error)=>{
  toast.error(error.response.data.message)
})
  }


  const handleCreateModalClose = () => setShowCreateModal(false);
  const handleUpdateModalClose = () => setShowUpdateModal(false);
  const handleViewModalClose = () => setShowViewModal(false);

  const handleCreateModalShow = () => setShowCreateModal(true);

  const handleUpdateModalShow = (id) => {
    setUpdateTaskId(id);
    setShowUpdateModal(true);
  };

  const handleViewModalShow = (id) => {
    setViewTaskId(id);
    setShowViewModal(true);
  };

  if(!isAuthenticated){
    return <Navigate to={"/login"}/>
  }

  return (
     <div className="container my-4">
      <div className="row mb-3">
        <div className="col">
          <h1 style={{width: "fit-content"}}>{taskType}</h1>
        </div>
        <div className="col text-end" style={{width: "fit-content"}}>
          <Button variant="primary" onClick={handleCreateModalShow}>
            Create Task
          </Button>
        </div>
      </div>
      <div className="row">
        {task && task.length > 0 ? (
          task.map((task) => (
            <div key={task._id} className="col-lg-3 col-md-4 col-sm-6">
              <Card style={{ marginBottom: "20px", minHeight: "400px" }}>
                <Card.Body className="d-flex justify-content-between flex-column ">
                  <Stack gap={2}>
                    <Card.Title className="mb-2" style={{ height: "50px" }}>
                      {task && task.title.length <= 40
                        ? task.title
                        : task.title.slice(0, 40) + "..."}
                    </Card.Title>
                    <Card.Text>
                      {task && task.description.length <= 300
                        ? task.description
                        : task.description.slice(0, 300) + "..."}
                    </Card.Text>
                  </Stack>
                  <Stack
                    direction="horizontal"
                    className="justify-content-end"
                    gap={2}
                  >
                    <MdEdit
                      onClick={() => handleUpdateModalShow(task._id)}
                      className="fs-3 "
                    />
                    <MdDelete
                      onClick={() => deleteTask(task._id)}
                      className="fs-3 "
                    />
                    <FaEye
                      onClick={() => handleViewModalShow(task._id)}
                      className="fs-3 "
                    />
                  </Stack>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <h1>YOU DONT HAVE ANY {taskType}</h1>
        )}
      </div>

       <CreateTaskModal
        handleCreateModalClose={handleCreateModalClose}
        showCreateModal={showCreateModal}
        setTask={setTask}
      />

       <UpdateTaskModal
        handleUpdateModalClose={handleUpdateModalClose}
        showUpdateModal={showUpdateModal}
        id={updatedTaskId}
        setTask={setTask}
      />

       <ViewTaskModal showViewModal={showViewModal} id={viewTaskId}
              handleViewModalClose={handleViewModalClose}

      />
    </div>
  );
};


export default Home