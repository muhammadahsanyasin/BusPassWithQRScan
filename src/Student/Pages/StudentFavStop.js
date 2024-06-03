import React, { useState, useEffect } from 'react';
import '../Pages/Styles/StudentFavStop.css';

function StudentFavStop() {
  const [data, setData] = useState([]);
  const [checkedStates, setCheckedStates] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          "http://192.168.10.19/WebApi/api/Student/GetFavStops?id=2",
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
    const itemsToRemove = data.filter((item, index) => checkedStates[index]);
    const studentId = 2; // Assuming studentId is 2 as per the fetch URL

    try {
      for (const item of itemsToRemove) {
        const stopId = item.Id;
        const response = await fetch(
          `http://192.168.10.19/WebApi/api/Student/RemoveFavStop?studentId=${studentId}&stopId=${stopId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to remove stop with id ${stopId}: ${response.statusText}`);
        }
      }

      // After successful removal, update the data and checked states
      const updatedData = data.filter((item, index) => !checkedStates[index]);
      setData(updatedData);
      setCheckedStates(Array(updatedData.length).fill(false));

    } catch (error) {
      console.error("Error removing stops:", error);
    }
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
