import React from "react";
import QRCode from "react-qr-code";
import "../Pages/Styles/BarCodeGenrator.css";
import profile from "../../Assets/profile.png";
function BarCodeGenrator() {
  return (
    <div className="barcode-gen">
      <div className="barcodegenrator-container">
        <div className="person-icon">
          <img src={profile} alt="Person Icon" />
        </div>

        <div className="person-details">
          <h2>Muhammad Ahsan</h2>
          <p>32402-2852063-3</p>
        </div>

        <div
          style={{
            height: "300px", 
            margin: "0 auto",
            maxWidth: 300,
            width: "100%",
          }}
        >
          <QRCode
            size={500}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={8999}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
    </div>
  );
}

export default BarCodeGenrator;
