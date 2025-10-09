// /app/componets/SideBar/CustomizedListItem.js
"use client";

import { CastForEducationOutlined, QuestionAnswerOutlined, RecordVoiceOver, Translate } from "@mui/icons-material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";

const CustomizedListItem = (props) => {
  const [open, setOpen] = useState(false);
  const ListItemObj = {
    lecture: "شرح الدرس",
    question: "اسئلة",
    conversation: "محادثة",
    translate: "ترجمة",
  };
  const icons = [<CastForEducationOutlined/>, <QuestionAnswerOutlined/>, <RecordVoiceOver/>,<Translate/>]
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            setOpen(!open);
          }}
            onBlur={() => {
            setOpen(false);
          }}
        >
          <ListItemIcon>{/* <InboxIcon /> */}</ListItemIcon>
          <ListItemText primary={props.lectureName} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>{" "}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {ListItemObj &&
          Object.values(ListItemObj).map((item, index) => {
            return (
              <div key={index}>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>{icons[index]}</ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItemButton>
                </List>
                <Divider />
              </div>
            );
          })}
      </Collapse>
    </>
  );
};

export default CustomizedListItem;
