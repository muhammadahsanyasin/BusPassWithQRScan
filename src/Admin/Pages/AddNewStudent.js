import React, { useState } from 'react';
import '../Pages/Styles/AddNewStudent.css';
function AddNewStudent() {
    const [isNewParent, setIsNewParent] = useState(true);

    return (
      <div className="container">
        <h2>Student Information</h2>
        <div>
          {/* <label htmlFor="name">Name:</label> */}
          <input type="text" id="name" name="name" placeholder='Name'/>
        </div>
        <div>
          {/* <label htmlFor="registrationNo">Registration No:</label> */}
          <input type="text" id="registrationNo" name="registrationNo"  placeholder='Registration No'/>
        </div>
        <div>
          {/* <label htmlFor="password">Password:</label> */}
          <input type="password" id="password" name="password" placeholder='Password' />
        </div>
        <div>
          {/* <label htmlFor="contactNo">Contact No:</label> */}
          <input type="text" id="contactNo" name="contactNo" placeholder='Contact No' />
        </div>
        <div>
          <label>Gender:</label>
          <label>
            <input type="radio" name="gender" value="male" />
            Male
            <input type="radio" name="gender" value="female" />
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
              <input type="text" id="parentName" name="parentName" placeholder='Name' />
            </div>
            <div>
              {/* <label htmlFor="parentPassword">Password:</label> */}
              <input type="password" id="parentPassword" name="parentPassword" placeholder='Password'/>
            </div>
            <div>
              {/* <label htmlFor="parentContactNo">Contact No:</label> */}
              <input type="text" id="parentContactNo" name="parentContactNo" placeholder='Contact No' />
            </div>
          </div>
        ) : (
          <div>
            <label htmlFor="parentId">Parent ID:</label>
            <select id="parentId" name="parentId">
              {/* Populate options with existing parent IDs */}
              <option value="1">Parent 1</option>
              <option value="2">Parent 2</option>
            </select>
          </div>
        )}
        {/* <button>Submit</button> */}
      </div>
    );
};

export default AddNewStudent
