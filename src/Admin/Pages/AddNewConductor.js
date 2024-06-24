import React, { useState } from "react";
import "../Pages/Styles/AddNewConductor.css";
import buslogo from "../../Assets/buslogo.png";

function AddNewConductor() {
  const [formData, setFormData] = useState({
    Name: "",
    Contact: "",
    Password: "",
    OrganizationId: 1, // Adding default OrganizationId
  });

  const conductordata = async () => {
    console.log('Form Data:', formData);

    try {
      const response = await fetch("http://localhost/WebApi/api/Users/InsertConductor", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', // Set headers for JSON data
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Data saved to server');
        alert('Data saved successfully!');
      } else {
        const errorData = await response.json();
        console.error('Error saving data:', errorData);
        alert(`Error saving data: ${errorData.message || errorData}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert(`Error saving data: ${error.message}`);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Spread the existing form data
      [name]: value, // Update the specific field
    });
  };

  return (
    <div className="addnewconductor-container">
      <div className="icon-container-addnewconductor">
        <img src={buslogo} alt="Bus Icon" />
      </div>

      <div className="conductorinput-container">
        <div className="stop-info">
          <h2 style={{ userSelect: 'none' }}>Conductor Information</h2>
        </div>

        <input
          type="text"
          placeholder="Name"
          name="Name"
          value={formData.Name}
          onChange={handleInput}
        />
        <input
          type="text"
          placeholder="Contact No"
          name="Contact"
          value={formData.Contact}
          onChange={handleInput}
        />
        <input
          type="password" // Change to password input for better security
          placeholder="Password"
          name="Password"
          value={formData.Password}
          onChange={handleInput}
        />
      </div>

      <button onClick={conductordata} className="addnewconductor-button edit-stops">
        ADD
      </button>
    </div>
  );
}

export default AddNewConductor;
