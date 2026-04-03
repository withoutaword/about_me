# Career Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new Career page with timeline layout showing work experience at IBM and vivo AI Lab.

**Architecture:** Single page component with vertical timeline, using Framer Motion for scroll animations. Follows existing page patterns (Navbar + content section + Footer).

**Tech Stack:** React 19, Tailwind CSS, Framer Motion, React Router DOM

---

## File Structure

- Create: `src/pages/Career.jsx` - Main career page with timeline
- Modify: `src/App.jsx:14-20` - Add /career route
- Modify: `src/components/Navbar.jsx:19-25` - Add Career nav item

---

### Task 1: Create Career Page Component

**Files:**
- Create: `src/pages/Career.jsx`

- [ ] **Step 1: Write the component**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Career = () => {
  const careers = [
    {
      company: 'vivo AI Lab',
      role: 'AI Engineer',
      dates: '2021 - Present',
      description: 'Working on AI research and development.'
    },
    {
      company: 'IBM',
      role: 'Software Engineer',
      dates: '2015 - 2018',
      description: 'Developed enterprise software solutions.'
    }
  ];

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Career</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              My professional journey
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l border-gray-700 ml-4 md:ml-6">
              {careers.map((career, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="mb-12 pl-8 relative"
                >
                  <div className="absolute -left-2 top-2 w-4 h-4 bg-primary rounded-full border-2 border-dark"></div>
                  <h3 className="text-2xl font-semibold text-white">{career.company}</h3>
                  <p className="text-lg text-gray-300 mt-1">{career.role}</p>
                  <p className="text-sm text-gray-500 mt-1">{career.dates}</p>
                  <p className="text-gray-400 mt-3">{career.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Career;
```

- [ ] **Step 2: Verify file created**

Run: `ls -la src/pages/Career.jsx`
Expected: File exists

- [ ] **Step 3: Commit**

```bash
git add src/pages/Career.jsx
git commit -m "feat: add Career page with timeline"
```

---

### Task 2: Add Career Route

**Files:**
- Modify: `src/App.jsx:1-26`

- [ ] **Step 1: Add import**

Change line 3 from:
```jsx
import Home from './pages/Home';
```
to:
```jsx
import Home from './pages/Home';
import Career from './pages/Career';
```

- [ ] **Step 2: Add route**

Add after line 15 (after `<Route path="/" element={<Home />} />`):
```jsx
        <Route path="/career" element={<Career />} />
```

- [ ] **Step 3: Verify route added**

Run: `grep -n "career" src/App.jsx`
Expected: Shows import and route

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add /career route"
```

---

### Task 3: Add Career to Navbar

**Files:**
- Modify: `src/components/Navbar.jsx:19-25`

- [ ] **Step 1: Add Career nav item**

Change navItems array from:
```jsx
  const navItems = [
    { name: 'About', path: '/' },
    { name: 'Beliefs', path: '/beliefs' },
    { name: 'Photography', path: '/photography' },
    { name: 'Projects', path: '/projects' },
    { name: 'Moments', path: '/moments' },
  ];
```
to:
```jsx
  const navItems = [
    { name: 'About', path: '/' },
    { name: 'Career', path: '/career' },
    { name: 'Beliefs', path: '/beliefs' },
    { name: 'Photography', path: '/photography' },
    { name: 'Projects', path: '/projects' },
    { name: 'Moments', path: '/moments' },
  ];
```

- [ ] **Step 2: Verify nav item added**

Run: `grep -n "Career" src/components/Navbar.jsx`
Expected: Shows Career nav item

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: add Career to navigation"
```

---

### Task 4: Verify Implementation

**Files:**
- Test: `http://localhost:5173/career`

- [ ] **Step 1: Start dev server**

Run: `npm run dev`
Expected: Dev server starts on http://localhost:5173

- [ ] **Step 2: Test page loads**

Open: http://localhost:5173/career
Expected: 
- Page shows "Career" title
- Timeline displays IBM (2015-2018) and vivo AI Lab (2021-Present)
- Navbar shows Career link
- Dark theme consistent with other pages

- [ ] **Step 3: Test navigation**

Click "Career" in navbar
Expected: URL changes to /career, page highlights Career nav item

- [ ] **Step 4: Run lint**

Run: `npm run lint`
Expected: No errors

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: complete Career page implementation"
```

---

## Spec Coverage Check

- ✅ Page loads at /career route
- ✅ Timeline displays IBM and vivo AI Lab entries
- ✅ Animations trigger on scroll (whileInView)
- ✅ Navbar shows Career link with active highlight
- ✅ Responsive layout (ml-4 on mobile, ml-6 on desktop)
- ✅ Dark theme consistent with other pages
