"use client";
/**
 * This directive indicates that the component is a client-side component.
 * Required for components using React hooks (e.g., useState, useColorScheme) in Next.js App Router.
 */

import * as React from 'react'; 
// Imports the React library for building UI components and using hooks such as useState.

import DarkModeIcon from '@mui/icons-material/DarkModeRounded'; 
// Imports MUI icon representing dark mode (moon symbol).

import LightModeIcon from '@mui/icons-material/LightModeRounded'; 
// Imports MUI icon representing light mode (sun symbol).

import Box from '@mui/material/Box'; 
// MUI Box component used as a versatile layout and styling container.

import IconButton from '@mui/material/IconButton'; 
// MUI IconButton component for displaying clickable icons (used here to open the color mode menu).

import Menu from '@mui/material/Menu'; 
// MUI Menu component for displaying a dropdown list anchored to a specific element.

import MenuItem from '@mui/material/MenuItem'; 
// MUI MenuItem component representing an individual selectable option inside the dropdown menu.

import { useColorScheme } from '@mui/material/styles'; 
// MUI hook that provides the current color scheme mode (`light`, `dark`, or `system`) 
// and a function to dynamically change it across the application.

/**
 * Component: ColorModeIconDropdown
 * ---------------------------------------------------------
 * A dropdown menu triggered by an icon button that allows users to switch
 * between the system, light, or dark color modes. 
 *
 * The component dynamically reflects the active color mode and provides
 * an intuitive visual control for changing the application's theme.
 *
 * @param {object} props - Optional props passed down to the IconButton for customization.
 *
 * @returns {JSX.Element} 
 *          - Returns an icon button with a dropdown menu for color mode selection.
 *          - Returns a placeholder skeleton (Box) if mode is not yet available.
 */
export default function ColorModeIconDropdown(props) {
  /**
   * Destructure the values from MUI’s `useColorScheme` hook:
   * - mode: Current color mode (`light`, `dark`, or `system`).
   * - systemMode: Reflects the system's preferred mode (used when mode = 'system').
   * - setMode: Function to update the application's color mode globally.
   */
  const { mode, systemMode, setMode } = useColorScheme();

  /**
   * State variable: anchorEl
   * - Holds the DOM element that triggers the dropdown menu.
   * - Used by MUI's Menu component to determine its anchor position.
   */
  const [anchorEl, setAnchorEl] = React.useState(null);

  /**
   * Derived variable: open
   * - Boolean representing whether the dropdown menu is currently open.
   */
  const open = Boolean(anchorEl);

  /**
   * handleClick(event)
   * ---------------------------------------------
   * Opens the dropdown menu when the icon button is clicked.
   * 
   * @param {React.MouseEvent} event - The click event on the icon button.
   * @sideeffect Sets the anchorEl to the clicked button, allowing the menu to anchor correctly.
   */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * handleClose()
   * ---------------------------------------------
   * Closes the dropdown menu by resetting the anchor element.
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * handleMode(targetMode)
   * ---------------------------------------------
   * Returns a function that, when executed, switches the application’s color mode 
   * and closes the dropdown menu.
   *
   * @param {string} targetMode - The color mode to switch to ('light', 'dark', or 'system').
   * @returns {Function} - An event handler for the MenuItem's onClick event.
   *
   * @sideeffect Calls setMode() to update the global color mode and then closes the menu.
   */
  const handleMode = (targetMode) => () => {
    setMode(targetMode);
    handleClose();
  };

  /**
   * Conditional rendering:
   * If the `mode` value is undefined (e.g., during initialization),
   * render a placeholder Box to maintain UI consistency.
   */
  if (!mode) {
    return (
      <Box
        data-screenshot="toggle-mode" // Custom data attribute for visual testing tools or documentation screenshots.
        sx={(theme) => ({
          verticalAlign: 'bottom',
          display: 'inline-flex',
          width: '2.25rem',
          height: '2.25rem',
          borderRadius: (theme.vars || theme).shape.borderRadius,
          border: '1px solid',
          borderColor: (theme.vars || theme).palette.divider,
        })}
      />
    );
  }

  /**
   * Determine which mode should be displayed as active:
   * - If the user selected “system”, use the systemMode (light or dark) for icon representation.
   * - Otherwise, use the currently selected mode.
   */
  const resolvedMode = systemMode || mode;

  /**
   * Select the corresponding icon based on the resolved theme mode.
   */
  const icon = {
    light: <LightModeIcon />, // Displays sun icon for light mode.
    dark: <DarkModeIcon />,   // Displays moon icon for dark mode.
  }[resolvedMode];

  // ======================== RENDER SECTION ================================
  return (
    <React.Fragment>
      {/* Icon button that opens the color mode selection dropdown */}
      <IconButton
        data-screenshot="toggle-mode"
        onClick={handleClick} // Opens the menu when clicked
        disableRipple // Disables the ripple effect for a cleaner interaction
        size="small" // Reduces icon button size for compact UI
        aria-controls={open ? 'color-scheme-menu' : undefined} // Accessibility: links button to menu
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        {...props} // Allow external props customization
      >
        {icon} {/* Dynamically render sun or moon icon based on active theme */}
      </IconButton>

      {/* Dropdown menu listing theme mode options */}
      <Menu
        anchorEl={anchorEl} // Attach menu to the clicked button
        id="account-menu"
        open={open} // Controls whether the menu is visible
        onClose={handleClose} // Closes when clicking outside
        onClick={handleClose} // Closes when selecting a menu item
        slotProps={{
          paper: {
            variant: 'outlined',
            elevation: 0, // Removes shadow for a flat look
            sx: {
              my: '4px', // Slight vertical margin between button and menu
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }} // Defines where the menu grows from
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} // Defines where the menu attaches to
      >
        {/* Menu option for system mode */}
        <MenuItem selected={mode === 'system'} onClick={handleMode('system')}>
          System
        </MenuItem>

        {/* Menu option for light mode */}
        <MenuItem selected={mode === 'light'} onClick={handleMode('light')}>
          Light
        </MenuItem>

        {/* Menu option for dark mode */}
        <MenuItem selected={mode === 'dark'} onClick={handleMode('dark')}>
          Dark
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
