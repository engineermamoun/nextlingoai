// /app/components/SideBar/MenuFooter.js
import { Box, Typography } from "@mui/material";
import React from "react";
import logo from "@/public/logo.png";
import Image from "next/image";
import styles from "./SideBar.module.css";
export default function MenuFooter() {
  const date = new Date().getFullYear();
  return (
    <Box component="footer" className={styles.menufooter}>
      <Typography component="span" noWrap>
        Gemini يستعمل تقنية
      </Typography>
      <Typography component="p" noWrap>
        جميع الحقوق محفوظة @<Typography component="span">{date}</Typography>
      </Typography>
      <Image src={logo} width={150} alt="Logo" />
    </Box>
  );
}
