import React from 'react'
import { Link } from 'react-router-dom';
import profile from '../../Assets/profile.png';
function ConductorNavbar() {
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
                  <Link
                    className="nav-link color hover active"
                    to="/BarCodeScanner"
                  >
                    BarCodeScanner
                  </Link>
                </li>
                
               
                <li className="nav-item">
                  <Link
                    className="nav-link color hover active"
                    to="/ConductorVerification"
                  >
                    Verification
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link
                    className="nav-link color hover active"
                    to="/ConductorNotificationDetail"
                  >
                   Conductor Notification
                  </Link>
                </li>
               
               
                
                
    
                <li className="nav-item">
                  <Link
                    className="nav-link color hover active"
                    to="/ConductorMap"
                  >
                    GoogleMap
                  </Link>
                </li>
              </ul>
              <Link
                className="nav-link color hover active navbar-text fw-bold "
                to="/ConductorNotification"
              >
                Notification
              </Link>
              <Link to="/ConductorProfile">
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

export default ConductorNavbar