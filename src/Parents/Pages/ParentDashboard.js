import React from "react";
import "../Pages/Styles/ParentDashboard.css";
import ParentNavbar from "../Components/ParentNavbar";
import { Link } from "react-router-dom";
function ParentDashboard({ progress }) {
  return (
    <div className="parent-dashboard">
      <ParentNavbar />
      <div className="parentdashboard-container">
        <div className="white-container">
          <h2>Track Buses</h2>
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
                  <h2>shamsabad</h2>
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
                <div class="carousel-item card">
                  <h2>Chandni Chock</h2>
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
                <div class="carousel-item card">
                  <h2>6th Road</h2>
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
          <Link to='/GoogleMapComponent'>
            <button className=" parenttrackbuses-button edit-stops">Track Bus</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ParentDashboard;
