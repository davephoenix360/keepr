import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InventoryIcon from "@mui/icons-material/Inventory";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import myColorScheme from "./colorscheme";
const newColorScheme = myColorScheme.newColorScheme;
import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

const drawerWidth = 180;

export default function SideNavBar({ handleTabChange }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: newColorScheme.darkAccent,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography
            color={newColorScheme.lightBeige}
            variant="h6"
            noWrap
            component="div"
          >
            Keepr
          </Typography>
        </Toolbar>
        <Divider />
        <List sx={{ color: newColorScheme.lightBeige }}>
          <ListItem key="Pantry" disablePadding>
            <ListItemButton onClick={() => handleTabChange(0)}>
              <ListItemIcon>
                <InventoryIcon sx={{ color: newColorScheme.lightBeige }} />
              </ListItemIcon>
              <ListItemText primary="Pantry" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Recipes" disablePadding>
            <ListItemButton onClick={() => handleTabChange(1)}>
              <ListItemIcon>
                <MenuBookIcon sx={{ color: newColorScheme.lightBeige }} />
              </ListItemIcon>
              <ListItemText primary="Recipes" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <Box display="flex" justifyContent="center" alignContent={"center"}>
          <Button
            sx={{ ...myColorScheme.buttonStyle }}
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
