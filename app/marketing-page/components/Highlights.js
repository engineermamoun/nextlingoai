"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import logo from "@/public/nextlingoainobg.png";
import {
  AddReaction,
  RecordVoiceOver,
  Stairs,
  SwitchAccessShortcut,
  Translate,
} from "@mui/icons-material";
import Image from "next/image";

// const items = [
//   {
//     icon: <SettingsSuggestRoundedIcon />,
//     title: 'Adaptable performance',
//     description:
//       'Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.',
//   },
//   {
//     icon: <ConstructionRoundedIcon />,
//     title: 'Built to last',
//     description:
//       'Experience unmatched durability that goes above and beyond with lasting investment.',
//   },
//   {
//     icon: <ThumbUpAltRoundedIcon />,
//     title: 'Great user experience',
//     description:
//       'Integrate our product into your routine with an intuitive and easy-to-use interface.',
//   },
//   {
//     icon: <AutoFixHighRoundedIcon />,
//     title: 'Innovative functionality',
//     description:
//       'Stay ahead with features that set new standards, addressing your evolving needs better than the rest.',
//   },
//   {
//     icon: <SupportAgentRoundedIcon />,
//     title: 'Reliable support',
//     description:
//       'Count on our responsive customer support, offering assistance that goes beyond the purchase.',
//   },
//   {
//     icon: <QueryStatsRoundedIcon />,
//     title: 'Precision in every detail',
//     description:
//       'Enjoy a meticulously crafted product where small touches make a significant impact on your overall experience.',
//   },
// ];
const items = [
  {
    icon: <Stairs />,
    title: "Learn Grammar Step by Step",
    description:
      "In each lesson, you’ll learn grammar through four simple steps: Lesson explanation, Questions, Conversation, and Translation.",
  },
  {
    icon: <AddReaction />,
    title: "Interactive Practice",
    description:
      "The conversation section allows you to pronounce sentences, and AI automatically corrects your mistakes.",
  },
  {
    icon: <RecordVoiceOver />,
    title: "Improve Pronunciation and Grammar",
    description:
      "AI helps you correct pronunciation and understand grammar faster and more effectively.",
  },
  {
    icon: <Translate />,
    title: "Translation Section",
    description:
      "Practice translating sentences and check their accuracy to ensure precise French learning.",
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: "Smart Support",
    description:
      "The 'Ask Me' section allows you to talk with the smart assistant and request explanations whenever needed.",
  },
  {
    icon: <SwitchAccessShortcut />,
    title: "Innovative Learning Experience",
    description:
      "The interactive app design makes learning fun and helps you gradually improve your skills.",
  },
];
export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: "white",
        bgcolor: "grey.900",
      }}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              direction: "row",
              gap: 1,
            }}
          >
            <Typography component="h2" variant="h4" gutterBottom>
             Highlights
              {/* <Box component="span" sx={{ color: "#00d3ab", fontWeight: "bold" }}>
              Next
            </Box>
            <Box component="span" sx={{ color: "#cb6ce6", fontWeight: "bold" }}>
              Lingo
            </Box>
            <Box component="span" sx={{ color: "#4876ee", fontWeight: "bold" }}>
              AI
            </Box> */}
            </Typography>
            <Image src={logo} width={140} height={26} alt="Logo" />{" "}
          </Box>
          <Typography variant="body1" sx={{ color: "grey.400" }}>
            Discover how the app helps you learn French step by step with AI that
            corrects pronunciation, explains grammar, and provides interactive training.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  color: "inherit",
                  p: 3,
                  height: "100%",
                  borderColor: "hsla(220, 25%, 25%, 0.3)",
                  backgroundColor: "grey.800",
                }}
              >
                <Box sx={{ opacity: "50%" }}>{item.icon}</Box>
                <div>
                  <Typography gutterBottom sx={{ fontWeight: "medium" }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "grey.400" }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
