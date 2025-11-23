# Copilot Instructions for PSFSS Frontend

## Project Overview
This is **Aerialink Cloud** - a Next.js 15 private cloud file storage application with a focus on security, privacy, and seamless file management. The app uses Next.js App Router, Tailwind CSS v4, and follows a component-based architecture.

## Key Architecture Patterns

### Component Structure
- **Global components**: `components/global/` - Shared UI elements (Header, Footer, Button)
- **Page-specific components**: `components/home/` - Feature-specific components
- **Layout system**: Uses `app/layout.js` with global Header/Footer wrapper and centered content container

### Styling System
- **Tailwind v4** with custom breakpoints: `middle-res: 1024px` 
- **Custom CSS variables**: Primary green `#43E1A9`, background `#00281A`
- **Responsive design**: Mobile-first with xl/lg/md/xs breakpoints
- **Background images**: Extensive use of `/images/` assets for styling (buttons, headers, sections)
- **Local fonts**: Custom Aptos font family with multiple weights loaded via `next/font/local`

### Content Management Pattern
```javascript
// All page content defined as objects at component top
const homePageContent = {
  banner_heading: 'Your Private Cloud...',
  banner_para1: 'Securely upload...',
  // ... more content
};
```

### Component Props Pattern
```javascript
// Simple prop interface for reusable components
<GetStartedCards heading={content.heading} text={content.text} icon={content.icon} />
<Button link={'#'} text={content.button_text} />
```

## Development Workflow

### Local Development
```bash
npm run dev --turbopack  # Development with Turbopack
npm run build --turbopack  # Production build with Turbopack
npm start  # Production server
```

### CI/CD Process
- **Auto-build**: Pushes to `main` trigger Docker builds tagged with commit SHA
- **Manual deploy**: Use GitHub Actions "Build and Deploy" workflow with specific image tag
- **Container registry**: Google Artifact Registry at `{location}-docker.pkg.dev/{project}/psfss/psfss-frontend`
- **Deployment**: ArgoCD manages Kubernetes deployments via manifest repo updates

## Critical Conventions

### Navigation & Routing
- Navigation defined in `constants/constant.ts` as `navLinks` array
- Supports nested submenus with `subMenu` property
- Active state styling via pathname comparison: `className={isActive ? "active" : ""}`

### Image Handling
- All images in `/public/` organized by purpose (`icons/`, `images/`, `flags/`)
- Next.js Image component used consistently with width/height props
- Background images referenced in CSS classes: `bg-[url(/images/path.png)]`

### State Management
- Client components use `'use client'` directive
- Local state with useState for UI interactions (mobile menu, scroll effects)
- No external state management - props drilling for data flow

### Responsive Design
- Mobile-first approach with progressive enhancement
- Extensive breakpoint-specific classes: `xl:text-8xl lg:text-8xl md:text-3xl text-2xl`
- Conditional rendering for mobile vs desktop: `className="hidden lg:block"`

## Integration Points

### External Dependencies
- **Headless UI**: For accessible modals, popovers, disclosures
- **Heroicons**: Icon system for UI elements
- **Swiper**: Carousel/slider functionality (imported globally in layout)
- **React Rating**: For review components

### Docker Configuration
- Multi-stage build: deps → builder → runner
- Node 18 Alpine base image
- Runs as non-root user (nextjs:nodejs)
- Exposes port 3000

## File Organization Rules
- Page components in `app/` directory (App Router)
- Reusable components in `components/` with feature-based subdirectories
- Constants and configuration in `constants/` directory
- Static assets organized by type in `public/`
- TypeScript allowed but not required (`.ts` files for constants only)

## Key Files to Reference
- `app/layout.js` - Global layout structure and font loading
- `components/global/Header.js` - Complex responsive navigation pattern
- `app/page.js` - Content object pattern and component composition
- `constants/constant.ts` - Centralized navigation and content definitions
- `app/globals.css` - Custom CSS variables and global styles