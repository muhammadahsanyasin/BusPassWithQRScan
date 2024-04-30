import React, { useState } from "react";
import "../Pages/Styles/EditStopInfo.css";
import buslogo from '../../Assets/buslogo.png'; 
function EditStopInfo() {
  const [name, setName] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");
  const [stopNumber, setStopNumber] = useState("");
  const [routeId, setRouteId] = useState("");

  const handleAddClick = () => {
    // Logic to add the information to the system goes here
    console.log("Adding information:", {
      name,
      pickupTime,
      dropoffTime,
      stopNumber,
      routeId,
    });
    // Reset input fields after adding
    setName("");
    setPickupTime("");
    setDropoffTime("");
    setStopNumber("");
    setRouteId("");
  };

  return (
    <div className="editstopinfo-container">
      <div className="icon-container-editstop">
        <img src={buslogo} alt="Bus Icon" />
      </div>

      <div className="input-container">
        <div className="stop-info">
          <h2>Stop Information</h2>
        </div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pickup Time"
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dropoff Time"
          value={dropoffTime}
          onChange={(e) => setDropoffTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Stop Number"
          value={stopNumber}
          onChange={(e) => setStopNumber(e.target.value)}
        />
        <select value={routeId} onChange={(e) => setRouteId(e.target.value)}>
          <option value="">Route ID</option>
          <option value="route1">Route 1</option>
          <option value="route2">Route 2</option>
        </select>
      </div>
      <div className="editstopinfo-button">
            <span className="edit-stops">ADD</span>
          </div>
    </div>
  );
}

export default EditStopInfo;
