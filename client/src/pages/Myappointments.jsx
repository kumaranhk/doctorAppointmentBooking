import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Myappointments = () => {
  const { doctors } = useContext(AppContext);
  const btnStyle = {
    ml: 'auto',
    mt: 'auto',
    width: '100%',
    height: 50,
    textTransform: 'none',
    border: '1px solid black',
    fontSize: { xs: '12px', sm: '14px' },
    transition: 'all 0.5s ease-in-out',
  };

  const handlePayment = (doc) => {
    console.log(`Redirecting to payment for ${doc.name}`);
  };

  const handleCancel = (doc) => {
    console.log(`Cancelling appointment for ${doc.name}`);
  };

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h6">My Appointments</Typography>
      <Divider sx={{ mt: 1 }} />

      {/* Appointments */}
      <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', mt: 3 }}>
        {!doctors.length ? (
          <Typography sx={{ textAlign: 'center', color: 'gray', mt: 2 }}>
            No appointments booked yet.
          </Typography>)
          : (doctors.slice(0, 2).map((doc, index) => (
            <Box key={index}>

              {/* detils */}
              <Box sx={{ display: 'flex', gap: 3 }}>

                {/* image */}
                <Box sx={{ width: 200, backgroundColor: 'rgb(239 246 255)', borderRadius: 2, display: { xs: 'none', sm: 'block' } }}>
                  <img src={doc.image} style={{ width: '100%', objectFit: 'cover' }} />
                </Box>

                {/* info */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography variant='h6' >{doc.name}</Typography>
                  <Typography variant="body1" sx={{ color: 'gray', mt: -2 }}>{doc.speciality}</Typography>
                  <Typography variant="body1">Address :</Typography>
                  <Typography variant="body1" sx={{ color: 'gray', mt: -1 }}>{doc.address.line1}</Typography>
                  <Typography variant="body1" sx={{ color: 'gray', mt: -2 }}>{doc.address.line2}</Typography>
                  <Box sx={{ display: 'flex', }}>
                    <Typography>Date & Time :</Typography>
                    <Typography sx={{ color: 'gray', ml: 1 }}>{doc?.time ? '' : '25 Jul 2025 | 19:00'}</Typography>
                  </Box>
                </Box>

                {/* Buttons */}
                <Box sx={{
                  ml: 'auto',
                  mt: 'auto',
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'column', lg: 'row' },
                  gap: 2
                }}>
                  <Button variant="outlined"
                    sx={{
                      ...btnStyle, 
                      color: { md: 'black', xs: 'white' },
                      backgroundColor: { xs: '#5f6FFF', md: 'white' },
                      '&:hover': {
                        backgroundColor: '#5f6FFF',
                        color: 'white',
                        borderColor: '#5f6FFF'
                      }
                    }}
                    onClick={handlePayment}
                  >
                    Pay online
                  </Button>
                  <Button variant="outlined"
                    sx={{
                      ...btnStyle,
                      color: { md: 'red', xs: 'white' },
                      backgroundColor: { xs: 'red', md: 'white' },
                      borderColor: 'red',
                      '&:hover': {
                        backgroundColor: 'red',
                        color: 'white',
                        borderColor: 'red'
                      }
                    }}
                    onClick={handleCancel}
                  >
                    Cancel Appointment
                  </Button>
                </Box>
              </Box>
              <Divider sx={{ mt: 2 }} />
            </Box>)
          ))}
      </Box>
    </Box>
  );
};

export default Myappointments;