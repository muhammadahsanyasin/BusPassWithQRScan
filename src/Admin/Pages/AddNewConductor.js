import React, { useState } from "react";
import "../Pages/Styles/AddNewConductor.css";
import buslogo from "../../Assets/buslogo.png";
function AddNewConductor() {
  

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

    <div className="addnewconductor-container">
      <div className="icon-container-addnewconductor">
        <img src={buslogo} alt="Bus Icon" />
      </div>

      <form className="input-container" onSubmit={savedata}>
        <div className="stop-info">
          <h2 style={{userSelect: 'none'}}>Conductor Information</h2>
        </div>

        <input type="text" placeholder="Name" name="Name" onChange={handleinput} />
        <input type="text" placeholder="Password" name="PickupTime"  onChange={handleinput}/>
        <input type="text" placeholder="Contact No" name="DropoffTime" onChange={handleinput} />
        <input type="text" placeholder="Bus ID" name="StopNo"  onChange={handleinput} />


        <button className=" addnewconductor-button  edit-stops">ADD</button>
       
      </form>
          
          
    </div>
  );
}

export default AddNewConductor;
