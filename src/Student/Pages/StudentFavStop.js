import React, { useState } from 'react';
import '../Pages/Styles/StudentFavStop.css';

function StudentFavStop() {
    const data = [
      { Name: 'Stop', Route: 'Route #' },
      { Name: 'Stop', Route: 'Route #' },
      { Name: 'Stop', Route: 'Route #' },
      { Name: 'Stop', Route: 'Route #' },
      { Name: 'Stop', Route: 'Route #' },
      { Name: 'Stop', Route: 'Route #' },
      { Name: 'Stop', Route: 'Route #' },
      { Name: 'Stop', Route: 'Route #' },
    ];

    const [checkedStates, setCheckedStates] = useState(Array(data.length).fill(false));

    const handleCheckboxPress = (index) => {
      const newCheckedStates = [...checkedStates];
      newCheckedStates[index] = !newCheckedStates[index];
      setCheckedStates(newCheckedStates);
    };
  
    const handleRemove = () => {
      const newData = data.filter((item, index) => !checkedStates[index]);
      setCheckedStates(Array(newData.length).fill(false));
    };
  
    return (
      <div className="student-fav-stop-container">
        <div className="remove-btn-container">
          <button className="btn" onClick={handleRemove}>
            <span>REMOVE</span>
          </button>
        </div>
        <div className="stop-list">
          {data.map((item, index) => (
            <div className="flatListRow" key={index}>
              <div>
                <p className="StopNametextStyle">Stop Name {index + 1}</p>
                <p className="RouteNotextStyle">Route # {index + 1}</p>
              </div>
              <button
                className={`checkBox ${checkedStates[index] ? 'checkedBox' : ''}`}
                onClick={() => handleCheckboxPress(index)}
              >
                {checkedStates[index] && <span className="checkIcon">✓</span>}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
}

export default StudentFavStop;
