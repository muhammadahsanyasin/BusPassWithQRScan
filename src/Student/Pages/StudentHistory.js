import React, { useState,useEffect } from 'react';
import '../Pages/Styles/StudentHistory.css';

function StudentHistory() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const studentdata = async () => {
      const response = await fetch(
        "http://localhost/WebApi/api/Parent/getChildrenHistory?studentId=1",
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

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  return (
    <div className="historypagecontainer">
      <div className="picker-container">
        <div className="picker-wrapper">
          <label className="picker-text">From :</label>
          <div className="daypicker-container">
            <label htmlFor="selectedDate">
             
              <input
                type="date"
                id="selectedDate"
                value={selectedDate}
                onChange={(e) => handleDateChange(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="picker-wrapper">
          <label className="picker-text">To :</label>
          <div className="daypicker-container">
            <label htmlFor="selectedDate">
           
              <input
                type="date"
                id="selectedDate"
                value={selectedDate}
                onChange={(e) => handleDateChange(e.target.value)}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="flat-list">
        {data.map((item, index) => (
          <div className="flat-list-row" >
            <p className="date-time">{item.date}, {item.time}</p>
            <p className="history-type">{item.type}</p>
            <p className="pass-history">PassID :{item.pass.pass_id}</p>
            <p className="pass-history">Stop Name :{item.stopName}</p>
            <p className="pass-history">Route # :{item.routeId}</p>
            <p className="pass-history">Bus # :{item.bus.bus_id}</p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentHistory;
