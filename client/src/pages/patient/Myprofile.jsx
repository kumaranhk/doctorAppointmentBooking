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
import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import axios from "../../../utils/axios";

const MyProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState(userData);
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    (async function fetchUserData() {
      try {
        const res = await axios.get(`/users/${user._id}`);
        setUserData(res.data);
        setFormData(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error while fetching data");
      }
    })();
  }, []);

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
      birthday: date ? date.format("YYYY-MM-DD") : "",
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.phone) tempErrors.phone = "Contact number is required";
    if (!formData.address) tempErrors.address = "Address is required";
    if (!formData.gender) tempErrors.gender = "Gender is required";
    if (!formData.birthday) tempErrors.birthday = "Birthday is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      try {
        await axios.put(`/users/${user._id}`, formDataToSend,{ headers: { "Content-Type": "multipart/form-data" },});
        toast.success("Profile updated successfully!");
        setUserData(formData);
        setIsEdit(false);
      } catch (error) {
        console.error("Error updating user data:", error);
        toast.error("Failed to update profile");
      }
    }
  };

  return (
    <Box sx={{ py: 5 }}>
      {/* Profile Picture */}
      <Box sx={{ maxWidth: "200px" }}>
        <img
          src={userData.image || assets.profile_pic}
          alt="Profile"
          style={{ width: "100%", borderRadius: 5 }}
        />
      </Box>

      {/* Name */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
        {isEdit ? (
          <TextField
            required
            sx={{ width: { md: "50%", xs: "100%" } }}
            variant="outlined"
            label="Name"
            name="name"
            error={!!errors.name}
            value={formData.name || ""}
            helperText={errors.name}
            onChange={handleChange}
          />
        ) : (
          <Typography variant="h5">{userData.name}</Typography>
        )}
        <Divider />

        {/* Info Section */}
        {!isEdit && (
          <Typography
            variant="subtitle1"
            sx={{ textDecoration: "underline", color: "gray" }}
          >
            Personal Information
          </Typography>
        )}

        {Object.entries(userData).map(([key, value]) => {
          if (
            ["image", "name", "_id", "role", "CreatedAt", "UpdatedAt"].includes(
              key
            )
          )
            return null;

          return (
            <Box
              key={key}
              sx={{ display: "flex", gap: 2, alignItems: "center" }}
            >
              {!isEdit && (
                <Typography variant="body2" sx={{ width: 80, mr: 4 }}>
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
                    value={formData[key] || ""}
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

      {/* Edit & Save Button */}
      <Box sx={{ mt: 3, display: "flex", gap: 3, alignItems: "center" }}>
        <Button
          variant={isEdit ? "contained" : "outlined"}
          sx={{
            width: 100,
            backgroundColor: isEdit ? "#5f6FFF" : "transparent",
            textTransform: "none",
            borderColor: "#5f6FFF",
            color: isEdit ? "white" : "#5f6FFF",
            "&:hover": { color: "white", backgroundColor: "#5f6FFF" },
          }}
          onClick={() => (isEdit ? handleSubmit() : setIsEdit(true))}
        >
          {isEdit ? "Save" : "Edit"}
        </Button>
        {isEdit && (
          <Button
            variant="outlined"
            sx={{
              width: 100,
              textTransform: "none",
              borderColor: "#5f6FFF",
              color: "#5f6FFF",
              "&:hover": { color: "white", backgroundColor: "#5f6FFF" },
            }}
            onClick={() => setIsEdit(false)}
          >
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
};

const Gender = ({ value, onChange }) => (
  <FormControl>
    <FormLabel required>Gender</FormLabel>
    <RadioGroup row name="gender" value={value} onChange={onChange}>
      <FormControlLabel value="Male" control={<Radio />} label="Male" />
      <FormControlLabel value="Female" control={<Radio />} label="Female" />
      <FormControlLabel value="Other" control={<Radio />} label="Other" />
    </RadioGroup>
  </FormControl>
);

export default MyProfile;
