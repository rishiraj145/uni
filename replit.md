# Picking Application - Migrated from Figma

## Project Overview
This is a mobile-first picking application migrated from Figma to Replit. The application features a modern React frontend with Express backend, designed for B2B and B2C picking operations.

## Project Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state
- **UI Components**: Radix UI primitives with custom styling
- **Theme**: Custom design system with Figma assets

### Backend
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Development**: Vite dev server integration
- **Port**: 5000 (serves both API and frontend)

### Key Features
- Mobile-first responsive design (412px width focus)
- B2B Picking (active)
- B2C Picking (coming soon)
- Clean architecture with client/server separation
- Security best practices implemented

## Recent Changes
- **2025-01-28**: Project successfully migrated from Figma to Replit
- **2025-01-28**: Verified all dependencies are installed and working
- **2025-01-28**: Confirmed application runs cleanly on port 5000
- **2025-01-28**: Validated mobile-first design with Figma assets
- **2025-01-28**: Implemented exact Figma B2B Packing design with hamburger navigation
- **2025-01-28**: Added "Assign to me" toggle in navbar and filter controls below main nav
- **2025-01-28**: Created 2x2 matrix layout for picklist cards with title section and symmetrical content grid

## User Preferences
- Mobile-first design approach
- Clean, professional UI matching Figma specifications
- Fast development iteration preferred

## Development Setup
- Run `npm run dev` to start development server
- Application serves on `http://localhost:5000`
- Hot reload enabled for both frontend and backend
- Database migrations via `npm run db:push`

## Security Considerations
- Client/server separation maintained
- No sensitive data in frontend
- Proper Express middleware setup
- Type-safe API with Zod validation