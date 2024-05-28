import React, { useState, useEffect } from 'react';
import '../Pages/Styles/ParentHistory.css';

const fetchChildren = async (setChildren) => {
  try {
    const response = await fetch("http://localhost/WebApi/api/Parent/GetChildren?id=1", {
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

const fetchChildHistory = async (childId, fromDate, toDate, setChildHistory) => {
  try {
    const response = await fetch(`http://localhost/WebApi/api/Users/GetUserHistory?id=3&fDate=2024-05-15&tDate=2024-05-23`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      setChildHistory(Array.isArray(data) ? data : []);
    } else {
      console.error('Failed to fetch child history');
      setChildHistory([]);
    }
  } catch (error) {
    console.error('Fetch error:', error);
    setChildHistory([]);
  }
};

function ParentHistory() {
  const [selectedDateFrom, setSelectedDateFrom] = useState('');
  const [selectedDateTo, setSelectedDateTo] = useState('');
  const [selectedChild, setSelectedChild] = useState('');
  const [children, setChildren] = useState([]);
  const [childHistory, setChildHistory] = useState([]);

  useEffect(() => {
    fetchChildren(setChildren);
  }, []);

  const handleDateFromChange = (e) => {
    const newDateFrom = e.target.value;
    setSelectedDateFrom(newDateFrom);
    if (selectedChild && newDateFrom && selectedDateTo) {
      fetchChildHistory(selectedChild, newDateFrom, selectedDateTo, setChildHistory);
    }
  };

  const handleDateToChange = (e) => {
    const newDateTo = e.target.value;
    setSelectedDateTo(newDateTo);
    if (selectedChild && selectedDateFrom && newDateTo) {
      fetchChildHistory(selectedChild, selectedDateFrom, newDateTo, setChildHistory);
    }
  };

  const handleChildChange = (e) => {
    const childId = e.target.value;
    setSelectedChild(childId);
    if (childId && selectedDateFrom && selectedDateTo) {
      fetchChildHistory(childId, selectedDateFrom, selectedDateTo, setChildHistory);
    }
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
            <p className="pass-history">PassID: {item.PassId}</p>
            <p className="pass-history">Stop Name: {item.StopId}</p>
            <p className="pass-history">Route #: {item.RouteId}</p>
            <p className="pass-history">Bus #: {item.BusId}</p>
            <p className="pass-history">Student Name: {item.StudentName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParentHistory;
