"use client";

import React from "react";
import { Box, Typography, Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import BookIcon from "@mui/icons-material/Book";
import EditIcon from "@mui/icons-material/Edit";
import TranslateIcon from "@mui/icons-material/Translate";
import Image from "next/image";
import { RecordVoiceOver } from "@mui/icons-material";

const rootColors = {
  light: {
    background: "#f6f6f8",
    cardBorder: "#dbdfe6",
    textPrimary: "#54565cff",
    textSecondary: "#616f89",
    button: "#135bec",
  },
  dark: {
    background: "#101622",
    cardBorder: "#4b5563",
    textPrimary: "#918a8aff",
    textSecondary: "#9ca3af",
    button: "#135bec",
  },
};

const LearningCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? rootColors.dark.cardBorder
      : rootColors.light.cardBorder
  }`,
  backgroundColor: theme.palette.mode === "dark" ? "#1f2937" : "#ffffff",
  flex: "1 1 250px", // grow and shrink responsively
  minWidth: "250px",
}));

export default function FirstPage() {
  const arrayObj = [
    {
      title: "Lesson Explanation",
      description: "Understand the fundamentals.",
      icon: <BookIcon />,
    },
    {
      title: "Exercises",
      description: "Practice what you've learned.",
      icon: <EditIcon />,
    },
    {
      title: "Conversation",
      description: "Apply skills in real scenarios.",
      icon: <RecordVoiceOver />,
    },
    {
      title: "Translation",
      description: "Bridge the gap between languages.",
      icon: <TranslateIcon />,
    },
  ];

  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        }),
      })}
    >
      {/* Hero Section */}
      <Box sx={{ px: 2, pt: 3 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },

            color: "text.primary",
            pb: 1,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Your Journey to Fluent French Starts Here.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.subtitle1",
            pb: 2,
            textAlign: { xs: "center", md: "left" },
            fontSize: { xs: "0.5rem", sm: "0.9rem" },
          }}
        >
          Master French with our effective four-step learning process using AI.
        </Typography>
      </Box>

      {/* Cards Section (no Grid, just flex) */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // wraps on smaller screens
          justifyContent: "center",
          alignItems: "stretch",
          gap: 2,
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        {arrayObj.map((item, index) => (
          <LearningCard key={index}>
            <Box
              sx={{
                color: (theme) =>
                  theme.palette.mode === "dark"
                    ? rootColors.dark.textPrimary
                    : rootColors.light.textPrimary,
              }}
            >
              {item.icon}
            </Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                color: (theme) =>
                  theme.palette.mode === "dark"
                    ? rootColors.dark.textPrimary
                    : rootColors.light.textPrimary,
              }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "dark"
                    ? rootColors.dark.textSecondary
                    : rootColors.light.textSecondary,
              }}
            >
              {item.description}
            </Typography>
          </LearningCard>
        ))}
      </Box>

      {/* Centered Image */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: { xs: 3, md: 5 },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: 260, sm: 380, md: 520 },
            height: { xs: 70, sm: 100, md: 150 },
            borderRadius: "20px",
            boxShadow: 3,
          }}
        >
          <Image
            src="/nextlingoai.png"
            alt="NextLingoAI Logo"
            fill
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </Box>
      </Box>
    </Box>
  );
}
