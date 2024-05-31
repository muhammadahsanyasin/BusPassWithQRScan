import React, { useEffect, useState } from "react";
import busarrived from '../../Assets/busarrived.png';
import checkout from '../../Assets/checkout.png';
import checkin from '../../Assets/checkin.png';
import scanqrcode from '../../Assets/scanqrcode.png';

function StudentNotification() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "http://localhost/WebApi/api/Users/GetUserNotification?id=3",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log('API Response:', responseData);  // Log the full response to see its structure

        if (Array.isArray(responseData)) {
          setData(responseData);
        } else {
          throw new Error(`Expected an array but got: ${JSON.stringify(responseData)}`);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError(error.message);
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
          {error && <p className="error">{error}</p>}
          {data.map((student) => (
            <div className="notifications" key={student.Id}>
              <div className="single-box unseen">
                <div className="avatar">
                  <img src={checkout} alt="checkout" />
                </div>
                <div className="box-text">
                  <p className="notifi">
                    <a href="#" className="name">
                      {student.Type}
                    </a>
                    <br />
                    {student.Description}
                  </p>
                  <p className="time">{student.Time}</p>
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
