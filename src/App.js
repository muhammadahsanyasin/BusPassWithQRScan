import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useStore from "./store";
import Login from "./Login";
import ChangePassword from "./Parents/Components/ChangePassword";
import GoogleMapComponent from "./Parents/Components/GoogleMapComponent";
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
import StudentProfile from "./Student/Pages/StudentProfile";
import StudentFavStop from "./Student/Pages/StudentFavStop";
import StudentHistory from "./Student/Pages/StudentHistory";

function App() {
  const { loginstatus } = useStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Route to login page */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        {loginstatus ? (
          <>
            <Route path="/ParentDashboard"element={<ParentDashboard progress={59} />}/>
            <Route path="/ChangePassword" element={<ChangePassword />} />
            <Route path="/GoogleMapComponent" element={<GoogleMapComponent />} />    
            <Route path="/ParentsNotification" element={<ParentsNotification />} />
            <Route path="/EditStopInfo" element={<EditStopInfo />} />
            <Route path="/AddExistingStops" element={<AddExistingStops />} />
            <Route path="/AddNewConductor" element={<AddNewConductor />} />
            <Route path="/AddNewBus" element={<AddNewBus />} />
            <Route path="/AddNewAdmin" element={<AddNewAdmin />} />
            <Route path="/AdminDashboard"element={<AdminDashboard progress={59} />}/>
            <Route path="/BarCodeScanner" element={<BarCodeScanner />} />
            <Route path="/StudentDashboard" element={<StudentDashboard progress={70} />} />
            <Route path="/AdminProfile" element={<AdminProfile />} />
            <Route path="/ConductorProfile" element={<ConductorProfile />} />
            <Route path="/ParentProfile" element={<ParentProfile />} />
            <Route path="/BarCodeGenrator" element={<BarCodeGenrator />} />
            <Route path="/ConductorDashboard" element={<ConductorDashboard progress={35} />}/>
            <Route path="/StudentProfile" element={<StudentProfile />} />
            <Route path="/StudentFavStop" element={<StudentFavStop/>} />
            <Route path="/StudentHistory" element={<StudentHistory/>} />
          </>
        ) : (
          // Render login page if not logged in
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;