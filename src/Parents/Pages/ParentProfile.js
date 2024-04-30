import React, { useEffect, useState } from "react"; //hook
import "../Pages/Styles/ParentProfile.css";
import profile from "../../Assets/profile.png";
import { Link } from "react-router-dom";
function ParentProfile() {
  const [api, setapi] = useState(
    "http://localhost/WebApi/api/users/GetUserById?id=1"
  );
  const [data, setdata] = useState("");

  useEffect(() => {
    const parentsdata = async () => {
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
    parentsdata();
  }, []); //[] call only once

  if (data)
    return (
      <div className="parent-profile">
        <div className="parentprofile-container">
          <div className="person-icon">
            <img src={profile} alt="Person Icon" />
          </div>

          <div className="person-details">
            <h2>{data.Parents.Name}</h2>
            <p>32402-2852063-3</p>
          </div>
          <div class="table-container">
            <div class="row">
              <div class="col">
                Contact No
                <h4>{data.Parents.Contact}</h4>
              </div>
              <div class="col">
                ChildrenEnroll
                <h4>{data.Parents.ChildrenEnroll}</h4>
              </div>
            </div>
            <div class="row">
              <div class="col">
                Parent ID
                <h4>{data.Parents.Id}</h4>
              </div>
              <div class="col">
                User Name
                <h4>{data.Parents.UserName}</h4>
              </div>
            </div>
          </div>
         
        </div>
        <Link>
            <button className=" parenthistory-button edit-stops">History</button>
          </Link>
          <Link to="/ChangePassword">
            <button className=" parentchangepwd-button edit-stops">
              Change Password
            </button>
          </Link>
          <Link to="/">
            <button className=" parentlogout-button edit-stops">Log Out</button>
          </Link>
      </div>
    );
}

export default ParentProfile;
