import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "../../Assets/marker.png";
import busIcon from "../../Assets/BusMapMarker.png";
import { Modal, Button } from "react-bootstrap";
import "../Pages/Styles/ConductorMap.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Define the custom icons
const customIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [38, 38],
});

const busMarkerIcon = L.icon({
  iconUrl: busIcon,
  iconSize: [38, 38],
});

// Initial position
const initialPosition = [33.64340057674401, 73.0790521153456];

const RoutingMachine = ({ waypoints }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: waypoints,
      createMarker: (i, waypoint) => {
        return L.marker(waypoint.latLng, {
          icon: i === 0 ? busMarkerIcon : customIcon, // Use bus icon for the first marker
        });
      },
      routeWhileDragging: false,
      addWaypoints: false,
      autoRoute: true,
      lineOptions: {
        styles: [{ color: 'blue', opacity: 1, weight: 5 }]
      }
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, waypoints]);

  return null;
};

function ConductorMap() {
  const [busPosition, setBusPosition] = useState(initialPosition);
  const [showMarkerModal, setShowMarkerModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [points, setPoints] = useState([]);
  const [routeStops, setRouteStops] = useState([]);
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [updateInterval, setUpdateInterval] = useState(null);

  useEffect(() => {
    // Function to get current location
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setBusPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    };

    // Get the current location when the component mounts
    getCurrentLocation();

    // Fetch assigned routes from API
    const fetchAssignedRoutes = async () => {
      try {
        const response = await fetch("http://localhost/WebApi/api/Conductor/GetAssignedRoutes/?conductorId=2");
        const data = await response.json();

        if (data.length > 0 && data[0].Stops) {
          const routePoints = data[0].Stops
            .filter(stop => stop.Latitude && stop.Longitude)
            .map(stop => ({
              position: [parseFloat(stop.Latitude), parseFloat(stop.Longitude)],
              name: stop.Name,
              timing: stop.Timing
            }));

          setPoints(routePoints.map(stop => stop.position));
          setRouteStops(routePoints);
        }
      } catch (error) {
        console.error("Error fetching assigned routes:", error);
      }
    };

    fetchAssignedRoutes();

    // Clear the bus position when component unmounts
    return () => {
      setBusPosition(null);
      if (updateInterval) {
        clearInterval(updateInterval);
      }
    };
  }, [updateInterval]); // Dependency array includes updateInterval

  useEffect(() => {
    if (journeyStarted) {
      const intervalId = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setBusPosition([latitude, longitude]);
            try {
              const response = await fetch("http://localhost/WebApi/api/Conductor/UpdateBusLocation", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ latitude, longitude }),
              });

              if (!response.ok) {
                console.error('Failed to update bus location');
              }
            } catch (error) {
              console.error('Error updating bus location:', error);
            }
          },
          (error) => {
            console.error("Error getting current location:", error);
          }
        );
      }, 2000);

      setUpdateInterval(intervalId);

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }
  }, [journeyStarted]);

  const handleMapClick = (event) => {
    setBusPosition(event.latlng);
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

  // Function to start the journey
  const startJourney = async () => {
    try {
      const response = await fetch("http://localhost/WebApi/api/Conductor/StartJourney/?busId=2&routeId=2", {
        method: 'POST'
      });

      if (response.ok) {
        alert('Journey started successfully!');
        setJourneyStarted(true);
      } else {
        alert('Failed to start journey.');
      }
    } catch (error) {
      console.error('Error starting journey:', error);
    }
  };

  return (
    <div className="googlemap-container" style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Button 
        onClick={startJourney} 
        disabled={journeyStarted} 
        style={{ 
          position: "absolute", 
          top: "10px", 
          right: "10px", 
          color:"black",
          zIndex: 1000 
        }}>
        {journeyStarted ? 'Journey Started' : 'Start Journey'}
      </Button>

      {/* Modal for displaying marker information */}
      <Modal show={showMarkerModal} onHide={handleCloseMarkerModal}>
        <div style={{ backgroundColor: "#2FAA98" }}>
          <Modal.Header closeButton>
            <Modal.Title>Stop Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedLocation && (
              <div className="show-stops-conductormap">
                <section className="dashboard-container">
                  <div className="row">
                    <div className="stops">
                      <div className="conductormapstop-containers">
                        <p>Name</p>
                        <p className="bold">{selectedLocation.name}</p>
                      </div>
                      <div className="conductormapstop-containers">
                        <p>Timing</p>
                        <p className="bold">{selectedLocation.timing}</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </div>
      </Modal>

      <MapContainer
        center={busPosition || initialPosition}
        zoom={14}
        style={{ width: "100%", height: "100%" }}
        onClick={handleMapClick}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Render bus marker if position is available */}
        {busPosition && (
          <Marker position={busPosition} icon={busMarkerIcon}>
            <Popup>
              Bus current location. <br /> Latitude: {busPosition[0]}, Longitude: {busPosition[1]}.
            </Popup>
          </Marker>
        )}

        {/* Adding child markers */}
        {routeStops.map((stop, index) => (
          <Marker
            key={index}
            position={stop.position}
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick(stop) }}
          />
        ))}

        {/* Draw polyline between points */}
        <Polyline positions={points} color="blue" />

        {/* Routing Machine to show the route */}
        {journeyStarted && <RoutingMachine waypoints={[busPosition, ...points.map(point => L.latLng(point[0], point[1]))]} />}
      </MapContainer>
    </div>
  );
}

export default ConductorMap;
