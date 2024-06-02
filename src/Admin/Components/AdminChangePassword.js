import React, { useState } from "react";
import "../Components/Styles/ChangePassword.css";
import lock from '../../Assets/lock.png';

function AdminChangePassword() {
  const [formdata, setFormData] = useState({ });

  const changepasword = async () => {
    console.log('Form Data:', formdata);

    try {
      const response = await fetch("http://localhost/WebApi/api/users/InsertAdmin", {
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
      alert(`Error saving data: ${error.message}`);
    }
  };
  
  const handleinput = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  return (
    <div className="changepasword-screen">
      <div className="changepasword-container">
        <div className="lock-icon">
          <img src={lock} alt="Lock Icon" />
        </div>
        <div className="password-fields">
          <input type="text" name="id" placeholder="ID" onChange={handleinput} />
          <input type="Password" name="oldPassword" placeholder="Old Password" onChange={handleinput} />
          <input type="Password" name="newPassword" placeholder="New Password" onChange={handleinput} />
        </div>
      </div>
      <button onClick={changepasword} className="addnewconductor-button edit-stops">Confirm</button>
    </div>
  );
}

export default AdminChangePassword;
