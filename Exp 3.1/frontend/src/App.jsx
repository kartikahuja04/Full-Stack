import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Unauthorized from "./pages/Unauthorized";
import { clearToken, getUserFromToken } from "./utils/auth";
import { useMemo, useState } from "react";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => getUserFromToken());

  const isAuthenticated = useMemo(() => Boolean(user), [user]);

  const handleLogin = () => {
    setUser(getUserFromToken());
  };

  const handleLogout = () => {
    clearToken();
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login onLogin={handleLogin} isAuthenticated={isAuthenticated} />}
      />

      <Route path="/register" element={<Register isAuthenticated={isAuthenticated} />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute user={user}>
            <Dashboard user={user} onLogout={handleLogout} />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <PrivateRoute user={user} allowedRoles={["admin"]}>
            <Admin user={user} onLogout={handleLogout} />
          </PrivateRoute>
        }
      />

      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;
