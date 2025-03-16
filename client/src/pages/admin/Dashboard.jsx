import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import DashboardStatsCard from "../../components/DashboardStats";
import AppointmentTrendsChart from "../../components/AppointmentTrendsChart";

const Dashboard = () => {
  return (
    <Box>
      {/* Heading */}
      <Typography variant="h6">Dashboard</Typography>
      {/* mini fields */}
      <Box sx={{ display: "flex", gap: 3,width: '100%' }}>
        <DashboardStatsCard />
      </Box>
      {/*  graphs*/}
      <Box>
        <AppointmentTrendsChart />
      </Box>
    </Box>
  );
};

export default Dashboard;
