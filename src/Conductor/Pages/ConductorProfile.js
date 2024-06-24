import React, { useState, useEffect } from "react";
import profile from "../../Assets/profile.png";
import { Link, useNavigate } from "react-router-dom";
import '../Pages/Styles/ConductorProfile.css';

function ConductorProfile() {
  const [api] = useState("http://localhost/WebApi/api/Users/GetUserById/?id=6&OrganizationId=1");
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("You have been logged out.");
    navigate('/');
  };

  useEffect(() => {
    const fetchConductorData = async () => {
      try {
        const response = await fetch(api, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const conductorData = await response.json();
          setData(conductorData);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching conductor data:', error);
      }
    };
    fetchConductorData();
  }, [api]);

  console.log(data);

  return (
    <div className="conductor-profile">
      {data && data.Conductors && (
        <div className="conductorprofile-container">
          <div className="person-icon">
            <img src={profile} alt="Person Icon" />
          </div>

          <div className="person-details">
            <h2>{data.Conductors.Name}</h2>
            <p>{data.Conductors.BusRegNo}</p>
          </div>

          <div className="table-container">
            <div className="row">
              <div className="col">
                Contact No
                <h4>{data.Conductors.Contact}</h4>
              </div>
              <div className="col">
                User Name
                <h4>{data.Conductors.UserName}</h4>
              </div>
            </div>
            <div className="row">
              <div className="col">
              Organization Id 
                <h4>{data.Conductors.OrganizationId}</h4>
              </div>
              <div className="col">
                Bus ID
                <h4>{data.Conductors.BusId}</h4>
              </div>
            </div>
          </div>
        </div>
      )}
      <Link to='/ConductorHistory'>
        <button className="conductorhistory-button edit-stops">History</button>
      </Link>
      <Link to="/AdminChangePassword">
        <button className="conductorchangepwd-button edit-stops">Change Password</button>
      </Link>
      <button onClick={handleLogout} className="conductorlogout-button edit-stops">Log Out</button>
    </div>
  );
}

export default ConductorProfile;
