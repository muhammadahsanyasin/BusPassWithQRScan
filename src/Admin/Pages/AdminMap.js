import React, { useState, useEffect } from "react";
import {  MapContainer,  Marker,  Popup, TileLayer,  Polyline,  useMap,} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "../../Assets/marker.png";
import { Modal, Button } from "react-bootstrap";
import checkin from "../../Assets/checkin.png";

const customIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [38, 38],
});

const initialPosition = [33.64340057674401, 73.0790521153456];
const point1 = [33.65221479100481, 73.06464916506403];
const point2 = [33.64325572431809, 73.06407053297772];
const point3 = [33.64266730832196, 73.07319440734358];
const point4 = [33.64179296464606, 73.07699834732112];
const point5 = [33.64331651749647, 73.07780627129169];
const point6 = [33.64314132414114, 73.07901841479297];

function AdminMap() {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showMarkerModal, setShowMarkerModal] = useState(false);

  const handleMapClick = (event) => {
    setMarkerPosition(event.latlng);
  };

  useEffect(() => {
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarkerPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    };

    getCurrentLocation();

    return () => {
      setMarkerPosition(null);
    };
  }, []);

  // Handler for marker click to show modal
  const handleMarkerClick = () => {
    setShowMarkerModal(true);
  };

  // Handler to close the marker modal
  const handleCloseMarkerModal = () => {
    setShowMarkerModal(false);
  };

  return (
    <div className="googlemap-container">
      {/* Modal for displaying marker information */}
      <Modal show={showMarkerModal} onHide={handleCloseMarkerModal}>
        <div style={{ backgroundColor: "#2FAA98" }}>
          <Modal.Header closeButton>
            <Modal.Title>Marker Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="favorit-stops-conductor">
              <section className="dashboard-container">
                <div class="row">
                  <div className="stops">
                    <div className="conductorstop-containers">
                      <div className="person-icon">
                        <img src={checkin} alt="Person Icon" />
                      </div>
                      <p>Student Checkin </p>
                      <p className="bold">15</p>
                    </div>
                    <div className="conductorstop-containers">
                      <p>Remaing Seats</p>
                      <p className="bold">35</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </div>
      </Modal>

      {/* Map */}
      <MapContainer
        center={markerPosition || initialPosition}
        zoom={25}
        style={{ width: "100%", height: "100%" }}
        onClick={handleMapClick}
      >
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a> '
          url="https://api.maptiler.com/maps/bright-v2/256/{z}/{x}/{y}.png?key=RBRODA7cHl7LOG0fTgd6"
        />

        {/* Render marker if position is available */}
        {markerPosition && (
          <Marker
            position={markerPosition}
            icon={customIcon}
            eventHandlers={{ click: handleMarkerClick }}
          >
            {/* <Popup className="custom-popup">
              Your current location. <br /> Latitude: {markerPosition[0]},
              Longitude: {markerPosition[1]}.
            </Popup> */}
          </Marker>
        )}

        {/* Draw polyline between points */}
        <Polyline
          positions={[point1, point2, point3, point4, point5, point6]}
          color="blue"
        />
      </MapContainer>
    </div>
  );
}

export default AdminMap;
