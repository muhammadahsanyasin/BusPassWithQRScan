import React, { useEffect, useState } from "react";
import "../Pages/Styles/ParentDashboard.css";
import ParentNavbar from "../Components/ParentNavbar";
import { Link } from "react-router-dom";
function ParentDashboard({ progress }) {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const childrendata = async () => {
      const response = await fetch(
        "http://localhost/WebApi/api/Parent/GetChildren?id=10",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setdata(await response.json());
        console.log(data);
        return data;
      }
    };
    childrendata();
  }, []);

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
                  id="carouselExampleControls"
                  class="carousel slide"
                  data-bs-ride="carousel"
                >
                  
                  <div class="carousel-inner">
                  {data.map((child, index) => (
                      <>
                        {
                          <div className={child.Id === 1 ? `carousel-item active card`  : `carousel-item  card`}>
                         
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

                      <h2>{child.Name}</h2>
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
                      <Link to="/ParentMap">
                        <button className=" parenttrackbuses-button edit-stops">
                          Track Child
                        </button>
                      </Link>
                    </div>
                     
                    }
                  </>
                ))}
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </section>
            </div>
          </div>
       
    </div>
  );
}

export default ParentDashboard;
