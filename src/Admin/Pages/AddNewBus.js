import React, { useState } from "react";
import "../Pages/Styles/AddNewBus.css";
import buslogo from "../../Assets/buslogo.png";

function AddNewBus() {

  
  const [admin, setadmin] = useState(JSON.parse(localStorage.getItem('user')))
  const [api, setApi] = useState(admin?  `http://localhost/WebApi/api/users/GetUserById?id=${admin.user.id}` :  null);
 
  const [loginstatusrole, setloginstatusrole] = useState(admin? admin.user.role : null)


  const [formdata, setFormData] = useState({ })

 
  const busdata = async () => {
    console.log('Form Data:', formdata);

    try {
      const response = await fetch("http://localhost/WebApi/api/Bus/addBus", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', // Set headers for JSON data
        },
        body: JSON.stringify(formdata),
      });

      if (response.ok) {
        console.log('Data saved to server');
        alert('Data saved successfully!');
      } else {
        const errorData = await response.json();
        console.error('Error saving data:', errorData);
        alert(`Error saving data: ${errorData}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert(`Errrr saving data: ${error.message}`);
    }
  };
  
  const handleinput = (e) =>{
    const {name, value} = e.target;
    setFormData({
      ...formdata,//spread opt
      [name]: value})

      console.log(formdata)
  }

  if(admin==null)
    {
      window.location.assign("/login")
    }

    if(loginstatusrole!=="Admin")
      {
        return <h1>you are not logged in as admin</h1>
      }

  return (
    <div className="addnewbus-container" >
      <div className="icon-container-addbus">
        <img src={buslogo} alt="Bus Icon" />
      </div>

      <div className="booked-seats">
        <div className="progress-circle"  style={{background: `conic-gradient(#80cbc4 0% 29%, #004d40 29% 100%)`}}>
          <div className="progress-circle-inner">
            <div className="progress-circle-half" style={{ transform: `rotate(${59 * 3.6}deg)` }}></div>
            <span>59/100</span>
          </div>
        </div>
      </div>

      <div className="addnewbusform-container" >
        <div className="stop-info">
          <h2>Bus Information</h2>
        </div>
        <input
          type="text"
          placeholder="Bus Registration Number"
          name="regno" onChange={handleinput}
        />
        <input
          type="text"
          placeholder="Bus Seats"
          name="totalSeats" onChange={handleinput}
        />

        <select name="route_id" onChange={handleinput}>
          <option value="">Route ID</option>
          <option value="1">Route 1</option>
          <option value="2">Route 2</option>
        </select>


        
      </div>

      <button onClick={busdata} className=" addnewbus-button edit-stops">ADD</button>
    </div>
  );
}

export default AddNewBus;
