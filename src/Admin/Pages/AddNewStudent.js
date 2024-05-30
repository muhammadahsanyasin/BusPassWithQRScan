import React, { useState } from "react";
import "../Pages/Styles/AddNewStudent.css";

function AddNewStudent() {

 


  const [isNewParent, setIsNewParent] = useState(true);
  const [formdata, setFormData] = useState({});

  const studentdata = async () => {
    console.log('Form Data:', formdata);

    try {
      const response = await fetch("http://localhost/WebApi/api/Users/InsertStudent", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
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
      alert(`Error saving data: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
    console.log(formdata);
  };


  
  return (
    <div className="add-new-student-container">
      <h2>Student Information</h2>
      <div className="input-group">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          id="regno"
          name="regno"
          placeholder="Registration No"
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          id="contact"
          name="contact"
          placeholder="Contact No"
          onChange={handleInputChange}
        />
      </div>
      <div className="radio-group">
        <label>Gender:</label>
        <label className="radio-label">
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={handleInputChange}
          />
          Male
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={handleInputChange}
          />
          Female
        </label>
      </div>
      <div className="radio-group">
        <label>Parent:</label>
        <label className="radio-label">
          <input
            type="radio"
            name="role"
            value="new"
            checked={isNewParent}
            onChange={() => setIsNewParent(true)}
          />
          New
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="role"
            value="existing"
            checked={!isNewParent}
            onChange={() => setIsNewParent(false)}
          />
          Existing
        </label>
      </div>
      {isNewParent ? (
        <div className="new-parent-info">
          <h3>Parent Information</h3>
          <div className="input-group">
            <input
              type="text"
              id="parentName"
              name="parentName"
              placeholder="Name"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              id="parentPassword"
              name="parentPassword"
              placeholder="Password"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              id="parentContact"
              name="parentContact"
              placeholder="Contact No"
              onChange={handleInputChange}
            />
          </div>
        </div>
      ) : (
        <div className="existing-parent-info">
          <label htmlFor="parent_id">Parent ID:</label>
          <select id="parent_id" name="parent_id" onChange={handleInputChange}>
            {/* Populate options with existing parent IDs */}
            <option value="1">Parent 1</option>
            <option value="2">Parent 2</option>
          </select>
        </div>
      )}
      <button onClick={studentdata} className="add-student-button">
        ADD
      </button>
    </div>
  );
}

export default AddNewStudent;
