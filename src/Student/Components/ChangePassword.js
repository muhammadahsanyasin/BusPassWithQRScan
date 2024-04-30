import React from "react";
import "../Components/Styles/ChangePassword.css";
import { Link } from "react-router-dom";

import lock from "../../Assets/lock.png";
function ChangePassword() {
  return (
    <div className="changepasword-screen">
      <div className="changepasword-container">
        <div className="lock-icon">
          <img src={lock} alt="Lock Icon" />
        </div>
        <div className="password-fields">
          <input type="password" placeholder="Old Password" />
          <input type="password" placeholder="New Password" />
          <input type="password" placeholder="Confirm Password" />
        </div>
      </div>
      <Link>
      <div className="button">
        <button className="text">Confirm</button>
      </div>
      </Link>
    </div>
  );
}

export default ChangePassword;
