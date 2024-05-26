import React, { useState } from "react";
import "../Pages/Styles/AdminHistory.css";
function AdminHistory() {

  const [admin, setadmin] = useState(JSON.parse(localStorage.getItem('user')))
  const [api, setApi] = useState(admin?  `http://localhost/WebApi/api/users/GetUserById?id=${admin.user.id}` :  null);
 
  const [loginstatusrole, setloginstatusrole] = useState(admin? admin.user.role : null)


  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  if(admin==null)
    {
      window.location.assign("/login")
    }

    if(loginstatusrole!=="Admin")
      {
        return <h1>you are not logged in as admin</h1>
      }

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
          <div className="flat-list-row" key={index}>
            <p className="date-time">Today, 11:30 AM</p>
            <p className="history-type">History Type</p>
            <p className="history-description">Description</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminHistory;
