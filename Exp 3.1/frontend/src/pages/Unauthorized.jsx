import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";

function Unauthorized() {
  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <Paper sx={{ width: "100%", p: 4, borderRadius: 3 }}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h4" fontWeight={700}>
            Unauthorized
          </Typography>
          <Typography color="text.secondary" textAlign="center">
            You do not have permission to access this page.
          </Typography>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button component={RouterLink} to="/dashboard" variant="contained">
              Dashboard
            </Button>
            <Button component={RouterLink} to="/login" variant="outlined">
              Login
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}

export default Unauthorized;
