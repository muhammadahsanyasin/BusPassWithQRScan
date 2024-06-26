import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import "../Pages/Styles/BarCodeScanner.css";
import buslogo from "../../Assets/buslogo.png";
import { useNavigate } from "react-router-dom";

const BarCodeScanner = () => {
  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const [scannedResult, setScannedResult] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onScanSuccess = (result) => {
    try {
      console.log(result);
      setScannedResult(result?.data);

      const data = result.data.split("/");
      const qrinfo = {
        PassId: parseInt(data[0]),  // Only pass the PassId
      };

      const qrinfoString = JSON.stringify(qrinfo);
      console.log(`data: ${qrinfoString}`);

      localStorage.setItem("qrinfo", qrinfoString);
      navigate("/ConductorVerification");
    } catch (error) {
      console.error("Error processing scan result:", error);
    }
  };

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

      scanner.current
        .start()
        .then(() => setQrOn(true))
        .catch((err) => {
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

  return (
    <div className="scanner-screen">
      <div className="scanner-container">
        <div className="icon-text">
          <div className="scannerbus-img">
            <img src={buslogo} alt="Bus Icon" />
          </div>
          <h1>Scan QR Code</h1>
        </div>
        <div className="barcode-scanner">
          <div className="qr-reader">
            <video ref={videoEl}></video>
            <div ref={qrBoxEl} className="qr-box"></div>
            {scannedResult && (
              <p
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 99999,
                  color: "white",
                }}
              >
                Scanned Result: {scannedResult}
              </p>
            )}
          </div>
          {status && (
            <p
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                zIndex: 99999,
                color: "white",
              }}
            >
              Status: {status}
            </p>
          )}
          {error && (
            <p
              style={{
                position: "absolute",
                bottom: 20,
                left: 0,
                zIndex: 99999,
                color: "red",
              }}
            >
              Error: {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarCodeScanner;
