import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utills.js";

const signupInitialValues = {
  name: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [signup, setSignup] = useState(signupInitialValues);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signup;
    if (!name || !email || !password) {
      return handleError("name, email and password required");
    }
    try {
      const url = "http://localhost:8000/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signup),
      });
      const result = await response.json();
      const { success, message,error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }else if(error){
       const details = error?.details[0].message;
       handleError(details)
      } else if(!success){
        handleError(message)
      }
      console.log(result);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Enter your name..."
            name="name"
            value={signup.name}
            autoFocus
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => handleChange(e)}
            type="email"
            placeholder="Enter your email..."
            name="email"
            value={signup.email}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => handleChange(e)}
            type="password"
            placeholder="Enter your password..."
            name="password"
            value={signup.password}
          />
        </div>
        <button type="submit">Signup</button>
        <span>
          Already Have an Account ? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
