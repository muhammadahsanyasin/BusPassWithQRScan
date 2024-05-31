import React from 'react';
import '../Pages/Styles/AddScreens.css';

function AddScreens() {
  return (
    <div className="addscreen-container">
    <h1>Add</h1>
    <div className="addbutton-container">
      <button className="grid-item">Add New Student</button>
      <button className="grid-item">Add New Conductor</button>
      <button className="grid-item">Recharge Journeys</button>
      <button className="grid-item">Add New Buses</button>
      <button className="grid-item">Add New Admin</button>
      <button className="grid-item">Search & Update</button>
    </div>
  </div>
  );
}

export default AddScreens