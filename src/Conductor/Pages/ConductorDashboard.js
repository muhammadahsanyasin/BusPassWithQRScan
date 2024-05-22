import React ,{useState,useEffect}from "react";
import "../Pages/Styles/ConductorDashboard.css";
import ConductorNavbar from "../Components/ConductorNavbar";

function ConductorDashboard({ progress }) {


  const [data, setdata] = useState([]);
  useEffect(() => {
    const studentdata = async () => {
      const response = await fetch(
        "http://localhost/WebApi/api/Student/GetFavStops?id=1",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setdata( await response.json());
        console.log(data);
        return data;
      }
    };
    studentdata();
  }, []);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = ((50 - progress) / 50) * circumference;

  return (
    <div className="conductor-dashboard">
      <ConductorNavbar />
      

      <div className="conductorprogress-container">
        <div className="progress-label">Seates Used: {progress}</div>
        <svg className="conductorprogress-ring" width="120" height="120">
          <circle
            className="conductorprogress-ring-circle"
            stroke="white"
            strokeWidth="7"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: progressOffset,
            }}
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="progress-text"
          >
            {progress}/50
          </text>
        </svg>
      </div>


      <div className="conductordashboard-container">
        <div className="white-container">
          <h2>Next Stop</h2>
        </div>
        
        <div className="favorit-stops-conductor">
          <section className="dashboard-container">
            <h2>6th Road</h2>
            <div class="row">
              <div className="conductorstop-containers">
                <p>Route No </p>
                <p className="bold">1111</p>
              </div>
              <div className="conductorstop-containers">
                <p>Stop Timing</p>
                <p className="bold">08:00 am</p>
              </div>
            </div>
          </section>
        </div>

        <div className="white-container">
          <h2>Journey Details</h2>
        </div>
        <div className="favorit-stops-conductor">
          <section className="dashboard-container">
            <div class="row">
              <div className="stops">
                <div className="conductorstop-containers">
                  <p>Total Stops </p>
                  <p className="bold">15</p>
                </div>
                <div className="conductorstop-containers">
                  <p>Remaing Stops</p>
                  <p className="bold">5</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ConductorDashboard;
