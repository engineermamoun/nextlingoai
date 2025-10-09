// /app/componets/SideBar/SideBar.js
"use client";
import { Box, Drawer } from "@mui/material";
import CustomizedListItem from "./CustomizedListItem";
import { useState } from "react";
import MenuToolbar from "./MenuToolbar";
import MenuFooter from "./MenuFooter";

const drawerWidth = 270;
export default function SideBar(props) {
  const { window, mobileOpen, handleDrawerToggle } = props;
  //   const [mobileOpen, setMobileOpen] = useState(props.mobileOpenFunc);
  // const handleDrawerClose = () => {
  //   // props.setIsClosing(true);
  //   setMobileOpen(!mobileOpen);
  // };

  // const handleDrawerTransitionEnd = () => {
  //   // props.setIsClosing(false);
  // };

  const lectureObject = {
    "simple-present-tense": "زمن المضارع البسيط",
    "present-continuous-tense": "زمن المضارع المستمر",
    "simple-past-tense": "زمن الماضي البسيط",
    "past-continuous-tense": "زمن الماضي المستمر",
    "present-perfect-tense": "زمن المضارع التام",
    "future-tense": "زمن المستقبل",
    "passive-voice": "المبني للمجهول",
    "conditional-sentences": "الجمل الشرطية",
    "modal-verbs": "الأفعال الناقصة",
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        // onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        slotProps={{
          root: {
            keepMounted: true, // Better open performance on mobile.
          },
        }}
      >
        <MenuToolbar />
        {lectureObject &&
          Object.values(lectureObject).map((item, index) => {
            return (
              <CustomizedListItem
                key={index}
                lectureName={item}
                lectureNameEn={Object.keys(lectureObject)[index]}
              />
            );
          })}
        <MenuFooter />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        <MenuToolbar />
        {lectureObject &&
          Object.values(lectureObject).map((item, index) => {
            return (
              <CustomizedListItem
                key={index}
                lectureName={item}
                lectureNameEn={Object.keys(lectureObject)[index]}
              />
            );
          })}
        <MenuFooter />
      </Drawer>
    </Box>
  );
}
