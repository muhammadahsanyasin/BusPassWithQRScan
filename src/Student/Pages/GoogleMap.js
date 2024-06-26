import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvent, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "../../Assets/marker.png";
import childloc from "../../Assets/childloc.png";
import busloc from "../../Assets/BusMapMarker.png";
import { Modal } from "react-bootstrap";


const customIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [50, 50],
});

const childlocation = L.icon({
  iconUrl: childloc,
  iconSize: [38, 38],
});

const buslocation = L.icon({
  iconUrl: busloc,
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
function GoogleMap() {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showMarkerModal, setShowMarkerModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [data, setData] = useState([]);
  const [stopPoints, setStopPoints] = useState([]);
  const [busLocations, setBusLocations] = useState([]);

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
    // getCurrentLocation();

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

  // Function to handle adding a favorite stop
  const addFavoriteStop = async (stopId) => {
    const studentId = 2; // Replace this with the actual studentId if needed
    const response = await fetch(`http://localhost/WebApi/api/Student/AddFavStop?studentId=${studentId}&stopId=${stopId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("Favorite stop added successfully");
    } else {
      console.error("Error adding favorite stop:", response.statusText);
      alert("Failed to add favorite stop");
    }
  };

  useEffect(() => {
    const fetchStops = async () => {
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
      }
    };
    fetchStops();
  }, []);

  useEffect(() => {
    const fetchBusLocations = async () => {
      try {
        const response = await fetch("http://localhost/WebApi/api/Bus/GetBusesLocations?OrganizationId=1", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const busData = await response.json();
          // Filter out invalid bus locations
          const validBusLocations = busData.filter(bus => {
            const lat = parseFloat(bus.Cords.latitude);
            const lng = parseFloat(bus.Cords.longitude);
            return !isNaN(lat) && !isNaN(lng);
          });
          setBusLocations(validBusLocations);
        } else {
          console.error("Failed to fetch bus locations");
        }
      } catch (error) {
        console.error("Error fetching bus locations:", error);
      }
    };

    // Fetch bus locations initially and set interval for updates
    fetchBusLocations();
    const interval = setInterval(fetchBusLocations, 1000);

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
                  <button
                    className="studentmap-button edit-stops"
                    onClick={() => addFavoriteStop(selectedLocation.Id)}
                  >
                    ADD Favorite Stop
                  </button>
                </div>
              </section>
            )}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </div>
      </Modal>

      <MapContainer
        center={markerPosition || initialPosition}
        zoom={10}
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

        {/* Adding markers for stops */}
        {data.map((stop, index) => (
          <Marker
            key={index}
            position={[parseFloat(stop.Latitude), parseFloat(stop.Longitude)]}
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick(stop) }}
          />
        ))}

        {/* Adding markers for buses */}
        {busLocations.map((bus, index) => (
          <Marker
            key={index}
            position={[parseFloat(bus.Cords.latitude), parseFloat(bus.Cords.longitude)]}
            icon={buslocation}
          >
            <Popup>
              Bus ID: {bus.BusId} <br />
              Latitude: {bus.Cords.latitude} <br />
              Longitude: {bus.Cords.longitude}
            </Popup>
          </Marker>
        ))}

        {/* Draw polyline between stops */}
        {stopPoints.length > 0 && (
          <Polyline positions={stopPoints} color="red" />
        )}
      </MapContainer>
    </div>
  );
}

export default GoogleMap;
