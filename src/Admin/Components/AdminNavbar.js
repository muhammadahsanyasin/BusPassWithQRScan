import React from 'react'
import { Link } from 'react-router-dom';
import profile from '../../Assets/profile.png';
function AdminNavbar() {
    return (
        <nav
          class="navbar navbar-expand-lg navbar-dark "
          style={{ backgroundColor: "rgb(47, 170, 152)" }}
        >
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              BusPassWithQRScan
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link color hover active" to="/SearchAndUpdate">
                    Search&Update
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link color hover active"
                    to="/AddNewStudent"
                  >
                    Add Student
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link color hover active"
                    to="/AddNewConductor"
                  >
                    Add Conductor
                  </Link>
                </li>
    
                <li className="nav-item">
                  <Link
                    className="nav-link color hover active"
                    to="/ChangePassword"
                  >
                    Change Password
                  </Link>
                </li>
                
    
                <li className="nav-item">
                  <Link
                    className="nav-link color hover active"
                    to="/AddNewBus"
                  >
                    Add Bus
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link color hover active"
                    to="/AddNewAdmin"
                  >
                    Add Admin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link color hover active"
                    to="/AddMoreJourneys"
                  >
                    AddMoreJourneys
                  </Link>
                </li>
                
                
    
                <li className="nav-item">
                  <Link
                    className="nav-link color hover active"
                    to="/AdminMap"
                  >
                    Google Map
                  </Link>
                </li>
              </ul>
              {/* <Link
                className="nav-link color hover active navbar-text fw-bold "
                to="/AddScreens"
              >
               ADD SCREEN
              </Link> */}
              <Link
                className="nav-link color hover active navbar-text fw-bold "
                to="/ParentsNotification"
              >
                Notification
              </Link>

              <Link to="/AdminProfile">
              <div class="profile-avatar">
                <img
                 src={profile}
                />
              </div>
              </Link>
            </div>
          </div>
        </nav>
      );
}

export default AdminNavbar