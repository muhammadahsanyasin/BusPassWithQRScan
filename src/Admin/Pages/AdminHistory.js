import React, { useState, useEffect } from "react";
import "../Pages/Styles/AdminHistory.css";

const fetchCategories = async (setCategories) => {
  try {
    const response = await fetch("http://localhost/WebApi/api/Category/GetAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      setCategories(data);
    } else {
      console.error('Failed to fetch categories');
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const fetchUserHistory = async (categoryId, dateFrom, dateTo, setHistory) => {
  try {
    const response = await fetch(`http://localhost/WebApi/api/Users/GetUserHistory?id=6&fDate=2024-05-15&tDate=2024-05-23`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      setHistory(data);
    } else {
      console.error('Failed to fetch user history');
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

function AdminHistory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDateFrom, setSelectedDateFrom] = useState('');
  const [selectedDateTo, setSelectedDateTo] = useState('');
  const [history, setHistory] = useState(null);

  useEffect(() => {
    fetchCategories(setCategories);
  }, []);

  useEffect(() => {
    if (selectedCategory && selectedDateFrom && selectedDateTo) {
      fetchUserHistory(selectedCategory, selectedDateFrom, selectedDateTo, setHistory);
    }
  }, [selectedCategory, selectedDateFrom, selectedDateTo]);

  const handleDateFromChange = (e) => {
    setSelectedDateFrom(e.target.value);
  };

  const handleDateToChange = (e) => {
    setSelectedDateTo(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="historypagecontainer">
      <div className="picker-container">
        <div className="picker-wrapper">
          <label className="picker-text">From :</label>
          <div className="daypicker-container">
            <input
              type="date"
              id="selectedDateFrom"
              value={selectedDateFrom}
              onChange={handleDateFromChange}
            />
          </div>
        </div>
        <div className="picker-wrapper">
          <label className="picker-text">To :</label>
          <div className="daypicker-container">
            <input
              type="date"
              id="selectedDateTo"
              value={selectedDateTo}
              onChange={handleDateToChange}
            />
          </div>
        </div>
      </div>

      <div className="childhistory-dropdown">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.Id} value={category.Id}>
              {category.Name}
            </option>
          ))}
        </select>
      </div>

      <div className="flat-list">
        {history && history[selectedCategory] && history[selectedCategory].map((item, index) => (
          <div className="flat-list-row" key={index}>
            <p className="date-time">{item.Date}, {item.Time}</p>
            <p className="history-type">{item.Type}</p>
            <p className="pass-history">Stop Name: {item.StopId}</p>
            <p className="pass-history">Route #: {item.RouteId}</p>
            <p className="pass-history">Bus #: {item.BusId}</p>
            <p className="pass-history">Student: {item.StudentName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminHistory;

