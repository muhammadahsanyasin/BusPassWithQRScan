import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route , useNavigate, Navigate, useLocation} from "react-router-dom";
import "./App.css";
import ChangePassword from "./Parents/Components/ChangePassword";
import GoogleMapComponent from"./Parents/Components/GoogleMapComponent";
import ParentsNotification from "./Parents/Pages/ParentsNotification";
import AddExistingStops from "./Admin/Pages/AddExistingStops";
import EditStopInfo from "./Admin/Pages/EditStopInfo";
import AddNewConductor from "./Admin/Pages/AddNewConductor";
import AddNewBus from "./Admin/Pages/AddNewBus";
import AddNewAdmin from "./Admin/Pages/AddNewAdmin";
import StudentDashboard from "./Student/Pages/StudentDashboard";
import ParentDashboard from "./Parents/Pages/ParentDashboard";
import AdminDashboard from "./Admin/Pages/AdminDashboard";
import ConductorDashboard from "./Conductor/Pages/ConductorDashboard";
import BarCodeScanner from "./Conductor/Pages/BarCodeScanner";
import AdminProfile from "./Admin/Pages/AdminProfile";
import ConductorProfile from "./Conductor/Pages/ConductorProfile";
import ParentProfile from "./Parents/Pages/ParentProfile";
import BarCodeGenrator from "./Student/Pages/BarCodeGenrator";
import Login from "./Login";
import StudentProfile from "./Student/Pages/StudentProfile";
import useStore from "./store";





function App() {

  const { loginstatus, setloginstatus, addloginstatus } = useStore();


  return (
    <BrowserRouter>


      <Routes>
     
        <Route path="/" element={<h1>Fuckin app</h1>} />
        {<Route path="/login"/> && loginstatus && <Route path="/login" element={<h1>Fuckin app</h1>} />} 
        {!loginstatus && <Route path="/login" element={<Login/>} />}
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/GoogleMapComponent" element={<GoogleMapComponent />} />
        <Route path="/ParentsNotification" element={<ParentsNotification />} />
        <Route path="/EditStopInfo" element={<EditStopInfo/>} />
        <Route path="/AddExistingStops" element={<AddExistingStops />} />
        <Route path="/AddNewConductor" element={<AddNewConductor />} />
        <Route path="/AddNewBus" element={<AddNewBus />} />
        <Route path="/AddNewAdmin" element={<AddNewAdmin/>} />
        <Route path="/ParentDashboard" element={<ParentDashboard progress={50}/>} /> 
        <Route path="/AdminDashboard" element={< AdminDashboard progress={59}/>} />
        <Route path="/BarCodeScanner " element={<BarCodeScanner/>} />
        <Route path="/StudentDashboard" element={<StudentDashboard progress={70}/>} />
        <Route path="/AdminProfile" element={<AdminProfile/>} />
        <Route path="/ConductorProfile" element={<ConductorProfile/>} />
        <Route path="/ParentProfile" element={<ParentProfile/>} />
        <Route path="/BarCodeGenrator" element={<BarCodeGenrator/>} />
        <Route path="/ConductorDashboard" element={<ConductorDashboard progress={35}/>} />
        <Route path="/StudentProfile" element={<StudentProfile/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
