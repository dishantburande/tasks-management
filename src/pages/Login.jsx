import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utills.js";

const loginInitialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [login, setLogin] = useState(loginInitialValues);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = login;
    if (!email || !password) {
      return handleError("email and password required");
    }
    try {
      const url = "http://localhost:8000/auth/login";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login)
      });
      const result = await response.json();
      const { success, jwtToken, name, message, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => handleChange(e)}
            type="email"
            placeholder="Enter your email..."
            name="email"
            value={login.email}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => handleChange(e)}
            type="password"
            placeholder="Enter your password..."
            name="password"
            value={login.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Don't Have an Account ? <Link to="/signup">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
