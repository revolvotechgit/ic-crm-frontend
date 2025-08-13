# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build

## Architecture Overview

This is a React-based CRM frontend built with Vite, Material-UI, and Redux Toolkit. The application features a comprehensive dashboard with multiple modules for business management.

### Technology Stack
- **Framework**: React 19 with Vite for development/building
- **UI Library**: Material-UI v6 (@mui/material) with custom theming
- **State Management**: Redux Toolkit with multiple feature slices
- **Routing**: React Router v7 with lazy loading
- **Charts**: ApexCharts and MUI X-Charts for data visualization
- **Forms**: Formik with Yup validation and MUI integration
- **Rich Text**: Tiptap editor for content editing

### Project Structure

#### Core Directories
- `src/layouts/` - Layout components (FullLayout with vertical/horizontal navigation)
- `src/routes/` - Route definitions with lazy loading
- `src/store/` - Redux store with feature-specific slices
- `src/theme/` - Material-UI theme configuration and customization
- `src/components/` - Reusable UI components organized by feature
- `src/views/` - Page-level components for different application sections

#### Key Features
- **Apps**: Chat, Email, Calendar, Notes, Kanban, eCommerce, Invoice, Contacts, Tickets
- **Dashboard**: Modern and eCommerce dashboard variants
- **Forms**: Extensive form elements, layouts, validation, and rich text editing
- **Tables**: Basic MUI tables and advanced React Tables with filtering, sorting, pagination
- **Charts**: Multiple chart libraries integration (ApexCharts, MUI Charts)
- **Authentication**: Login/register flows with multiple variants

### State Management
Redux store configured in `src/store/Store.js` with separate slices for:
- Customizer (theme/layout settings)
- Chat, Email, Notes, Contacts, Tickets, eCommerce apps
- User profiles and blog content

### Routing Architecture
- Main routes use `FullLayout` with sidebar navigation
- Authentication routes use `BlankLayout` 
- Extensive lazy loading for performance optimization
- Dynamic routing for detail pages (e.g., `/apps/ecommerce/detail/:id`)

### Mock Data
Mock APIs configured in `src/_mockApis/` for development without backend dependency.

## Development Notes

- Uses path alias `src` configured in Vite for clean imports
- ESLint configured with React and React Hooks rules
- Internationalization support with i18next
- Custom theming system with light/dark mode support
- Responsive design with mobile-friendly layouts