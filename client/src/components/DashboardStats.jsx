import { Card, CardContent, Typography, Grid2, Grid } from "@mui/material";
import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const DashboardStatsCard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
  });
  const[loader ,setLoader] = useState(false);

  useEffect(() => {
    (async function () {
      setLoader(true);
      try {
        const res = await axios.get("/admin/dashboardStats");
        setStats(res.data);
        setLoader(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Grid container spacing={3}>
      {/* Total Doctors */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ p: 2, bgcolor: "#e3f2fd", boxShadow: 3 }}>
          
          <CardContent>
            <Typography variant="h6">Total Doctors</Typography>
            {loader ? <Loader /> : 
            <Typography variant="h4" fontWeight="bold">{stats.totalDoctors}</Typography>}
          </CardContent>
        </Card>
      </Grid>

      {/* Total Patients */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ p: 2, bgcolor: "#e8f5e9", boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6">Total Patients</Typography>
            {loader ? <Loader /> : <Typography variant="h4" fontWeight="bold">{stats.totalPatients}</Typography>}
          </CardContent>
        </Card>
      </Grid>

      {/* Total Appointments */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ p: 2, bgcolor: "#fff3e0", boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6">Total Appointments</Typography>
            {loader ? <Loader /> : <Typography variant="h4" fontWeight="bold">{stats.totalAppointments}</Typography>}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardStatsCard;
