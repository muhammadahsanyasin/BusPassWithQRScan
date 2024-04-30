import React from "react";
import "../Pages/Styles/AdminDashboard.css";
import AdminNavbar from "../Components/AdminNavbar";
import { Link } from "react-router-dom";
function AdminDashboard({progress}) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = ((100 - progress) / 100) * circumference;
  return (
    <div className="admin-dashboard">
      <AdminNavbar/>

      
      <div className="progress-container">
        <div className="progress-label">Journeys Used: {progress}</div>
        <svg className="progress-ring" width="120" height="120">
          <circle
            className="progress-ring-circle"
            stroke="#2FAA98"
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
            {progress}/100
          </text>
        </svg>
      </div>


      <div className="admindashboard-container">
        <div className="white-container">
          <h2>Track Buses</h2>
        </div>
        <div className="favorit-stops-admin">
          <section className="dashboard-container">
            <div
              id="carouselExampleIndicators"
              class="carousel slide"
              data-bs-ride="carousel"
            >
              <div class="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  class="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item active admin-card">
                  <h2>Bus#1</h2>
                  <p>Traveling on Route #1</p>
                  <div class="row">
                    <div className="stops">
                      <div className="stop-containers">
                        <p>Route No </p>
                        <p className="bold">03</p>
                      </div>
                      <div className="stop-containers">
                        <p>Stop Timing</p>
                        <p className="bold">08:50</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item admin-card">
                  <h2>Bus#2</h2>
                  <p>Traveling on Route #2</p>
                  <div class="row">
                    <div className="stops">
                      <div className="stop-containers">
                        <p>Route No </p>
                        <p className="bold">03</p>
                      </div>
                      <div className="stop-containers">
                        <p>Stop Timing</p>
                        <p className="bold">08:50</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item admin-card">
                  <h2>Bus#3</h2>
                  <p>Traveling on Route #3</p>
                  <div class="row">
                    <div className="stops">
                      <div className="stop-containers">
                        <p>Route No </p>
                        <p className="bold">03</p>
                      </div>
                      <div className="stop-containers">
                        <p>Stop Timing</p>
                        <p className="bold">08:50</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Link to="/GoogleMapComponent">
          
            <button className=" admin-button edit-stops">Track Buses</button>
          
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
