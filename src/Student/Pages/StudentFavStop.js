import React, { useState, useEffect } from 'react';
import '../Pages/Styles/StudentFavStop.css';

function StudentFavStop() {
  const [data, setData] = useState([]);
  const [checkedStates, setCheckedStates] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      const response = await fetch(
        "http://localhost/WebApi/api/Student/GetFavStops?id=1",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setData(responseData);
        setCheckedStates(Array(responseData.length).fill(false));
      }
    };
    fetchStudentData();
  }, []);

  const handleCheckboxPress = (index) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
  };

  const handleRemove = async () => {
    const newData = [];
    const newCheckedStates = [];

    for (let i = 0; i < data.length; i++) {
      if (checkedStates[i]) {
        // Make the API call to remove the favorite stop
        const response = await fetch(
          `http://localhost/WebApi/api/Student/RemoveFavStop?studentId=1&stopId=${data[i].Id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          console.error(`Failed to remove stop with ID: ${data[i].Id}`);
          newData.push(data[i]); // If the delete fails, keep the item in the list
          newCheckedStates.push(false);
        }
      } else {
        newData.push(data[i]);
        newCheckedStates.push(false);
      }
    }
    
    setData(newData);
    setCheckedStates(newCheckedStates);
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
              <p className="StopNametextStyle">{item.Name} </p>
              <p className="RouteNotextStyle">Route: {item.Route} </p>
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
