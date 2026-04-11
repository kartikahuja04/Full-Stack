import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import api from "../services/api";

function Dashboard({ user, onLogout }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/dashboard");
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.100" }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Dashboard</Typography>
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Stack spacing={2}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Welcome, {user?.email}
            </Typography>
            <Typography variant="body1">Role: {user?.role}</Typography>
          </Paper>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
              <CircularProgress />
            </Box>
          ) : null}

          {error ? <Alert severity="error">{error}</Alert> : null}

          {data ? <Alert severity="success">{data.message}</Alert> : null}

          {user?.role === "admin" ? (
            <Button component={RouterLink} to="/admin" variant="outlined">
              Go to Admin Panel
            </Button>
          ) : (
            <Alert severity="info">Admin panel is hidden for non-admin users.</Alert>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default Dashboard;
