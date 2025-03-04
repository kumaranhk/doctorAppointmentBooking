import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Box, Button, Typography } from '@mui/material';
import { specialityData } from '../assets/assets';
import CheckIcon from '@mui/icons-material/Check';
import TopDoctors from '../components/TopDoctors';

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);

  const handleSelect = (val) => {
    setSelectedSpeciality((prev) => (prev === val.speciality ? null : val.speciality));
  };

  useEffect(() => {
    setSelectedSpeciality(speciality || null);
  }, [speciality]);

  return (
    <Box sx={{ display: 'flex', my: 3, flexWrap: 'wrap', gap: 3 }}>
      {/* Left side portion */}
      <Box>
        <Box
          sx={{
            border: '1px solid black',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            maxWidth: { md: '300px', sm: '250px', xs: '250px' },
            overflow: 'auto',
          }}
        >
          {specialityData.map((val, index) => (
            <Button
              key={index}
              variant="contained"
              onClick={() => handleSelect(val)}
              sx={{
                py: 1,
                fontSize: '15px',
                backgroundColor: selectedSpeciality === val.speciality ? '#5f6FFF' : 'white',
                color: selectedSpeciality === val.speciality ? 'white' : 'black',
                borderRadius: 0,
                transition: 'all 0.3s ease',
                "&:hover": {
                  backgroundColor: selectedSpeciality === val.speciality ? '#4a5ce5' : '#f0f0f0',
                },
              }}
            >
              {selectedSpeciality === val.speciality && <CheckIcon sx={{ mr: 1 }} />}
              {val.speciality}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Right side portion */}
      <Box sx={{ flex: 1 }}>
        <TopDoctors isHomePage={false} query={selectedSpeciality} />
      </Box>
    </Box>
  );
};

export default Doctors;
