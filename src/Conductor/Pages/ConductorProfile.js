import React ,{useState,useEffect} from "react";
import profile from "../../Assets/profile.png";
import { Link } from "react-router-dom";
import '../Pages/Styles/ConductorProfile.css';
function ConductorProfile() {
  const [api, setapi] = useState(
    "http://localhost/WebApi/api/users/GetUserById?id=4"
  );
  const [data, setdata] = useState("");

  useEffect(() => {
    const conductordata = async () => {
      const response = await fetch(api, {
        method: "GET", //POST, PUT,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const d = await response.json();
        setdata(d);
        console.log(data);
      }
    };
    conductordata();
  }, []); //[] call only once

  if (data)
  return (
    <div className="conductor-profile">
      <div className="conductorprofile-container ">
        <div className="person-icon">
          <img src={profile} alt="Person Icon" />
        </div>

        <div className="person-details">
          <h2>{data.Conductors.Name}</h2>
          <p>32402-2852063-3</p>
        </div>

        <div class="table-container">
          <div class="row">
            <div class="col">
              Contact No
              {/* <h4>{data.Conductors.Contact}</h4> */}
              <h4>03015667</h4>
            </div>
            <div class="col">
              User Name
              <h4>{data.Conductors.UserName}</h4>
            </div>
          </div>
          <div class="row">
            <div class="col">
             Conductor ID
              <h4>{data.Conductors.UserId}</h4>
            </div>
            <div class="col">
              Bus ID
              <h4>{data.Conductors.Id}</h4>
            </div>
          </div>
        </div>
      </div>
      <Link to='/ConductorHistory' >
        
          <button className=" conductorhistory-button edit-stops">History</button>
       
      </Link>
      <Link to="/ChangePassword">
        
          <button className=" conductorchangepwd-button edit-stops">Change Password</button>
        
      </Link>

      <Link to='/'>
        
          <button className= " conductorlogout-button edit-stops">Log Out</button>
        
      </Link>
    </div>
  );
}

export default ConductorProfile;
