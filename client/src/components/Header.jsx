import { Avatar, Box, Button, Typography } from "@mui/material";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#5f6FFF",
                // px: { xs: 2, md: 20 },
                pt: { xs: 5, md: 0 },
                my: { xs: 3, md: 5 },
                borderRadius: 2,
            }}
        >
            {/* Left Side - Text */}
            <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" }, ml: { xs: 0, md: 10 }, p: { xs: 2 } }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: 'white' }}>
                    Book Appoinment <br />With Trusted Doctors
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 , mt : {xs : 2}}}>
                    <img src={assets.group_profiles} style={{ width: '100px' }} />
                    <Typography variant="body1" sx={{ color: 'white' }}>
                        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
                    </Typography>
                </Box>
                <a href='#speciality'>
                    <Button variant="contained" sx={{
                        backgroundColor: 'white',
                        color: 'black',
                        borderRadius: 5,
                        fontSize: '10px',
                        px: 3,
                        py: 1.5,
                        mt: { md: 2, xs: 4 },
                        '&:hover': {
                            scale: 1.1,
                            transition: 'all 0.5s ease'
                        }
                    }}>Book An Appointment </Button>
                </a>
            </Box>

            {/* Right Side - Image */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: { xs: "center", md: "flex-end" },
                    mt: { xs: 3, md: 20 },
                    pr: { xs: 0, md: 10 }
                }}
            >
                <img
                    src={assets.header_img}
                    alt="Header"
                    style={{ width: "100%", maxWidth: "400px", borderRadius: "10px" }}
                />
            </Box>
        </Box>
    );
};

export default Header;
