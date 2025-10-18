"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useColorScheme } from "@mui/material/styles";

const userTestimonials = [
  {
    avatar: <Avatar alt="Ahmed Mahmoud" src="/static/images/avatar/1.jpg" />,
    name: "Ahmed Mahmoud",
    occupation: "French language student",
    testimonial:
      "I loved how easy it is to learn French using this app! The AI corrects my pronunciation and explains grammar interactively, making learning fun and effective every day.",
  },
  {
    avatar: <Avatar alt="Sara Ali" src="/static/images/avatar/2.jpg" />,
    name: "Sara Ali",
    occupation: "Interested in improving language skills",
    testimonial:
      "One of the best features of this app is the interactive support it offers. It helps correct mistakes instantly and makes learning smooth and enjoyable. I feel confident in my progress now!",
  },
  {
    avatar: <Avatar alt="Khaled Fahd" src="/static/images/avatar/3.jpg" />,
    name: "Khaled Fahd",
    occupation: "University student",
    testimonial:
      "The app interface is very simple and easy to use. I love how each lesson focuses on improving my practical skills in pronunciation and grammar, which made learning much more effective.",
  },
  {
    avatar: <Avatar alt="Laila Samir" src="/static/images/avatar/4.jpg" />,
    name: "Laila Samir",
    occupation: "Engineer",
    testimonial:
      "I appreciate the attention to detail in designing the interactive lessons. Each one is carefully structured to provide an excellent learning experience that helps me progress quickly and professionally.",
  },
  {
    avatar: <Avatar alt="Omar Hassan" src="/static/images/avatar/5.jpg" />,
    name: "Omar Hassan",
    occupation: "Business professional",
    testimonial:
      "I've tried other learning apps, but this one stands out thanks to its interactive features and AI-powered approach. Learning has become more enjoyable with visible results.",
  },
  {
    avatar: <Avatar alt="Noor Mohamed" src="/static/images/avatar/6.jpg" />,
    name: "Noor Mohamed",
    occupation: "Self-development enthusiast",
    testimonial:
      "The quality of the educational content is amazing! The app is well-designed and helps me improve my skills quickly. Definitely worth trying for anyone who wants to master French.",
  },
];

const darkModeLogos = [
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg",
];

const lightModeLogos = [
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg",
];

const logoStyle = {
  width: "64px",
  opacity: 0.3,
};

export default function Testimonials() {
  const { mode, systemMode } = useColorScheme();

  let logos;
  if (mode === "system") {
    logos = systemMode === "light" ? lightModeLogos : darkModeLogos;
  } else if (mode === "light") {
    logos = lightModeLogos;
  } else {
    logos = darkModeLogos;
  }

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
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
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
        Testimonials
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
         Discover our learners’ experiences with mastering French through AI.
          See how the app helped them improve pronunciation, grammar, and
          communication skills quickly and effectively. Join them and enjoy a
          modern, engaging learning journey.
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
      sx={{ justifyContent:"center"}}
      >
        {userTestimonials.map((testimonial, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            sx={{ display: "flex" }}
          >
            <Card
              variant="outlined"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexGrow: 1,
                maxWidth: "360px",
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ color: "text.secondary" }}
                >
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.occupation}
                />
                {/* <img
                  src={logos[index]}
                  alt={`Logo ${index + 1}`}
                  style={logoStyle}
                /> */}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
