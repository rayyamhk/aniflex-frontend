import { Typography } from "@mui/material";
import { useEffect } from "react";
import ResponsiveContainer from "../components/ResponsiveContainer";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <ResponsiveContainer>
      <Typography>Dashboard</Typography>
    </ResponsiveContainer>
  );
}