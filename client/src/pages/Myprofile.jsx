import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { assets } from "../assets/assets";

const Myprofile = () => {
  const [userData, setUserData] = useState({
    name: "Kumaran Arunagiri",
    image: assets.profile_pic,
    email: "kumaran.arunagiri@gmail.com",
    phone: "+91 1234567890",
    address: "41, Thendaval sixth street Mannargudi",
    gender: "Male",
    birthday: "2001-08-14",
  });
  const [formData, setFormData] = useState(userData);
  const [isEdit, setIsEdit] = useState(false);
  const fieldStyles = {
    display: "flex",
    gap: 0,
    // alignItem : 'center',
    // justifyConetent : 'center'
  };
  const textStyle = {
    width: 90,
    mr: 4,
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...userData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    // e.preventdefault();
    setUserData(formData);
    console.log(formData);
  };

  return (
    <Box sx={{ py: 5 }}>
      {/* profile picture */}
      <Box sx={{ maxWidth: "200px" }}>
        <img src={userData.image} style={{ width: "100%", borderRadius: 5 }} />
      </Box>

      {/* name */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
        <Typography variant="h5">{userData.name}</Typography>
        <Divider />

        {/* info */}
        <Typography variant="subtitle1" sx={{ textDecoration: "underline" }}>
          Personal Informations
        </Typography>

        {Object.entries(userData).map(([key, value], index) => {
          // {console.log(key , value)}
          if (key === "image" || key === "name") return null;
          return (
            <Box sx={fieldStyles} key={index}>
              <Typography variant="body2" sx={textStyle}>
                {key.slice(0).charAt(0).toUpperCase() + key.slice(1)}:
              </Typography>
              {isEdit ? (
                <TextField
                  variant="outlined"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}

                  //need to change as per country code 
                  // type={key === "phone" ? "number" : "text"}
                />
              ) : (
                <Typography
                  variant="body2"
                  color={
                    key === "email" || key === "phone"
                      ? "primary"
                      : "text-secondary"
                  }
                >
                  {value}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>

      {/*Edit and save button */}
      <Box sx={{ mt: 3 }}>
        <Button
          variant="outlined"
          sx={{
            width: 100,
            textTransform: "none",
            borderColor: "#5f6FFF",
            color: "#5f6FFF",
            transition: "all 0.1s",
            "&:hover": { color: "white", backgroundColor: "#5f6FFF" },
          }}
          onClick={() => {
            isEdit && handleSubmit();
            setIsEdit(!isEdit);
          }}
        >
          {isEdit ? "Save" : "Edit"}
        </Button>
      </Box>
    </Box>
  );
};

export default Myprofile;
