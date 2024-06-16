import React, { useState, useRef, useEffect } from "react";
import QrScanner from "qr-scanner";
import "../Pages/Styles/AddMoreJourneys.css";
import verification from "../../Assets/verified.png";

function AddMoreJourneys() {
  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const [scannedResult, setScannedResult] = useState("");
  const [qrinfo, setqrinfo] = useState({});
  const [valid, setValid] = useState(false);
  const [numberOfJourneys, setNumberOfJourneys] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [apiResponse, setApiResponse] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onScanSuccess = (result) => {
    setScannedResult(result?.data);
    const data = result.data.split(",");
    setqrinfo({ passid: data[0], busid: data[1] });
    setValid(true);
  };

  useEffect(() => {
    localStorage.setItem("qrinfo", JSON.stringify(qrinfo));
  }, [qrinfo]);

  const onScanFail = (err) => {
    console.log(err);
  };

  useEffect(() => {
    if (videoEl.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl.current || undefined,
      });

      scanner.current.start().then(() => setQrOn(true)).catch((err) => {
        if (err) setQrOn(false);
      });
    }

    return () => {
      if (scanner.current) {
        scanner.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn) {
      alert("Camera is blocked or not accessible. Please allow camera in your browser permissions and reload.");
    }
  }, [qrOn]);

  const handleAddJourneys = async () => {
    const apiUrl = `http://localhost/WebApi/api/Admin/RechargeJourneys?passId=${qrinfo.passid}&noOfJourneys=${numberOfJourneys}&passExpiry=${selectedDate}`;
    
    console.log("Request URL:", apiUrl);
    
    try {
      const response = await fetch(apiUrl, {
        method: "PUT", // Change this to the correct method if needed
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        console.error("Response status:", response.status);
        console.error("Response text:", await response.text());
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setApiResponse(data.message || "Journeys added successfully!");
      console.log(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setApiResponse("Failed to add journeys. Please try again.");
    }
  };

  return (
    <div className="add-more-journeys-screen">
      <div className="add-more-journeys-container">
        <div className="verification-section">
          <img src={verification} alt="Verification" />
          <p>Status: {valid ? "Valid" : "Not Valid"}</p>
        </div>
        <div className="qr-scanner-section">
          <div className="qr-reader">
            <video ref={videoEl}></video>
            <div ref={qrBoxEl} className="qr-box"></div>
          </div>
          <div className="form-section">
            <div className="input-container">
              <label htmlFor="numberOfJourneys">No Of Journeys:</label>
              <input
                type="number"
                id="noOfJourneys"
                value={numberOfJourneys}
                onChange={(e) => setNumberOfJourneys(e.target.value)}
              />
            </div>
            <div className="date-container">
              <label htmlFor="selectedDate">Date:</label>
              <input
                type="date"
                id="passExpiry"
                value={selectedDate}
                onChange={(e) => handleDateChange(e.target.value)}
              />
            </div>
          </div>
        </div>
        {apiResponse && <p className="api-response">{apiResponse}</p>}
      </div>
      <button onClick={handleAddJourneys} className="addjourney-button edit-stops">
        ADD
      </button>
    </div>
  );
}

export default AddMoreJourneys;
