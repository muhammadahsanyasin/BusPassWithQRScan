import React, { useRef } from 'react';
import QrScanner from 'qr-scanner';
import '../Pages/Styles/BarCodeScanner.css';
import buslogo from '../../Assets/buslogo.png';

const BarCodeScanner = () => {
  // Ref for the input element
  const fileInputRef = useRef(null);

  // Function to handle file input change
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const result = await QrScanner.scanImage(file);
      alert('QR Code detected! Result: ' + result);
    } catch (error) {
      alert('Error scanning QR code: ' + error);
    }
  };

  return (
    <div className="scanner-screen ">
      <div className="scanner-container">
      <div className="icon-text">
      <div className="scannerbus-img">
          <img src={buslogo} alt="Person Icon" />
        </div>
        <h1>Scan QR Code</h1>
      </div>
      <div className="barcode-scanner">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="input"
        onChange={handleFileInputChange}
      />
      <div className="result" id="result"></div>
      </div>
      </div>
    </div>
  );
};

export default BarCodeScanner;
