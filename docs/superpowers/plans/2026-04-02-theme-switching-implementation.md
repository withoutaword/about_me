# Theme Switching Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add theme switching capability to cycle between default dark theme and Cyber theme with cyan/neon accents.

**Architecture:** React Context for theme state, CSS variables for theming, theme switcher component in Footer. Uses localStorage for persistence.

**Tech Stack:** React 19, Tailwind CSS, CSS Variables, localStorage

---

## File Structure

- Create: `src/context/ThemeContext.jsx` - Theme state management
- Create: `src/components/ThemeSwitcher.jsx` - Cycle button component
- Modify: `src/index.css` - Add CSS variables for both themes
- Modify: `src/main.jsx` - Wrap app in ThemeProvider
- Modify: `src/components/Footer.jsx` - Add ThemeSwitcher
- Modify: `src/components/Navbar.jsx` - Use theme-aware colors

---

### Task 1: Create ThemeContext

**Files:**
- Create: `src/context/ThemeContext.jsx`

- [ ] **Step 1: Write the ThemeContext**

```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'default';
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const cycleTheme = () => {
    setTheme(prev => prev === 'default' ? 'cyber' : 'default');
  };

  return (
    <ThemeContext.Provider value={{ theme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

- [ ] **Step 2: Verify file created**

Run: `ls -la src/context/ThemeContext.jsx`
Expected: File exists

- [ ] **Step 3: Commit**

```bash
git add src/context/ThemeContext.jsx
git commit -m "feat: add ThemeContext for theme state management"
```

---

### Task 2: Update CSS with Theme Variables

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Update CSS variables**

Replace the current `:root` section with:

```css
:root {
  /* Default Theme */
  --bg-color: #111111;
  --bg-secondary: #1e1e1e;
  --primary-color: #0070f3;
  --secondary-color: #f0f0f0;
  --text-color: #ffffff;
  --text-muted: #9ca3af;
}

[data-theme="cyber"] {
  --bg-color: #0a0a0f;
  --bg-secondary: #0f0f1a;
  --primary-color: #00ffff;
  --secondary-color: #00ff00;
  --text-color: #ffffff;
  --text-muted: #9ca3af;
}
```

- [ ] **Step 2: Update body to use CSS variables**

Replace body styles with:

```css
body {
  font-family: 'Inter', system-ui, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  overflow-x: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

- [ ] **Step 3: Verify CSS is valid**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/index.css
git commit -m "feat: add CSS variables for default and cyber themes"
```

---

### Task 3: Create ThemeSwitcher Component

**Files:**
- Create: `src/components/ThemeSwitcher.jsx`

- [ ] **Step 1: Write the ThemeSwitcher**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, cycleTheme } = useTheme();

  const themeInfo = {
    default: { name: 'Default', icon: '🌙' },
    cyber: { name: 'Cyber', icon: '⚡' }
  };

  const current = themeInfo[theme];

  return (
    <motion.button
      onClick={cycleTheme}
      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        color: 'var(--primary-color)',
        border: '1px solid var(--primary-color)',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <span>{current.icon}</span>
      <span>{current.name}</span>
    </motion.button>
  );
};

export default ThemeSwitcher;
```

- [ ] **Step 2: Verify file created**

Run: `ls -la src/components/ThemeSwitcher.jsx`
Expected: File exists

- [ ] **Step 3: Commit**

```bash
git add src/components/ThemeSwitcher.jsx
git commit -m "feat: add ThemeSwitcher component"
```

---

### Task 4: Wrap App in ThemeProvider

**Files:**
- Modify: `src/main.jsx`

- [ ] **Step 1: Update main.jsx**

Change from:
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

To:
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/main.jsx
git commit -m "feat: wrap app in ThemeProvider"
```

---

### Task 5: Add ThemeSwitcher to Footer

**Files:**
- Modify: `src/components/Footer.jsx`

- [ ] **Step 1: Update Footer imports**

Add after existing imports:
```jsx
import ThemeSwitcher from './ThemeSwitcher';
```

- [ ] **Step 2: Add ThemeSwitcher to Footer**

Add before the closing `</footer>` tag (after the social icons div, before the copyright div):

```jsx
          <div className="mt-6 md:mt-0">
            <ThemeSwitcher />
          </div>
```

- [ ] **Step 3: Verify component renders**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "feat: add ThemeSwitcher to Footer"
```

---

### Task 6: Update Navbar for Theme Support

**Files:**
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 1: Add useTheme import and hook**

Add import:
```jsx
import { useTheme } from '../context/ThemeContext';
```

Add inside Navbar component (after useLocation):
```jsx
  const { theme } = useTheme();
```

- [ ] **Step 2: Update primary color references**

Replace hardcoded `text-primary` with dynamic color:
- Change `text-primary` to `text-[var(--primary-color)]`
- Change `bg-primary` to `bg-[var(--primary-color)]`

For example, line 48:
```jsx
className={`text-sm font-medium transition-colors ${location.pathname === item.path ? 'text-[var(--primary-color)]' : 'text-gray-300 hover:text-white'}`}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: update Navbar for theme support"
```

---

### Task 7: Verify Implementation

**Files:**
- Test: `http://localhost:5173`

- [ ] **Step 1: Start dev server**

Run: `npm run dev`
Expected: Dev server starts

- [ ] **Step 2: Test theme switcher appears**

Open http://localhost:5173
Expected: Theme switcher button visible in Footer

- [ ] **Step 3: Test theme cycling**

Click theme switcher button
Expected: Colors change from blue to cyan/green (cyber theme)
Click again: Colors change back to blue (default theme)

- [ ] **Step 4: Test persistence**

Refresh page
Expected: Theme persists (same as before refresh)

- [ ] **Step 5: Test on different pages**

Navigate to /career, /projects, etc.
Expected: Theme consistent across all pages

- [ ] **Step 6: Run lint**

Run: `npm run lint`
Expected: No new errors

- [ ] **Step 7: Final commit**

```bash
git add .
git commit -m "feat: complete theme switching implementation"
```

---

## Spec Coverage Check

- ✅ Theme switcher appears in Footer
- ✅ Clicking cycles: default → cyber → default
- ✅ Theme persists across page refreshes (localStorage)
- ✅ All themed elements update (via CSS variables)
- ✅ Smooth transitions (0.3s ease)
- ✅ Works on all pages (ThemeProvider wraps App)
- ✅ No flash on load (theme set before render)
