import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import logo from "./logo.png";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import ListIcon from "@mui/icons-material/List";
import SettingsIcon from "@mui/icons-material/Settings";
import "./Menu.css";

const drawerWidth = 280;

export default function Menu() {
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      ></AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ marginY: 3, marginX: 2 }}>
          <img
            src={logo}
            alt="Logo"
            style={{ maxWidth: `${drawerWidth * 0.9}px` }}
          />
        </Box>

        <List style={{ padding: 10 }}>
          {[
            { text: "Main", path: "/" },
            { text: "Check", path: "/check" },
            { text: "Setting", path: "/setting" },
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding className="list-item">
              <ListItemButton onClick={() => handleMenuClick(item.path)}>
                <ListItemIcon>
                  {index === 0 && <SignalCellularAltIcon />}
                  {index === 1 && <ListIcon />}
                  {index === 2 && <SettingsIcon />}
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body1" fontWeight="bold">
                    {item.text}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
