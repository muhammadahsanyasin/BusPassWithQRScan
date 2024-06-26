import React, { useState } from "react";
import "../Components/Styles/ChangePassword.css";
import lock from "../../Assets/lock.png";

function AdminChangePassword() {
  const [formdata, setFormData] = useState({
    id: "",
    oldPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formdata.id) newErrors.id = "ID is required";
    if (!formdata.oldPassword) newErrors.oldPassword = "Old Password is required";
    if (!formdata.newPassword) {
      newErrors.newPassword = "New Password is required";
    } else if (formdata.newPassword.length < 2) {
      newErrors.newPassword = "New Password must be at least 2 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const changepassword = async () => {
    if (!validateForm()) return;

    console.log("Form Data:", formdata);

    try {
      const response = await fetch("http://localhost/WebApi/api/users/ChangePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      if (response.ok) {
        console.log("Password changed successfully");
        alert("Password changed successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error changing password:", errorData);
        alert(`Error changing password: ${errorData.message || JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert(`Error changing password: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="changepassword-screen">
      <div className="changepassword-container">
        <div className="lock-icon">
          <img src={lock} alt="Lock Icon" />
        </div>
        <div className="password-fields">
          <input
            type="text"
            name="id"
            placeholder="ID"
            onChange={handleInputChange}
            value={formdata.id}
          />
          {errors.id && <span className="error">{errors.id}</span>}
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            onChange={handleInputChange}
            value={formdata.oldPassword}
          />
          {errors.oldPassword && <span className="error">{errors.oldPassword}</span>}
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={handleInputChange}
            value={formdata.newPassword}
          />
          {errors.newPassword && <span className="error">{errors.newPassword}</span>}
        </div>
      </div>
      <button onClick={changepassword} className="addnewconductor-button edit-stops">
        Confirm
      </button>
    </div>
  );
}

export default AdminChangePassword;
