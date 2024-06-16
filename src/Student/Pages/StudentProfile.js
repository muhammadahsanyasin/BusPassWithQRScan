import React, { useState, useEffect } from "react";
import '../Pages/Styles/StudentProfile.css';
import profile from "../../Assets/profile.png";
import { Link ,useNavigate} from "react-router-dom";

function StudentProfile() {
  const [api, setApi] = useState(
    "http://localhost/WebApi/api/Users/GetUserById/?id=1&OrganizationId=1"
  );
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    alert("You have been logged out.");
    navigate('/');
  };

  useEffect(() => {
    const fetchData = async () => {
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
      }
    };
    fetchData();
  }, [api]);

  if (!data || !data.Students) {
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
          {/* Assuming email field is not present in the provided data, replacing it with another field */}
          <p>{data.Students.UserName}</p>
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
              <h4>{data.Students.PassExpiry}</h4>
            </div> 
          </div>
        </div>
        <Link to='/StudentHistory'>
          <div className="studenthistory-button">
            <span className="edit-stops">History</span>
          </div>
        </Link>
        {/* <Link to='/AdminChangePassword'>
          <div className="studentchangepwd-button">
            <span className="edit-stops">Change Password</span>
          </div>
        </Link> */}
       
         
            <span onClick={handleLogout} className=" studentlogout-button edit-stops">Log Out</span>
          
        
      </div>
    </div>
  );
}

export default StudentProfile;
