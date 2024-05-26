import React, { useEffect, useState } from "react";
import profile from "../../Assets/profile.png";
import "../Pages/Styles/AdminProfile.css";
import { Link } from "react-router-dom";

import useStore from '../../store'





function AdminProfile() {
  const [loginstatus, setloginstatus] = useState(JSON.parse(localStorage.getItem("user")))
  const [admin, setadmin] = useState(JSON.parse(localStorage.getItem('user')))
  const [api, setApi] = useState(`http://localhost/WebApi/api/users/GetUserById?id=${admin.user.id}`);
  const [data, setData] = useState(null); // Use null instead of an empty string

  useEffect(() => {
    
    const fetchAdminData = async () => {
      try {
        

       
     
        const response = await fetch(api, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          await setData(result); // Set the fetched data
          console.log(result);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchAdminData()
    
  }, [api]);

  // Ensure data and data.Admins are defined before attempting to render
  if (!data ) {
    return <div>Loading...</div>;
  }
  
 

  return (
    <div className="admin-profile">
      <div className="adminprofile-container">
        <div className="person-icon">
          <img src={profile} alt="Person Icon" />
        </div>

        <div className="person-details">
          <h2>{data.user.username }</h2>
          <p>32456-675776-3</p>
        </div>

        <div className="table-container">
          <div className="row">
            <div className="col">
              Contact No
              <h4>{data.user.contact}</h4>
            </div>
            <div className="col">
              Gender
              <h4>{data.user.gender}</h4>
            </div>
          </div>
          <div className="row">
            <div className="col">
              User ID
              <h4>{data.user.id || 'id' }</h4>
            </div>
            <div className="col">
              User Name
              <h4>{data.user.role || "fuck me"}</h4>
            </div>
          </div>
        </div>
      </div>

      <Link to='/AdminHistory'>
        <button className="adminhistory-button edit-stops">History</button>
      </Link>

      <Link to="/ChangePassword">
        <button className="adminchangepwd-button edit-stops">Change Password</button>
      </Link>

      <Link to="/">
        <button className="adminlogout-button edit-stops">Log Out</button>
      </Link>
    </div>
  );
}

export default AdminProfile;
