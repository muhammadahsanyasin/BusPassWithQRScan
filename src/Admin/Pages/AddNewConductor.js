import React, { useState,useEffect } from "react";
import "../Pages/Styles/AddNewConductor.css";
import buslogo from "../../Assets/buslogo.png";
function AddNewConductor() {
  


  const [formdata, setFormData] = useState({ })

 
  const conductordata = async () => {
    console.log('Form Data:', formdata);

    try {
      const response = await fetch("http://localhost/WebApi/api/users/InsertConductor", {
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


  return (

    <div className="addnewconductor-container">
      <div className="icon-container-addnewconductor">
        <img src={buslogo} alt="Bus Icon" />
      </div>

   
        <div className="stop-info">
          <h2 style={{userSelect: 'none'}}>Conductor Information</h2>
        </div>

        <input type="text" placeholder="User Name" name="UserName" onChange={handleinput} />
        <input type="text" placeholder="Password" name="Password"  onChange={handleinput}/>
        <input type="text" placeholder="Contact No" name="Contact" onChange={handleinput} />
        <input type="text" placeholder="Bus ID" name="id"  onChange={handleinput} />


        <button onClick={conductordata} className=" addnewconductor-button  edit-stops">ADD</button>
    
          
          
    </div>
  );
}

export default AddNewConductor;
