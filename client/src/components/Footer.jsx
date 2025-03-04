import { Box, Typography } from '@mui/material';
import React from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box sx={{ pt: 5 }}>
      {/* Top Section */}
      <Box
        sx={{
          backgroundColor: 'rgb(239 246 255)',
          my: 1,
          p: 4,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 3,
        }}
      >
        {/* Left Section */}
        <Box sx={{ maxWidth: '500px', flex: 1 }}>
          <img src={assets.logo} alt="logo" style={{ width: '150px' }} />
          <Typography variant="body2" sx={{ mt: 3, lineHeight: 2, color: 'gray' }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s.
          </Typography>
        </Box>

        {/* Middle Section */}
        <Box sx={{ minWidth: '100px', flex: 1 }}>
          <Typography variant="h6" sx={{ color: 'gray', fontWeight: 'bold', pb: 2 }}>
            COMPANY
          </Typography>
          {['/', '/doctors', '/about', '/contact'].map((path, index) => (
            <Typography
              key={index}
              component={NavLink}
              to={path}
              onClick={() => scrollTo(0,0)}
              variant="body2"
              sx={{
                textDecoration: 'none',
                color: 'gray',
                display: 'block',
                '&.active': { color: '#007BFF', fontWeight: 'bold' }, 
              }}
            >
              {path === '/' ? 'HOME' : path.slice(1).toUpperCase()}
            </Typography>
          ))}
        </Box>

        {/* Right Section */}
        <Box sx={{ minWidth: '100px', flex: 1 }}>
          <Typography variant="h6" sx={{ color: 'gray', fontWeight: 'bold', pb: 2 }}>
            GET IN TOUCH
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>📞 +91 1234567890</Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>📧 prescriptoinfo@gmail.com</Typography>
        </Box>
      </Box>

      <hr />

      {/* Bottom Section */}
      <Box sx={{ backgroundColor: 'rgb(239 246 255)', p: 2, textAlign: 'center', mt: 1 }}>
        <Typography variant="body2" sx={{ color: 'gray' }}>
          Copyright ©️ 2025 Prescripto - All rights reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
