import React, { useState, useEffect } from 'react';
import '../Pages/Styles/ConductorHistory.css';

// Function to fetch children data
const fetchChildren = async (setChildren) => {
  try {
    const response = await fetch("http://localhost/WebApi/api/Parent/GetChildren?parentId=1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      setChildren(data);
    } else {
      console.error('Failed to fetch children');
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};




function ConductorHistory() {
  const [children, setChildren] = useState([]);
  const [childHistory, setChildHistory] = useState([]);
  const [selectedChild, setSelectedChild] = useState('');
  const [selectedDateFrom, setSelectedDateFrom] = useState('');
  const [selectedDateTo, setSelectedDateTo] = useState('');

  // Fetch children data on component mount
  useEffect(() => {
    fetchChildren(setChildren);
  }, []);



  const handleDateFromChange = (e) => {
    setSelectedDateFrom(e.target.value);
  };

  const handleDateToChange = (e) => {
    setSelectedDateTo(e.target.value);
  };

  const handleChildChange = (e) => {
    setSelectedChild(e.target.value);
  };

  return (
    <div className="historypagecontainer">
      <div className="picker-container">
        <div className="picker-wrapper">
          <label className="picker-text">From :</label>
          <div className="daypicker-container">
            <input
              type="date"
              id="selectedDateFrom"
              value={selectedDateFrom}
              onChange={handleDateFromChange}
            />
          </div>
        </div>
        <div className="picker-wrapper">
          <label className="picker-text">To :</label>
          <div className="daypicker-container">
            <input
              type="date"
              id="selectedDateTo"
              value={selectedDateTo}
              onChange={handleDateToChange}
            />
          </div>
        </div>
      </div>

      <div className="childhistory-dropdown">
        <select value={selectedChild} onChange={handleChildChange}>
          <option value="">Select child</option>
          {children.map(({ childDetails }) => (
            <option value={childDetails.PassId} key={childDetails.PassId}>
              {childDetails.Name}
            </option>
          ))}
        </select>
      </div>
      <div className="flat-list">
        {childHistory.map((item, index) => (
          <div className="flat-list-row" key={index}>
            <p className="date-time">{item.Date}, {item.Time}</p>
            <p className="history-type">{item.Type}</p>
           
            <p className="pass-history">Stop Name: {item.StopId}</p>
            <p className="pass-history">Time #: {item.RouteId}</p>
            <p className="pass-history">Date #: {item.BusId}</p>
            <p className="pass-history">Route #: {item.StudentName}</p>
            <p className="pass-history">Student Scan: {item.StudentName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConductorHistory;
