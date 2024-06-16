import React, { useEffect, useState } from "react";
import "../Pages/Styles/ParentProfile.css";
import profile from "../../Assets/profile.png";
import { Link ,useNavigate} from "react-router-dom";

function ParentProfile() {
  const [api, setApi] = useState(
    "http://localhost/WebApi/api/Users/GetUserById/1"
  );
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    alert("You have been logged out.");
    navigate('/');
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          setData(result);
          console.log(result);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [api]);

  if (!data || !data.Parents) {
    return <div>Loading...</div>;
  }

  return (
    <div className="parent-profile">
      <div className="parentprofile-container">
        <div className="person-icon">
          <img src={profile} alt="Person Icon" />
        </div>

        <div className="person-details">
          <h2>{data.Parents.Name}</h2>
          <p>Parent ID: {data.Parents.Id}</p>
        </div>
        <div className="table-container">
          <div className="row">
            <div className="col">
              Contact No
              <h4>{data.Parents.Contact}</h4>
            </div>
            <div className="col">
              Children Enrolled
              <h4>{data.Parents.ChildrenEnroll}</h4>
            </div>
          </div>
          <hr className="dividerparent" />
          <div className="row">
            <div className="col">
              Parent ID
              <h4>{data.Parents.Id}</h4>
            </div>
            <div className="col">
              User Name
              <h4>{data.Parents.UserName}</h4>
            </div>
          </div>
        </div>
      </div>
      <Link to="/ParentHistory">
        <button className="parenthistory-button edit-stops">History</button>
      </Link>
      {/* <Link to="/AdminChangePassword">
        <button className="parentchangepwd-button edit-stops">
          Change Password
        </button>
      </Link> */}
     
        <button onClick={handleLogout} className="parentlogout-button edit-stops">Log Out</button>
      
    </div>
  );
}

export default ParentProfile;
