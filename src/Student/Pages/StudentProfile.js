import React, { useState, useEffect } from "react";
import '../Pages/Styles/StudentProfile.css';
import profile from "../../Assets/profile.png";
import { Link } from "react-router-dom";

function StudentProfile() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch("http://localhost/WebApi/api/users/GetUserById?id=2", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudentData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="student-profile">
      <div className="studentprofile-container">
        <div className="person-icon">
          <img src={profile} alt="Person Icon" />
        </div>

        <div className="person-details">
          <h2>{data.Students.Name}</h2>
          <p>{data.Students.Email}</p>
        </div>

        <div className="table-container">
          <div className="row">
            <div className="col">
              Contact No
              <h4>{data.Students.Contact}</h4>
            </div>
            <div className="col">
              Gender
              <h4>{data.Students.Gender}</h4>
            </div>
          </div>
          <div className="row">
            <div className="col">
              Pass ID
              <h4>{data.Students.PassId}</h4>
            </div>
            <div className="col">
              Pass Expiry Date
              <h4>{data.Students.PassExpiryDate}</h4>
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
