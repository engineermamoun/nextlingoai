// /app/components/SideBar/CustomizedListItem.js
"use client";

// -------------------------------
// Imports
// -------------------------------
import {
  CastForEducationOutlined,
  FiberSmartRecord, // Icon representing lessons/education
  QuestionAnswerOutlined, // Icon representing questions
  RecordVoiceOver, // Icon representing conversation/voice practice
  Translate, // Icon representing translation exercises
} from "@mui/icons-material";
import FiberSmartRecordIcon from "@mui/icons-material/FiberSmartRecord";
import EditIcon from "@mui/icons-material/Edit";

import ExpandLess from "@mui/icons-material/ExpandLess"; // Icon for collapsing expandable list
import ExpandMore from "@mui/icons-material/ExpandMore"; // Icon for expanding expandable list
import BookIcon from "@mui/icons-material/Book";
import {
  Collapse, // Provides collapsible/expandable section functionality
  Divider, // Horizontal divider for separating UI elements
  List, // Container for list items
  ListItem, // Represents a single list item
  ListItemButton, // Makes list items clickable
  ListItemIcon, // Renders an icon next to list text
  ListItemText,
  Typography, // Renders the main text for the list item
} from "@mui/material";

import { useRouter } from "next/navigation"; // Next.js hook for programmatic navigation
import React, { useEffect, useState } from "react"; // React hooks for state management

// -------------------------------
// CustomizedListItem Component
// -------------------------------
// Purpose:
// - Renders a sidebar list item with a lecture name that can be expanded to show sub-sections (lesson, questions, conversation, translation)
// Inputs:
// - props.lectureName: The displayed name of the lecture in Frensh
// - props.lectureNameEn: The English key/name of the lecture, used for routing
// Outputs:
// - JSX rendering the collapsible list item with icons and navigable sub-items
// Side Effects:
// - Expands/collapses the sub-list on click
// - Navigates to the selected sub-section page on sub-item click
const CustomizedListItem = (props) => {
  // Local state to track whether the sub-list is expanded or collapsed
  const [open, setOpen] = useState(false);
  // TODO TRACK THE CURRENT OPEND TAB
  const [currentCourse, setCurrentCourse] = useState();

  // Object defining sub-sections for each lecture item with Frensh labels
  const ListItemObj = {
    lecture: "Lesson Explanation",
    question: "Questions",
    conversation: "Conversation Practice",
    translate: "Translation Section",
  };
 
  const icons = [
    <BookIcon sx={{ fontSize: 18, color: "#4CAF50" }} />,
    <EditIcon sx={{ fontSize: 18, color: "#2196F3" }} />,
    <RecordVoiceOver sx={{ fontSize: 18, color: "#FF9800" }} />,
    <Translate sx={{ fontSize: 18, color: "#9C27B0" }} />,
  ];

  // Next.js router for programmatic page navigation
  const router = useRouter();

  return (
    <>
      {/* Main list item for the lecture */}
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            setOpen(!open); // Toggle expand/collapse state when clicked
          }}
          // onBlur={() => {
          //   setOpen(false); // Collapse the list when losing focus for accessibility
          // }}
          sx={{
            bgcolor: open ? "#f0f0f0" : "transparent",
            "&:hover": {
              bgcolor: "#e0e0e0",
            },
            borderRadius: 1,
            mb: 0.5,
            px: 2,
            py: 1,
          }}
        >
          {/* Placeholder for optional leading icon (can be replaced if needed) */}
          <ListItemIcon>
            {/* <InboxIcon /> */}
            <FiberSmartRecord
              sx={{
                fontSize: open ? 24 : 20, // larger when expanded
                color: open ? "#f50057" : "#cf0e0eff", // different color when expanded
              }}
            />
          </ListItemIcon>

          {/* Main text displaying the lecture name */}
          <ListItemText
            // primary={props.lectureName}
            primary={
              <Typography
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  fontSize: "13px", // small size, adjust as needed
                }}
              >
                {props.lectureName}
              </Typography>
            }
          />

          {/* Conditional icon for expand/collapse state */}
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>

      {/* Collapsible section containing sub-items */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        {ListItemObj &&
          Object.values(ListItemObj).map((item, index) => {
            return (
              <div key={index}>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{
                      p: 0,
                      gap: 1,
                      m: 0,

                      // bgcolor: "#fafafa",
                      "&:hover": {
                        bgcolor: "#f5f5f5",
                      },
                      borderRadius: 1,
                    }} // Indent sub-items for hierarchy
                    onClick={() => {
                      setOpen(true); // Ensure the sub-list stays open on click
                      // Navigate to the corresponding lecture sub-section page
                      router.push(
                        `../${Object.keys(ListItemObj)[index]}/${
                          props.lectureNameEn
                        }`
                      );
                    }}
                  >
                    {/* Icon corresponding to the sub-section */}
                    <ListItemIcon sx={{ pl: 3 }}>{icons[index]}</ListItemIcon>

                    {/* Sub-section label */}
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontWeight: 600,
                            color: "text.secondary",
                            fontSize: "10px", // small size, adjust as needed
                          }}
                        >
                          {item}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </List>

                {/* Divider for visual separation between sub-items */}
                <Divider />
              </div>
            );
          })}
      </Collapse>
    </>
  );
};

export default CustomizedListItem;
