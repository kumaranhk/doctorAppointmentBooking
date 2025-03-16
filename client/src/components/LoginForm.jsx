import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";

const LoginForm = ({ type }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login,user } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("isLoggedin")) {
      if (user?.role === 'patient') navigate("/");
      else if (user?.role === 'admin') navigate('/admin/dashboard');
      else if (user?.role === 'doctor') navigate('/doctor/appointments');
    }
  },[]);

  const form = type === "login" ? "Login" : "Create account";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.password) tempErrors.password = "Password is required";
    if (type !== "login" && !formData.name)
      tempErrors.name = "Name is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        if (type === "login") {
          login(formData);
        } else if (type === "create-account") {
          const req = await axios.post("/users", formData);
          // console.log(await req.data);
          if (req.status === 201) {
            navigate("/login");
            toast.success(req.data?.msg || "User created");
            setFormData({
              email: "",
              password: "",
              name: "",
            });
          }
        }
      } catch (error) {
        console.error("API Error:", error);
      } 
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "100%",
        my: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          maxWidth: "600px",
          width: "400px",
          border: "0.5px solid white",
          borderRadius: 2,
          boxShadow: "1px 1px 10px gray",
          p: 5,
        }}
      >
        <Typography variant="h5" textAlign={"center"}>
          {form}
        </Typography>
        {type !== "login" && (
          <TextField
            required
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
        )}
        <TextField
          required
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <FormControl variant="outlined" error={!!errors.password}>
          <InputLabel htmlFor="outlined-adornment-password" required>
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {!showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <Typography variant="caption" color="error">
              {errors.password}
            </Typography>
          )}
        </FormControl>
        <Button
          variant="contained"
          loading={loading}
          sx={{ backgroundColor: "#5f6FFF", textTransform: "none", py: 1.5 }}
          onClick={handleSubmit}
          type="submit"
        >
          {form}
        </Button>
        <Typography
          variant="subtitle1"
          onClick={() => {
            type === "login" ? navigate("/create-account") : navigate("/login");
          }}
          sx={{
            textDecoration: "none",
            color: "black",
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {type === "login"
            ? "New User? click here to Create account"
            : "Already have an account? Login here"}
        </Typography>
      </Box>
    </Box>
  );
};
export default LoginForm;
