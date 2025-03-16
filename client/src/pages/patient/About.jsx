import { Box, Typography } from "@mui/material";
import React from "react";
import { assets } from "../../assets/assets";

const About = () => {
  const style = {
    border: "1px solid grey",
    p: 3,
    display: "flex",
    flexDirection: "column",
    gap: 2,
    borderRadius: 2,
    textAlign: "center",
    flex: 1,
  };

  return (
    <Box sx={{ px: 2 }}>
      {/* Heading */}
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap : 0.5
        }}
      >
        <Typography variant="h6" >ABOUT</Typography>
        <Typography variant="h6" fontWeight={'bold'}>US</Typography>
      </Box>

      {/* Main portion */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
          width : '100%'
        }}
      >
        {/* main - left portion */}
        <Box sx={{ maxWidth: "300px" }}>
          <img
            src={assets.about_image}
            style={{ width: "100%", height: "fill" }}
            alt="About Us"
          />
        </Box>
        {/* main - right portion */}
        <Box
          sx={{
            flex: 1,
            // maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            color: "gray",
          }}
        >
          <Typography variant="subtitle1">
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </Typography>
          <Typography variant="subtitle1">
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold" ,color : 'black'}}>
            Our Vision
          </Typography>
          <Typography variant="subtitle1">
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </Typography>
        </Box>
      </Box>

      {/* Bottom portion */}
      <Box sx={{ pt: 5, textAlign: "center" }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          WHY CHOOSE US
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <Box sx={style}>
            <Typography variant="h6">EFFICIENCY</Typography>
            <Typography variant="body1">
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </Typography>
          </Box>
          <Box sx={style}>
            <Typography variant="h6">CONVENIENCE</Typography>
            <Typography variant="body1">
              Access to a network of trusted healthcare professionals in your
              area.
            </Typography>
          </Box>
          <Box sx={style}>
            <Typography variant="h6">PERSONALIZATION</Typography>
            <Typography variant="body1">
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
