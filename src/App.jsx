import React, { createContext, useState, useMemo } from "react";
import "./styles/styles.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import theme from "./styles/theme";
import Layout from "./components/Layout/index";
import AuthLayout from "./components/Layout/AuthLayout";
import Sidebar from "./components/Dashboard/Sidebar";
import { SidebarItem } from "./components/Dashboard/Sidebar";
import ForgotPassword from "./components/Auth/ForgotPassword";
import NotFound from "./components/NotFound";
import {
  HomeIcon,
  LogIn,
  UserPlus,
  Settings,
  FolderKanban,
  FileText,
  Users,
  BarChart3,
  HelpCircle,
} from "lucide-react";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ResetCode from "./components/Auth/ResetCode";
import ResetPassword from "./components/Auth/ResetPassword";
import { ProtectedRoutes, AuthRoutes } from "./utils/ProtectectedRoutes";
import { AuthProvider } from "./context/AuthContext";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

// Wrapper component to handle layout selection
const AppContent = () => {
  const location = useLocation();
  const isAuthPage = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/reset-code",
  ].includes(location.pathname);

  // Check if the current path matches any of our defined routes
  const isKnownRoute = [
    "/",
    "/projects",
    "/invoices",
    "/team",
    "/analytics",
    "/settings",
    "/help",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/reset-code",
  ].includes(location.pathname);

  // If it's not a known route, show the 404 page without any layout
  if (!isKnownRoute) {
    return <NotFound />;
  }

  if (isAuthPage) {
    return (
      <AuthLayout>
        <Routes>
          <Route element={<AuthRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-code" element={<ResetCode />} />
          </Route>
        </Routes>
      </AuthLayout>
    );
  }

  return (
    <Layout>
      <Sidebar>
        <SidebarItem icon={<HomeIcon />} text="Dashboard" to="/" />
        <SidebarItem icon={<FolderKanban />} text="Projects" to="/projects" />
        <SidebarItem icon={<FileText />} text="Invoices" to="/invoices" />
        <SidebarItem icon={<Users />} text="Team" to="/team" />
        <SidebarItem icon={<BarChart3 />} text="Analytics" to="/analytics" />
        <SidebarItem icon={<Settings />} text="Settings" to="/settings" />
        <SidebarItem icon={<HelpCircle />} text="Help" to="/help" />
      </Sidebar>
      <main className="flex-1 p-4">
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<div>Projects Page</div>} />
            <Route path="/invoices" element={<div>Invoices Page</div>} />
            <Route path="/team" element={<div>Team Page</div>} />
            <Route path="/analytics" element={<div>Analytics Page</div>} />
            <Route path="/settings" element={<div>Settings Page</div>} />
            <Route path="/help" element={<div>Help Page</div>} />
          </Route>
        </Routes>
      </main>
    </Layout>
  );
};

function App() {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("theme", newMode);
          window.location.reload(); // Refresh to apply theme changes
          return newMode;
        });
      },
    }),
    []
  );

  return (
    <AuthProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Router>
            <Box
              sx={{
                position: "fixed",
                top: 16,
                right: 16,
                zIndex: 1200,
                bgcolor: "background.paper",
                borderRadius: 1,
                boxShadow: 1,
                p: 0.5,
              }}
            >
              <IconButton
                onClick={colorMode.toggleColorMode}
                sx={{ color: "text.primary" }}
              >
                {mode === "dark" ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Box>
            <AppContent />
          </Router>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthProvider>
  );
}

export default App;
