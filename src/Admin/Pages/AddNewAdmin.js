import React, { useState } from "react";
import "../Pages/Styles/AddNewAdmin.css";
import buslogo from "../../Assets/buslogo.png";
function AddNewAdmin() {

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
    console.log('data  saved ')
  }
  return (
    <div className="addnewadmin-container">
      <div className="icon-container-newAdmin">
        <img src={buslogo} alt="Bus Icon" />
      </div>
      <form className="addadmin-content" onSubmit={savedata}>
        <div className="stop-info">
          <h2 style={{userSelect: 'none'}}>Admin Info</h2>
        </div>
        <div className="form-container">
          <input type="text" placeholder="Name" name="Name" onChange={handleinput}/>
          <input type="text" placeholder="Password" name="Password" onChange={handleinput}/>
          <input type="text" placeholder="Contact Number" name="ContactNumber" onChange={handleinput}/>

          <div className="gender-option">
            <span>Gender:</span>
            <label>
              <input
                type="radio"
                value="Female"
                checked={formdata.Gender==="Female"}
                onChange={handleinput}
              />
              Female
            </label>
            <label>
              <input
              
                type="radio"
                value="Male"
                checked={formdata.Gender==="Male"}
                onChange={handleinput}
              />
              Male
            </label>
          </div>
          
            <button className=" addnewadmin-button edit-stops">ADD</button>
          
        </div>
      </form>
    </div>
  );
}

export default AddNewAdmin;
