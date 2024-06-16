import React, { useEffect, useState } from "react";
import "../Pages/Styles/StudentDashboard.css";
import StudentNavbar from "../Components/StudentNavbar";
import { Link } from "react-router-dom";
import useStore from "../../store";

function StudentDashboard() {
  const {userdata} = useStore();
  const [data, setData] = useState([]);
  const [journeyDetails, setJourneyDetails] = useState({ remaining: 0, total: 0 });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          "http://localhost/WebApi/api/Student/GetFavStops?id=2",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const fetchedData = await response.json();
          if (Array.isArray(fetchedData)) {
            setData(fetchedData);
          } else {
            console.error("Fetched data is not an array:", fetchedData);
          }
          console.log(fetchedData)
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
      
    };

  
     fetchStudentData();
     const studata= (JSON.parse(localStorage.getItem("user")).Students)
     console.log(studata)
     setJourneyDetails({ remaining: studata.RemainingJourneys, total: studata.TotalJourneys });
  
     
 
   }, []);

 

  const progressPercentage = journeyDetails.total > 0 ? ((journeyDetails.total - journeyDetails.remaining) / journeyDetails.total) * 100 : 0;

  return (
    <div className="student-dashboard" style={{ userSelect: "none" }}>
      <StudentNavbar />
      <div className="student-dashboard-container">
        <form>
          <div className="booked-seats">
            <div
              className="progress-circle"
              style={{
                background: `conic-gradient(#80cbc4 0% ${progressPercentage}%, #004d40 ${progressPercentage}% 100%)`,
              }}
            >
              <div className="progress-circle-inner">
                <span>
                  {`${journeyDetails.remaining}/${journeyDetails.total}`}
                  <div className="progress-label">Journeys</div>
                </span>
              </div>
            </div>
          </div>
          <div className="studentdashboard-container">
            <div className="white-container">
              <h2>Favorite stops</h2>
            </div>
            <div className="studentfavorit-stops">
              <section className="dashboard-container">
                <div
                  id="carouselExampleControls"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {data.map((stop, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${index === 0 ? "active" : ""} student-card`}
                      >
                        <h2>{stop.Name}</h2>
                        <div className="row">
                          <div className="stops">
                            <div className="studentstop-containers">
                              <p>Route No</p>
                              <p className="bold">{stop.Route}</p>
                            </div>
                            <div className="studentstop-containers">
                              <p>Stop Timing</p>
                              <p className="bold">{stop.Timing}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </section>
              <Link to="/StudentFavStop">
                <button className="student-button edit-stops">Edit Favorite Stops</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentDashboard;
