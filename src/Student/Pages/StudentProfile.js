
import React, { useState, useEffect } from "react";
import "../Pages/Styles/StudentProfile.css";
import profile from "../../Assets/profile.png";

function StudentProfile() {

  const [data, setdata] = useState('')
  useEffect(() => {
    const studentdata = async () => {
      const response = await fetch(
        "http://localhost/WebApi/api/users/GetUserById?id=2",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      }
    };
    studentdata();
  }, []);

  if (data)
    return (
      <div className="student-profile">
        <div className="studentprofile-container">
          <div className="person-icon">
            <img src={profile} alt="Person Icon" />
          </div>

          
            <div className="person-details">
              <h2>{}</h2>
              <p>{}</p>
            </div>
          
          <div className="table-container">
            
              <>
                <div className="row">
                  <div className="col">
                    Contact No
                    <h4>{data.Students.Contact}</h4>
                  </div>
                  <div className="col">
                    Gender
                    <h4>{}</h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    Pass ID
                    <h4>{}</h4>
                  </div>
                  <div className="col">
                    Pass Expiry Date
                    <h4>{data.Students.Name}</h4>
                  </div>
                </div>
              </>
           
          </div>

          <div className="studenthistory-button">
            <span className="edit-stops">History</span>
          </div>

          <div className="studentchangepwd-button">
            <span className="edit-stops">Change Password</span>
          </div>

          <div className="studentlogout-button">
            <span className="edit-stops">Log Out</span>
          </div>
        </div>
      </div>
    );
}
export default StudentProfile;
