import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";

const RelatedDoctors = ({ docId, specialization }) => {
//   console.log({ docId, specialization });

  const [reatedDocs, setRelatedDocs] = useState([]);

  const filteredDocs = async (id, specialization) => {
    try {
      const res = await axios.get(`/users`, { params: { role: "doctor" } });
      // console.log(res.data.data);
      return res.data.data.filter(
        (doc) => doc.specialization === specialization && doc._id !== id
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const arr = await filteredDocs(docId, specialization);
    //   console.log(arr);
      setRelatedDocs(arr.slice(0,5));
    };
    fetchData();
  }, [docId, specialization]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Typography variant="h5">Related Doctors</Typography>
        <Typography variant="caption">
          Simply browse through our extensive list of trusted doctors.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          overflow: "auto",
          pt: 5,
        }}
      >
        {reatedDocs.length === 0 ? (
          <Typography variant="h5">No doctors found</Typography>
        ) : (
          reatedDocs.map((val, index) => (
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
                    alt={val.specialization}
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
                    {val.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "gray", fontSize: "15px" }}
                  >
                    {val.speciality}
                  </Typography>
                </Box>
              </Link>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default RelatedDoctors;
