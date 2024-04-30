import React, { useState } from 'react';
import '../Pages/Styles/AddExistingStops.css';
import buslogo from '../../Assets/buslogo.png'; 
function AddExistingStops() {
    const [routeType, setRouteType] = useState('new'); // State for route type
    const [routeId, setRouteId] = useState(''); // State for route ID
  
    const handleRouteTypeChange = (event) => {
      setRouteType(event.target.value);
    };
  
    const handleRouteIdChange = (event) => {
      setRouteId(event.target.value);
    };
  
    const handleAddButtonClick = () => {
      // Logic to handle adding stop
      console.log('Stop added');
    };
  
    return (
      <div className="addexistingstop-container ">
        <div className="icon-container-stops ">
          <img src={buslogo} alt="Bus Icon" className="bus-icon-stops" />
        </div>
        <div className="content-container">
          <h2>Stop Information</h2>

            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Pickup Time" />
            <input type="text" placeholder="Dropoff Time" />
            <input type="text" placeholder="Stop Number" />
          
          <div className="route-container">
            <p>Routes:</p>
            <div className="radio-container">
              <label>
                <input type="radio" value="new" checked={routeType === 'new'} onChange={handleRouteTypeChange} />
                New
              </label>
              <label>
                <input type="radio" value="existing" checked={routeType === 'existing'} onChange={handleRouteTypeChange} />
                Existing
              </label>
            </div>
            {routeType === 'existing' && (
              <select value={routeId} onChange={handleRouteIdChange}>
                <option value="">Select Route ID</option>
                <option value="route1">Route 1</option>
                <option value="route2">Route 2</option>
                <option value="route3">Route 3</option>
              </select>
            )}
          </div>
        </div>
        <div className="addexistingstop-button">
            <span className="edit-stops">ADD</span>
        </div>
      </div>
    );
}

export default AddExistingStops
