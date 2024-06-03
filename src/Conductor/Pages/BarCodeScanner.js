import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import "../Pages/Styles/BarCodeScanner.css";
import buslogo from "../../Assets/buslogo.png";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route, Naviagte } from "react-router-dom";
const BarCodeScanner = () => {
  

  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const [scannedResult, setScannedResult] = useState("");
  const [qrinfo, setqrinfo] = useState({})


  const onScanSuccess = (result) => {
    console.log(result);
    setScannedResult(result?.data);
 

    const data  = result.data.split(",") 
 
     setqrinfo({
      passid: data[0],
      busid: data[1]
    })
     window.location.replace("/ConductorVerification");
  };


  useEffect(()=>{
    console.log(qrinfo)
    // console.log(JSON.stringify(qrinfo))
    localStorage.setItem("qrinfo" , JSON.stringify(qrinfo))
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
      alert("Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.");
    }
  }, [qrOn]);

  return (
  <>
    {/* <Routes>
    

    {scannedResult &&
    ( 
      
      <Route path="*" element={<Navigate to="/ConductorVerification" props={{ gender: "male" }} />} />)}

    </Routes> */}
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
              
            )
             
            }

           
           
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default BarCodeScanner;
