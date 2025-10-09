// /app/components/SideBar/MenuToolbar.js
"use client";
import { Divider, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function MenuToolbar() {
  return (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          قائة الدروس
        </Typography>
      </Toolbar>
      <Divider />
    </>
  );
}
