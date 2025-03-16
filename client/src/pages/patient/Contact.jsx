import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { assets } from "../../assets/assets";

const Contact = () => {
  return (
    <Box>
      {/* Heading */}
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <Typography variant="h6">CONTACT</Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          US
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: { md: 10, xs: 3 },
          flexDirection: { xs: "column", md: "row", sx: "row", lg: "row" },
        }}
      >
        {/* Left portion - image */}
        <Box sx={{ maxWidth: "350px" }}>
          <img src={assets.contact_image} style={{ width: "100%" }} />
        </Box>

        {/* Right portion */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // gap: { xs: 2, md: 3 },
          }}
        >
          <Typography variant="h6">OUR OFFICE</Typography>
          <Typography variant="subtitle2" sx={{color : 'gray',mt : 3}}>
            123 Broken Bridge, Besant nagar, Chennai
          </Typography>
          <Typography variant="subtitle2" sx={{color : 'gray',}}>Tel: +91 1234567890</Typography>
          <Typography variant="subtitle2" sx={{color : 'gray'}}>prescriptoinfo@gmail.com</Typography>
          <Typography variant="subtitle2" sx={{mt : 3}}>Careers at PRESCRIPTO</Typography>
          <Typography variant="subtitle2" sx={{color : 'gray'}}>
            Learn more about our teams and job openings.
          </Typography>
          <Box>
            <Button
              variant="outlined"
              sx={{
                mt : 3,
                color: "black",
                borderColor: "black",
                borderRadius: 0,
                px: 3,
                py: 2,
                fontSize: 12,
                textTransform: "none",
                '&:hover' : {
                  backgroundColor : 'black',
                  color : 'white'
                }
              }}
            >
              Explore Jobs
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
