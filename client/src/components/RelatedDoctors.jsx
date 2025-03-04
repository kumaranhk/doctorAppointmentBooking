import { Box, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const RelatedDoctors = ({ docId, speciality }) => {
    console.log({ docId, speciality });
    const { doctors } = useContext(AppContext);

    const [reatedDocs, setRelatedDocs] = useState([]);

    const filteredDocs = (id, speciality) => {
        return doctors.filter((doc) => doc.speciality === speciality && doc._id !== id);
    }
    useEffect(() => {
        const arr = filteredDocs(docId, speciality).slice(0,5);
        // console.log(arr);
        setRelatedDocs(arr);
    }, [docId, speciality])
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 5
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
            }} >
                <Typography variant='h5'>Related Doctors</Typography>
                <Typography variant='caption'>Simply browse through our extensive list of trusted doctors.</Typography>

            </Box>
            <Box sx={{
                display: 'flex',
                gap: 3,
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                overflow: 'auto',
                pt: 5
            }}>
                {reatedDocs.length === 0 ? (
                    <Typography variant="h5">No doctors found</Typography>
                ) : (
                    reatedDocs.map((val, index) => (
                        <Box
                            key={index}
                            sx={{
                                textAlign: 'center',
                                transition: "all 0.5s ease",
                                border: '1px solid lightgrey',
                                borderRadius: 2,
                                width: { xs: '160px', sm: '180px', md: '200px' },
                                height: '300px',
                                "&:hover": {
                                    transform: "translateY(-10px)",
                                    boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.1)"
                                },
                                boxShadow: '5px 5px 5px lightgrey',
                            }}
                        >
                            <Link
                                to={`/appointment/${val._id}`}
                                onClick={() => window.scrollTo(0, 0)}
                                style={{ textDecoration: 'none' }}
                            >
                                {/* Doctor Image */}
                                <Box
                                    sx={{
                                        backgroundColor: 'rgb(239 246 255)',
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10
                                    }}
                                >
                                    <img
                                        src={val.image}
                                        alt={val.speciality}
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                </Box>

                                {/* Doctor Details */}
                                <Box sx={{ textAlign: 'left', ml: 1, p: 1 }}>
                                    <Typography sx={{ color: '#48bb78', fontSize: '15px' }}>• Available</Typography>
                                    <Typography variant="body2" sx={{ color: 'black', fontWeight: 'bold' }}>
                                        {val.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'gray', fontSize: '15px' }}>
                                        {val.speciality}
                                    </Typography>
                                </Box>
                            </Link>
                        </Box>
                    ))
                )}
            </Box>
        </Box >
    )
}

export default RelatedDoctors;