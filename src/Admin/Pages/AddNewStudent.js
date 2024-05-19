import React, { useState } from "react";
import "../Pages/Styles/AddNewStudent.css";

function AddNewStudent() {
  const [isNewParent, setIsNewParent] = useState(true);
 
  const [formdata, setFormData] = useState({ })

 
  const studentdata = async () => {
    console.log('Form Data:', formdata);

    try {
      const response = await fetch("http://localhost/WebApi/api/users/InsertStudent", {
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
    <div className="container">
      
        <h2>Student Information</h2>
        <div>
          {/* <label htmlFor="name">Name:</label> */}
          <input
            type="text"
            id="Name"
            name="Name"
            placeholder="Name"
           onChange={handleinput}
          />
        </div>
        <div>
          {/* <label htmlFor="registrationNo">Registration No:</label> */}
          <input
            type="text"
            id="RegNo"
            name="RegNo"
            placeholder="Registration No"
            onChange={handleinput}
          />
        </div>
        <div>
          {/* <label htmlFor="password">Password:</label> */}
          <input
            type="password"
            id="Password"
            name="Password"
            placeholder="Password"
            onChange={handleinput}
          />
        </div>
        <div>
          {/* <label htmlFor="contactNo">Contact No:</label> */}
          <input
            type="text"
            id="Contact"
            name="Contact"
            placeholder="Contact No"
            onChange={handleinput}
          />
        </div>
        <div>
          <label>Gender:</label>
          <label>
            <input type="radio" name="gender" value="male" onChange={handleinput} />
            Male
            <input type="radio" name="gender" value="female"  onChange={handleinput}/>
            Female
          </label>
        </div>
        <div>
          <label>Parent:</label>
          <label>
            <input
              type="radio"
              name="parentType"
              value="new"
              checked={isNewParent}
              onChange={() => setIsNewParent(true)}

            />
            New
            <input
              type="radio"
              name="parentType"
              value="existing"
              checked={!isNewParent}
              onChange={() => setIsNewParent(false)}
            />
            Existing
          </label>
        </div>
        {isNewParent ? (
          <div>
            <h3>Parent Information</h3>
            <div>
              {/* <label htmlFor="parentName">Name:</label> */}
              <input
                type="text"
                id="UserName"
                name="UserName"
                placeholder="Name"
                onChange={handleinput}
              />
            </div>
            <div>
              {/* <label htmlFor="parentPassword">Password:</label> */}
              <input
                type="password"
                id="Password"
                name="Password"
                placeholder="Password"
                onChange={handleinput}
              />
            </div>
            <div>
              {/* <label htmlFor="parentContactNo">Contact No:</label> */}
              <input
                type="text"
                id="parentContactNo"
                name="parentContactNo"
                placeholder="Contact No"
                onChange={handleinput}
              />
            </div>
          </div>
        ) : (
          <div>
            <label htmlFor="parentId">Parent ID:</label>
            <select id="parentId" name="parentId" onChange={handleinput}>
              {/* Populate options with existing parent IDs */}
              <option value="1">Parent 1</option>
              <option value="2">Parent 2</option>
            </select>
          </div>
        )}
        <button onClick={studentdata} className=" addnewconductor-button  edit-stops">ADD</button>
        {/* <button>Submit</button> */}
      
    </div>
  );
}

export default AddNewStudent;
