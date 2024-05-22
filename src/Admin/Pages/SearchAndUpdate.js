import React from 'react'
import '../Pages/Styles/SearchAndUpdate.css';

function SearchAndUpdate() {
  return (
    <div className="search-update-screen">
    <div className="search-update-container">
      <h2>Search and Update</h2>
      <div className="search-section">
        <h3>Search</h3>
        <div className="form-group">
          
          <input type="text" id="id" placeholder='ID' />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category">
            <option value="">Select Category</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
          </select>
        </div>
       
      </div>

      <div className="result-section">
        <h3>Result</h3>
        <div className="form-group">
          
          <input type="text" id="name" placeholder='Name'  />
        </div>
        <div className="form-group">
          
          <input type="password" id="password" placeholder='Password'  />
        </div>
        <div className="form-group">
          
          <input type="text" id="contact" placeholder='Contact No' />
        </div>
        <button  className=" addnewconductor-button  edit-stops">Update</button>
      </div>
    </div>
    </div>
  );
}

export default SearchAndUpdate;
