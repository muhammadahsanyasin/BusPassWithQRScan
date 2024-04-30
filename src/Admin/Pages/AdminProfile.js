import React, { useEffect, useState } from "react";
import profile from "../../Assets/profile.png";
import "../Pages/Styles/AdminProfile.css";
import { Link } from "react-router-dom";
function AdminProfile() {
  const [api, setapi] = useState(
    "http://localhost/WebApi/api/users/GetUserById?id=3"
  );
  const [data, setdata] = useState("");

  useEffect(() => {
    const adminsdata = async () => {
      const response = await fetch(api, {
        method: "GET", //POST, PUT,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const d = await response.json();
        setdata(d);
        console.log(data);
      }
    };
    adminsdata();
  }, []); //[] call only once

  if (data)
    return (
      <div className="admin-profile">
        <div className="adminprofile-container">
          <div className="person-icon">
            <img src={profile} alt="Person Icon" />
          </div>

          <div className="person-details">
            <h2>{data.Admins.Name}</h2>
            <p>32456-675776-3</p>
          </div>

          <div class="table-container">
            <div class="row">
              <div class="col">
                Contact No
                <h4>{data.Admins.Contact}</h4>
              </div>
              <div class="col">
                Gender
                <h4>{data.Admins.Gender}</h4>
              </div>
            </div>
            <div class="row">
              <div class="col">
                User ID
                <h4>{data.Admins.Id}</h4>
              </div>
              <div class="col">
                User Name
                <h4>{data.Admins.UserName}</h4>
              </div>
            </div>
          </div>
        
        </div>
        <Link   >
          <button className=" adminhistory-button edit-stops">History</button>
          </Link>

        <Link  to="/ChangePassword">
          <button className=" adminchangepwd-button edit-stops">Change Password</button>
          </Link>

        <Link  to="/">
          <button className="adminlogout-button edit-stops">Log Out</button>
          </Link>
        
      </div>
    );
}

export default AdminProfile;
