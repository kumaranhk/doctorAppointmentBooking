import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { specialityData } from "../../assets/assets";
import CheckIcon from "@mui/icons-material/Check";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import axios from "../../../utils/axios";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const AdminDoctors = () => {
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [formType, setFormType] = useState("create");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
    experience: 0,
    fees: 4000,
    phone: "",
    address: "",
    password: "",
    degree: "",
    role: "doctor",
  });
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [isShowFilters, setIsShowFilters] = useState(!isMobile);
  const [selectedImage, setSelectedImage] = useState(null);
  const[loader,setLoader] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFormData({ ...formData, imageFile: file });
    }
  };

  const fetchDoctors = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get("/users", {
        params: { role: "doctor", specialization: selectedSpeciality },
      });
      setDoctors(data.data);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  useEffect(() => {
    fetchDoctors();
  }, [selectedSpeciality]);

  const openForm = async (type, id) => {
    if (type === "edit") {
      setFormType("edit");
      try {
        const { data } = await axios.get(`/users/${id}`, {
          params: { isDoctor: true },
        });
        setFormData(data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    } else {
      setFormType("create");
      setFormData({
        name: "",
        email: "",
        specialization: "",
        experience: 0,
        fees: 4000,
        phone: "",
        address: "",
        password: "",
        degree: "",
        role: "doctor",
      });
    }
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    fetchDoctors();
    // window.location.reload();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "imageFile") {
        formDataToSend.append("image", formData.imageFile);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
    try {
      if (formType === "edit") {
        await axios.put(`/users/${formData.userId}`, formDataToSend, {
          params: { isDoctor: true },
        });
      } else {
        // const payload = new FormData(formData);
        try {
          await axios.post("/users", formDataToSend, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          toast.success("Doctor created successfully");
        } catch (error) {
          console.log(error);
        }
      }
      closeForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleSelect = (val) => {
    setSelectedSpeciality((prev) =>
      prev === val.speciality ? null : val.speciality
    );
    if (isMobile) setIsShowFilters(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        my: 3,
        gap: 3,
      }}
    >
      <Dialog
        open={showForm}
        onClose={closeForm}
        fullWidth
        maxWidth="sm"
        sx={{
          "& .MuiDialog-paper": {
            width: "95%", // Prevents overflowing
            maxWidth: "500px", // Adjust based on content
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle>
          {formType === "edit" ? "Edit Doctor" : "Add Doctor"}
        </DialogTitle>

        <DialogContent sx={{ px: { xs: 1, md: 5 } }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* Image Preview */}
            {selectedImage || formData.image ? (
              <img
                src={selectedImage || formData.image}
                alt="Doctor"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                }}
              />
            ) : formType === "edit" ? (
              <Typography color="gray">No Image</Typography>
            ) : (
              <></>
            )}

            {/* Image Upload Input */}
            {formType === "created" && (
              <input
                type="file"
                accept="image/*"
                style={{ marginLeft: isMobile ? 50 : -50 }}
                onChange={handleImageChange}
              />
            )}

            {/* Other Fields */}
            {[
              "name",
              "email",
              "specialization",
              "experience",
              "fees",
              "phone",
              "degree",
              "address",
              "password",
            ].map((field, index) => (
              <TextField
                key={index}
                required
                margin="dense"
                size={isMobile && "small"}
                sx={{ height: isMobile && 30 }}
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                type={
                  field === "password"
                    ? "password"
                    : field === "experience" || field === "fees"
                    ? "number"
                    : "text"
                }
                fullWidth
                variant="outlined"
                value={formData[field]}
                onChange={handleChange}
              />
            ))}

            <DialogActions
              sx={{ width: "100%", justifyContent: "space-between" }}
            >
              <Button onClick={closeForm} sx={{ color: "#5f6FFF" }}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#5f6FFF" }}
              >
                Submit
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/*Mobile filter icon  */}
      <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
        <IconButton onClick={() => setIsShowFilters(!isShowFilters)}>
          <Badge
            variant="dot"
            invisible={!selectedSpeciality}
            color="secondary"
          >
            <FilterAltIcon />
          </Badge>
        </IconButton>
        {selectedSpeciality && (
          <Chip
            label={selectedSpeciality}
            onDelete={() => setSelectedSpeciality(null)}
          />
        )}
      </Box>

      <Box
        sx={{
          width: { xs: "90%", md: "300px" },
          display: isShowFilters ? "flex" : "none",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={() => openForm("create")}
          sx={{ backgroundColor: "#5f6FFF", py: 1.5 }}
        >
          + Add Doctor
        </Button>
        {specialityData.map((val, index) => (
          <Button
            key={index}
            variant="contained"
            onClick={() => handleSelect(val)}
            sx={{
              backgroundColor:
                selectedSpeciality === val.speciality ? "#5f6FFF" : "white",
              color: selectedSpeciality === val.speciality ? "white" : "gray",
              py: 1.5,
              "&:hover": {
                backgroundColor:
                  selectedSpeciality === val.speciality ? "#4a5ce5" : "#f0f0f0",
              },
            }}
            fullWidth
          >
            {selectedSpeciality === val.speciality && (
              <CheckIcon sx={{ mr: 1 }} />
            )}
            {val.speciality}
          </Button>
        ))}
      </Box>

      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
            my: 3,
          }}
        >
          {loader ? 
          (<Loader />) :
            (<Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
              {doctors.length === 0 ? (
                <Typography variant="h5">No doctors found</Typography>
              ) : (
                doctors.map((val) => (
                  <Box
                    key={val._id}
                    sx={{
                      textAlign: "center",
                      transition: "all 0.5s ease",
                      border: "1px solid lightgrey",
                      borderRadius: 2,
                      width: { xs: "160px", sm: "180px", md: "200px" },
                      height: "350px",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.1)",
                      },
                      boxShadow: "5px 5px 5px lightgrey",
                    }}
                  >
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
                    <Box sx={{ p: 1 }}>
                      <Typography sx={{ color: "#48bb78" }}>
                        • Available
                      </Typography>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {val.name}
                      </Typography>
                      <Typography sx={{ color: "gray" }}>
                        {val.specialization}
                      </Typography>
                    </Box>
                    <Button onClick={() => openForm("edit", val._id)}>
                      Edit
                    </Button>
                  </Box>
                ))
              )}
            </Box>)
          }
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDoctors;
