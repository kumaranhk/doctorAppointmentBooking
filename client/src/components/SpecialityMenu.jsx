import { Box, Typography } from '@mui/material'
import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <Box id='speciality' sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 5,pt : 10 }}>
            <Box>
                <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 3 }}>Find by Speciality</Typography>
                <Typography variant='body2'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 5, alignItems: 'center', justifyContent: 'center', overflow: 'auto', pt: 3 }}>
                {specialityData.map((val, index) => (
                    <Box sx={{
                        textAlign: "center",
                        transition: "all 0.5s ease",
                        "&:hover": {
                            transform: "translateY(-10px)",
                        },
                    }}
                        key={index}>
                        <Link to={`doctors/${val.speciality}`}
                            onClick={() => onscroll(0, 0)}
                            style={{ textDecoration: 'none' }}>
                            <img src={val.image} alt={val.speciality} style={{ width: 100, marginBottom: '15px' }} />
                            <Typography variant='body2' sx={{ color: 'black' }}>{val.speciality}</Typography>
                        </Link>
                    </Box>
                ))}
            </Box>
        </Box>

    )
}

export default SpecialityMenu