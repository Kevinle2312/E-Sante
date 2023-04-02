import {AppBar, Box, IconButton, Toolbar, useTheme} from "@mui/material";
import React, {useContext, useState} from "react";
import { ColorModeContext, token } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutDialog from "../../components/Logout/LogoutDialog";

import { Link } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleLogoutDialogOpen = () => {
    setIsLogoutDialogOpen(true);
  };

  const handleLogoutDialogClose = () => {
    setIsLogoutDialogOpen(false);
  };

  return (
    <Box position="flex" top={0} width="100%"  zIndex={10} p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* SEARCH BAR */}
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="25px"
          minWidth={200}
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* ICONS */}
        <Box display="flex" alignItems="center">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
          <IconButton onClick={handleLogoutDialogOpen}>
            <PersonOutlinedIcon />
          </IconButton>
          <LogoutDialog isOpen={isLogoutDialogOpen} onClose={handleLogoutDialogClose} />
        </Box>
      </Box>
    </Box>

  );
};

export default Topbar;


