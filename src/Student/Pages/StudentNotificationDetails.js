import React from "react";
import { useParams } from "react-router-dom"; // Assuming you're using React Router for navigation
import "../Pages/Styles/StudentNotificationDetails.css";
import checkout from "../../Assets/checkout.png"; // Import the image path here

function StudentNotificationDetails() {
  const { NotificationType } = useParams(); // Assuming NotificationType is passed as a parameter through React Router

  return (
    <div className="studentnotificationdetailscontainer">
      <div className="notificationdetails">
        <div className="topContainer">
          <img
            src={checkout}
            alt="Notification Image"
            className="notificationImage" // Added class for styling control
          />
          <span className="notificationType">{NotificationType}</span>
        </div>
        <div className="bottomContainer">
          <div className="content">
            <span className="notificationDescriptionHeader">Date</span>
            <span className="notificationDescriptionData">11/11/2024</span>
            <span className="notificationDescriptionHeader">Time</span>
            <span className="notificationDescriptionData">11:30 AM</span>
            <hr className="divider" />
            <span className="notificationDescriptionHeader">Description</span>
            <span className="notificationDescriptionData">
              Bus has Arrived at Chandni Chowk. Wait Time is 10 Minutes.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentNotificationDetails;
