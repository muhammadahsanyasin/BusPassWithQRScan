import React from "react";
import { QrScanner } from "react-qrcode-scanner";
import '../Pages/Styles/BarCodeScanner.css';
import bus from "../../Assets/buslogo.png";

function BarCodeScanner() {
  const handleScan = (value) => {
    console.log({ value });
  };

  const handleError = (error) => {
    console.log({ error });
  };

  return (
    <div className="scanner-screen">
      <div className="scanner-container">
        <div className="scannerbus-img">
          <img src={bus} alt="Bus" style={{ width: "200px", height: "200px", objectFit: "cover" }} />
        </div>
        <div className="barcode-scanner">
          <QrScanner onScan={handleScan} onError={handleError} />
        </div>
      </div>
    </div>
  );
}

export default BarCodeScanner;
