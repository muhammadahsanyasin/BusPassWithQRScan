import React from 'react'
import '../Pages/Styles/AddScreens.css';
function AddScreens() {
  return (
    <div className="addscreen-container">
      <h1>Add</h1>
      <div className="grid-container">
        <div className="grid-item">Add New Student</div>
        <div className="grid-item">Add New Conductor</div>
        <div className="grid-item">Recharge Journeys</div>
        <div className="grid-item">Add New Buses</div>
        <div className="grid-item">Add New Admin</div>
        <div className="grid-item">Search & Update</div>
      </div>
    </div>
  );
}

export default AddScreens