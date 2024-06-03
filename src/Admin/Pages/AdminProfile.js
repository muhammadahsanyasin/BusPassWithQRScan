import React, { useEffect, useState } from "react";
import profile from "../../Assets/profile.png";
import "../Pages/Styles/AdminProfile.css";
import { Link,useNavigate } from "react-router-dom";

import useStore from '../../store'





function AdminProfile() {

  const [api, setApi] = useState(
    "http://localhost/WebApi/api/Users/GetUserById/4"
  );
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    alert("You have been logged out.");
    navigate('/');
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          setData(result);
          console.log(result);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [api]);

  if (!data || !data.Admins) {
    return <div>Loading...</div>;
  }
 

  return (
    <div className="admin-profile">
      <div className="adminprofile-container">
        <div className="person-icon">
          <img src={profile} alt="Person Icon" />
        </div>

        <div className="person-details">
          <h2>{data.Admins.Name }</h2>
          <p>{data.Admins.UserName }</p>
        </div>

        <div className="table-container">
          <div className="row">
            <div className="col">
              Contact No
              <h4>{data.Admins.Contact}</h4>
            </div>
            <div className="col">
              Gender
              <h4>{data.Admins.Gender}</h4>
            </div>
          </div>
          <div className="row">
            <div className="col">
              User ID
              <h4>{data.Admins.UserId  }</h4>
            </div>
            <div className="col">
              User Name
              <h4>{data.Admins.UserName }</h4>
            </div>
          </div>
        </div>
      </div>

      <Link to='/AdminHistory'>
        <button className="adminhistory-button edit-stops">History</button>
      </Link>

      <Link to="/AdminChangePassword">
        <button className="adminchangepwd-button edit-stops">Change Password</button>
      </Link>

  
        <button onClick={handleLogout} className="adminlogout-button edit-stops">Log Out</button>
    
    </div>
  );
}

export default AdminProfile;
