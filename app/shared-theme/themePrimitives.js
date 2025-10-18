"use client";

/**
 * --------------------------------------------
 * THEME CONFIGURATION FILE
 * --------------------------------------------
 * This file defines the design system tokens used
 * across the application, including color palettes,
 * typography, shape, and shadows.
 *
 * It provides utility functions to dynamically generate
 * Material UI theme configurations for both light and dark modes.
 * --------------------------------------------
 */

import { createTheme, alpha } from "@mui/material/styles"; 
// `createTheme` - used to generate a base MUI theme instance for consistency in typography and sizing.
// `alpha` - utility function from MUI to adjust color transparency (opacity levels).

// Create a base default theme instance to access standard Material UI values
const defaultTheme = createTheme();

// Clone the default MUI shadow array to allow customization of individual shadow levels.
const customShadows = [...defaultTheme.shadows];

/**
 * COLOR SYSTEM DEFINITIONS
 * --------------------------------------------
 * Each color object defines a complete range (50–900)
 * representing different tints and shades of that hue.
 * These are used for consistent color usage throughout
 * the application's light and dark themes.
 */

// Brand (Primary) Blue Shades
export const brand = {
  50: "hsl(210, 100%, 95%)",
  100: "hsl(210, 100%, 92%)",
  200: "hsl(210, 100%, 80%)",
  300: "hsl(210, 100%, 65%)",
  400: "hsl(210, 98%, 48%)",
  500: "hsl(210, 98%, 42%)",
  600: "hsl(210, 98%, 55%)",
  700: "hsl(210, 100%, 35%)",
  800: "hsl(210, 100%, 16%)",
  900: "hsl(210, 100%, 21%)",
};

// Neutral Gray Shades
export const gray = {
  50: "hsl(220, 35%, 97%)",
  100: "hsl(220, 30%, 94%)",
  200: "hsl(220, 20%, 88%)",
  300: "hsl(220, 20%, 80%)",
  400: "hsl(220, 20%, 65%)",
  500: "hsl(220, 20%, 42%)",
  600: "hsl(220, 20%, 35%)",
  700: "hsl(220, 20%, 25%)",
  800: "hsl(220, 30%, 6%)",
  900: "hsl(220, 35%, 3%)",
};

// Success (Green) Palette
export const green = {
  50: "hsl(120, 80%, 98%)",
  100: "hsl(120, 75%, 94%)",
  200: "hsl(120, 75%, 87%)",
  300: "hsl(120, 61%, 77%)",
  400: "hsl(120, 44%, 53%)",
  500: "hsl(120, 59%, 30%)",
  600: "hsl(120, 70%, 25%)",
  700: "hsl(120, 75%, 16%)",
  800: "hsl(120, 84%, 10%)",
  900: "hsl(120, 87%, 6%)",
};

// Warning (Orange) Palette
export const orange = {
  50: "hsl(45, 100%, 97%)",
  100: "hsl(45, 92%, 90%)",
  200: "hsl(45, 94%, 80%)",
  300: "hsl(45, 90%, 65%)",
  400: "hsl(45, 90%, 40%)",
  500: "hsl(45, 90%, 35%)",
  600: "hsl(45, 91%, 25%)",
  700: "hsl(45, 94%, 20%)",
  800: "hsl(45, 95%, 16%)",
  900: "hsl(45, 93%, 12%)",
};

// Error (Red) Palette
export const red = {
  50: "hsl(0, 100%, 97%)",
  100: "hsl(0, 92%, 90%)",
  200: "hsl(0, 94%, 80%)",
  300: "hsl(0, 90%, 65%)",
  400: "hsl(0, 90%, 40%)",
  500: "hsl(0, 90%, 30%)",
  600: "hsl(0, 91%, 25%)",
  700: "hsl(0, 94%, 18%)",
  800: "hsl(0, 95%, 12%)",
  900: "hsl(0, 93%, 6%)",
};

