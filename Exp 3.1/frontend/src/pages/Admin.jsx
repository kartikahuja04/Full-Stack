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

function Admin({ user, onLogout }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await api.get("/admin");
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.100" }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Admin Panel</Typography>
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Stack spacing={2}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight={700}>
              Restricted Admin Area
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Signed in as: {user?.email} ({user?.role})
            </Typography>
          </Paper>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
              <CircularProgress />
            </Box>
          ) : null}

          {error ? <Alert severity="error">{error}</Alert> : null}
          {data ? <Alert severity="success">{data.message}</Alert> : null}

          <Button component={RouterLink} to="/dashboard" variant="outlined">
            Back to Dashboard
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default Admin;
