import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "../../Assets/institutelogo.png";
import { Modal, Button, Form } from "react-bootstrap";
import axios from 'axios';

// Custom marker icon
const customIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [38, 38],
});

const initialPosition = [33.64340057674401, 73.0790521153456]; // Fixed initial position

function LongPressHandler({ onLongPress }) {
  useMapEvents({
    mousedown(e) {
      this.pressTimer = setTimeout(() => onLongPress(e), 1000); // 1 second for long press
    },
    mouseup() {
      clearTimeout(this.pressTimer);
    },
    mousemove() {
      clearTimeout(this.pressTimer);
    },
  });
  return null;
}

function SuperAdminMap() {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showMarkerModal, setShowMarkerModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminContact, setAdminContact] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminGender, setAdminGender] = useState("Male");
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    // Fetch organizations when component mounts
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await axios.get("http://localhost/WebApi/api/SuperAdmin/GetAllOrganizations");
      console.log("Fetched organizations:", response.data);
      setOrganizations(response.data); // Assuming response.data is an array of organizations
    } catch (error) {
      console.error("Error fetching organizations:", error);
      alert("Failed to fetch organizations.");
    }
  };

  const handleLongPress = (event) => {
    setMarkerPosition([event.latlng.lat, event.latlng.lng]);
    setSelectedLocation([event.latlng.lat, event.latlng.lng]);
    setShowMarkerModal(true);
  };

  const handleCloseMarkerModal = () => {
    setShowMarkerModal(false);
  };

  const handleAddNewOrg = () => {
    setShowMarkerModal(false);
    setShowOrgModal(true);
  };

  const handleOrgNameChange = (event) => {
    setOrgName(event.target.value);
  };

  const handleAdminNameChange = (event) => {
    setAdminName(event.target.value);
  };

  const handleAdminContactChange = (event) => {
    setAdminContact(event.target.value);
  };

  const handleAdminPasswordChange = (event) => {
    setAdminPassword(event.target.value);
  };

  const handleAdminGenderChange = (event) => {
    setAdminGender(event.target.value);
  };

  const handleSaveOrganization = async () => {
    if (selectedLocation && orgName && adminName && adminContact && adminPassword) {
      const [lat, lng] = selectedLocation;
      const organizationData = {
        Name: orgName,
        Cords: {
          latitude: lat,
          longitude: lng,
        }
      };

      try {
        console.log("Sending organization data to server:", JSON.stringify(organizationData, null, 2));
        
        // Insert Organization
        const orgResponse = await axios.post("http://localhost/WebApi/api/SuperAdmin/InsertOrganization", organizationData);
        const newOrganizationId = orgResponse.data.OrganizationId;

        console.log("Organization added with ID:", newOrganizationId);

        // Prepare Admin data
        const adminData = {
          Name: adminName,
          Gender: adminGender,
          Contact: adminContact,
          Password: adminPassword,
          OrganizationId: newOrganizationId
        };

        console.log("Sending admin data to server:", JSON.stringify(adminData, null, 2));
        
        // Insert Admin
        const adminResponse = await axios.post("http://localhost/WebApi/api/Users/InsertAdmin", adminData);

        console.log("Admin added successfully:", adminResponse.data);

        alert("Organization and Admin added successfully!");
        setShowOrgModal(false);

        // Refresh organizations after adding new one
        fetchOrganizations();
      } catch (error) {
        console.error("Error adding new organization or admin:", error);
        if (error.response) {
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
          console.log("Response headers:", error.response.headers);
          alert(`Failed to add organization or admin: ${error.response.data}`);
        } else if (error.request) {
          console.log("Request data:", error.request);
          alert("No response received from server.");
        } else {
          console.log("Error message:", error.message);
          alert(`Error: ${error.message}`);
        }
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div
      className="googlemap-container"
      style={{ width: "100%", height: "100vh" }}
    >
      {/* Modal for marker actions */}
      <Modal show={showMarkerModal} onHide={handleCloseMarkerModal}>
        <div style={{ backgroundColor: "#2FAA98" }}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <section className="mappoup-container">
              <Button className="student-button edit-stops" onClick={handleAddNewOrg}>
                ADD New Organization
              </Button>
            </section>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </div>
      </Modal>

      {/* Modal for adding a new organization */}
      <Modal show={showOrgModal} onHide={() => setShowOrgModal(false)}>
        <div style={{ backgroundColor: "#2FAA98" }} className="modal-color">
          <Modal.Header closeButton>
            <Modal.Title>Organization Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Organization Name</Form.Label>
                <Form.Control
                  type="text"
                  name="orgName"
                  placeholder="Enter organization name"
                  value={orgName}
                  onChange={handleOrgNameChange}
                />
              </Form.Group>
              <hr />
              <h5>Admin Details</h5>
              <Form.Group>
                <Form.Label>Admin Name</Form.Label>
                <Form.Control
                  type="text"
                  name="adminName"
                  placeholder="Enter admin name"
                  value={adminName}
                  onChange={handleAdminNameChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Admin Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="adminContact"
                  placeholder="Enter admin contact"
                  value={adminContact}
                  onChange={handleAdminContactChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Admin Password</Form.Label>
                <Form.Control
                  type="password"
                  name="adminPassword"
                  placeholder="Enter admin password"
                  value={adminPassword}
                  onChange={handleAdminPasswordChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Admin Gender</Form.Label>
                <Form.Check
                  type="radio"
                  label="Male"
                  name="adminGender"
                  value="Male"
                  checked={adminGender === "Male"}
                  onChange={handleAdminGenderChange}
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  name="adminGender"
                  value="Female"
                  checked={adminGender === "Female"}
                  onChange={handleAdminGenderChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowOrgModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveOrganization}>
              Save Changes
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

      <MapContainer
        center={markerPosition || initialPosition} // Use fixed initial position if no marker is set
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <LongPressHandler onLongPress={handleLongPress} />

        {/* Render markers for organizations */}
        {organizations.map((org) => (
          <Marker
            key={org.OrganizationId}
            position={[org.Cords.latitude, org.Cords.longitude]}
            icon={customIcon}
          >
            <Popup>
              <strong>{org.Name}</strong>
            </Popup>
          </Marker>
        ))}

        {/* Render marker if position is available */}
        {markerPosition && (
          <Marker
            position={markerPosition}
            icon={customIcon}
          >
            <Popup>
              Selected location. <br /> Latitude: {markerPosition[0]},
              Longitude: {markerPosition[1]}.
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default SuperAdminMap;
