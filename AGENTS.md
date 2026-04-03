# AGENTS.md - Development Guidelines

## Project Overview

Personal portfolio website built with React 19, Vite, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Linting**: ESLint 9 (flat config)
- **Package Manager**: npm

---

## Build / Lint / Test Commands

### Development
```bash
npm run dev          # Start dev server (http://localhost:5173)
```

### Build
```bash
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build locally
```

### Linting
```bash
npm run lint         # Run ESLint on all files
```

### Running a Single Test
No test framework configured. To add tests:
```bash
npm install -D vitest
npx vitest run src/pages/Home.jsx
```

---

## Code Style Guidelines

### General Principles
- Use functional components with hooks (React 19)
- Prefer const over let; avoid var
- Use early returns for guard clauses
- Keep components focused and small

### File Organization
```
src/
├── components/     # Reusable UI components
├── pages/          # Route page components
├── data/           # Static data files
├── App.jsx         # Main app with routing
└── main.jsx        # Entry point
```

### Imports
Order: React → external libraries → internal components → CSS
```jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
```

### Formatting
- **Indentation**: 2 spaces
- **Semicolons**: Required
- **Quotes**: Single quotes (`'text'`)
- **Line length**: Under 100 characters
- **JSX**: Self-closing tags need trailing slash (`<Component />`)

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Navbar.jsx` |
| Files (data) | camelCase | `moments.js` |
| Functions | camelCase | `handleScroll` |
| Constants | UPPER_SNAKE | `MAX_SIZE` |
| CSS Classes | kebab-case | `text-primary` |

### Components
- Export as default at bottom: `export default ComponentName;`
- Use destructuring for props
- Keep JSX clean; extract logic to helpers

```jsx
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  return (
    <motion.header>
      {/* JSX content */}
    </motion.header>
  );
};
export default Navbar;
```

### Tailwind CSS
- Use utility classes for all styling
- Custom colors in `tailwind.config.js`:
  - `primary`: #0070f3, `secondary`: #f0f0f0
  - `dark`: #111111, `darkGray`: #1e1e1e
- Use `md:`, `lg:` for responsive, `hover:` for states

### Framer Motion
```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  {/* content */}
</motion.div>
```

### Error Handling
- Use try/catch for async operations
- Handle loading/error states
- ESLint rule: `no-unused-vars` allows capitalized constants (`^[A-Z_]`)

### TypeScript
- Supported but not enforced
- Use `.tsx` for files with JSX + types

---

## Common Tasks

### Adding a New Page
1. Create file in `src/pages/`
2. Add route in `App.jsx`:
```jsx
import NewPage from './pages/NewPage';
<Route path="/new-page" element={<NewPage />} />
```

### Adding a New Component
1. Create file in `src/components/`
2. Import and use in parent

### Route Parameters
1. Define route with `:param` in App.jsx
2. Access via `useParams()` from react-router-dom

---

## ESLint Configuration

Located in `eslint.config.js`:
- Extends: ESLint recommended, react-hooks, react-refresh
- Custom rule: `no-unused-vars` allows capitalized vars
- Ignores: `dist/` folder

---

## Git Conventions

- Use meaningful commit messages
- Create feature branches
- Run `npm run lint` before committing
- Do not commit `node_modules/` or `dist/`
