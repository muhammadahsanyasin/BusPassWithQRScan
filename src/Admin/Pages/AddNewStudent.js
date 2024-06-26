import React, { useState } from "react";
import "../Pages/Styles/AddNewStudent.css";

function AddNewStudent() {
  const [isNewParent, setIsNewParent] = useState(true);
  const [formdata, setFormData] = useState({
    studentName: "",
    studentRegNo: "",
    studentPassword: "",
    studentContact: "",
    studentGender: "",
    parentName: "",
    parentPassword: "",
    parentContact: "",
    parentId: "",
    OrganizationId: 1, // Default OrganizationId
    passExpiry: "", // Add passExpiry to the form data state
    totalJourneys: 50, // Default total journeys, can be modified if needed
  });
  const [studentImage, setStudentImage] = useState(null); // State to store selected image

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setStudentImage(e.target.files[0]);
  };

  const submitData = async () => {
    console.log("Form Data:", formdata);

    try {
      let parentId;
      if (isNewParent) {
        // Post parent data first if new parent
        const parentData = {
          Name: formdata.parentName,
          Contact: formdata.parentContact,
          Password: formdata.parentPassword,
          OrganizationId: formdata.OrganizationId,
        };

        const parentResponse = await fetch(
          "http://localhost/WebApi/api/Users/InsertParent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(parentData),
          }
        );

        if (parentResponse.ok) {
          const parentResult = await parentResponse.json();
          console.log("Parent data saved:", parentResult);
          parentId = parentResult.ParentId; // Assuming the API response contains the new parent ID
        } else {
          const errorData = await parentResponse.json();
          console.error("Error saving parent data:", errorData);
          alert(`Error saving parent data: ${errorData}`);
          return;
        }
      } else {
        parentId = formdata.parentId;
      }

      // Create FormData object to include image file
      const studentData = new FormData();
      studentData.append("Name", formdata.studentName);
      studentData.append("Gender", formdata.studentGender);
      studentData.append("RegNo", formdata.studentRegNo);
      studentData.append("Contact", formdata.studentContact);
      studentData.append("Password", formdata.studentPassword);
      studentData.append("PassExpiry", formdata.passExpiry);
      studentData.append("TotalJourneys", formdata.totalJourneys);
      studentData.append("ParentId", parentId);
      studentData.append("OrganizationId", formdata.OrganizationId);
      if (studentImage) {
        studentData.append("Image", studentImage);
      }

      const studentResponse = await fetch(
        "http://localhost/WebApi/api/Users/InsertStudent",
        {
          method: "POST",
          body: studentData,
        }
      );

      if (studentResponse.ok) {
        console.log("Student data saved to server");
        alert("Student data saved successfully!");
      } else {
        const errorData = await studentResponse.json();
        console.error("Error saving student data:", errorData);
        alert(`Error saving student data: ${errorData}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert(`Error saving data: ${error.message}`);
    }
  };

  return (
    <div className="add-new-student-container">
      <h2>Student Information</h2>
      <div className="input-group">
        <input
          type="text"
          id="studentName"
          name="studentName"
          placeholder="Name"
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          id="studentRegNo"
          name="studentRegNo"
          placeholder="Registration No"
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          id="studentPassword"
          name="studentPassword"
          placeholder="Password"
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          id="studentContact"
          name="studentContact"
          placeholder="Contact No"
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <input
          type="file"
          id="studentImage"
          name="studentImage"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="passExpiry">Pass Expiry Date:</label>
        <input
          type="date"
          id="passExpiry"
          name="passExpiry"
          onChange={handleInputChange}
        />
      </div>
      <div className="radio-group">
        <label>Gender:</label>
        <label className="radio-label">
          <input
            type="radio"
            name="studentGender"
            value="male"
            onChange={handleInputChange}
          />
          Male
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="studentGender"
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
          <label htmlFor="parentId">Parent ID:</label>
          <select id="parentId" name="parentId" onChange={handleInputChange}>
            {/* Populate options with existing parent IDs */}
            <option value="1">Parent 1</option>
            <option value="2">Parent 2</option>
          </select>
        </div>
      )}
      <button onClick={submitData} className="add-student-button">
        ADD
      </button>
    </div>
  );
}

export default AddNewStudent;
