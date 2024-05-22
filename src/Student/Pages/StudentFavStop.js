import React, { useState,useEffect } from 'react';
import '../Pages/Styles/StudentFavStop.css';

function StudentFavStop() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const studentdata = async () => {
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
        setdata(await response.json());
        console.log(data);
        return data;
      }
    };
    studentdata();
  }, []);
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
                <p className="StopNametextStyle">{item.Name} </p>
                <p className="RouteNotextStyle">Route:{item.Route} </p>
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
