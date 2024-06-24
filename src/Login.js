import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { useNavigate, Navigate, } from "react-router-dom";
import "./Login.css";
import useStore from "./store";

const Login = () => {

   const { setuserdata} = useStore();


  // useEffect(()=>{
  //   if(new Date()- (new Date( localStorage.getItem("addtime"))) > 20000)
  //     {
  //       console.log("nulled")
  //       localStorage.setItem("user", null)
  //     }
    
  // },[])

  

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
    e.preventDefault();
    console.log(`http://localhost/WebApi/api/users/login?username=${UserName}&password=${password}`);
    try {
      const response = await fetch(
        `http://localhost/WebApi/api/users/login?username=${UserName}&password=${password}`,
        {
          method: "GET",  
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = await response.json();
      console.log(data);


      //Set logged in user to store

      // setuserdata(data)

  
      // Set logged in user to localstorage
      localStorage.setItem('user', JSON.stringify(data));
  
      const newdate = new Date();
      console.log(newdate);
      localStorage.setItem('addtime', newdate);
  
      // Check the role of the user and navigate accordingly
      if (data.Admins) {
        console.log("logged in admin", data.Admins);
        navigate("/AdminDashboard");
      } else if (data.Parents) {
        console.log("logged in parent", data.Parents);
        navigate("/ParentDashboard");
      } else if (data.Conductors) {
        console.log("logged in conductor", data.Conductors);
        navigate("/ConductorDashboard");
      } else if (data.Students) {
        console.log("logged in student", data.Students);
        navigate("/StudentDashboard");
      } else if (data.SuperAdmin) {
        console.log("logged in SuperAdmin", data.SuperAdmin);
        navigate("/SuperAdminDashboard");
      }
       else {
        setError("Login failed: User role not recognized");
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
          <button onClick={handleLogin} className="login-button" type="submit">
            Login
          </button>
      
    
      </div>
    </div>
  );
};

export default Login;
