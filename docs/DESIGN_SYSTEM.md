# Design System - Professional Portfolio

## Design Philosophy

**Core Principles:**
- **Clarity over decoration** - Content is king, effects support it
- **Hierarchy through typography and spacing** - Not through effects
- **Calm and professional** - Senior-level, trustworthy
- **Intentional dark/light modes** - Each designed separately, not inverted
- **Performance-first** - Minimal effects, fast loading

## Color System

### Primary Accent (Cyan/Blue)
- **Dark Mode**: `#00d9ff` (cyan-500) - Primary actions, links, highlights
- **Light Mode**: `#0066ff` (blue-600) - Professional, trustworthy blue
- **Usage**: CTAs, links, active states, key highlights only

### Secondary Accent (Optional)
- **Dark Mode**: `#8b5cf6` (purple-500) - Rarely used, for variety
- **Light Mode**: `#7c3aed` (purple-600) - Only when needed

### Neutral Palette

**Dark Mode:**
- Background: `#000000` → `#0a0a0a` (subtle gradient)
- Surface: `#0f0f0f` (cards, elevated elements)
- Border: `rgba(255, 255, 255, 0.1)` (subtle separation)
- Text Primary: `#ffffff`
- Text Secondary: `#a3a3a3` (gray-400)
- Text Tertiary: `#737373` (gray-500)

**Light Mode:**
- Background: `#ffffff` → `#fafafa` (subtle gradient)
- Surface: `#ffffff` (cards with shadow)
- Border: `rgba(0, 0, 0, 0.08)` (subtle separation)
- Text Primary: `#0a0a0a` (near black)
- Text Secondary: `#525252` (gray-600)
- Text Tertiary: `#737373` (gray-500)

## Typography Scale

### Font Families
- **Body**: Inter (clean, readable)
- **Display**: Space Grotesk (headings, hero)

### Scale
- **Hero Name**: `clamp(3rem, 8vw, 7rem)` - Only in hero
- **H1**: `clamp(2.5rem, 5vw, 4rem)` - Section titles
- **H2**: `clamp(2rem, 4vw, 3rem)` - Subsection titles
- **H3**: `clamp(1.5rem, 3vw, 2rem)` - Card titles
- **Body Large**: `1.125rem` (18px) - Important text
- **Body**: `1rem` (16px) - Default
- **Body Small**: `0.875rem` (14px) - Secondary text
- **Caption**: `0.75rem` (12px) - Labels, metadata

### Line Heights
- **Tight**: `1.2` - Headings
- **Normal**: `1.5` - Body text
- **Relaxed**: `1.75` - Long-form content

## Spacing System

**Base Unit**: 4px

- **xs**: 4px (0.25rem)
- **sm**: 8px (0.5rem)
- **md**: 16px (1rem)
- **lg**: 24px (1.5rem)
- **xl**: 32px (2rem)
- **2xl**: 48px (3rem)
- **3xl**: 64px (4rem)
- **4xl**: 96px (6rem)

**Section Padding**: `py-24 md:py-32` (96px-128px vertical)

## Effects Rules

### ✅ Allowed
1. **Hero Section Only**:
   - Gradient text on name
   - Subtle text glow (dark mode only)
   - Background 3D elements (very subtle)

2. **Cards**:
   - Subtle shadow on hover
   - Border color change on hover
   - No glow, no blur backgrounds

3. **Buttons**:
   - Solid background (primary)
   - Border + transparent (secondary)
   - No glow, no gradients

### ❌ Not Allowed
- Glow effects outside hero
- Gradient backgrounds on cards
- Blur effects on content
- Multiple gradients in one section
- Heavy animations
- 3D transforms on cards (except subtle hover)

## Component Patterns

### Cards
- **Background**: Solid (dark: `#0f0f0f`, light: `#ffffff`)
- **Border**: `1px solid rgba(...)` - Subtle
- **Shadow**: Only on hover (light mode)
- **Padding**: `p-6` (24px)
- **Border Radius**: `rounded-xl` (12px)

### Buttons
- **Primary**: Solid background, white text
- **Secondary**: Transparent, border, colored text
- **Size**: `px-6 py-3` (medium), `px-8 py-4` (large)
- **No effects**: No glow, no gradients

### Navigation
- **Background**: Transparent with backdrop blur (subtle)
- **Active State**: Underline or background highlight
- **Hover**: Color change only

## Dark vs Light Mode Rules

### Dark Mode
- Rich blacks and grays
- Cyan accent for tech feel
- Subtle glows allowed in hero
- Higher contrast

### Light Mode
- Clean whites and light grays
- Blue accent (more professional)
- No glows (ever)
- Editorial-style layout
- Strong shadows for depth

## Layout Principles

1. **Max Width**: `1280px` (7xl) for content
2. **Section Spacing**: `96px-128px` vertical
3. **Grid Gaps**: `24px-32px` between cards
4. **Content Width**: `max-w-3xl` for text blocks
5. **Asymmetric Layouts**: Use sparingly, for visual interest

## Animation Rules

- **Duration**: 200-400ms (fast, not distracting)
- **Easing**: `ease-out` or `cubic-bezier(0.4, 0, 0.2, 1)`
- **Reduce Motion**: Respect `prefers-reduced-motion`
- **Hover Only**: Most animations on hover, not on load

## Accessibility

- **Contrast**: WCAG AA minimum (4.5:1 for text)
- **Focus States**: Clear, visible outlines
- **Touch Targets**: Minimum 44×44px
- **Text Size**: Minimum 16px for body

