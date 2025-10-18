"use client";

/**
 * =============================================
 * Navigation Component Customizations (MUI)
 * =============================================
 * This module defines theme-level style overrides and default props
 * for Material UI navigation and layout components such as:
 *  - Menu, MenuItem, Select, Tabs, Links, Drawer, Pagination, etc.
 *
 * These customizations ensure visual consistency across the app,
 * adapting styles for both light and dark modes using `theme.applyStyles()`.
 *
 * Each component section below defines:
 *  - Default behavior and props (where applicable)
 *  - Style overrides applied to different interaction states
 *  - Visual adaptations for dark mode
 *
 * The configuration object is later merged into the MUI theme
 * under the `components` key.
 */

import * as React from "react"; // Core React library for JSX rendering and component creation
import { alpha } from "@mui/material/styles"; // Utility function to apply transparency to a color

// Importing internal constants from MUI used to reference component class names
import { buttonBaseClasses } from "@mui/material/ButtonBase";
import { dividerClasses } from "@mui/material/Divider";
import { menuItemClasses } from "@mui/material/MenuItem";
import { selectClasses } from "@mui/material/Select";
import { tabClasses } from "@mui/material/Tab";

// Icon displayed in Select components to indicate dropdown functionality
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";

// Custom color palettes used for theme consistency across the UI
import { gray, brand } from "../themePrimitives";

/* eslint-disable import/prefer-default-export */
/**
 * The `navigationCustomizations` object contains theme-level style overrides
 * for navigation-related MUI components.
 */
