"use client";

/**
 * External dependencies
 */
import * as React from "react"; // React library for building UI components and using hooks such as useMemo.
import PropTypes from "prop-types"; // Provides runtime type-checking for component props in development.

/**
 * Material UI (MUI) core imports for theming and styling.
 * - ThemeProvider: Supplies the theme to the component tree via React context.
 * - createTheme: Used to generate a theme object based on provided configuration.
 */
import { ThemeProvider, createTheme } from "@mui/material/styles";

/**
 * Theme customization modules.
 * These imports define overrides and extensions for specific MUI component categories.
 * Each file exports configuration objects for consistent UI theming.
 */
import { inputsCustomizations } from "./customizations/inputs"; // Custom styles and variants for form inputs.
import { dataDisplayCustomizations } from "./customizations/dataDisplay"; // Customizations for data display components (e.g., tables, lists).
import { feedbackCustomizations } from "./customizations/feedback"; // Configurations for feedback components (e.g., dialogs, alerts, snackbars).
import { navigationCustomizations } from "./customizations/navigation"; // Adjustments for navigation components (e.g., drawers, menus).
import { surfacesCustomizations } from "./customizations/surfaces"; // Surface elements such as cards, papers, and layout containers.

/**
 * Core theme primitives.
 * These files define the base styling system such as colors, typography, shadows, and shapes.
 * They serve as design tokens to maintain consistency throughout the application.
 */
import { colorSchemes, typography, shadows, shape } from "./themePrimitives";

/**
 * Emotion styling imports.
 * Emotion is used by MUI as a CSS-in-JS engine.
 * - CacheProvider: Allows custom control of Emotion's cache for style generation.
 * - createCache: Creates an isolated cache instance to prevent style conflicts.
 */
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

/**
 * AppTheme Component
 * -----------------------------------------------------------------------------
 * Purpose:
 * Provides a centralized theme and styling configuration for the entire application.
 * This component wraps the application with both Emotion’s CacheProvider and MUI’s ThemeProvider.
 *
 * Props:
 * - children (React.Node): Nested components that will receive the applied theme context.
 * - disableCustomTheme (boolean): If true, disables all custom theming and returns raw children.
 * - themeComponents (object): Optional set of custom MUI component overrides that can extend the base theme.
 *
 * Behavior:
 * - When `disableCustomTheme` is true, theming is skipped entirely.
 * - When false, a fully customized MUI theme is created and applied.
 */
function AppTheme(props) {
  const { children, disableCustomTheme, themeComponents } = props;

  /**
   * Memoized Theme Configuration
   * ---------------------------------------------------------------------------
   * Uses `React.useMemo` to ensure that the theme object is only recalculated
   * when `disableCustomTheme` or `themeComponents` change.
   *
   * - The theme includes CSS variables for color schemes, typography, shadows, and shape.
   * - Component-level overrides and extensions are merged from the imported customization modules.
   * - If `disableCustomTheme` is true, an empty object is returned to skip theming.
   */
  const theme = React.useMemo(() => {
    return disableCustomTheme
      ? {}
      : createTheme({
          cssVariables: {
            colorSchemeSelector: "data-mui-color-scheme", // HTML attribute to toggle color scheme (e.g., light/dark/system).
            cssVarPrefix: "template", // Prefix for CSS variables to prevent naming conflicts.
          },
          colorSchemes, // Base color definitions (light/dark modes and palettes).
          typography, // Global font family, sizes, and weight definitions.
          shadows, // Standardized shadow levels for UI elevation.
          shape, // Defines border radius and other shape-related tokens.
          components: {
            // Merge all component customizations into one theme object.
            ...inputsCustomizations,
            ...dataDisplayCustomizations,
            ...feedbackCustomizations,
            ...navigationCustomizations,
            ...surfacesCustomizations,
            ...themeComponents, // Allows external or user-defined component overrides.
          },
        });
  }, [disableCustomTheme, themeComponents]);

  /**
   * Emotion Cache Configuration
   * ---------------------------------------------------------------------------
   * Creates a dedicated Emotion cache instance to store generated CSS.
   * This ensures isolation and prevents clashes when multiple MUI themes
   * or styling engines coexist in the same application.
   *
   * The cache key (`'mui'`) is used as a namespace for MUI styles.
   */
  const cache = React.useMemo(() => createCache({ key: "mui" }), []);

  /**
   * Conditional Rendering
   * ---------------------------------------------------------------------------
   * If theming is disabled (`disableCustomTheme` = true),
   * return children directly without any wrapping providers.
   */
  if (disableCustomTheme) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  /**
   * Render Themed Application
   * ---------------------------------------------------------------------------
   * Wraps the app with:
   * 1. `CacheProvider` – Handles Emotion’s cache for scoped styles.
   * 2. `ThemeProvider` – Supplies the custom MUI theme to all child components.
   *
   * The `disableTransitionOnChange` prop prevents unwanted CSS transitions
   * when switching between color modes (e.g., light/dark).
   */
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme} disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

/**
 * Prop Type Validation
 * ---------------------------------------------------------------------------
 * Defines expected prop types for development and debugging purposes.
 * Helps ensure that the component receives valid inputs.
 */
AppTheme.propTypes = {
  children: PropTypes.node, // React nodes to be rendered inside the theme provider.
  disableCustomTheme: PropTypes.bool, // Flag to enable/disable theming.
  themeComponents: PropTypes.object, // Optional custom component overrides.
};

/**
 * Default Export
 * ---------------------------------------------------------------------------
 * Exports the AppTheme component as the default export for use throughout the app.
 */
export default AppTheme;
