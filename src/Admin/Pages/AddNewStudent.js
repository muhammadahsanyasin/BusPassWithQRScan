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
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  const submitData = async () => {
    console.log("Form Data:", formdata);

    try {
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

          // Post student data with the new parent ID
          await postStudentData(parentResult.ParentId);
        } else {
          const errorData = await parentResponse.json();
          console.error("Error saving parent data:", errorData);
          alert(`Error saving parent data: ${errorData}`);
        }
      } else {
        // Post student data with existing parent ID
        await postStudentData(formdata.parentId);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert(`Error saving data: ${error.message}`);
    }
  };

  const postStudentData = async (parentId) => {
    const studentData = {
      Name: formdata.studentName,
      Gender: formdata.studentGender,
      RegNo: formdata.studentRegNo,
      Contact: formdata.studentContact,
      Password: formdata.studentPassword,
      PassExpiry: "2024-01-15", // Static for now, can be dynamic
      TotalJourneys: 50, // Static for now, can be dynamic
      ParentId: parentId,
      OrganizationId: formdata.OrganizationId,
    };

    const studentResponse = await fetch(
      "http://localhost/WebApi/api/Users/InsertStudent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
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
