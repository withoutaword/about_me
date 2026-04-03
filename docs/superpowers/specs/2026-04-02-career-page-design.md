# Career Page Design Spec

**Date:** 2026-04-02  
**Status:** Approved

## Overview
Add a new Career page to the portfolio to showcase work experience in a timeline format.

## UI/UX Specification

### Layout Structure
- Full-width page with dark background (`bg-dark`)
- Vertical timeline centered on page
- Navbar at top, Footer at bottom (consistent with existing pages)
- Content section: `pt-32 pb-20` (matches Projects page)

### Visual Design

**Color Palette:**
- Background: `bg-dark` (#111111)
- Timeline line: `border-l border-gray-700`
- Timeline dot: `bg-primary` (#0070f3)
- Text: white for headings, gray-400 for body

**Typography:**
- Page title: `text-5xl md:text-6xl font-bold text-white`
- Company name: `text-2xl font-semibold text-white`
- Role: `text-lg text-gray-300`
- Dates: `text-sm text-gray-500`
- Description: `text-gray-400`

**Spacing:**
- Timeline entries: `mb-12` vertical spacing
- Entry content: `pl-8` to offset from timeline

### Components

**Timeline Entry:**
- Timeline dot: 12px circle on the line
- Company name as heading
- Role title below
- Dates inline or below role
- Brief description (1-2 sentences)

**Timeline Container:**
- Relative positioning
- Left border for timeline line
- Entries positioned relative to line

### Animations
- Framer Motion: entries fade in and slide up on scroll
- `whileInView` trigger for lazy loading effect
- `viewport={{ once: true }}` so animation plays once

### Responsive Behavior
- Desktop (>768px): Timeline centered, entries may alternate sides
- Mobile: Timeline on left, all entries on right side

## Functionality Specification

### Core Features
1. Display career history in chronological order (most recent first)
2. Show company, role, dates, and brief description for each position
3. Smooth scroll animations as entries come into view

### Data Structure
```javascript
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
```

### Navigation
- New route: `/career`
- Navbar item: "Career" between "About" and "Beliefs"

## Acceptance Criteria
1. Page loads without errors at `/career` route
2. Timeline displays both IBM and vivo AI Lab entries
3. Animations trigger on scroll
4. Navbar shows Career link and highlights when active
5. Responsive layout works on mobile and desktop
6. Dark theme consistent with other pages
