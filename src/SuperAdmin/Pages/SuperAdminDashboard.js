import React, { useEffect, useState } from "react";
import "../Pages/Styles/SuperAdminDashboard.css";
import { Link } from "react-router-dom";
import SuperAdminNavbar from "../Components/SuperAdminNavbar";

function SuperAdminDashboard() {
  const [data, setData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchChildrenData = async () => {
      try {
        const response = await fetch(
          "http://localhost/WebApi/api/SuperAdmin/GetAllOrganizationDetails",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          setData(result.Organizations);
          // Compute the total users from the fetched data
          const computedTotalUsers = result.Organizations.reduce((sum, org) => sum + org.TotalUsers, 0);
          setTotalUsers(computedTotalUsers);
          console.log(result.Organizations); // To verify the data fetched
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
    <div style={{ userSelect: 'none' }} className="superadmin-dashboard">
      <SuperAdminNavbar />
      <div className="superadmindashboard-container">
        <div className="white-container">
          <h2>Children</h2>
        </div>
        <div className="favorit-stops-superadmin">
          <section className="dashboard-container">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {data.map((org, index) => (
                  <div
                    key={org.Id}
                    className={`carousel-item ${index === 0 ? 'active' : ''} card`}
                  >
                    <div className="booked-seats">
                      <div
                        className="progress-circle"
                        style={{
                          background: `conic-gradient(#80cbc4 0% ${(org.TotalUsers / totalUsers) * 100}%, #004d40 ${(org.TotalUsers / totalUsers) * 100}% 100%)`,
                        }}
                      >
                        <div className="progress-circle-inner">
                          <span>{`${org.TotalUsers}/${totalUsers}`}
                            <div className="progress-label">Total Users</div>
                          </span>
                        </div>
                      </div>
                    </div>

                    <h2>{org.Name}</h2>
                    <div className="row">
                      <div className="stops">
                        <div className="superadminstop-containers">
                          <p>Students</p>
                          <p className="bold">{org.TotalStudents}</p>
                        </div>
                        <div className="superadminstop-containers">
                          <p>Parents</p>
                          <p className="bold">{org.TotalParents}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="stops">
                        <div className="superadminstop-containers">
                          <p>Conductors</p>
                          <p className="bold">{org.TotalConductors}</p>
                        </div>
                        <div className="superadminstop-containers">
                          <p>Admins</p>
                          <p className="bold">{org.TotalAdmins}</p>
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

export default SuperAdminDashboard;
