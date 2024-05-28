import React, { useEffect, useState } from "react";
import checkout from '../../Assets/checkout.png';

function StudentNotification() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch(
        "http://localhost/WebApi/api/Users/GetUserNotification?id=3",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);  // Log the data to see its structure
        if (responseData && responseData.status === true && Array.isArray(responseData.data)) {
          // Sort notifications based on Time in descending order
          const sortedData = responseData.data.sort((a, b) => new Date(b.Time) - new Date(a.Time));
          setData(sortedData);
        } else {
          console.error("Expected an array in the data property but got:", responseData);
        }
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div>
      <div className="parent-notification">
        <div className="wrapper">
          <div className="top-bar">
            <div className="title">
              <p className="title-text">Notifications</p>
              <p className="num" id="num">
                {data.length}
              </p>
            </div>
            <a href="#" className="read" id="read">
              Mark all as read
            </a>
          </div>
          {data.map((admin) => (
            <div className="notifications" key={admin.Id}>
              <div className="single-box unseen">
                <div className="avatar">
                  <img src={checkout} alt="checkout" />
                </div>
                <div className="box-text">
                  <p className="notifi">
                    <a href="#" className="name">
                      {admin.Type}
                    </a>
                    <br />
                    {admin.Description}
                  </p>
                  <p className="time">{admin.Time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentNotification;
