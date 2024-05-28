import React, { useState, useEffect } from 'react';
import '../Pages/Styles/StudentFavStop.css';

function StudentFavStop() {
  const [data, setData] = useState([]);
  const [checkedStates, setCheckedStates] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          "http://localhost/WebApi/api/Student/GetFavStops?id=2",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          if (Array.isArray(responseData)) {
            setData(responseData);
            setCheckedStates(Array(responseData.length).fill(false));
          } else {
            console.error("Fetched data is not an array:", responseData);
          }
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
    const updatedData = [];
    const updatedCheckedStates = [];

    for (let i = 0; i < data.length; i++) {
      if (checkedStates[i]) {
        try {
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
            updatedData.push(data[i]);
            updatedCheckedStates.push(false);
          }
        } catch (error) {
          console.error(`Error removing stop with ID: ${data[i].Id}`, error);
          updatedData.push(data[i]);
          updatedCheckedStates.push(false);
        }
      } else {
        updatedData.push(data[i]);
        updatedCheckedStates.push(false);
      }
    }

    setData(updatedData);
    setCheckedStates(updatedCheckedStates);
  };

  return (
    <div className="student-fav-stop-container">
      <div className="remove-btn-container">
        <button className="btn" onClick={handleRemove}>
          <span>REMOVE</span>
        </button>
      </div>
      <div className="stop-list">
        {Array.isArray(data) && data.map((item, index) => (
          <div className="flatListRow" key={item.Id}>
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
