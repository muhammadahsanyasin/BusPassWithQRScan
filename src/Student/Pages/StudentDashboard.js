import React from "react";
import "../Pages/Styles/StudentDashboard.css";
import StudentNavbar from "../Components/StudentNavbar";

function StudentDashboard({ progress }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = ((100 - progress) / 100) * circumference;
  return (
    <div className="student-dashboard">
      <StudentNavbar/>

      <div className="progress-container">
        <div className="progress-label">Journeys Used: {progress}%</div>
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




      <div className="studentdashboard-container">
        <div className="white-container">
          <h2>Favorite stops</h2>
        </div>
        <div className="studentfavorit-stops">
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
                <div class="carousel-item active student-card">
                  <h2>Chandni Chok</h2>
                  
                  <div class="row">
                    <div className="stops">
                      <div className="studentstop-containers">
                        <p>Route No </p>
                        <p className="bold">03</p>
                      </div>
                      <div className="studentstop-containers">
                        <p>Stop Timing</p>
                        <p className="bold">08:50</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item admin-card">
                  <h2>6th Road</h2>
                  
                  <div class="row">
                    <div className="stops">
                      <div className="studentstop-containers">
                        <p>Route No </p>
                        <p className="bold">03</p>
                      </div>
                      <div className="studentstop-containers">
                        <p>Stop Timing</p>
                        <p className="bold">08:50</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item admin-card">
                  <h2>Faizabad</h2>
                  
                  <div class="row">
                    <div className="stops">
                      <div className="studentstop-containers">
                        <p>Route No </p>
                        <p className="bold">03</p>
                      </div>
                      <div className="studentstop-containers">
                        <p>Stop Timing</p>
                        <p className="bold">08:50</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="student-button">
            <span className="edit-stops">Edit Favorite Stops</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
