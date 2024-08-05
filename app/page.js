"use client";
import React from "react";
import Fullpage from "./components/fullpage";
import { SessionProvider } from "next-auth/react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';


export default function Home() {
  return (
    <SessionProvider>
      <Fullpage />
    </SessionProvider>
  );
}
