import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { assets } from "../../assets/assets";
import RelatedDoctors from "../../components/RelatedDoctors";
import axios from "../../../utils/axios";
import { toast, ToastContainer } from "react-toastify";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [doc, setDoc] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const res = await axios.get(`/users/${docId}`);
    setDoc(res.data);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        let now = new Date();
        if (now.getHours() < 10) {
          currentDate.setHours(10, 0, 0, 0);
        } else {
          currentDate.setHours(
            now.getHours() + 1,
            now.getMinutes() > 30 ? 0 : 30,
            0,
            0
          );
        }
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (doc) getAvailableSlots();
  }, [doc]);

  const handleSubmit = async () => {
    if (!docSlots.length || !slotTime) {
      toast.error("Please select a valid slot.");
      return;
    }

    const selectedSlot = docSlots[slotIndex].find(
      (val) => slotTime === val.time
    );
    if (!selectedSlot) {
      toast.error("Invalid slot selected.");
      return;
    }

    const selectedDate = selectedSlot.dateTime;
    const formattedDate = `${selectedDate.getFullYear()}-${(
      selectedDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${selectedDate.getDate().toString().padStart(2, "0")}`;

    let data = {
      timeSlot: slotTime,
      date: formattedDate,
      doctorId: docId,
    };

    try {
      const res = await axios.post("/appointments", data);
      if (res.data.msg == 'Slot is already booked'){
        toast.error('Solt is already booked!')
      }
      else toast.success("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment.");
    }
  };

  return doc ? (
    <Box sx={{ my: 3, px: { xs: 2, sm: 4, md: 6 } }}>
      ;{/* Doctor info */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: { xs: "center", md: "flex-start" },
        }}
      >
        {/* Doctor image */}
        <Box
          sx={{
            backgroundColor: "#5f6FFF",
            maxWidth: "350px",
            width: { xs: "100%", sm: "300px", md: "320px" },
            borderRadius: 2,
            px: 2,
            pt: 0,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={doc?.image}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 8,
              objectFit: "cover",
            }}
            alt={doc?.name}
          />
        </Box>

        {/* Doctor details */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid black",
            borderRadius: 2,
            p: { xs: 2, md: 4 },
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography variant="h6">{doc?.name}</Typography>
            <img
              src={assets.verified_icon}
              alt="verified icon"
              style={{ width: 18, height: 18 }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "gray",
            }}
          >
            <Typography variant="body2" fontSize={13}>
              {`${doc?.degree} - ${doc?.speciality || doc?.specialization}`}
            </Typography>
            <Tooltip title={"Experience"}>
              <Typography
                sx={{
                  p: 0.3,
                  px: 1.2,
                  border: "1px solid gray",
                  borderRadius: 5,
                  fontSize: 10,
                }}
              >
                {doc?.experience}
              </Typography>
            </Tooltip>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1.5 }}
          >
            <Typography variant="body2">About</Typography>
            <InfoOutlinedIcon sx={{ fontSize: 18 }} />
          </Box>

          <Typography gutterBottom sx={{ fontSize: 12, mt: 1, color: "gray" }}>
            {doc?.about}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mt: 1.5, gap: 1 }}>
            <Typography sx={{ color: "gray" }} variant="body2">
              Appointment fee:
            </Typography>
            <Typography variant="body2">{`${currencySymbol}${doc?.fees}`}</Typography>
          </Box>
        </Box>
      </Box>
      {/* Booking Slots */}
      <Box
        sx={{
          mt: 3,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <Typography variant="h5">Booking Slots</Typography>

        {/* Date Selection */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            overflow: "auto",
            alignItems: "center",
            justifyContent: "center",
            pb: 2,
          }}
        >
          {docSlots.length &&
            docSlots.map((slot, index) =>
              docSlots[index].length ? (
                <Box
                  component={Button}
                  onClick={() => {
                    setSlotIndex(index);
                  }}
                  key={index}
                  sx={{
                    height: "80px",
                    width: "50px",
                    border: "0.5px solid",
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    px: 4,
                    py: 6,
                    gap: 1,
                    backgroundColor: slotIndex === index && "#5f6FFF",
                    color: slotIndex === index ? "white" : "black",
                    borderColor: slotIndex === index ? "#5f6FFF" : "gray",
                    boxShadow: slotIndex === index && "1px 1px 1px 1px gray",
                  }}
                >
                  <Typography variant="body2">
                    {slot[0] && daysOfWeek[slot[0].dateTime.getDay()]}
                  </Typography>
                  <Typography variant="body2">
                    {slot[0] && slot[0].dateTime.getDate()}
                  </Typography>
                </Box>
              ) : (
                <Box key={index}></Box>
              )
            )}
        </Box>

        {/* Time Slot Selection */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* {console.log(docSlots)} */}
          {docSlots.length &&
            docSlots[slotIndex].map((item, index) => (
              <Typography
                variant="caption"
                key={index}
                component={Button}
                onClick={() => setSlotTime(item.time)}
                sx={{
                  border: "0.5px solid",
                  borderRadius: 5,
                  px: 3,
                  py: 1,
                  backgroundColor: slotTime === item.time && "#5f6FFF",
                  color: slotTime === item.time ? "white" : "black",
                  borderColor: slotTime === item.time ? "#5f6FFF" : "gray",
                  boxShadow: slotTime === item.time && "1px 1px 1px 1px gray",
                }}
              >
                {item.time.toLowerCase()}
              </Typography>
            ))}
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#5f6FFF",
              borderRadius: 5,
              py: 1.5,
              px: 4,
              fontSize: 12,
            }}
            onClick={handleSubmit}
          >
            Book An Appointment
          </Button>
        </Box>
      </Box>
      {/* Related doctors */}
      <RelatedDoctors docId={docId} specialization={doc.specialization} />
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 5,
      }}
    >
      <Typography>Oops! No doctor info found...</Typography>
    </Box>
  );
};

export default Appointment;
