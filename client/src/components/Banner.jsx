import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Banner = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#5f6FFF",
        // px: { xs: 2, md: 20 },
        // pt: { xs: 3, md: 15 },
        my: { xs: 3, md: 5 },
        borderRadius: 2,
      }}
    >
      {/* Left Side - Text */}
      <Box
        sx={{
          flex: 1,
          textAlign: { xs: "center", md: "left" },
          ml: { xs: "auto", md: 10 },
          pt: { xs: 4 },
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "white" }}
        >
          Book Appoinment <br />
          With 100+ Trusted Doctors
        </Typography>

        {!user && (
          <Button
            variant="contained"
            onClick={() => {
              navigate("/login");
              scrollTo(0, 0);
            }}
            sx={{
              backgroundColor: "white",
              color: "black",
              borderRadius: 5,
              fontSize: "10px",
              px: 3,
              py: 1.5,
              mt: 2,
              "&:hover": {
                scale: 1.1,
                transition: "all 0.5s ease",
              },
            }}
          >
            {"Create Account"}{" "}
          </Button>
        )}
      </Box>

      {/* Right Side - Image */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" },
          mt: { xs: 3, md: -4 },
          pr: { xs: 0, md: 10 },
        }}
      >
        <img
          src={assets.appointment_img}
          alt="Header"
          style={{ width: "100%", maxWidth: "400px", borderRadius: "10px" }}
          loading="lazy"
        />
      </Box>
    </Box>
  );
};

export default Banner;
