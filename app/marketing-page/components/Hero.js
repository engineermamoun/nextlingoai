"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import { AppContext } from "@/app/components/context/AppContext";

const StyledBox = styled("div")(({ theme }) => ({
  alignSelf: "center",
  width: "100%",
  height: 175,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: "6px solid",
  outlineColor: "hsla(220, 25%, 80%, 0.2)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
  // backgroundImage: `url(${
  //   process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
  // }/static/screenshots/material-ui/getting-started/templates/dashboard.jpg)`,
  backgroundImage: `url(/homedesktoplight.png)`,
  // backgroundSize: "cover",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",

  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(10),
    height: 570,
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
    // backgroundImage: `url(${
    //   process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
    // }/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg)`,
    backgroundImage: `url(/homedesktopdark.png)`,
    outlineColor: "hsla(220, 20%, 42%, 0.1)",
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

export default function Hero() {
  const { setShowlandingpage } = React.useContext(AppContext);
  return (
    <Box
      id="hero"
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
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              fontSize: "clamp(3rem, 10vw, 3.5rem)",
            }}
          >
            Learn&nbsp;
            <Box
              component="span"
              sx={{
                position: "relative",
                display: "inline-block",
                color: "#00d3ab", // text color
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  height: "4px", // underline thickness
                  width: "100%",
                  backgroundColor: "#cb6ce6", // underline color
                  transformOrigin: "left",
                  transform: "scaleX(0)",
                  animation: "underlinePulse 2s ease-in-out infinite",
                },
                "@keyframes underlinePulse": {
                  "0%": { transform: "scaleX(0)" },
                  "50%": { transform: "scaleX(1)" },
                  "100%": { transform: "scaleX(0)" },
                },
              }}
            >
              French
            </Box>{" "}
            &nbsp;with
            {/* Our&nbsp;latest&nbsp; */}
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: "inherit",
                color: "primary.main",
                ...theme.applyStyles("dark", {
                  color: "primary.light",
                }),
              })}
            >
              {/* products */}
              &nbsp;AI
            </Typography>
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              width: { sm: "100%", md: "80%" },
            }}
          >
            Through this application, you can learn the French language using
            artificial intelligence for each grammar rule in a fully interactive
            way. It corrects pronunciation, grammar, and everything you need to
            learn the language effectively and enjoyably.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%", sm: "350px" } }}
          >
            {/* <InputLabel htmlFor="email-hero">Email</InputLabel> */}
            {/* <Input
              id="email-hero"
              // hiddenLabel
              size="small"
              variant="outlined"
              label="outlined"
              placeholder="Your email address"
              fullWidth
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter your email address',
              }}
            /> */}

            <Button
              variant="contained"
              color="primary"
              size="small"
              fullWidth
              sx={{ minWidth: "fit-content" }}
              onClick={() => setShowlandingpage(false)}
            >
              Start Now
            </Button>
          </Stack>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            By clicking the &quot;Start Now&quot; button, you agree to&nbsp;
            <Link href="#" color="primary">
              the Terms and Conditions of Use
            </Link>
            .
          </Typography>
        </Stack>
        <StyledBox id="image" />
      </Container>
    </Box>
  );
}
