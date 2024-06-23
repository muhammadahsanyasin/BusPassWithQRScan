import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import "../Pages/Styles/BarCodeGenrator.css";
import profile from "../../Assets/profile.png";

function BarCodeGenrator() {
  const [api, setApi] = useState("http://localhost/WebApi/api/Users/GetUserById/?id=3&OrganizationId=1");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          setData(result);
          console.log("Fetched data:", result);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [api]);

  if (!data || !data.Students) {
    return <div>Loading...</div>;
  }

  const qrValue = data.Students.PassId ? `${data.Students.PassId}` : "undefined";

  return (
    <div className="barcode-gen">
      <div className="barcodegenrator-container">
        <div className="person-icon">
          <img src={profile} alt="Person Icon" />
        </div>

        <div className="person-details">
          <h2>{data.Students.Name}</h2>
          <p>{data.Students.RegNo}</p>
        </div>

        <Link to="#">
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
              value={qrValue}
              viewBox={`0 0 256 256`}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default BarCodeGenrator;
