import React, { useState } from "react";
import { QrScanner } from "react-qrcode-scanner";
import "../Pages/Styles/AddMoreJourneys.css";
import verification from "../../Assets/verified.png";
function AddMoreJourneys() {
  const [valid, setValid] = useState(false);
  const [numberOfJourneys, setNumberOfJourneys] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleScan = (value) => {
    console.log({ value });
  };

  const handleError = (error) => {
    console.log({ error });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="add-more-journeys-screen">
      <div className="add-more-journeys-container">
        <div className="verification-section">
          {/* Image of verification */}
          <img src={verification} alt="Verification" />
          {/* Status: Valid or Not */}
          <br />
          <p>Status: {valid ? "Valid" : "Not Valid"}</p>
        </div>
        {/* QR code scanner container */}
        <div className="qr-code-container">
          <div className="barcode-scanner">
            <QrScanner onScan={handleScan} onError={handleError} />
          </div>
        </div>
        {/* Input field for number of journeys */}
        <div className="input-container">
          <label htmlFor="numberOfJourneys">No Of Journeys:</label>
          <input
            type="number"
            id="numberOfJourneys"
            value={numberOfJourneys}
            onChange={(e) => setNumberOfJourneys(e.target.value)}
          />
        </div>
        {/* Daypicker for selecting date */}
        <div className="daypicker-container">
          <label htmlFor="selectedDate">Date:
          <input
            type="date"
            id="selectedDate"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
          />
          </label>
        </div>
      
      </div>
      <div>
          
          <button  className=" addnewadmin-button edit-stops">ADD</button>
        
      </div>
    </div>
  );
}

export default AddMoreJourneys;
