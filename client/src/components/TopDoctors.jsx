import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "../../utils/axios";
import axios from "axios";

const TopDoctors = ({ isHomePage, query = null }) => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users`, { params: { role: "doctor" } });
      // console.log(res.data.data);
      setDoctors(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDoctors();
  }, []);

  // Filter doctors based on speciality
  const filteredData = query
    ? doctors.filter((val) => val.specialization === query)
    : doctors;

  // Show top 10 doctors on home page
  const modifiedDocs = isHomePage ? doctors.slice(0, 10) : filteredData;

  return (
    <Box
      id="topDoctors"
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        my: isHomePage ? 15 : 0,
      }}
    >
      {/* Heading for Home Page */}
      {isHomePage && (
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
            Top Doctors to Book
          </Typography>
          <Typography variant="body2">
            Simply browse through our extensive list of trusted doctors.
          </Typography>
        </Box>
      )}

      {/* Doctors List */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          overflow: "auto",
          pt: isHomePage ? 3 : 0,
        }}
      >
        {modifiedDocs.length === 0 ? (
          <Typography variant="h5">No doctors found</Typography>
        ) : (
          modifiedDocs.map((val, index) => (
            <Box
              key={index}
              sx={{
                textAlign: "center",
                transition: "all 0.5s ease",
                border: "1px solid lightgrey",
                borderRadius: 2,
                width: { xs: "160px", sm: "180px", md: "200px" },
                height: "300px",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.1)",
                },
                boxShadow: "5px 5px 5px lightgrey",
              }}
            >
              <Link
                to={`/appointment/${val._id}`}
                onClick={() => window.scrollTo(0, 0)}
                style={{ textDecoration: "none" }}
              >
                {/* Doctor Image */}
                <Box
                  sx={{
                    backgroundColor: "rgb(239 246 255)",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                >
                  <img
                    src={val.image}
                    alt={val.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                {/* Doctor Details */}
                <Box sx={{ textAlign: "left", ml: 1, p: 1 }}>
                  <Typography sx={{ color: "#48bb78", fontSize: "15px" }}>
                    • Available
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "black", fontWeight: "bold" }}
                  >
                    {`Dr. ${val.name}`}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "gray", fontSize: "15px" }}
                  >
                    {val.speciality || val.specialization}
                  </Typography>
                </Box>
              </Link>
            </Box>
          ))
        )}
      </Box>

      {/* More Button for Home Page */}
      {isHomePage && (
        <Button
          variant="contained"
          onClick={() => {
            navigate("/doctors");
            window.scrollTo(0, 0);
          }}
          sx={{
            maxWidth: "400px",
            width: "150px",
            backgroundColor: "rgb(239 246 255)",
            color: "black",
            borderRadius: 5,
          }}
        >
          More
        </Button>
      )}
    </Box>
  );
};

export default TopDoctors;
