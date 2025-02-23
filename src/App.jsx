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
import ProtectedRoutes from "./utils/ProtectectedRoutes";

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

  if (isAuthPage) {
    return (
      <AuthLayout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-code" element={<ResetCode />} />
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
        <SidebarItem icon={<LogIn />} text="Login" to="/login" />
        <SidebarItem icon={<UserPlus />} text="Register" to="/register" />
      </Sidebar>
      <main className="flex-1 p-4">
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
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
  );
}

export default App;
