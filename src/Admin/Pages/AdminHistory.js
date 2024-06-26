import React, { useState, useEffect } from "react";
import "../Pages/Styles/AdminHistory.css";

function AdminHistory() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');

  const fetchAdminData = async (startDate, endDate) => {
    try {
      const response = await fetch(
        `http://localhost/WebApi/api/Users/GetUserHistory?id=4&fDate=${startDate}&tDate=${endDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
        setFilteredData(jsonData);
        console.log(jsonData);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      fetchAdminData(selectedStartDate, selectedEndDate);
    }
  }, [selectedStartDate, selectedEndDate]);

  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (e) => {
    const date = e.target.value;
    setSelectedEndDate(date);
  };

  const filterData = (startDate, endDate) => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const filtered = data.filter((item) => {
        const itemDate = new Date(item.Date.split(' ')[0]);
        return itemDate >= start && itemDate <= end;
      });

      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <div className="historypagecontainer">
      <div className="picker-container">
        <div className="picker-wrapper">
          <label className="picker-text">From :</label>
          <div className="daypicker-container">
            <label htmlFor="startDate">
              <input
                type="date"
                id="startDate"
                value={selectedStartDate}
                onChange={handleStartDateChange}
              />
            </label>
          </div>
        </div>
        <div className="picker-wrapper">
          <label className="picker-text">To :</label>
          <div className="daypicker-container">
            <label htmlFor="endDate">
              <input
                type="date"
                id="endDate"
                value={selectedEndDate}
                onChange={handleEndDateChange}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="flat-list">
        {filteredData.map((item, index) => (
          <div className="flat-list-row" key={index}>
            <p className="date-time">{item.Date}, {item.Time}</p>
            <p className="history-type">{item.Type}</p>
            <p className="pass-history">Description: {item.Description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminHistory;
