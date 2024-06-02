import React, { useState, useEffect } from "react";
import "../Pages/Styles/AdminDashboard.css";
import AdminNavbar from "../Components/AdminNavbar";
import { Link } from "react-router-dom";

function AdminDashboard({ }) {
  const [busDetails, setBusDetails] = useState([]);

  useEffect(() => {
    fetch('http://localhost/WebApi/api/Admin/GetBusDetails')
      .then(response => response.json())
      .then(data => setBusDetails(data))
      .catch(error => console.error('Error fetching bus details:', error));
  }, []);

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <div className="admin-dashboard-screen">
        <div className="admindashboard-container">
          <div className="white-container">
            <h2>Track Buses</h2>
          </div>
          <div className="favorit-stops-admin">
            <section className="dashboard-container">
              <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {busDetails.map((bus, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''} admin-card`}>
                      <div className="booked-seats">
                        <div
                          className="progress-circle"
                          style={{ background: `conic-gradient(#80cbc4 0% ${bus.BookedSeats / bus.TotalSeats * 100}%, #004d40 ${bus.BookedSeats / bus.TotalSeats * 100}% 100%)` }}
                        >
                          <div className="progress-circle-inner">
                            <div
                              className="progress-circle-half"
                              style={{ transform: `rotate(${bus.BookedSeats / bus.TotalSeats * 360}deg)` }}
                            ></div>
                            <span className="progress-text">
                              {`${bus.BookedSeats}/${bus.TotalSeats}`}
                              <div className="progress-label">Seats Booked</div>
                            </span>
                          </div>
                        </div>
                      </div>
                      <h2>{`Bus#${bus.BusId}`}</h2>
                      <div className="row">
                        <div className="stops">
                          <div className="stop-containers">
                            <p>Total Stops</p>
                            <p className="bold">{bus.TotalStops}</p>
                          </div>
                          <div className="stop-containers">
                            <p>Remaining Stops</p>
                            <p className="bold">{bus.RemainingStops}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </section>
            <Link to="/GoogleMap">
              <button className="admin-button edit-stops">Track Buses</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
