import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvent, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "../../Assets/marker.png";
import childloc from "../../Assets/childloc.png";
import { Modal } from "react-bootstrap";
import '../Pages/Styles/ParentMap.css';

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

function ParentMap() {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [childPosition, setChildPosition] = useState(null);
  const [showMarkerModal, setShowMarkerModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [data, setData] = useState([]);
  const [stopPoints, setStopPoints] = useState([]);

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
  }, []);

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

  useEffect(() => {
    const fetchStops = async () => {
      try {
        const response = await fetch("http://localhost/WebApi/api/Stops/GetAllRoutes?OrganizationId=1", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const stops = await response.json();
          // Flattening the array and filtering out invalid stops
          const flattenedStops = stops.flat().filter(stop => stop.Latitude && stop.Longitude);
          setData(flattenedStops);
          setStopPoints(flattenedStops.map(stop => [parseFloat(stop.Latitude), parseFloat(stop.Longitude)]));
        } else {
          console.error("Failed to fetch stops");
        }
      } catch (error) {
        console.error("Error fetching stops:", error);
      }
    };
    fetchStops();
  }, []);

  useEffect(() => {
    const fetchChildLocation = async () => {
      try {
        const response = await fetch("http://localhost/WebApi/api/Parent/GetChildLocation?id=1", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const childData = await response.json();
          const lat = parseFloat(childData.latitude);
          const lng = parseFloat(childData.longitude);
          if (!isNaN(lat) && !isNaN(lng)) {
            setChildPosition([lat, lng]);
          } else {
            console.error("Invalid child location data");
          }
        } else {
          console.error("Failed to fetch child location");
        }
      } catch (error) {
        console.error("Error fetching child location:", error);
      }
    };

    // Fetch child location initially and set interval for updates
    fetchChildLocation();
    const interval = setInterval(fetchChildLocation, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="googlemap-container" style={{ width: "100%", height: "100vh" }}>
      {/* Modal for displaying marker information */}
      <Modal show={showMarkerModal} onHide={handleCloseMarkerModal}>
        <div style={{ backgroundColor: "#2FAA98" }}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            {selectedLocation && (
              <section className="mappoup-container">
                <div>
                  <h2>{selectedLocation.Name}</h2>
                  <div className="row">
                    <div className="stops">
                      <div className="studentmapstop-containers">
                        <p>Pickup Time </p>
                        <p className="bold">{selectedLocation.Timing}</p>
                      </div>
                      <div className="studentmapstop-containers">
                        <p>Route No</p>
                        <p className="bold">{selectedLocation.Route}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </div>
      </Modal>

      <MapContainer
        center={markerPosition || initialPosition}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
        onClick={handleMapClick}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <ClickHandler />

        {/* Render marker if position is available */}
        {markerPosition && (
          <Marker
            position={markerPosition}
            icon={customIcon}
            eventHandlers={{ click: getCurrentLocation }}
          >
            <Popup>
              Your current location. <br /> Latitude: {markerPosition[0]},
              Longitude: {markerPosition[1]}.
            </Popup>
          </Marker>
        )}

        {/* Adding markers for stops */}
        {data.map((stop, index) => (
          <Marker
            key={index}
            position={[parseFloat(stop.Latitude), parseFloat(stop.Longitude)]}
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick(stop) }}
          />
        ))}

        {/* Adding marker for child location */}
        {childPosition && (
          <Marker
            position={childPosition}
            icon={childlocation}
          >
            <Popup>
              Child's current location. <br /> Latitude: {childPosition[0]},
              Longitude: {childPosition[1]}.
            </Popup>
          </Marker>
        )}

        {/* Draw polyline between stops */}
        {stopPoints.length > 0 && (
          <Polyline positions={stopPoints} color="red" />
        )}
      </MapContainer>
    </div>
  );
}

export default ParentMap;
