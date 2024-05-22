import React from "react";

import busarrived from'../../Assets/busarrived.png';
import checkout from'../../Assets/checkout.png';
import checkin from'../../Assets/checkin.png';
import scanqrcode from'../../Assets/scanqrcode.png';
function StudentNotification() {
    return (
        <div>
          <div class="parent-notification">
            <div class="wrapper">
              <div class="top-bar">
                <div class="title">
                  <p class="title-text">Notifications</p>
                  <p class="num" id="num">
                    1
                  </p>
                </div>
                <a href="#" class="read" id="read">
                  Mark all as read
                </a>
              </div>
              <div class="notifications">
                {/* <!-- single notification starts --> */}
                <div class="single-box unseen">
                  <div class="avatar">
                    <img
                      src={checkout}
                      alt="checkout"
                    />
                  </div>
                  <div class="box-text">
                    <p class="notifi">
                      <a href="#" class="name">
                        {" "}
                       Check Out!{" "}
                      </a>
                      <br />
                      Ahsan is checked out at univeristy {" "}
                      
                      
                    </p>
                    <p class="time">1m ago</p>
                  </div>
                </div>
                {/* <!-- single notification end -->
    
    
     {/* <!-- single notification starts --> */}
                <div class="single-box unseen">
                  <div class="avatar">
                    <img
                      src={checkin}
                      alt=""
                    />
                  </div>
                  <div class="box-text">
                    <p class="notifi">
                      <a href="#" class="name">
                        {" "}
                       Check in!{" "}
                      </a>
                      <br />
                      Ahsan is checked in Bus no 02 at chandni chock {" "}
                      
                      
                    </p>
                    <p class="time">2h ago</p>
                  </div>
                </div>
                {/* <!-- single notification end -->
    
            <!-- single notification starts --> */}
                <div class="single-box unseen">
                  <div class="avatar">
                    <img
                      src={scanqrcode}
                      alt=""
                    />
                  </div>
                  <div class="box-text">
                    <p class="notifi">
                      <a href="#" class="name">
                        Ahsan QrCodeScan{" "}
                      </a>
                      <br />
                      Remaining Journeys are 30
                     
                    </p>
                    <p class="time">5m ago</p>
                  </div>
                </div>
                {/* <!-- single notification end -->
            <!-- single notification starts --> */}
               
            
                <div class="single-box">
                  <div class="avatar">
                    <img
                      src={busarrived}
                      alt="busarrived"
                    />
                  </div>
                  <div class="box-text">
                    <p class="notifi">
                      <a href="#" class="name">
                        Bus Arrived!{" "}
                      </a>
                      <br />
                      Bus has been arrived in 20 mint at 6th road {" "}
                     
                    </p>
                    <p class="time">2 weeks ago</p>
                  </div>
                </div>
                {/* <!-- single notification end --> */}
              </div>
            </div>
          </div>
         
         
        </div>
      );
}

export default StudentNotification