/**
 * getDesignTokens(mode)
 * --------------------------------------------
 * Dynamically generates the Material UI design tokens
 * (palette, typography, shadows, etc.) based on the theme mode.
 *
 * @param {string} mode - Either "light" or "dark".
 * @returns {object} MUI theme configuration object.
 *
 * This allows the application to adapt its appearance
 * depending on the active theme mode (light/dark).
 */
export const getDesignTokens = (mode) => {
  // Adjust custom shadow intensity based on the selected mode
  customShadows[1] =
    mode === "dark"
      ? "hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px"
      : "hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px";

  return {
    /**
     * PALETTE CONFIGURATION
     * Defines all primary, secondary, and auxiliary colors,
     * as well as typography and background colors for each mode.
     */
    palette: {
      mode,
      primary: {
        light: brand[200],
        main: brand[400],
        dark: brand[700],
        contrastText: brand[50],
        ...(mode === "dark" && {
          contrastText: brand[50],
          light: brand[300],
          main: brand[400],
          dark: brand[700],
        }),
      },
      info: {
        light: brand[100],
        main: brand[300],
        dark: brand[600],
        contrastText: gray[50],
        ...(mode === "dark" && {
          contrastText: brand[300],
          light: brand[500],
          main: brand[700],
          dark: brand[900],
        }),
      },
      warning: {
        light: orange[300],
        main: orange[400],
        dark: orange[800],
        ...(mode === "dark" && {
          light: orange[400],
          main: orange[500],
          dark: orange[700],
        }),
      },
      error: {
        light: red[300],
        main: red[400],
        dark: red[800],
        ...(mode === "dark" && {
          light: red[400],
          main: red[500],
          dark: red[700],
        }),
      },
      success: {
        light: green[300],
        main: green[400],
        dark: green[800],
        ...(mode === "dark" && {
          light: green[400],
          main: green[500],
          dark: green[700],
        }),
      },
      grey: { ...gray },
      divider: mode === "dark" ? alpha(gray[700], 0.6) : alpha(gray[300], 0.4),
      background: {
        default: "hsl(0, 0%, 99%)",
        paper: "hsl(220, 35%, 97%)",
        ...(mode === "dark" && {
          default: gray[900],
          paper: "hsl(220, 30%, 7%)",
        }),
      },
      text: {
        primary: gray[800],
        secondary: gray[600],
        warning: orange[400],
        ...(mode === "dark" && {
          primary: "hsl(0, 0%, 100%)",
          secondary: gray[400],
        }),
      },
      action: {
        hover: alpha(gray[200], 0.2),
        selected: `${alpha(gray[200], 0.3)}`,
        ...(mode === "dark" && {
          hover: alpha(gray[600], 0.2),
          selected: alpha(gray[600], 0.3),
        }),
      },
    },

    /**
     * TYPOGRAPHY
     * Establishes font families, weights, and responsive scaling.
     */
    typography: {
      fontFamily: "Inter, sans-serif",
      h1: {
        fontSize: defaultTheme.typography.pxToRem(48),
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: -0.5,
      },
      h2: {
        fontSize: defaultTheme.typography.pxToRem(36),
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h3: {
        fontSize: defaultTheme.typography.pxToRem(30),
        lineHeight: 1.2,
      },
      h4: {
        fontSize: defaultTheme.typography.pxToRem(24),
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h5: {
        fontSize: defaultTheme.typography.pxToRem(20),
        fontWeight: 600,
      },
      h6: {
        fontSize: defaultTheme.typography.pxToRem(18),
        fontWeight: 600,
      },
      subtitle1: { fontSize: defaultTheme.typography.pxToRem(18) },
      subtitle2: { fontSize: defaultTheme.typography.pxToRem(14), fontWeight: 500 },
      body1: { fontSize: defaultTheme.typography.pxToRem(14) },
      body2: { fontSize: defaultTheme.typography.pxToRem(14), fontWeight: 400 },
      caption: { fontSize: defaultTheme.typography.pxToRem(12), fontWeight: 400 },
    },

    /**
     * SHAPE
     * Defines the default radius used across UI elements (buttons, cards, etc.).
     */
    shape: { borderRadius: 8 },

    /**
     * SHADOWS
     * Applies customized shadow levels for a consistent depth effect.
     */
    shadows: customShadows,
  };
};

/**
 * COLOR SCHEMES
 * --------------------------------------------
 * Predefined static color schemes for light and dark modes.
 * These are used in alternative scenarios where a direct theme function
 * is not required (e.g., for CSS variables or inline styles).
 */
export const colorSchemes = {
  light: {
    palette: {
      primary: { light: brand[200], main: brand[400], dark: brand[700], contrastText: brand[50] },
      info: { light: brand[100], main: brand[300], dark: brand[600], contrastText: gray[50] },
      warning: { light: orange[300], main: orange[400], dark: orange[800] },
      error: { light: red[300], main: red[400], dark: red[800] },
      success: { light: green[300], main: green[400], dark: green[800] },
      grey: { ...gray },
      divider: alpha(gray[300], 0.4),
      background: { default: "hsl(0, 0%, 99%)", paper: "hsl(220, 35%, 97%)" },
      text: { primary: gray[800], secondary: gray[600], warning: orange[400] },
      action: { hover: alpha(gray[200], 0.2), selected: `${alpha(gray[200], 0.3)}` },
      baseShadow:
        "hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px",
    },
  },
  dark: {
    palette: {
      primary: { contrastText: brand[50], light: brand[300], main: brand[400], dark: brand[700] },
      info: { contrastText: brand[300], light: brand[500], main: brand[700], dark: brand[900] },
      warning: { light: orange[400], main: orange[500], dark: orange[700] },
      error: { light: red[400], main: red[500], dark: red[700] },
      success: { light: green[400], main: green[500], dark: green[700] },
      grey: { ...gray },
      divider: alpha(gray[700], 0.6),
      background: { default: gray[900], paper: "hsl(220, 30%, 7%)" },
      text: { primary: "hsl(0, 0%, 100%)", secondary: gray[400] },
      action: { hover: alpha(gray[600], 0.2), selected: alpha(gray[600], 0.3) },
      baseShadow:
        "hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px",
    },
  },
};

/**
 * TYPOGRAPHY SYSTEM
 * --------------------------------------------
 * Defines consistent font sizing and weight hierarchy
 * for headers, subtitles, and body text across all themes.
 */
export const typography = {
  fontFamily: "Inter, sans-serif",
  h1: { fontSize: defaultTheme.typography.pxToRem(48), fontWeight: 600, lineHeight: 1.2, letterSpacing: -0.5 },
  h2: { fontSize: defaultTheme.typography.pxToRem(36), fontWeight: 600, lineHeight: 1.2 },
  h3: { fontSize: defaultTheme.typography.pxToRem(30), lineHeight: 1.2 },
  h4: { fontSize: defaultTheme.typography.pxToRem(24), fontWeight: 600, lineHeight: 1.5 },
  h5: { fontSize: defaultTheme.typography.pxToRem(20), fontWeight: 600 },
  h6: { fontSize: defaultTheme.typography.pxToRem(18), fontWeight: 600 },
  subtitle1: { fontSize: defaultTheme.typography.pxToRem(18) },
  subtitle2: { fontSize: defaultTheme.typography.pxToRem(14), fontWeight: 500 },
  body1: { fontSize: defaultTheme.typography.pxToRem(14) },
  body2: { fontSize: defaultTheme.typography.pxToRem(14), fontWeight: 400 },
  caption: { fontSize: defaultTheme.typography.pxToRem(12), fontWeight: 400 },
};

/**
 * SHAPE
 * --------------------------------------------
 * Centralized shape configuration for UI elements
 * to maintain visual consistency across components.
 */
export const shape = { borderRadius: 8 };

/**
 * SHADOWS
 * --------------------------------------------
 * Defines default shadow structure, preserving MUI defaults
 * while customizing the first shadow slot with a CSS variable
 * to match the baseShadow defined in the theme.
 */
const defaultShadows = [
  "none",
  "var(--template-palette-baseShadow)",
  ...defaultTheme.shadows.slice(2),
];

export const shadows = defaultShadows;
