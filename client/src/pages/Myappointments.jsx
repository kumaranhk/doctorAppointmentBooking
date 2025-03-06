import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Myappointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h6">My Appointments</Typography>
      <Divider sx={{ mt: 1 }} />
      <Box sx={{display : 'flex',gap : 2,flexDirection : 'column',mt : 3}}>
        {doctors.slice(0, 2).map((doc,index) => (
          <Box key={index}>
            {/* detils */}
            <Box sx={{display : 'flex',gap : 3}}>
              {/* image */}
              <Box sx={{width : 200,backgroundColor : 'rgb(239 246 255)',borderRadius : 2 ,display : {xs : 'none',sx : 'block',md : 'block',lg : 'block'}}}>
                <img src={doc.image} style={{width : '100%',objectFit : 'cover'}}/>
              </Box>
              {/* info */}
              <Box sx={{display : "flex",flexDirection : "column",gap : 2}}>
                  <Typography variant='h6' >{doc.name}</Typography>
                  <Typography variant="body1" sx={{color : 'gray',mt : -2}}>{doc.speciality}</Typography>
                  <Typography variant="body1">Address :</Typography>
                  <Typography variant="body1" sx={{color : 'gray',mt : -1}}>{doc.address.line1}</Typography>
                  <Typography variant="body1" sx={{color : 'gray',mt : -2}}>{doc.address.line2}</Typography>
                  <Box sx={{display : 'flex',}}>
                  <Typography>Date & Time :</Typography>
                  <Typography sx={{color : 'gray',ml : 1}}>{doc?.time ? '' : 'No data'}</Typography>
                    </Box>
              </Box>
            </Box>
            <Button>Cancel Appointment</Button>
            <Divider sx={{mt : 2}}/>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Myappointments;