import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon from "../../Assets/marker.png";
import "./Styles/GoogleMap.css";

const customIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [38, 38],
});

const initialPosition = [33.64340057674401, 73.0790521153456];
const markPosition = [35.64340057674401, 76.0790521153456];


const childLocations = [
  { latitude: 33.62143941364173, longitude: 73.06649344534786 },
  { latitude: 33.61580806175649, longitude: 73.06536334223695 },
  { latitude: 33.61226103098687, longitude: 73.06514487798462 },
  { latitude: 33.59934934614757, longitude: 73.06264830651558 },
  { latitude: 33.592161870536664, longitude: 73.05439953778502 },
  { latitude: 33.585168200292784, longitude: 73.0645131331935 },
  { latitude: 33.59059836860913, longitude: 73.07861567925173 },
  { latitude: 33.59545700923111, longitude: 73.07889345288326 },
];
function GoogleMap() {
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleMapClick = (event) => {
    setMarkerPosition(event.latlng);
  };

 

  return (
    <div className="googlemap-container">
      <MapContainer
        center={initialPosition}
        zoom={13}
        style={{ width: "100%", height: "100%", position: "relative" }}
        onClick={handleMapClick}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/bright-v2/256/{z}/{x}/{y}.png?key=RBRODA7cHl7LOG0fTgd6"
        />
      

        {/* Adding child markers */}
        {childLocations.map((location, index) => (
          <Marker
            key={index}
            position={[location.latitude, location.longitude]}
            icon={customIcon}
          >
            <Popup>
              Child {index + 1} location. <br /> Latitude: {location.latitude},
              Longitude: {location.longitude}.
            </Popup>
          </Marker>
        ))}
       
      </MapContainer>
    </div>
  );
}

export default GoogleMap;
