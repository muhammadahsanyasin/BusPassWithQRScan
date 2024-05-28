import React, { useState, useEffect } from 'react';
import '../Pages/Styles/StudentHistory.css';

function StudentHistory() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');

  useEffect(() => {
    const fetchStudentData = async () => {
      const response = await fetch(
        "http://localhost/WebApi/api/Users/GetUserHistory?id=3&fDate=2024-05-15&tDate=2024-05-23",
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
        setFilteredData(jsonData); // Initialize filteredData with the fetched data
        console.log(jsonData);
      }
    };
    fetchStudentData();
  }, []);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    filterData(date, selectedEndDate);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    filterData(selectedStartDate, date);
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
                onChange={(e) => handleStartDateChange(e.target.value)}
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
                onChange={(e) => handleEndDateChange(e.target.value)}
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

export default StudentHistory;
