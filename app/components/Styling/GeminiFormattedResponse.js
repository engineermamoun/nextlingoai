// /app/components/Styling/GeminiFormattedResponse.js
"use client";

// -------------------------------
// Imports
// -------------------------------
import React from "react";
// React core library for building UI components

// -------------------------------
// GeminiFormattedResponse Component
// -------------------------------
// Purpose:
// - Render a text response with simple Markdown-like formatting
// - Converts special markers into HTML elements (bold, italic, lists)
// - Applies inline styles for better readability and RTL support
// Inputs:
// - response: string containing text with Markdown-like formatting
// Outputs:
// - Returns a styled <div> element rendering formatted HTML
// Side Effects:
// - Uses `dangerouslySetInnerHTML` to inject HTML; must sanitize input if content is untrusted
export default function GeminiFormattedResponse({ response }) {
  
  // -------------------------------
  // formatMarkdown Function
  // -------------------------------
  // Purpose:
  // - Transform simple Markdown-like syntax in the response text into HTML
  // - Handles bold, italic, bullet lists, numbered lists, and line breaks
  // Input:
  // - text: string to format
  // Output:
  // - Returns a string with HTML tags representing formatting
  // Side Effects:
  // - None (pure function)
  function formatMarkdown(text) {
    if (!text) return "";

    return (
      text
        // Convert **bold** syntax to <strong>
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        // Convert *italic* syntax to <em>
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        // Convert unordered list items starting with - or * to <li>
        .replace(/^\s*[-*]\s+(.*)$/gm, "<li>$1</li>")
        // Wrap consecutive <li> in <ul>
        .replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>")
        // Convert numbered list items (1. item) to <li>
        .replace(/^\s*\d+\.\s+(.*)$/gm, "<li>$1</li>")
        // Wrap consecutive numbered <li> in <ul>
        .replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>")
        // Replace double new lines with paragraph breaks
        .replace(/\n\s*\n/g, "<br><br>")
        // Replace single new lines with single <br>
        .replace(/\n/g, "<br>")
    );
  }

  // Format the input response using the Markdown-like parser
  const formattedHTML = formatMarkdown(response);

  // -------------------------------
  // Inline styles
  // -------------------------------
  // Purpose:
  // - Provide consistent visual styling for formatted text
  // - Ensure proper right-to-left layout, font, and spacing
  const styles = {
    container: {
      // direction: "rtl", // Right-to-left text
      textAlign: "left",
      fontFamily: '"Segoe UI", sans-serif',
      lineHeight: 1.8,
      fontSize: "16px",
      color: "#222",
      background: "#fafafa",
      borderRadius: "8px",
      padding: "10px",
      whiteSpace: "normal",
    },
    strong: {
      color: "#0056b3", // Blue for bold text
    },
    em: {
      color: "#555", // Dark gray for italic text
    },
    ul: {
      listStyleType: "disc",
      paddingRight: "8px",
      margin: "2px 0",
    },
    li: {
      marginBottom: "2px",
    },
  };

  // -------------------------------
  // Apply inline styles to HTML tags
  // -------------------------------
  // Purpose:
  // - Dynamically inject inline styles into the generated HTML tags
  // - Ensures consistent visual appearance without relying on external CSS
  const styledHTML = formattedHTML
    .replace(/<strong>/g, `<strong style="color:${styles.strong.color}">`)
    .replace(/<em>/g, `<em style="color:${styles.em.color}">`)
    .replace(
      /<ul>/g,
      `<ul style="list-style-type:${styles.ul.listStyleType};padding-right:${styles.ul.paddingRight};margin:${styles.ul.margin}">`
    )
    .replace(/<li>/g, `<li style="margin-bottom:${styles.li.marginBottom}">`);

  // -------------------------------
  // Render formatted content
  // -------------------------------
  // Purpose:
  // - Render the styled HTML inside a <div> container
  // - Use `dangerouslySetInnerHTML` to inject HTML markup
  // Notes:
  // - Ensure input is trusted or sanitized to avoid XSS vulnerabilities
  return (
    <div
      style={styles.container}
      dangerouslySetInnerHTML={{ __html: styledHTML }}
    />
  );
}
