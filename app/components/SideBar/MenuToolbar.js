// /app/components/SideBar/MenuToolbar.js
"use client";

// -------------------------------
// Imports
// -------------------------------
import { Divider, Stack, Toolbar, Typography } from "@mui/material";

import React from "react";
// React import required to define a functional component
import LensBlurIcon from "@mui/icons-material/LensBlur";
import { useRouter } from "next/navigation";

// -------------------------------
// MenuToolbar Component
// -------------------------------
// Purpose:
// - Render the top section of the sidebar containing a title/header
// - Provides clear separation from the list of items below
// Inputs:
// - None (static component)
// Outputs:
// - JSX containing a toolbar with a title and a visual divider
// Side Effects:
// - None, purely presentational
export default function MenuToolbar() {
  const router = useRouter();
  return (
    <>
      {/* Toolbar container for consistent spacing and alignment */}
      <Toolbar>
        <Stack
          direction="row"
          spacing={1}
          onClick={() => router.replace("/")}
          sx={{ cursor: "pointer" }}
        >
          <LensBlurIcon sx={{ mr: 1 }} />
          {/* Typography component to display the sidebar title */}
          <Typography variant="h5" noWrap component="div">
            Lessons{/* Frensh text meaning "List of Lessons" */}
          </Typography>
        </Stack>
      </Toolbar>
      {/* Divider to visually separate the toolbar from the rest of the sidebar content */}
      <Divider />
    </>
  );
}
