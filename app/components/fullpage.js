"use client";
import React, { useEffect } from "react";
import Pantrylist from "./pantrylist";
import SideNavBar from "./sidenav";
import TopNavbar from "./topnavbar";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import RecipesHandler from "./recipeshandler";
import { redirect, useRouter } from "next/navigation";
import { getUserSession } from "../lib/session";
import { useSession, signIn, signOut } from "next-auth/react";
import myColorScheme from "./colorscheme";

function Fullpage({ Component }) {
  const [currentTab, setCurrentTab] = useState(0);

  const { data: session, status } = useSession();

  const router = useRouter();

  const handleTabChange = (newValue) => {
    setCurrentTab(newValue);
  };

  if (status === "loading") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (status === "unauthenticated") {
    return (
      redirect("/api/auth/signin")
    );
  }
    return (
      <>
        <Box height={"100vh"} width={"100vw"}>
          <TopNavbar />

          <Stack direction="row" spacing={2} width={"90%"}>
            <SideNavBar handleTabChange={handleTabChange} />
            {currentTab === 0 && <Pantrylist />}
            {currentTab === 1 && <RecipesHandler />}
          </Stack>
        </Box>
      </>
    );
}

export default Fullpage;
