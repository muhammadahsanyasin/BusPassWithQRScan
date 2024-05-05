import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { useNavigate, Navigate } from "react-router-dom";
import "./Login.css";
import useStore from "./store";

const Login = () => {
  const { loginstatus, setloginstatus, addloginstatus } = useStore();

  const [showPassword, setShowPassword] = useState(false);
  const [UserName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch(
        `http://localhost/WebApi/api/users/login?username=${UserName}&password=${password} `,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Check the role of the user and navigate accordingly
        if (data !== "Incorrect User Name" && data !== "Incorrect Password!") {
          // Set user data or navigate based on user role
          // For example:
          if (data.Admins) {
            console.log("logged in admin", data.Admins);
            setloginstatus(true);
            navigate("/AdminDashboard");
          } else if (data.Parents) {
            console.log("logged in parent", data.Parents);
            setloginstatus(true);
            navigate("/ParentDashboard");
          } else if (data.Conductors) {
            console.log("logged in conductor", data.Conductors);
            setloginstatus(true);
            navigate("/ConductorDashboard");
          } else if (data.Students) {
            console.log("logged in student", data.Students);
            setloginstatus(true);
            navigate("/StudentDashboard");
          }
        } else {
          setError(data);
        }
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError("Login failed: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="logintitle">Bus Pass With QRScan</h1>
      <div className="loginform-container">
        <h2 className="form-title">
          Login <IoIosLogIn />
        </h2>
        {error && <p className="error-message">{error}</p>}
        <form className="form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>User Name</label>
            <input
              type="UserName"
              placeholder="User Name"
              value={UserName}
              onChange={handleUserNameChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                className="password-toggle"
                onClick={handleTogglePassword}
                type="button" // Ensure it's a button type, not a submit button
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
