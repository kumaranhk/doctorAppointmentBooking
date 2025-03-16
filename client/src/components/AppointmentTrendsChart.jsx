import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography, } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";

const AppointmentTrendsChart = () => {
  const [data, setdata] = useState({});
  const [max, setMax] = useState({ key: "", value: 0 });
  useEffect(() => {
    async function fetchData() {
      const req = await axios.get("/appointments/trends");
      setdata(req.data);
      let maxBookedCount = 0;
      let maxCancelledCount = 0;
      let maxCompletedCount = 0;

      for (let i of req.data) {
        if (i.bookedCount > maxBookedCount) {
          maxBookedCount = i.bookedCount;
        }
        if (i.cancelledCount > maxCancelledCount) {
          maxCancelledCount = i.cancelledCount;
        }
        if (i.completedCount > maxCompletedCount) {
          maxCompletedCount = i.completedCount;
        }
      }

      const maxValue = Math.max(maxBookedCount, maxCancelledCount, maxCompletedCount);
      const maxKey = maxValue === maxBookedCount ? "bookedCount" :
                     maxValue === maxCancelledCount ? "cancelledCount" : "completedCount";

      setMax({ key: maxKey, value: maxValue });
    }
    fetchData();
  }, []);
  console.log(max, "finallllll");
  return (
    <Paper sx={{ p: {xs : 1,md : 3,lg : 3}, mt: 10 }}>
    <Typography variant="h6">Appointment Trends</Typography>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="_id" />
        <YAxis dataKey={max.key} allowDecimals={false} />
        <Line
          type="monotone"
          dataKey="bookedCount"
          stroke="#8884d8"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="cancelledCount"
          stroke="red"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="completedCount"
          stroke="#82ca9d"
          strokeWidth={2}
        />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  </Paper>
  );
};

export default AppointmentTrendsChart;


{/* <Paper sx={{ p: {xs : 1,md : 3,lg : 3}, mt: 10 }}>
      <Typography variant="h6">Appointment Trends</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
           <CartesianGrid strokeDasharray="3 3" /> 
          <XAxis dataKey="_id" />
          <YAxis dataKey={max.key} allowDecimals={false} />
          <Line
            type="monotone"
            dataKey="bookedCount"
            stroke="#8884d8"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="cancelledCount"
            stroke="red"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="completedCount"
            stroke="#82ca9d"
            strokeWidth={2}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Paper> 
    */}
