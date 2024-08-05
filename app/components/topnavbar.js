"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import myColorScheme from "./colorscheme";
import { Avatar } from "@mui/material";


const newColorScheme = myColorScheme.newColorScheme;

function TopNavbar() {
  return (
    <>
      <AppBar sx={{ position: "fixed", backgroundColor: newColorScheme.darkAccent}}>
        <Toolbar sx={{ justifyContent: "space-between", display: "flex", flexDirection: "row" }}>
          <Typography variant="h6" component="div">
            Keepr
          </Typography>
          <Avatar></Avatar>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}

export default TopNavbar;
