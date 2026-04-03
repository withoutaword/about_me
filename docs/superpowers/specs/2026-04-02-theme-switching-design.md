# Theme Switching Design Spec

**Date:** 2026-04-02  
**Status:** Approved

## Overview
Add a theme switcher to the portfolio that allows cycling between the default dark theme and a new Cyber theme with cyan/neon accents.

## UI/UX Specification

### Theme Definitions

**Default Theme (current):**
- Background: `#111111` (dark)
- Background Secondary: `#1e1e1e` (darkGray)
- Primary: `#0070f3` (blue)
- Text: white/gray-400

**Cyber Theme (new):**
- Background: `#0a0a0f` (darker black)
- Background Secondary: `#0f0f1a` (dark cyan-tinted)
- Primary: `#00ffff` (cyan)
- Secondary: `#00ff00` (neon green)
- Text: white/gray-300

### Layout Structure
- Theme switcher in Footer component
- Cycle button at bottom of page
- Button shows current theme indicator

### Visual Design

**Theme Switcher Button:**
- Position: Bottom-right of Footer
- Style: Small pill-shaped button
- Shows: Current theme name + icon
- Hover: Subtle glow effect in theme color

**Theme Transition:**
- Smooth CSS transition (0.3s) on color changes
- Instant toggle, no page reload

### Components

**ThemeContext:**
- React Context for theme state
- Provides: `theme`, `cycleTheme`
- Persists to localStorage

**ThemeSwitcher:**
- Cycle button component
- Displays current theme
- Triggers theme change on click

**CSS Variables:**
- `data-theme="default"` or `data-theme="cyber"` on body
- All theme colors via CSS variables

## Functionality Specification

### Core Features
1. Cycle between default and cyber themes
2. Persist theme choice in localStorage
3. Apply theme via CSS variables on body
4. Smooth transitions between themes

### Data Flow
```
User clicks cycle button
  → cycleTheme() called
  → theme state updates
  → body data-theme attribute updates
  → CSS variables change
  → All themed components update
  → localStorage updated
```

### State Management
- React Context for global theme state
- localStorage for persistence
- Default to 'default' theme on first visit

## Acceptance Criteria
1. Theme switcher appears in Footer
2. Clicking cycles: default → cyber → default
3. Theme persists across page refreshes
4. All themed elements update correctly (primary colors, backgrounds)
5. Smooth transitions between themes
6. No flash of wrong theme on page load
7. Works on all pages (Home, Career, Projects, etc.)
