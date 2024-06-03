import React from "react";
import "../Pages/Styles/AddScreens.css";
import { Link } from "react-router-dom";

function AddScreens() {
  return (
    <div className="addscreens">
      <div className="addscreen-container">
        <h1>Add</h1>
        <div className="addbutton-container">
          <Link to="/AddNewStudent">
          <button className="grid-item">Add New Student</button>
          </Link>
          <Link to="/AddNewConductor">
          <button className="grid-item">Add New Conductor</button>
          </Link>
          <Link to="/AddMoreJourneys">
          <button className="grid-item">Recharge Journeys</button>
          </Link>
          <Link to="/AddNewBus">
          <button className="grid-item">Add New Buses</button>
          </Link>
          <Link to="/AddNewAdmin">
          <button className="grid-item">Add New Admin</button>
          </Link>
          {/* <Link to="/SearchAndUpdate">
          <button className="grid-item">Search & Update</button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default AddScreens;
