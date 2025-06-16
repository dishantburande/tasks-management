import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Navigate,Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const Login = ({setIsAuthenticated, isAuthenticated}) => {
  const [ email, setEmail] = useState("")
  const [ password, setPassword] = useState("")

  const handleLogin = async(e)=>{
    e.preventDefault();
    axios.post("http://localhost:8000/api/v1/user/login", {email, password}, {withCredentials: true, headers: {"Content-Type": "application/json"}}).then((res)=>{
      setEmail("");
      setPassword("");
      setIsAuthenticated(true);
      toast.success(res.data.message);
    }).catch((error)=> {
      toast.error(error.data.message)
    })
  }
  if(isAuthenticated){
    return <Navigate to={"/"}/>
  }

  return (
     <Container
      className="d-flex justify-content-center align-items-center overflow-y-hidden"
      style={{ minHeight: "800px" }}
    >
      <Form onSubmit={handleLogin} className="w-70">
        <h3 className="text-center ">LOGIN</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="text-center">
          <Form.Label>
            Not Registered?{" "}
            <Link to={"/register"} className="text-decoration-none ">
              REGISTER NOW
            </Link>
          </Form.Label>
        </Form.Group>
        <Button
          variant="warning"
          type="submit"
          className="w-100 text-light fw-bold fs-5"
        >
          Login
        </Button>
      </Form>
    </Container>
  )
}

export default Login