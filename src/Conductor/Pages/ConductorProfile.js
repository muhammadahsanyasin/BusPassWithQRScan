import React, { useState, useEffect } from "react";
import profile from "../../Assets/profile.png";
import { Link } from "react-router-dom";
import '../Pages/Styles/ConductorProfile.css';

function ConductorProfile() {
  const [api] = useState("http://localhost/WebApi/api/users/GetUserById?id=6");
  const [data, setData] = useState(null);

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
  }, [api]); // Dependency array to re-run effect when 'api' changes

  console.log(data); // Moved console.log outside useEffect

  return (
    <div className="conductor-profile">
      {data && (
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
                Conductor ID
                <h4>{data.Conductors.Id}</h4>
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
      <Link to='/'>
        <button className="conductorlogout-button edit-stops">Log Out</button>
      </Link>
    </div>
  );
}

export default ConductorProfile;
