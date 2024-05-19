import React, { useState } from "react";
import "../Pages/Styles/AddNewStudent.css";

function AddNewStudent() {
  const [isNewParent, setIsNewParent] = useState(true);

  const [formdata, setFormData] = useState({});

  const handleinput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata, //spread opt
      [name]: value,
    });

    console.log(formdata);
  };

  const savedata = (e) => {
    e.preventDefault();
    console.log("data  saved ");
  };

  return (
    <div className="container">
      <form  className="addstudent-form"  onSubmit={savedata}>
        <h2>Student Information</h2>
        <div>
          {/* <label htmlFor="name">Name:</label> */}
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
           onChange={handleinput}
          />
        </div>
        <div>
          {/* <label htmlFor="registrationNo">Registration No:</label> */}
          <input
            type="text"
            id="registrationNo"
            name="registrationNo"
            placeholder="Registration No"
            onChange={handleinput}
          />
        </div>
        <div>
          {/* <label htmlFor="password">Password:</label> */}
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleinput}
          />
        </div>
        <div>
          {/* <label htmlFor="contactNo">Contact No:</label> */}
          <input
            type="text"
            id="contactNo"
            name="contactNo"
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
                id="parentName"
                name="parentName"
                placeholder="Name"
                onChange={handleinput}
              />
            </div>
            <div>
              {/* <label htmlFor="parentPassword">Password:</label> */}
              <input
                type="password"
                id="parentPassword"
                name="parentPassword"
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
        {/* <button>Submit</button> */}
      </form>
    </div>
  );
}

export default AddNewStudent;
