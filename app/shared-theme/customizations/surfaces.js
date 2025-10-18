"use client";

/**
 * Imports
 * -----------------------------------------------------------------------------
 */
import { alpha } from '@mui/material/styles'; 
// `alpha` is a MUI utility function that applies transparency to colors.
// It is used to create RGBA color variants (useful for dark mode overlays or subtle backgrounds).

import { gray } from '../themePrimitives';
// Imports a predefined set of gray shades (likely custom design tokens) 
// used for consistent neutral tones throughout the UI.

/* eslint-disable import/prefer-default-export */
// Disables the ESLint rule requiring default exports. 
// This allows exporting only a named constant (`surfacesCustomizations`)
// which is then merged into the global theme configuration elsewhere.

/**
 * surfacesCustomizations
 * -----------------------------------------------------------------------------
 * This object defines style customizations for Material UI "surface" components,
 * such as cards, accordions, and papers.
 *
 * Purpose:
 * - To ensure consistent styling for all surface-based elements (containers, cards, papers)
 * - To unify borders, padding, colors, and hover behaviors across the light/dark modes.
 *
 * Each key in this object corresponds to a specific MUI component (e.g., `MuiCard`, `MuiAccordion`)
 * and contains both `defaultProps` and `styleOverrides` to modify component appearance.
 */
export const surfacesCustomizations = {
  /**
   * MuiAccordion
   * ---------------------------------------------------------------------------
   * Customizes the Accordion component to match the design system’s visual style.
   * - Removes elevation and gutters for a flat, clean surface.
   * - Applies consistent borders and rounded corners.
   * - Adjusts layout to ensure visually seamless stacking between multiple accordions.
   */
  MuiAccordion: {
    defaultProps: {
      elevation: 0, // Removes default shadow (flat design).
      disableGutters: true, // Removes internal horizontal padding.
    },
    styleOverrides: {
      root: ({ theme }) => ({
        padding: 4, // Minimal padding around the accordion.
        overflow: 'clip', // Ensures content doesn't spill out (especially with rounded corners).
        backgroundColor: (theme.vars || theme).palette.background.default, // Matches the global background color.
        border: '1px solid',
        borderColor: (theme.vars || theme).palette.divider, // Uses theme divider color for subtle separation.
        ':before': {
          backgroundColor: 'transparent', // Removes the default AccordionSummary line.
        },
        '&:not(:last-of-type)': {
          borderBottom: 'none', // Avoids double borders when multiple accordions are stacked.
        },
        '&:first-of-type': {
          // Applies rounded corners only to the top accordion in a stack.
          borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
          borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
        },
        '&:last-of-type': {
          // Applies rounded corners only to the bottom accordion in a stack.
          borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
          borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
        },
      }),
    },
  },

  /**
   * MuiAccordionSummary
   * ---------------------------------------------------------------------------
   * Customizes the Accordion summary header (the clickable portion).
   * - Defines hover/focus background behavior.
   * - Adjusts border radius and color to align with design tokens.
   */
  MuiAccordionSummary: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: 'none', // Removes default border to achieve a clean header.
        borderRadius: 8, // Rounded corners for modern UI feel.
        '&:hover': { backgroundColor: gray[50] }, // Light hover effect in light mode.
        '&:focus-visible': { backgroundColor: 'transparent' }, // Avoid focus background artifacts.
        ...theme.applyStyles('dark', {
          '&:hover': { backgroundColor: gray[800] }, // Dark mode hover variant using custom gray tone.
        }),
      }),
    },
  },

  /**
   * MuiAccordionDetails
   * ---------------------------------------------------------------------------
   * Customizes the content section inside an accordion.
   * - Adjusts bottom margin and border styling for spacing consistency.
   */
  MuiAccordionDetails: {
    styleOverrides: {
      root: {
        mb: 20, // Adds spacing between multiple accordions or following content.
        border: 'none', // Keeps visual simplicity.
      },
    },
  },

  /**
   * MuiPaper
   * ---------------------------------------------------------------------------
   * Base surface for most MUI components.
   * - Removes default elevation globally for a flatter visual hierarchy.
   */
  MuiPaper: {
    defaultProps: {
      elevation: 0, // Eliminates default Paper shadows globally.
    },
  },

  /**
   * MuiCard
   * ---------------------------------------------------------------------------
   * Customizes the Card component, which serves as a core surface for content display.
   * - Unifies background colors, padding, and border styling.
   * - Supports both light and dark themes via `theme.applyStyles()`.
   * - Includes an "outlined" variant for alternate card appearances.
   */
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => {
        return {
          padding: 16, // Standardized inner spacing.
          gap: 16, // Consistent spacing between internal child elements.
          transition: 'all 100ms ease', // Smooth transitions for hover/focus effects.
          backgroundColor: gray[50], // Default light surface background.
          borderRadius: (theme.vars || theme).shape.borderRadius, // Rounded card edges per theme.
          border: `1px solid ${(theme.vars || theme).palette.divider}`, // Subtle card border using divider color.
          boxShadow: 'none', // Removes default shadow for minimal design.

          // Dark mode variant: replaces background with a darker neutral tone.
          ...theme.applyStyles('dark', {
            backgroundColor: gray[800],
          }),

          /**
           * Variants array (custom MUI extension pattern):
           * Defines specific styles for component variants.
           * Here, the "outlined" variant receives unique border and background behavior.
           */
          variants: [
            {
              props: { variant: 'outlined' },
              style: {
                border: `1px solid ${(theme.vars || theme).palette.divider}`,
                boxShadow: 'none', // Outlined cards avoid drop shadows.
                background: 'hsl(0, 0%, 100%)', // Pure white background for contrast.
                ...theme.applyStyles('dark', {
                  background: alpha(gray[900], 0.4), // Semi-transparent background for dark mode contrast.
                }),
              },
            },
          ],
        };
      },
    },
  },

  /**
   * MuiCardContent
   * ---------------------------------------------------------------------------
   * Refines card content padding to eliminate unnecessary spacing.
   * Ensures tight layout control when combining with headers or actions.
   */
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: 0, // Removes default inner padding.
        '&:last-child': { paddingBottom: 0 }, // Prevents bottom padding duplication.
      },
    },
  },

  /**
   * MuiCardHeader
   * ---------------------------------------------------------------------------
   * Removes extra spacing from card headers for better alignment
   * with other components and custom layouts.
   */
  MuiCardHeader: {
    styleOverrides: {
      root: {
        padding: 0, // Uniform edge alignment.
      },
    },
  },

  /**
   * MuiCardActions
   * ---------------------------------------------------------------------------
   * Ensures card action sections (buttons, links) align visually
   * with card content and maintain minimal spacing.
   */
  MuiCardActions: {
    styleOverrides: {
      root: {
        padding: 0, // Removes default padding for seamless layout integration.
      },
    },
  },
};
