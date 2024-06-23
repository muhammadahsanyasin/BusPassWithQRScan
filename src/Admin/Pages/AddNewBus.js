import React, { useState, useEffect } from "react";
import "../Pages/Styles/AddNewBus.css";
import buslogo from "../../Assets/buslogo.png";

function AddNewBus() {
  const [formdata, setFormData] = useState({
    RegNo: "",
    TotalSeats: "",
    ConductorId: { Id: 1 },
    Routes: [],
  });

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch("http://localhost/WebApi/api/Stops/GetAllRoutesTitle?OrganizationId=1");
        if (response.ok) {
          const data = await response.json();
          setRoutes(data);
        } else {
          console.error("Error fetching routes:", response.statusText);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchRoutes();
  }, []);

  const busdata = async () => {
    console.log("Form Data:", formdata);

    try {
      const response = await fetch("http://localhost/WebApi/api/Admin/InsertBus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      if (response.ok) {
        console.log("Data saved to server");
        alert("Data saved successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error saving data:", errorData);
        alert(`Error saving data: ${errorData}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert(`Error saving data: ${error.message}`);
    }
  };

  const handleinput = (e) => {
    const { name, value } = e.target;

    if (name === "RouteId") {
      const routeId = parseInt(value);
      setFormData((prevData) => ({
        ...prevData,
        Routes: [{ RouteId: routeId }],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="addnewbus-container">
      <div className="icon-container-addbus">
        <img src={buslogo} alt="Bus Icon" />
      </div>

      <div className="addnewbusform-container">
        <div className="stop-info">
          <h2>Bus Information</h2>
        </div>
        <input
          type="text"
          placeholder="Bus Registration Number"
          name="RegNo"
          onChange={handleinput}
        />
        <input
          type="text"
          placeholder="Bus Seats"
          name="TotalSeats"
          onChange={handleinput}
        />

        <select name="RouteId" onChange={handleinput}>
          <option value="">Select Route</option>
          {routes.map((route) => (
            <option key={route.RouteId} value={route.RouteId}>
              {route.RouteTitle}
            </option>
          ))}
        </select>
      </div>

      <button onClick={busdata} className="addnewbus-button edit-stops">
        ADD
      </button>
    </div>
  );
}

export default AddNewBus;
