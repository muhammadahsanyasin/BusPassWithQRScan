import React, { useState, useEffect } from "react";
import {  MapContainer,  Marker,  Popup,  TileLayer,  useMapEvent,  Polyline,} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { marker } from "leaflet";
import markerIcon from "../../Assets/marker.png";
import childloc from "../../Assets/childloc.png";
import { Modal } from "react-bootstrap";
import "../Pages/Styles/StudentMap.css";
import { Link } from "react-router-dom";

// Custom marker icon
const customIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [50, 50],
});

const childlocation = L.icon({
  iconUrl: childloc,
  iconSize: [38, 38],
});

const initialPosition = [33.64340057674401, 73.0790521153456];
const points = [
  [33.64331651749647, 73.077922],
  [33.663211, 73.08496],
  [33.65221479100481, 73.06464916506403],
  [33.64325572431809, 73.06407053297772],
  [33.64266730832196, 73.07319440734358],
  [33.64179296464606, 73.07699834732112],
  [33.64331651749647, 73.07780627129169],
  [33.64314132414114, 73.07901841479297],
];

// Component for handling map click event and displaying popup
function ClickHandler() {
  const map = useMapEvent("click", (event) => {
    L.popup()
      .setLatLng(event.latlng)
      .setContent(`You clicked the map at ${event.latlng.toString()}`)
      .openOn(map);
  });
  return null;
}

function StudentMap() {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showMarkerModal, setShowMarkerModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    // Function to get current location
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

    // Get the current location when the component mounts
    getCurrentLocation();

    // Clear the marker position when component unmounts
    return () => {
      setMarkerPosition(null);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleMapClick = (event) => {
    setMarkerPosition([event.latlng.lat, event.latlng.lng]);
  };

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

  // Handler for marker click to show modal
  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    setShowMarkerModal(true);
  };

  // Handler to close the marker modal
  const handleCloseMarkerModal = () => {
    setShowMarkerModal(false);
  };

  const [data, setdata] = useState([]);
  useEffect(() => {
    const studentdata = async () => {
      const response = await fetch(
        "http://localhost/WebApi/api/Student/GetFavStops?id=1",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setdata(await response.json());
        console.log(data);
        return data;
      }
    };
    studentdata();
  }, []);

  return (
    <div
      className="googlemap-container"
      style={{ width: "100%", height: "100vh" }}
    >
      {/* Modal for displaying marker information */}
      <Modal show={showMarkerModal} onHide={handleCloseMarkerModal}>
        <div style={{ backgroundColor: "#2FAA98" }}>
          <Modal.Header closeButton>
            {/* <Modal.Title>Chandni Chowk</Modal.Title> */}
          </Modal.Header>
          <Modal.Body>
            <section className="mappoup-container">
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {data.map((stop, index) => (
                    <>
                      {
                        <div
                          className={
                            stop.Id === 1
                              ? `carousel-item active student-card`
                              : `carousel-item  student-card`
                          }
                        >
                          
                            <h2>{stop.Name}</h2>
                            <div className="row">
                              <div className="stops">
                                <div className="studentmapstop-containers">
                                  <p>Pickup Time </p>
                                  <p className="bold">{stop.Timing}</p>
                                </div>
                                <div className="studentmapstop-containers">
                                  <p>Route No</p>
                                  <p className="bold">{stop.Route}</p>
                                </div>
                              </div>
                            </div>
                            <button className=" studentmap-button edit-stops">
                  ADD Favorite Stop
                </button>
                        </div>
                      }
                    </>
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
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </div>
      </Modal>

      <MapContainer
        center={markerPosition || initialPosition}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
        onClick={handleMapClick}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <ClickHandler />

        {/* Render marker if position is available */}
        {markerPosition && (
          <Marker
            position={markerPosition}
            icon={childlocation}
            eventHandlers={{ click: getCurrentLocation }}
          >
            <Popup>
              Your current location. <br /> Latitude: {markerPosition[0]},
              Longitude: {markerPosition[1]}.
            </Popup>
          </Marker>
        )}

        {/* Adding child markers */}
        {points.map((point, index) => (
          <Marker
            key={index}
            position={point}
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick(point) }}
          >
            {/* No popup here to ensure it doesn't show on map click */}
          </Marker>
        ))}

        {/* Draw polyline between points */}
        <Polyline positions={points} color="red" />
      </MapContainer>
    </div>
  );
}

export default StudentMap;
