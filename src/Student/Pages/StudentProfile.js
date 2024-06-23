import React, { useState, useEffect } from "react";
import '../Pages/Styles/StudentProfile.css';
import profile from "../../Assets/profile.png";
import { Link ,useNavigate} from "react-router-dom";

function StudentProfile() {
  const [api] = useState("http://localhost/WebApi/api/Users/GetUserById/?id=3&OrganizationId=1");
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("You have been logged out.");
    navigate('/');
  };

  useEffect(() => {
    const fetchstudentData = async () => {
      try {
        const response = await fetch(api, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const studentData = await response.json();
          setData(studentData);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    fetchstudentData();
  }, [api]);

  console.log(data);

  return (
    <div className="student-profile">
      {data && data.Students && (
        <div className="studentprofile-container">
          <div className="person-icon">
            <img src={profile} alt="Person Icon" />
          </div>

          <div className="person-details">
            <h2>{data.Students.Name}</h2>
            <p>{data.Students.BusRegNo}</p>
          </div>

          <div className="table-container">
            <div className="row">
              <div className="col">
                Contact No
                <h4>{data.Students.Contact}</h4>
              </div>
              <div className="col">
                User Name
                <h4>{data.Students.UserName}</h4>
              </div>
            </div>
            <div className="row">
              <div className="col">
              Organization Id 
                <h4>{data.Students.OrganizationId}</h4>
              </div>
              <div className="col">
                Gender
                <h4>{data.Students.Gender}</h4>
              </div>
            </div>
          </div>
        </div>
      )}
      <Link to='/studentHistory'>
        <button className="studenthistory-button edit-stops">History</button>
      </Link>
      <Link to="/AdminChangePassword">
        <button className="studentchangepwd-button edit-stops">Change Password</button>
      </Link>
      <button onClick={handleLogout} className="studentlogout-button edit-stops">Log Out</button>
    </div>
  );
}

export default StudentProfile;
