import React ,{useEffect, useState}from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useStore from "./store";
import Login from "./Login";
import ChangePassword from "./Parents/Components/ChangePassword";

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

import StudentFavStop from "./Student/Pages/StudentFavStop";
import StudentHistory from "./Student/Pages/StudentHistory";
import StudentNotificationDetails from "./Student/Pages/StudentNotificationDetails";
import GoogleMap from "./Student/Pages/GoogleMap";
import ParentMap from "./Parents/Pages/ParentMap";
import AddNewStudent from "./Admin/Pages/AddNewStudent";
import AdminHistory from "./Admin/Pages/AdminHistory";
import ConductorHistory from "./Conductor/Pages/ConductorHistory";
import ParentHistory from "./Parents/Pages/ParentHistory";
import AdminMap from "./Admin/Pages/AdminMap";
import StudentMap from "./Student/Pages/StudentMap";
import ConductorMap from "./Conductor/Pages/ConductorMap";
import ConductorVerification from "./Conductor/Pages/ConductorVerification";

import AddMoreJourneys from "./Admin/Pages/AddMoreJourneys";
import SearchAndUpdate from "./Admin/Pages/SearchAndUpdate";

import StudentProfile from "./Student/Pages/StudentProfile";
import StudentNotification from "./Student/Pages/StudentNotification";
import ConductorNotification from "./Conductor/Pages/ConductorNotification";
import AdminNotification from "./Admin/Pages/AdminNotification";
import AdminNotificattionDetail from "./Admin/Pages/AdminNotificattionDetail";
import ConductorNotificationDetail from "./Conductor/Pages/ConductorNotificationDetail";
import ParentNotificationDetail from "./Parents/Pages/ParentNotificationDetail";
import AddScreens from "./Admin/Pages/AddScreens";
import AdminChangePassword from "./Admin/Components/AdminChangePassword";






function App() {

  const [selectPosition, setSelectPosition] = useState(null);
  useEffect(()=>{
    if(new Date()- (new Date( localStorage.getItem("addtime"))) > 300000)
      {
        console.log("nulled")
        localStorage.setItem("user", null)
      }
    
   
  },[])

  return (
    <BrowserRouter>
      <Routes>
    
          <> 
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to='Login' />} />
      

            <Route path="/ParentDashboard"element={<ParentDashboard progress={59} />}/>
            <Route path="/ChangePassword" element={<ChangePassword />} />
            <Route path="/EditStopInfo" element={<EditStopInfo />} />
            <Route path="/AddExistingStops" element={<AddExistingStops />} />
            <Route path="/AddNewConductor" element={<AddNewConductor />} />
            <Route path="/AddNewBus" element={<AddNewBus />} />
            <Route path="/AddNewAdmin" element={<AddNewAdmin />} />
            <Route path="/AdminDashboard"element={<AdminDashboard progress={59} />}/>
            <Route path="/AdminProfile" element={<AdminProfile />} />
            <Route path="/AddNewStudent" element={<AddNewStudent/>} />
            <Route path="/AdminNotification" element={<AdminNotification/>} />
            <Route path="/AdminNotificattionDetail" element={<AdminNotificattionDetail/>} />

     <Route path="/AdminChangePassword" element={<AdminChangePassword/>} />
            <Route path="/ParentMap" element={<ParentMap />} />    
            <Route path="/ParentsNotification" element={<ParentsNotification />} />
            
            
            <Route path="/BarCodeScanner" element={<BarCodeScanner />} />
            <Route path="/StudentDashboard" element={<StudentDashboard progress={70} />} />
           
            <Route path="/ConductorProfile" element={<ConductorProfile />} />
            <Route path="/ParentProfile" element={<ParentProfile />} />
            <Route path="/BarCodeGenrator" element={<BarCodeGenrator />} />
            <Route path="/ConductorDashboard" element={<ConductorDashboard progress={35} />}/>
           
            <Route path="/StudentFavStop" element={<StudentFavStop/>} />
            <Route path="/StudentNotificationDetails" element={<StudentNotificationDetails/>} />
           <Route path="/GoogleMap" element={<GoogleMap/>} />
           
           <Route path="/GoogleMap" element={<GoogleMap  selectPosition={selectPosition}/>} />
           <Route path="/StudentHistory" element={<StudentHistory/>} />
           <Route path="/AdminHistory" element={<AdminHistory/>} />
           <Route path="/ConductorHistory" element={<ConductorHistory/>} />
           <Route path="/ParentHistory" element={<ParentHistory/>} />
           <Route path="/AdminMap" element={<AdminMap/>} />
           <Route path="/StudentMap" element={<StudentMap/>} />
           <Route path="/ConductorMap" element={<ConductorMap/>} />
           <Route path="/ConductorVerification" element={<ConductorVerification/>} />
           <Route path="/SearchAndUpdate" element={<SearchAndUpdate/>} />
           <Route path="/AddMoreJourneys" element={<AddMoreJourneys/>} />
          
           <Route path="/StudentProfile" element={<StudentProfile/>} />
           <Route path="/StudentNotification" element={<StudentNotification/>} />
           <Route path="/ConductorNotification" element={<ConductorNotification/>} />
           <Route path="/AddScreens" element={<AddScreens/>} />
           <Route path="/ConductorNotificationDetail" element={<ConductorNotificationDetail/>} />
           <Route path="/ParentNotificationDetail" element={<ParentNotificationDetail/>} />
           

           
      </>
    
     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
