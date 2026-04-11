import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import api from "../services/api";
import { saveToken } from "../utils/auth";

function Login({ onLogin, isAuthenticated }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (values) => {
    setAlert({ type: "", message: "" });
    setLoading(true);

    try {
      const response = await api.post("/login", values);
      const { token } = response.data;

      saveToken(token);
      onLogin(token);

      setAlert({ type: "success", message: "Login successful" });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Login failed. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <Paper elevation={5} sx={{ width: "100%", p: 4, borderRadius: 3 }}>
        <Stack spacing={2.5}>
          <Typography variant="h4" fontWeight={700} textAlign="center">
            Sign In
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Use admin@example.com / Admin@123 or user@example.com / User@123
          </Typography>

          {alert.message ? <Alert severity={alert.type}>{alert.message}</Alert> : null}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address"
                  }
                })}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
              />

              <Button type="submit" variant="contained" size="large" disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" textAlign="center">
            New here?{" "}
            <Link component={RouterLink} to="/register" underline="hover">
              Create an account
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}

export default Login;
