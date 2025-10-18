// /app/components/SideBar/SideBar.js
"use client";

// -------------------------------
// Imports
// -------------------------------
import { Box, Drawer, List } from "@mui/material";
// Box: generic container component from MUI for layout
// Drawer: MUI component for side navigation panels

import CustomizedListItem from "./CustomizedListItem";
// Custom component rendering each lecture item in the sidebar

import { useContext, useEffect, useState } from "react";
// React hook for accessing context values

import MenuToolbar from "./MenuToolbar";
// Component rendering the top toolbar/menu inside the sidebar

import MenuFooter from "./MenuFooter";
// Component rendering the footer section of the sidebar

import { AppContext } from "../context/AppContext";
import { frenchLevels, frenchProgram } from "@/app/appData";
// Context to share app-wide state such as drawer open/close status and drawer width

// -------------------------------
// SideBar Component
// -------------------------------
// Purpose:
// - Render a responsive sidebar navigation menu
// - Show temporary drawer on mobile and permanent drawer on larger screens
// - List all lectures dynamically from a predefined object
// Inputs:
// - Uses context values from AppContext (mobileOpen, setMobileOpen, drawerWidth)
// Outputs:
// - Renders MUI Drawer components containing toolbar, lecture list, and footer
// Side Effects:
// - Toggles sidebar open/close state on mobile
export default function SideBar() {
  // -------------------------------
  // Context values
  // -------------------------------
  const { mobileOpen, setMobileOpen, drawerWidth, level } =
    useContext(AppContext);
  // mobileOpen: boolean indicating if temporary drawer is open on mobile
  // setMobileOpen: function to toggle mobileOpen
  // drawerWidth: width of the sidebar drawer

  // -------------------------------
  // handleDrawerToggle
  // -------------------------------
  // Purpose:
  // - Toggle the mobile drawer open/close state
  // Input:
  // - None
  // Output:
  // - Updates mobileOpen state in AppContext
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // -------------------------------
  // Lecture Object
  // -------------------------------
  // Purpose:
  // - Map of lecture keys to their display names in Frensh
  // - Used to dynamically render the list of lectures in the sidebar
  const [coursesObject, setCoursesObject] = useState([]);

  function generateSlug(title) {
    return title
      .trim() // remove spaces at start/end
      .replace(/[\s&\/\\#,+()$~%.'":*?<>{}—–−]+/g, "-") // replace spaces & symbols including different dashes with -
      .replace(/^-+|-+$/g, "") // remove leading/trailing dashes
      .replace(/-+/g, "-"); // replace multiple consecutive dashes with one
  }

  async function getCourseTitlesByLevel(val) {
    // Find the level object
    const levelData = frenchProgram.find((item) => item.level === val);

    if (!levelData) return []; // Return empty array if level not found

    // Extract all lesson titles
    return levelData.lessons.map((lesson) => lesson.title);
  }
  useEffect(() => {
    async function fetchCourses() {
      const titles = await getCourseTitlesByLevel(level);
      setCoursesObject(titles);
    }

    fetchCourses();
  }, [level]); // re-run if level changes

   
  // -------------------------------
  // Render
  // -------------------------------
  // The sidebar renders differently depending on screen size:
  // - Temporary drawer for mobile (xs)
  // - Permanent drawer for larger screens (sm+)
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* Temporary Drawer for Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle} // Close drawer on outside click or toggle
        sx={{
          display: { xs: "block", sm: "none" }, // Show only on xs screens
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        slotProps={{
          root: {
            keepMounted: true, // Improves performance on mobile by keeping component mounted
          },
        }}
      >
        {/* Top toolbar inside drawer */}
        <MenuToolbar />
        {/* Dynamic list of lectures */}
        <List>
          {coursesObject &&
            Object.values(coursesObject).map((item, index) => {
              return (
                <CustomizedListItem
                  key={index}
                  lectureName={item} // Frensh display name
                  lectureNameEn={generateSlug(item)}
                  // lectureNameEn={Object.keys(lectureObject)[index]} // English key
                />
              );
            })}
        </List>
        {/* Footer inside drawer */}
        <MenuFooter />
      </Drawer>

      {/* Permanent Drawer for Larger Screens */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" }, // Hide on mobile
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        <MenuToolbar />
        <List>
          {coursesObject &&
            Object.values(coursesObject).map((item, index) => {
              return (
                <CustomizedListItem
                  key={index}
                  lectureName={item}
                  // lectureNameEn={Object.keys(lectureObject)[index]}
                  lectureNameEn={generateSlug(item)}
                />
              );
            })}
        </List>
      </Drawer>
      {/* <MenuFooter /> */}
    </Box>
  );
}
