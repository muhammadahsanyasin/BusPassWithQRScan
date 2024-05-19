import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "../../Assets/marker.png";
import childloc from "../../Assets/childloc.png";

const customIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [38, 38],
});

const childlocIcon = L.icon({
  iconUrl: childloc ,
  iconSize: [38, 38],
});

const initialPosition = [33.64340057674401, 73.0790521153456];
const point1 = [33.65221479100481, 73.06464916506403];
const point2 = [33.64325572431809, 73.06407053297772];
const point3 = [33.64266730832196, 73.07319440734358];
const point4 = [33.64179296464606, 73.07699834732112];
const point5 = [33.64331651749647, 73.07780627129169];
const point6 = [33.64314132414114, 73.07901841479297];

function ParentMap() {
  const [markerPosition, setMarkerPosition] = useState(null);

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

  const handleMapClick = (event) => {
    setMarkerPosition(event.latlng);
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

  return (
    <div className="googlemap-container">
      <MapContainer
        center={markerPosition || initialPosition}
        zoom={23}
        style={{ width: "100%", height: "100%" }}
        onClick={handleMapClick}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/bright-v2/256/{z}/{x}/{y}.png?key=RBRODA7cHl7LOG0fTgd6"
        />

        {markerPosition && (
          <Marker position={markerPosition} icon={customIcon}>
            <Popup>
              Your current location. <br /> Latitude: {markerPosition[0]},
              Longitude: {markerPosition[1]}.
            </Popup>
          </Marker>
        )}

        <Polyline positions={[point1, point2, point3, point4, point5, point6]} color="blue" />

        <Marker position={point6} icon={childlocIcon}>
          <Popup>
            Loctaion of a child  <br /> Latitude: {point6[0]}, Longitude: {point6[1]}.
          </Popup>
        </Marker>
      </MapContainer>
      
      {/* <button onClick={getCurrentLocation}>Get Current Location</button> */}
    </div>
  );
}

export default ParentMap;
