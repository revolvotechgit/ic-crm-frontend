import React, { useContext, createContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Power, MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { Box, useTheme } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/Logo.svg";
const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const { logout, user } = useAuth();
  const theme = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserData(user);
  }, []);

  return (
    <aside className={`h-screen ${expanded ? "w-70" : "w-20"} transition-all`}>
      <Box
        component="nav"
        className="h-full flex flex-col"
        sx={{
          bgcolor: "background.paper",
          borderRight: 1,
          borderColor: "divider",
        }}
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo}
            style={{
              filter: `brightness(0) saturate(100%) ${
                theme.palette.mode === "dark"
                  ? `invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)`
                  : `invert(24%) sepia(90%) saturate(6619%) hue-rotate(242deg) brightness(97%) contrast(91%)`
              }`,
            }}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt="Company Logo"
          />
          <Box
            component="button"
            onClick={() => setExpanded((curr) => !curr)}
            sx={{
              p: 1.5,
              borderRadius: 1,
              color: "text.primary",
              "&:hover": {
                bgcolor: "primary.lighter",
                color: "primary.main",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            {expanded ? <ChevronFirst size={20} /> : <ChevronLast size={20} />}
          </Box>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            {React.Children.map(children, (child) => {
              return React.cloneElement(child, {
                active: location.pathname === child.props.to,
              });
            })}
          </ul>
        </SidebarContext.Provider>

        <Box
          sx={{
            borderTop: expanded ? 1 : 0,
            borderColor: "divider",
            m: 2,
            p: expanded ? 1.5 : 0,
            borderRadius: expanded ? 2 : 0,
            bgcolor: expanded ? "primary.main" : "transparent",
            color: "primary.contrastText",
          }}
          className="flex"
        >
          <img
            src={`https://ui-avatars.com/api/?name=${userData?.firstName}+${userData?.lastName}&color=ff0000`}
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">
                {userData?.firstName} {userData?.lastName}
              </h4>
              <span className="text-xs opacity-80">{userData?.email}</span>
            </div>
            <Power
              className="hover:cursor-pointer hover:opacity-80"
              size={20}
              onClick={handleLogout}
            />
          </div>
        </Box>
      </Box>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, to }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <Box
        component="li"
        sx={{
          color: active ? "primary.main" : "text.primary",
          bgcolor: active ? "primary.lighter" : "transparent",
          "&:hover": {
            bgcolor: "primary.lighter",
            color: "primary.main",
            "& .icon": {
              color: "primary.main",
            },
          },
        }}
        className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
        `}
      >
        <Box
          className="icon"
          sx={{
            color: active ? "primary.main" : "inherit",
            transition: "color 0.2s",
          }}
        >
          {icon}
        </Box>
        <span
          className={`overflow-hidden transition-all flex items-center ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {expanded && <span className="mr-2">{text}</span>}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              active ? "" : "top-2"
            }`}
          />
        )}
      </Box>
    </Link>
  );
}
