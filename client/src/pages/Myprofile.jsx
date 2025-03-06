import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useState } from "react";
import { assets } from "../assets/assets";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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
  const [errors, setErrors] = useState({});

  const fieldStyles = {
    display: "flex",
    gap: 2,
    alignItems: "center",
  };

  const textStyle = {
    width: { md: 60, xs: 30 },
    mr: 4,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      birthday: date !== null && date.format("YYYY-MM-DD"),
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.phone) tempErrors.phone = "Contact number is required";
    if (!formData.address) tempErrors.address = "Address is required";
    if (!formData.gender) tempErrors.gender = "Gender is required";
    if (!formData.birthday) tempErrors.birthday = "Birthday is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setUserData(formData);
      console.log(formData);
      setIsEdit(false);
    }
  };

  return (
    <Box sx={{ py: 5 }}>
      {/* Profile Picture */}
      <Box sx={{ maxWidth: "200px" }}>
        <img src={userData.image} style={{ width: "100%", borderRadius: 5 }} />
      </Box>

      {/* Name */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
        {isEdit ? (
          <TextField
            required
            sx={{ width: { md: "50%", xs: "100%" } }}
            variant="outlined"
            label={
              formData.name.charAt(0).toUpperCase() + formData.name.slice(1)
            }
            name={formData.name}
            error={!!errors.name}
            value={formData.name}
            helperText={errors.name}
            onChange={handleChange}
          />
        ) : (
          <Typography variant="h5">{userData.name}</Typography>
        )}
        <Divider />

        {/* Info */}
        {!isEdit && (
          <Typography
            variant="subtitle1"
            sx={{ textDecoration: "underline", color: "gray" }}
          >
            Personal Information
          </Typography>
        )}

        {Object.entries(userData).map(([key, value], index) => {
          if (key === "image" || key === "name") return null;

          return (
            <Box sx={fieldStyles} key={index}>
              {!isEdit && (
                <Typography variant="body2" sx={textStyle}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </Typography>
              )}

              {isEdit ? (
                key === "gender" ? (
                  <Gender value={formData.gender} onChange={handleChange} />
                ) : key === "birthday" ? (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Birthday"
                      value={
                        formData.birthday ? dayjs(formData.birthday) : null
                      }
                      onChange={handleDateChange}
                      format="YYYY-MM-DD"
                      disableFuture
                      slotProps={{
                        textField: {
                          helperText: errors.birthday,
                          error: errors.birthday,
                          required: true,
                        },
                      }}
                    />
                  </LocalizationProvider>
                ) : (
                  <TextField
                    required
                    sx={{ width: { md: "50%", xs: "100%" } }}
                    variant="outlined"
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    name={key}
                    error={!!errors[key]}
                    value={formData[key]}
                    helperText={errors[key]}
                    onChange={handleChange}
                  />
                )
              ) : (
                <Typography
                  variant="body2"
                  color={
                    key === "email" || key === "phone"
                      ? "primary"
                      : "text.secondary"
                  }
                >
                  {value}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>

      {/* Edit and Save Button */}
      <Box sx={{ mt: 3 }}>
        <Button
          variant={isEdit ? "contained" : "outlined"}
          sx={{
            width: 100,
            backgroundColor: isEdit ? "#5f6FFF" : "transparent",
            textTransform: "none",
            borderColor: "#5f6FFF",
            color: isEdit ? "white" : "#5f6FFF",
            transition: "all 0.1s",
            "&:hover": { color: "white", backgroundColor: "#5f6FFF" },
          }}
          onClick={() => {
            isEdit ? handleSubmit() : setIsEdit(true);
          }}
        >
          {isEdit ? "Save" : "Edit"}
        </Button>
      </Box>
    </Box>
  );
};

const Gender = ({ value, onChange }) => {
  return (
    <FormControl>
      <FormLabel required>Gender</FormLabel>
      <RadioGroup row name="gender" value={value} onChange={onChange}>
        <FormControlLabel value="Male" control={<Radio />} label="Male" />
        <FormControlLabel value="Female" control={<Radio />} label="Female" />
        <FormControlLabel value="Other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  );
};

export default Myprofile;
