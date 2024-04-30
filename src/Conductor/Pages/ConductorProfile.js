import React from "react";
import profile from "../../Assets/profile.png";
import { Link } from "react-router-dom";
import '../Pages/Styles/ConductorProfile.css';
function ConductorProfile() {
  return (
    <div className="conductor-profile">
      <div className="conductorprofile-container ">
        <div className="person-icon">
          <img src={profile} alt="Person Icon" />
        </div>

        <div className="person-details">
          <h2>Shehbaz Shrif</h2>
          <p>32402-2852063-3</p>
        </div>

        <div class="table-container">
          <div class="row">
            <div class="col">
              Contact No
              <h4>22344555</h4>
            </div>
            <div class="col">
              Gender
              <h4>Male</h4>
            </div>
          </div>
          <div class="row">
            <div class="col">
              Pass ID
              <h4>22344555</h4>
            </div>
            <div class="col">
              Pass Expiry Date
              <h4>234567</h4>
            </div>
          </div>
        </div>
      </div>
      <Link>
        
          <button className=" conductorhistory-button edit-stops">History</button>
       
      </Link>
      <Link to="/ChangePassword">
        
          <button className=" conductorchangepwd-button edit-stops">Change Password</button>
        
      </Link>

      <Link to='/'>
        
          <button className= " conductorlogout-button edit-stops">Log Out</button>
        
      </Link>
    </div>
  );
}

export default ConductorProfile;
