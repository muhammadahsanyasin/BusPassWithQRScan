import React ,{useState,useEffect} from "react";
import "../Pages/Styles/AdminDashboard.css";
import AdminNavbar from "../Components/AdminNavbar";
import { Link } from "react-router-dom";
import Login from "../../Login";
function AdminDashboard({progress}) {
//   const [admin, setadmin] = useState(JSON.parse(localStorage.getItem('user')))
//   const [api, setApi] = useState(admin?  `http://localhost/WebApi/api/users/GetUserById?id=${admin.user.id}` :  null);
//   const [data, setdata] = useState("");
//   const [loginstatusrole, setloginstatusrole] = useState(admin? admin.user.role : null)

//   useEffect(() => {
//     const adminsdata = async () => {
//       const response = await fetch(api, {
//         method: "GET", //POST, PUT,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         const d = await response.json();
//         setdata(d);
//         console.log(data);
//       }
//     };
//     adminsdata();
//   }, []); //[] call only once




//   const radius = 50;
//   const circumference = 2 * Math.PI * radius;
//   const progressOffset = ((100 - progress) / 100) * circumference;


//   if(admin==null)
//     {
//       window.location.assign("/login")
//     }

//     if(loginstatusrole!=="Admin")
//       {
//         return <h1>you are not logged in as admin</h1>
//       }

     
// if(data)
  return (
    <div className="admin-dashboard">
      <AdminNavbar/>
<div className="admin-dashboard-screen">
      <div className="booked-seats">
        
        <div className="progress-circle"  style={{background: `conic-gradient(#80cbc4 0% 29%, #004d40 29% 100%)`}}>
          <div className="progress-circle-inner">
            <div className="progress-circle-half" style={{ transform: `rotate(${59 * 3.6}deg)` }}></div>
            <span>59/100</span>
          </div>
        </div>
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
                  
                  <div class="row">
                    <div className="stops">
                      <div className="stop-containers">
                        <p>Student Chickin</p>
                        <p className="bold">15</p>
                      </div>
                      <div className="stop-containers">
                        <p>Remaining Seats</p>
                        <p className="bold">37</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item admin-card">
                  <h2>Bus#2</h2>
               
                  <div class="row">
                    <div className="stops">
                      <div className="stop-containers">
                        <p>Student Checkedin </p>
                        <p className="bold">15</p>
                      </div>
                      <div className="stop-containers">
                        <p>Remaing Seats</p>
                        <p className="bold">37</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item admin-card">
                  <h2>Bus#3</h2>
             
                  <div class="row">
                    <div className="stops">
                      <div className="stop-containers">
                        <p>Route No </p>
                        <p className="bold">15</p>
                      </div>
                      <div className="stop-containers">
                        <p>Stop Timing</p>
                        <p className="bold">37</p>
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
    </div>
  );
}

export default AdminDashboard;
