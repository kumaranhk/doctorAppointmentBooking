import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/patient/Home";
import Doctors from "./pages/patient/Doctors";
import Login from "./pages/patient/Login";
import Myprofile from "./pages/patient/Myprofile";
import About from "./pages/patient/About";
import Contact from "./pages/patient/Contact";
import Myappointments from "./pages/patient/Myappointments";
import Appointment from "./pages/patient/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDoctors from "./pages/admin/Doctors";
import Adminappointments from "./pages/admin/Appointments";
import AdminPatients from "./pages/admin/Patients";
import Dashboard from "./pages/admin/Dashboard";
import DoctorAppointments from "./pages/doctor/Appointments";
import { ToastContainer, Zoom } from "react-toastify";

const App = () => {
  return (
    <Box sx={{
      maxWidth: "1500px",
      mx: "auto",
      px: { xs: 2, sm: 3, md: 4 }
    }} >
      <ToastContainer position="bottom-center" autoClose={5000} transition={Zoom} theme="colored"/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm type={'login'} />} />
        <Route path="/create-account" element={<LoginForm type={'create-account'}/>}/>
        <Route path="/unauthorized" element={<h1>You are not authorized</h1>}/>
        <Route path="/my-profile" element={<Myprofile/>}/>

        {/* Patient routes */}
        <Route path="/doctors" element={<ProtectedRoute role={'patient'}><Doctors/></ProtectedRoute>} />
        <Route path="/doctors/:speciality" element={<ProtectedRoute role={'patient'}><Doctors/></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute role={'patient'}><About/></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute role={'patient'}><Contact/></ProtectedRoute>} />
        <Route path="/my-appointments" element={<ProtectedRoute role={'patient'}><Myappointments/></ProtectedRoute>} />
        <Route path="/appointment/:docId" element={<ProtectedRoute role={'patient'}><Appointment/></ProtectedRoute>} />

        {/* Admin routes */}
        <Route path="/admin/doctors" element={<ProtectedRoute role={'admin'}><AdminDoctors/></ProtectedRoute>}/>
        <Route path="/admin/appointments" element={<ProtectedRoute role={'admin'}><Adminappointments/></ProtectedRoute>} />
        <Route path="/admin/patients" element={<ProtectedRoute role={'admin'}><AdminPatients /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute role={'admin'}><Dashboard /></ProtectedRoute>} />


        {/* Doctor routes */}
        <Route path="/doctor/appointments" element={<ProtectedRoute role={'doctor'}><DoctorAppointments/></ProtectedRoute>} />

        <Route path="*" element={<h1>404 Page not found</h1>} />
      </Routes>
      <Footer  />
    </Box>
  )
}

export default App;