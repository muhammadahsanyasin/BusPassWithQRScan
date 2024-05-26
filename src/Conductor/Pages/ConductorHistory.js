import React, { useState, useEffect } from 'react';
import '../Pages/Styles/ConductorHistory.css';

function ConductorHistory() {
  const [children, setChildren] = useState([]);
  const [childHistory, setChildHistory] = useState([]);
  const [selectedChild, setSelectedChild] = useState('');
  const [selectedDateFrom, setSelectedDateFrom] = useState('');
  const [selectedDateTo, setSelectedDateTo] = useState('');

  // Fetch children data on component mount
  useEffect(() => {
    const fetchChildren = async () => {
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

    fetchChildren();
  }, []);

  // Fetch child history when a child is selected
  useEffect(() => {
    if (selectedChild) {
      const fetchChildHistory = async () => {
        try {
          const response = await fetch(`http://localhost/WebApi/api/Parent/getChildrenHistory?studentId=${selectedChild}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const data = await response.json();
            setChildHistory(data);
          } else {
            console.error('Failed to fetch child history');
          }
        } catch (error) {
          console.error('Fetch error:', error);
        }
      };

      fetchChildHistory();
    }
  }, [selectedChild]);

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
          <option value="">Select a child</option>
          {children.map((child) => (
            <option key={child.regno} value={child.regno}>
              {child.username}
            </option>
          ))}
        </select>
      </div>

      {childHistory.length > 0 ? (
        <div className="flat-list">
          {childHistory.map((item, index) => (
            <div className="flat-list-row" key={index}>
              <p className="date-time">{item.date}, {item.time}</p>
              <p className="history-type">{item.type}</p>
              <p className="pass-history">PassID : {item.pass.pass_id}</p>
              <p className="pass-history">Stop Name : {item.stopName}</p>
              <p className="pass-history">Route # : {item.routeId}</p>
              <p className="pass-history">Bus # : {item.bus.bus_id}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No history available for the selected child.</p>
      )}
    </div>
  );
}

export default ConductorHistory;
