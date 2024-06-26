import React, { useState, useEffect } from "react";
import "../Pages/Styles/ConductorDashboard.css";
import ConductorNavbar from "../Components/ConductorNavbar";

function ConductorDashboard() {
  const [busDetails, setBusDetails] = useState({});
  const [nextStop, setNextStop] = useState({});
  const [journeyDetails, setJourneyDetails] = useState({});

  useEffect(() => {
    // Fetch bus details
    fetch("http://localhost/WebApi/api/Admin/GetBusDetails?OrganizationId=1")
      .then((response) => response.json())
      .then((data) => setBusDetails(data))
      .catch((error) => console.error("Error fetching bus details:", error));

    // Fetch next stop
    fetch("http://localhost/WebApi/api/Conductor/GetNextStop/?conductorId=1")
      .then((response) => response.json())
      .then((data) => setNextStop(data))
      .catch((error) => console.error("Error fetching next stop:", error));

    // Fetch journey details
    fetch("http://localhost/WebApi/api/Conductor/GetRemainingStops?conductorId=2")
      .then((response) => response.json())
      .then((data) => setJourneyDetails(data))
      .catch((error) => console.error("Error fetching journey details:", error));
  }, []);

  return (
    <div className="conductor-dashboard">
      <ConductorNavbar />
      <div className="conductor-dashboard-container">
        <div className="booked-seats">
          {busDetails.length > 1 && (
            <div
              className="progress-circle"
              style={{
                background: `conic-gradient(#80cbc4 0% ${
                  (busDetails[1].BookedSeats / busDetails[1].TotalSeats) * 100
                }%, #004d40 ${
                  (busDetails[1].BookedSeats / busDetails[1].TotalSeats) * 100
                }% 100%)`,
              }}
            >
              <div className="progress-circle-inner">
                <div
                  className="progress-circle-half"
                  style={{
                    transform: `rotate(${
                      (busDetails[1].BookedSeats / busDetails[1].TotalSeats) *
                      360
                    }deg)`,
                  }}
                ></div>
                <span className="progress-text">
                  {`${busDetails[1].BookedSeats}/${busDetails[1].TotalSeats}`}
                  <div className="progress-label">Seats Booked</div>
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="conductordashboard-container">
          <div className="white-container">
            <h2>Next Stop</h2>
          </div>

          <div className="favorit-stops-conductor">
            <section className="dashboard-container">
              <h2>{nextStop.stopName}</h2>
              <div className="row">
                <div className="conductorstop-containers">
                  <p>Route No </p>
                  <p className="bold">{nextStop.routeNumber}</p>
                </div>
                <div className="conductorstop-containers">
                  <p>Stop Timing</p>
                  <p className="bold">{nextStop.stopTiming}</p>
                </div>
              </div>
            </section>
          </div>

          <div className="white-container">
            <h2>Journey Details</h2>
          </div>
          <div className="favorit-stops-conductor">
            <section className="dashboard-container">
              <div className="row">
                <div className="stops">
                  <div className="conductorstop-containers">
                    <p>Total Stops</p>
                    {journeyDetails.TotalStops !== undefined && (
                      <p className="bold">{journeyDetails.TotalStops}</p>
                    )}
                  </div>
                  <div className="conductorstop-containers">
                    <p>Remaining Stops</p>
                    {journeyDetails.RemainingStops !== undefined && (
                      <p className="bold">{journeyDetails.RemainingStops}</p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConductorDashboard;
