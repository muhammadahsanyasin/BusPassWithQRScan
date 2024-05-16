import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "../../Assets/marker.png";
import { Modal, Button } from "react-bootstrap";

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
  const [showModal, setShowModal] = useState(false);

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

  const handleHelloButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Custom button component
  function StackButton() {
    const map = useMap();

    return (
      <div className="leaflet-top leaflet-right">
        <div className="leaflet-control">
          <button className="leaflet-bar leaflet-control-custom" onClick={handleHelloButtonClick}>
            Say Hello
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="googlemap-container">
      {/* Modal for displaying "hello" message */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Hello</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Hello</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Map */}
      <MapContainer
        center={markerPosition || initialPosition}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
        onClick={handleMapClick}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/bright-v2/256/{z}/{x}/{y}.png?key=RBRODA7cHl7LOG0fTgd6"
        />

        {/* Render marker if position is available */}
        {markerPosition && (
          <Marker position={markerPosition} icon={customIcon}>
            <Popup>
              Your current location. <br /> Latitude: {markerPosition[0]},
              Longitude: {markerPosition[1]}.
            </Popup>
          </Marker>
        )}

        {/* Draw polyline between points */}
        <Polyline positions={[point1, point2, point3, point4, point5, point6]} color="blue" />

        {/* Custom button */}
        <StackButton />
      </MapContainer>
    </div>
  );
}

export default AdminMap;
