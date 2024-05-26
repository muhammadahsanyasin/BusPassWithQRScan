import React, { useState, useEffect } from "react";
import '../Pages/Styles/StudentProfile.css';
import profile from "../../Assets/profile.png";
import { Link } from "react-router-dom";

function StudentProfile() {
  const [api, setapi] = useState(
    "http://localhost/WebApi/api/users/GetUserById?id=2"
  );
  const [data, setdata] = useState("");

  useEffect(() => {
    const conductordata = async () => {
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
    conductordata();
  }, []); //[] call only once

  if (data)
  return (
    <div className="student-profile">
      <div className="studentprofile-container">
        <div className="person-icon">
          <img src={profile} alt="Person Icon" />
        </div>

        <div className="person-details">
          <h2>{data.user.username}</h2>
          <p>{data.user.Email}</p>
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
              Pass ID
              <h4>{data.user.pass_id}</h4>
            </div>
            <div className="col">
              Pass Expiry Date
              <h4>02/01/2013{data.user.PassExpiryDate}</h4>
            </div> 
          </div>
        </div>
        <Link to='/StudentHistory'>
        <div className="studenthistory-button">
          <span className="edit-stops">History</span>
        </div>
        </Link>
        <Link to='/ChangePassword'>
        <div className="studentchangepwd-button">
          <span className="edit-stops">Change Password</span>
        </div>
        </Link>
<Link to='/'>
        <div className="studentlogout-button">
          <span className="edit-stops">Log Out</span>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default StudentProfile;
