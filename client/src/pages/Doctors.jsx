import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Badge, Box, Button, Chip, IconButton, Stack, Typography, useMediaQuery } from '@mui/material';
import { specialityData } from '../assets/assets';
import CheckIcon from '@mui/icons-material/Check';
import TopDoctors from '../components/TopDoctors';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);

  const isMobile = useMediaQuery('(max-width: 600px)');
  const [isShowFilters, setIsShowFilters] = useState(!isMobile);

  const handleSelect = (val) => {
    setSelectedSpeciality((prev) => (prev === val.speciality ? null : val.speciality));
    if (isMobile) setIsShowFilters(false);
  };

  useEffect(() => {
    setSelectedSpeciality(speciality || null);
  }, [speciality]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        my: 3,
        gap: 3
      }}
    >
      <Box sx={{ display: { xs: 'flex', sx: 'none', md: 'none', lg: 'none' }, alignItems: 'center' }}>
        <IconButton onClick={() => setIsShowFilters(!isShowFilters)}>
          <Badge variant='dot' invisible={!selectedSpeciality} color='secondary'>
            <FilterAltIcon />
          </Badge>
        </IconButton>
        <Stack direction="row" spacing={1}>
          {selectedSpeciality && (<Chip label={selectedSpeciality} onDelete={handleSelect} />)}
        </Stack>
      </Box>

      {/* Left Sidebar - Speciality Selection */}
      <Box
        sx={{
          width: { xs: '90%', md: '300px' },
          gap: { md: 3, xs: 0.5 },
          display: isShowFilters ? 'flex' : 'none',
          flexDirection: 'column',
          maxHeight: '400px',
          overflowY: 'auto',
          px: 2,
          py: 2,
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
              color: selectedSpeciality === val.speciality ? 'white' : 'gray',
              borderRadius: 1,
              textAlign: 'left',
              transition: 'all 0.3s ease',
              "&:hover": {
                backgroundColor: selectedSpeciality === val.speciality ? '#4a5ce5' : '#f0f0f0',
              },
            }}
            fullWidth
          >
            {selectedSpeciality === val.speciality && <CheckIcon sx={{ mr: 1 }} />}
            {val.speciality}
          </Button>
        ))}
      </Box>

      {/* Right Section - Doctor Listings */}
      <Box sx={{ flex: 1, width: '100%' }}>
        <TopDoctors isHomePage={false} query={selectedSpeciality} />
      </Box>
    </Box>
  );
};

export default Doctors;
