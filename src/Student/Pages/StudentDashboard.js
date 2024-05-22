import React, { useEffect, useState } from "react";
import "../Pages/Styles/StudentDashboard.css";
import StudentNavbar from "../Components/StudentNavbar";
import { Link } from "react-router-dom";

function StudentDashboard({ progress }) {
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
        setdata(await response.json());
        console.log(data);
        return data;
      }
    };
    studentdata();
  }, []);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = ((100 - progress) / 100) * circumference;

  return (
    <div className="student-dashboard">
      <StudentNavbar />
      <div>
        <form>
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
                  id="carouselExampleControls"
                  class="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div class="carousel-inner">
                    {data.map((stop, index) => (
                      <>
                        {
                          <div className={stop.Id === 1 ? `carousel-item active student-card`  : `carousel-item  student-card`}>
                         
                          
                            <h2>{stop.Name}</h2>

                            <div class="row">
                              <div className="stops">
                                <div className="studentstop-containers">
                                  <p> Route No </p>
                                  <p className="bold">{stop.Route}</p>
                                </div>
                                <div className="studentstop-containers">
                                  <p>Stop Timing</p>
                                  <p className="bold">{stop.Timing}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </>
                    ))}

                    {/*                   
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
                            <p className="bold">08:40 am</p>
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
                            <p className="bold">08:30 am</p>
                          </div>
                        </div>
                      </div>
                    </div> */}
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
              <Link to="/StudentFavStop">
                <button className=" student-button edit-stops">
                  Edit Favorite Stops
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentDashboard;
