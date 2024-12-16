import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import styled from "styled-components";
import Logo from "../../assets/images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

const drawerWidth = 280;

const Content = styled.div`

  height: 100%;
  background-color: #f5f5f5;
  width: 100%;
`;

const NAVIGATION = [
  {
    title: "Products",
    icon: <DashboardIcon />,
    route: "/",
  },
];

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = useNavigate();
  const { pathname } = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleItemClick = (route) => {
    nav(route);
  };

  const drawerContent = (
    <Box sx={{ overflow: "auto" }}>
      <List>
        <img
          src={Logo}
          alt="Logo"
          style={{
            margin: "16px",
            display: "block",
            height: "40px",
            alignSelf: "flex-start",
          }}
        />
        {NAVIGATION.map((item) => (
          <ListItem
            key={item.title}
            button
            onClick={() => handleItemClick(item.route)}
            sx={{
              cursor: "pointer",
              backgroundColor:
                pathname === item.route ? "rgba(25, 118, 210, 0.1)" : "inherit",
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.2)",
              },
            }}
          >
            <ListItemIcon>
              {React.cloneElement(item.icon, {
                color: pathname === item.route ? "primary" : "inherit",
              })}
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        style={{
          position:"absolute",
          left:20
        }}
        sx={{
          mr: 2,
          display: { lg: "none" }, // Show only on small screens
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" }, // Hide on small screens
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better performance on mobile
        }}
        sx={{
          display: { xs: "block", lg: "none" }, // Show only on small screens
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
     flexGrow:1
        }}
      >
        <Content>{children}</Content>
      </Box>
    </Box>
  );
}
