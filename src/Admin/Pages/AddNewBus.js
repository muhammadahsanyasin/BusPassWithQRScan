import React, { useState } from "react";
import "../Pages/Styles/AddNewBus.css";
import buslogo from "../../Assets/buslogo.png";

function AddNewBus() {

  
  const [formdata, setFormData] = useState({ })

  const handleinput = (e) =>{
    const {name, value} = e.target;
    setFormData({
      ...formdata,//spread opt
      [name]: value})

      console.log(formdata)
  }


  const savedata = (e)=>{
    e.preventDefault();
    console.log('data  saved to backend')
  }
  return (
    <form className="addnewbus-container" onSubmit={savedata}>
      <div className="icon-container-addbus">
        <img src={buslogo} alt="Bus Icon" />
      </div>

      <div className="addnewbusform-container" >
        <div className="stop-info">
          <h2>Bus Information</h2>
        </div>
        <input
          type="text"
          placeholder="Bus Registration Number"
          name="BusRegNo" onChange={handleinput}
        />
        <input
          type="text"
          placeholder="Bus Seats"
          name="BusSeats" onChange={handleinput}
        />

        <select >
          <option value="">Route ID</option>
          <option value="route1">Route 1</option>
          <option value="route2">Route 2</option>
        </select>


        
      </div>

      <button className=" addnewbus-button edit-stops">ADD</button>
    </form>
  );
}

export default AddNewBus;
