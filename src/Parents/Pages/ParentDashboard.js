import React from "react";
import "../Pages/Styles/ParentDashboard.css";
import ParentNavbar from "../Components/ParentNavbar";
import { Link } from "react-router-dom";
function ParentDashboard({ progress }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = ((100 - progress) / 100) * circumference;
  return (
    <div className="parent-dashboard">
      <ParentNavbar />

      <div className="parentdashboard-container">
        <div className="white-container">
          <h2>Childrens</h2>
        </div>
        <div className="favorit-stops-parent">
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
                <div class="carousel-item active card">
                  <div className="parentprogress-container">
                    <div className="progress-label">
                      Journeys Used: {progress}
                    </div>
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

                  <h2>ZaiD</h2>
                  <div class="row">
                  <p>Pickup Timings</p>
                    <div className="stops">
                      <div className="parentstop-containers">
                        <p>Check In</p>
                        <p className="bold">08:00 am</p>
                      </div>
                      <div className="parentstop-containers">
                        <p>Check Out</p>
                        <p className="bold">08:30 am</p>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                  <p>Dropoff Timings</p>
                    <div className="stops">
                      <div className="parentstop-containers">
                        <p>Check In</p>
                        <p className="bold">04:30 pm</p>
                      </div>
                      <div className="parentstop-containers">
                        <p>Check Out</p>
                        <p className="bold">05:30 pm</p>
                      </div>
                    </div>
                  </div>
                  <Link to="/GoogleMap">
                    <button className=" parenttrackbuses-button edit-stops">
                    Track Child
                    </button>
                  </Link>
                </div>

                <div class="carousel-item card">
                  <div className="parentprogress-container">
                    <div className="progress-label">
                      Journeys Used: {progress}
                    </div>
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

                  <h2>HuzaiFA</h2>
                  <div class="row">
                  <p>Pickup Timings</p>
                    <div className="stops">
                      <div className="parentstop-containers">
                        <p>Check In</p>
                        <p className="bold">08:00 am</p>
                      </div>
                      <div className="parentstop-containers">
                        <p>Check Out</p>
                        <p className="bold">08:30 am</p>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                  <p>Dropoff Timings</p>
                    <div className="stops">
                      <div className="parentstop-containers">
                        <p>Check In</p>
                        <p className="bold">04:30 pm</p>
                      </div>
                      <div className="parentstop-containers">
                        <p>Check Out</p>
                        <p className="bold">05:30 pm</p>
                      </div>
                    </div>
                  </div>
                  <Link to="/GoogleMap">
                    <button className=" parenttrackbuses-button edit-stops">
                    Track Child
                    </button>
                  </Link>
                </div>
                <div class="carousel-item card">
                  <div className="parentprogress-container">
                    <div className="progress-label">
                      Journeys Used: {progress}
                    </div>
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

                  <h2>ShahiD</h2>
                  <p>Pickup Timings</p>
                  <div class="row">
                    <div className="stops">
                      <div className="parentstop-containers">
                        <p>Check In</p>
                        <p className="bold">08:00 am</p>
                      </div>
                      <div className="parentstop-containers">
                        <p>Check Out</p>
                        <p className="bold">08:30 am</p>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <p>Dropoff Timig</p>
                    <div className="stops">
                      <div className="parentstop-containers">
                        <p>Check In </p>
                        <p className="bold">04:30 pm</p>
                      </div>
                      <div className="parentstop-containers">
                        <p>Check Out</p>
                        <p className="bold">05:30 pm</p>
                      </div>
                    </div>
                  </div>
                  <Link to="/GoogleMap">
                    <button className=" parenttrackbuses-button edit-stops">
                      Track Child
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ParentDashboard;
