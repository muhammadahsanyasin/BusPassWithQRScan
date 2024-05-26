import React,{useState} from 'react'
import { useParams } from "react-router-dom"; // Assuming you're using React Router for navigation
import checkout from "../../Assets/checkout.png"; // Import the image path here

function AdminNotificattionDetail() {

  const [admin, setadmin] = useState(JSON.parse(localStorage.getItem('user')))
  const [api, setApi] = useState(admin?  `http://localhost/WebApi/api/users/GetUserById?id=${admin.user.id}` :  null);
  const [data, setdata] = useState("");
  const [loginstatusrole, setloginstatusrole] = useState(admin? admin.user.role : null)

    const { NotificationType } = useParams(); // Assuming NotificationType is passed as a parameter through React Router



    if(admin==null)
      {
        window.location.assign("/login")
      }
  
      if(loginstatusrole!=="Admin")
        {
          return <h1>you are not logged in as admin</h1>
        }
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

export default AdminNotificattionDetail