import { Box, Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import Myprofile from "./pages/Myprofile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Myappointments from "./pages/Myappointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";

const App = () => {
  return (
    <Box sx={{
      maxWidth: "1500px",
      mx: "auto",
      px: { xs: 2, sm: 3, md: 4 }
    }} >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<LoginForm type={'login'} />} />
        <Route path="/create-account" element={<LoginForm type={'create-account'} />}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-appointments" element={<Myappointments />} />
        <Route path="/my-profile" element={<Myprofile />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
      </Routes>
      <Footer  />
    </Box>
  )
}

export default App;