
import React, { useState } from 'react';
import '../Pages/Styles/AddNewStops.css';
import buslogo from '../../Assets/buslogo.png'; 
function AddNewStops() {
    const [routeType, setRouteType] = useState('new');

    const handleRouteTypeChange = (event) => {
      setRouteType(event.target.value);
    };
  
    return (
      <div className="newstop-container">
        <div className="icon">
          <img src={buslogo} alt="Bus Icon" />
        </div>
        <div className="content">
          <div className="stop-info">
            <h2>Stop Information</h2>
          </div>
          <div className="form-container">
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Pickup Time" />
            <input type="text" placeholder="Dropoff Time" />
            <input type="text" placeholder="Stop Number" />
            <div className="route-option">
              <span>Routes:</span>
              <label>
                <input
                  type="radio"
                  value="new"
                  checked={routeType === 'new'}
                  onChange={handleRouteTypeChange}
                />
                New
              </label>
              <label>
                <input
                  type="radio"
                  value="existing"
                  checked={routeType === 'existing'}
                  onChange={handleRouteTypeChange}
                />
                Existing
              </label>
            </div>
          </div>
          <div className="addnewstop-button">
            <span className="edit-stops">ADD</span>
          </div>
        </div>
      </div>
    );
}

export default AddNewStops