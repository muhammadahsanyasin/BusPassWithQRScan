import React, { useEffect, useState } from "react";
import "../Pages/Styles/ParentDashboard.css";
import ParentNavbar from "../Components/ParentNavbar";
import { Link } from "react-router-dom";

function ParentDashboard({ }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchChildrenData = async () => {
      try {
        const response = await fetch(
          "http://localhost/WebApi/api/Parent/GetChildren?id=1",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          setData(result);
          console.log(result); // To verify the data fetched
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchChildrenData();
  }, []);

  return (
    <div className="parent-dashboard">
      <ParentNavbar />
      <div className="parentdashboard-container">
        <div className="white-container">
          <h2>Children</h2>
        </div>
        <div className="favorit-stops-parent">
          <section className="dashboard-container">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {data.map((child, index) => (
                  <div
                    key={child.childDetails.Id}
                    className={`carousel-item ${index === 0 ? 'active' : ''} card`}
                  >
                    <div className="booked-seats">
                      <div
                        className="progress-circle"
                        style={{
                          background: `conic-gradient(#80cbc4 0% ${child.childDetails.RemainingJourneys / child.childDetails.TotalJourneys * 100}%, #004d40 ${child.childDetails.RemainingJourneys / child.childDetails.TotalJourneys * 100}% 100%)`,
                        }}
                      >
                        <div className="progress-circle-inner">
                          <span>{`${child.childDetails.RemainingJourneys}/${child.childDetails.TotalJourneys}`}</span>
                        </div>
                      </div>
                    </div>

                    <h2>{child.childDetails.Name}</h2>
                    <div className="row">
                      <p>Pickup Timings</p>
                      <div className="stops">
                        <div className="parentstop-containers">
                          <p>Check In</p>
                          <p className="bold">{child.childTimings.Pickup_Checkin}</p>
                        </div>
                        <div className="parentstop-containers">
                          <p>Check Out</p>
                          <p className="bold">{child.childTimings.Pickup_Checkout}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <p>Dropoff Timings</p>
                      <div className="stops">
                        <div className="parentstop-containers">
                          <p>Check In</p>
                          <p className="bold">{child.childTimings.Dropoff_Checkin}</p>
                        </div>
                        <div className="parentstop-containers">
                          <p>Check Out</p>
                          <p className="bold">{child.childTimings.Dropoff_Checkout}</p>
                        </div>
                      </div>
                    </div>
                    <Link to="/ParentMap">
                      <button className="parenttrackbuses-button edit-stops">
                        Track Child
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ParentDashboard;
