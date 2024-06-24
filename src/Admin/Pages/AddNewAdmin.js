import React, { useState } from "react";
import "../Pages/Styles/AddNewAdmin.css";
import buslogo from "../../Assets/buslogo.png";

function AddNewAdmin() {
  const [formdata, setFormData] = useState({
    Name: "",
    Gender: "",
    Contact: "",
    Password: "",
    OrganizationId: 1, // Adding default OrganizationId
  });

  const admindata = async () => {
    console.log("Form Data:", formdata);

    try {
      const response = await fetch(
        "http://localhost/WebApi/api/Users/InsertAdmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set headers for JSON data
          },
          body: JSON.stringify(formdata),
        }
      );

      if (response.ok) {
        console.log("Data saved to server");
        alert("Data saved successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error saving data:", errorData);
        alert(`Error saving data: ${errorData.message || errorData}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert(`Error saving data: ${error.message}`);
    }
  };

  const handleinput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="addnewadmin-container">
      <div className="icon-container-newAdmin">
        <img src={buslogo} alt="Bus Icon" />
      </div>

      <div className="stop-info">
        <h2 style={{ userSelect: "none" }}>Admin Info</h2>
      </div>
      <div className="form-container">
        <input
          type="text"
          placeholder="UserName"
          name="Name"
          onChange={handleinput}
          value={formdata.Name}
        />
        <input
          type="text"
          placeholder="Password"
          name="Password"
          onChange={handleinput}
          value={formdata.Password}
        />
        <input
          type="text"
          placeholder="Contact Number"
          name="Contact"
          onChange={handleinput}
          value={formdata.Contact}
        />

        <div className="gender-option">
          <div className="radio-group">
            <label>Gender:</label>
            <label className="radio-label">
              <input
                type="radio"
                name="Gender"
                value="male"
                onChange={handleinput}
                checked={formdata.Gender === "male"}
              />
              Male
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="Gender"
                value="female"
                onChange={handleinput}
                checked={formdata.Gender === "female"}
              />
              Female
            </label>
          </div>
        </div>

        <button onClick={admindata} className="addnewadmin-button edit-stops">
          ADD
        </button>
      </div>
    </div>
  );
}

export default AddNewAdmin;
