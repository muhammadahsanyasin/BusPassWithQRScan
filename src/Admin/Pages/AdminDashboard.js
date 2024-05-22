import React ,{useState,useEffect} from "react";
import "../Pages/Styles/AdminDashboard.css";
import AdminNavbar from "../Components/AdminNavbar";
import { Link } from "react-router-dom";
function AdminDashboard({progress}) {
  const [api, setapi] = useState(
    "http://localhost/WebApi/api/users/GetUserById?id=3"
  );
  const [data, setdata] = useState("");

  useEffect(() => {
    const adminsdata = async () => {
      const response = await fetch(api, {
        method: "GET", //POST, PUT,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const d = await response.json();
        setdata(d);
        console.log(data);
      }
    };
    adminsdata();
  }, []); //[] call only once




  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = ((100 - progress) / 100) * circumference;

  if(data)
  return (
    <div className="admin-dashboard">
      <AdminNavbar/>

      <div className="progress-container">
        <div className="progress-label">Booked Seats: {progress}</div>
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
              id="carouselExampleControls"
              class="carousel slide"
              data-bs-ride="carousel"
            >
              
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
                        <p className="bold">08:50 am</p>
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
                        <p>Student Checkedin </p>
                        <p className="bold">03</p>
                      </div>
                      <div className="stop-containers">
                        <p>Remaing Seats</p>
                        <p className="bold">08:50 am</p>
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
                        <p className="bold">08:50 am</p>
                      </div>
                    </div>
                  </div>
                </div>
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
          <Link to="/GoogleMap">
          
            <button className=" admin-button edit-stops">Track Buses</button>
          
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