export const navigationCustomizations = {
  /**
   * -----------------------------------------
   * MuiMenuItem — Menu item styles
   * -----------------------------------------
   * Customizes how each menu item behaves visually,
   * including hover, focus, and selection states.
   */
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: (theme.vars || theme).shape.borderRadius, // Matches global rounded corner design
        padding: "6px 8px", // Compact menu item spacing
        [`&.${menuItemClasses.focusVisible}`]: {
          backgroundColor: "transparent", // Avoid default highlight color when focused
        },
        [`&.${menuItemClasses.selected}`]: {
          // Light selection state
          [`&.${menuItemClasses.focusVisible}`]: {
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
          },
        },
      }),
    },
  },

  /**
   * -----------------------------------------
   * MuiMenu — Menu container and paper styles
   * -----------------------------------------
   * Defines how dropdown menus appear and behave,
   * including elevation, shadows, and dark mode adjustments.
   */
  MuiMenu: {
    styleOverrides: {
      list: {
        gap: "0px",
        [`&.${dividerClasses.root}`]: {
          margin: "0 -8px", // Adjusts divider spacing inside menus
        },
      },
      paper: ({ theme }) => ({
        marginTop: "4px",
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        backgroundImage: "none",
        background: "hsl(0, 0%, 100%)", // Solid background for better contrast
        boxShadow:
          "hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px",
        // Apply selected item background transparency
        [`& .${buttonBaseClasses.root}`]: {
          "&.Mui-selected": {
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
          },
        },
        // Dark mode variant for menu surfaces
        ...theme.applyStyles("dark", {
          background: gray[900],
          boxShadow:
            "hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px",
        }),
      }),
    },
  },

  /**
   * -----------------------------------------
   * MuiSelect — Dropdown select component
   * -----------------------------------------
   * Defines the icon, borders, and interactive
   * feedback for light/dark mode consistency.
   */
  MuiSelect: {
    defaultProps: {
      /**
       * Custom icon displayed in the dropdown.
       * Using a forwardRef ensures proper ref forwarding in MUI.
       */
      IconComponent: React.forwardRef(function IconComponent(props, ref) {
        return <UnfoldMoreRoundedIcon fontSize="small" {...props} ref={ref} />;
      }),
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: "1px solid",
        borderColor: gray[200],
        backgroundColor: (theme.vars || theme).palette.background.paper,
        boxShadow:
          "inset 0 1px 0 1px hsla(220, 0%, 100%, 0.6), inset 0 -1px 0 1px hsla(220, 35%, 90%, 0.5)",
        "&:hover": {
          borderColor: gray[300],
          backgroundColor: (theme.vars || theme).palette.background.paper,
          boxShadow: "none",
        },
        [`&.${selectClasses.focused}`]: {
          outlineOffset: 0,
          borderColor: gray[400],
        },
        "&:before, &:after": { display: "none" }, // Remove MUI default underline styles
        // Dark mode adjustments
        ...theme.applyStyles("dark", {
          borderColor: gray[700],
          backgroundColor: (theme.vars || theme).palette.background.paper,
          boxShadow: `inset 0 1px 0 1px ${alpha(
            gray[700],
            0.15
          )}, inset 0 -1px 0 1px hsla(220, 0%, 0%, 0.7)`,
          "&:hover": {
            borderColor: alpha(gray[700], 0.7),
            backgroundColor: (theme.vars || theme).palette.background.paper,
          },
          [`&.${selectClasses.focused}`]: {
            borderColor: gray[900],
          },
        }),
      }),

      // Styles applied to the inner select text area
      select: ({ theme }) => ({
        display: "flex",
        alignItems: "center",
        ...theme.applyStyles("dark", {
          "&:focus-visible": {
            backgroundColor: gray[900], // Subtle focus highlight for accessibility
          },
        }),
      }),
    },
  },

  /**
   * -----------------------------------------
   * MuiLink — Text link styling
   * -----------------------------------------
   * Adds a custom underline animation and focus outline for accessibility.
   */
  MuiLink: {
    defaultProps: { underline: "none" },
    styleOverrides: {
      root: ({ theme }) => ({
        color: (theme.vars || theme).palette.text.primary,
        fontWeight: 500,
        position: "relative",
        textDecoration: "none",
        width: "fit-content",
        // Animated underline effect
        "&::before": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "1px",
          bottom: 0,
          left: 0,
          backgroundColor: (theme.vars || theme).palette.text.secondary,
          opacity: 0.3,
          transition: "width 0.3s ease, opacity 0.3s ease",
        },
        "&:hover::before": { width: 0 },
        "&:focus-visible": {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: "4px",
          borderRadius: "2px",
        },
      }),
    },
  },

  /**
   * -----------------------------------------
   * MuiDrawer — Sidebar container styles
   * -----------------------------------------
   * Matches the application's background for consistency.
   */
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundColor: (theme.vars || theme).palette.background.default,
      }),
    },
  },

  /**
   * -----------------------------------------
   * MuiPaginationItem — Pagination button styles
   * -----------------------------------------
   * Improves color contrast for selected page buttons.
   */
  MuiPaginationItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&.Mui-selected": {
          color: "white",
          backgroundColor: (theme.vars || theme).palette.grey[900],
        },
        ...theme.applyStyles("dark", {
          "&.Mui-selected": {
            color: "black",
            backgroundColor: (theme.vars || theme).palette.grey[50],
          },
        }),
      }),
    },
  },

  /**
   * -----------------------------------------
   * MuiTabs — Tab container customization
   * -----------------------------------------
   * Reduces default height and modifies the active indicator color.
   */
  MuiTabs: {
    styleOverrides: {
      root: { minHeight: "fit-content" },
      indicator: ({ theme }) => ({
        backgroundColor: (theme.vars || theme).palette.grey[800],
        ...theme.applyStyles("dark", {
          backgroundColor: (theme.vars || theme).palette.grey[200],
        }),
      }),
    },
  },

  /**
   * -----------------------------------------
   * MuiTab — Individual tab button styles
   * -----------------------------------------
   * Defines padding, hover, and selected states.
   */
  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: "6px 8px",
        marginBottom: "8px",
        textTransform: "none",
        minWidth: "fit-content",
        minHeight: "fit-content",
        color: (theme.vars || theme).palette.text.secondary,
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: "1px solid",
        borderColor: "transparent",
        ":hover": {
          color: (theme.vars || theme).palette.text.primary,
          backgroundColor: gray[100],
          borderColor: gray[200],
        },
        [`&.${tabClasses.selected}`]: { color: gray[900] },
        ...theme.applyStyles("dark", {
          ":hover": {
            color: (theme.vars || theme).palette.text.primary,
            backgroundColor: gray[800],
            borderColor: gray[700],
          },
          [`&.${tabClasses.selected}`]: { color: "#fff" },
        }),
      }),
    },
  },

  /**
   * -----------------------------------------
   * MuiStepConnector — Stepper line styling
   * -----------------------------------------
   * Defines consistent appearance between stepper icons.
   */
  MuiStepConnector: {
    styleOverrides: {
      line: ({ theme }) => ({
        borderTop: "1px solid",
        borderColor: (theme.vars || theme).palette.divider,
        flex: 1,
        borderRadius: "99px",
      }),
    },
  },

  /**
   * -----------------------------------------
   * MuiStepIcon — Stepper icon style overrides
   * -----------------------------------------
   * Adjusts size, color, and border of the circular step icons.
   */
  MuiStepIcon: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: "transparent",
        border: `1px solid ${gray[400]}`,
        width: 12,
        height: 12,
        borderRadius: "50%",
        "& text": { display: "none" }, // Hide step number
        "&.Mui-active": {
          border: "none",
          color: (theme.vars || theme).palette.primary.main,
        },
        "&.Mui-completed": {
          border: "none",
          color: (theme.vars || theme).palette.success.main,
        },
        ...theme.applyStyles("dark", {
          border: `1px solid ${gray[700]}`,
          "&.Mui-active": {
            color: (theme.vars || theme).palette.primary.light,
          },
          "&.Mui-completed": {
            color: (theme.vars || theme).palette.success.light,
          },
        }),
        variants: [
          {
            props: { completed: true },
            style: { width: 12, height: 12 },
          },
        ],
      }),
    },
  },

  /**
   * -----------------------------------------
   * MuiStepLabel — Step label customization
   * -----------------------------------------
   * Dims completed step labels for subtle visual hierarchy.
   */
  MuiStepLabel: {
    styleOverrides: {
      label: ({ theme }) => ({
        "&.Mui-completed": {
          opacity: 0.6,
          ...theme.applyStyles("dark", { opacity: 0.5 }),
        },
      }),
    },
  },
};
