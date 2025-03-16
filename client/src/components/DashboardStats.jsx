import { Card, CardContent, Typography, Grid2, Grid } from "@mui/material";
import axios from "../../utils/axios";
import { useEffect, useState } from "react";

const DashboardStatsCard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
  });

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get("/admin/dashboardStats");
        setStats(res.data);
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
            <Typography variant="h4" fontWeight="bold">{stats.totalDoctors}</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Total Patients */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ p: 2, bgcolor: "#e8f5e9", boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6">Total Patients</Typography>
            <Typography variant="h4" fontWeight="bold">{stats.totalPatients}</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Total Appointments */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ p: 2, bgcolor: "#fff3e0", boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6">Total Appointments</Typography>
            <Typography variant="h4" fontWeight="bold">{stats.totalAppointments}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardStatsCard;
