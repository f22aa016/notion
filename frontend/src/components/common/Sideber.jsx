import React from 'react';
import { Box, Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Link, useNavigate } from 'react-router-dom';
import assets from "../../assets/index"; // Ensure `assets` is correctly defined
import { useSelector } from "react-redux"

function Sidebar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      open={true}
      sx={{
        width: 250,
        height: "100vh",
        "& .MuiDrawer-paper": {
          width: 250,
          height: "100vh",
          boxSizing: "border-box",
          backgroundColor: assets.colors.secondary,
        },
      }}
    >
      <List>
        {/* User Section */}
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon />
            </IconButton>
          </Box>
        </ListItemButton>

        {/* Favorites Section */}
        <Box sx={{ paddingTop: "10px" }} />
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              お気に入り
            </Typography>
          </Box>
        </ListItemButton>

        {/* Private Section */}
        <Box sx={{ paddingTop: "10px" }} />
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              プライベート
            </Typography>
            <IconButton>
              <AddBoxOutlinedIcon />
            </IconButton>
          </Box>
        </ListItemButton>
        <ListItemButton
          sx={{ pl: "20px" }}
          component={Link}
          to="/momo/hufhusdhfhsd"
        >
          <Typography>
            仮置きのメモ
          </Typography>
        </ListItemButton>
        <ListItemButton
          sx={{ pl: "20px" }}
          component={Link}
          to="/momo/hufhusdhfhsd"
        >
          <Typography>
            仮置きのメモ
          </Typography>
        </ListItemButton>
        <ListItemButton
          sx={{ pl: "20px" }}
          component={Link}
          to="/momo/hufhusdhfhsd"
        >
          <Typography>
            仮置きのメモ
          </Typography>
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default Sidebar;
