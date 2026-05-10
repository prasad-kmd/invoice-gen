# Invoice Pro - Technical Documentation

## Overview
Invoice Pro is a modern, production-ready invoice generator built with Next.js 15, Tailwind CSS 4, and Drizzle ORM. It features a professional UI/UX, mobile-first design, and a robust theme system.

## Key Features

### 1. Modern UI/UX
- **App Shell**: A consistent layout with a sticky header and a responsive sidebar.
- **Mobile Friendly**: The sidebar transforms into a slide-over drawer on mobile devices. Tables gracefully transition to card-based layouts.
- **Teal/Cyan Accent**: A cohesive color scheme used across the application for a premium feel.
- **Typography**: Uses local fonts (Inter for body and Google Sans for headings) to ensure privacy and fast loading times.

### 2. Theme System
- **Dark Mode Default**: The application defaults to dark mode on first load.
- **Persistent Toggle**: Users can toggle between light and dark modes, with their preference saved across sessions.

### 3. Invoice Management
- **Workflow Improvements**: Inline client creation directly from the invoice form using a modal dialog.
- **Live Preview**: Real-time preview of the invoice as you fill out the form.
- **Multi-currency Support**: Support for LKR (default), USD, EUR, GBP, INR, AUD, CAD, SGD, and AED.

### 4. PDF Generation
- **Professional Templates**: High-quality PDF invoices generated using `@react-pdf/renderer`.
- **Customization**: Optional page borders and consistent accent colors.
- **Local Fonts**: Fonts are embedded locally in the PDF for consistent rendering.

## Technical Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Components**: Radix UI Primitives & shadcn/ui
- **Database**: PostgreSQL with Drizzle ORM
- **Auth**: Better Auth
- **PDF**: @react-pdf/renderer
- **Icons**: Lucide React & React Icons

## Configuration

### Environment Variables
The application requires several environment variables for database connection and authentication (see `.env.example`).

### Deployment
- Ensure `DATABASE_URL` is set to your PostgreSQL instance.
- For PDF font loading to work correctly, ensure the `public/fonts` directory is accessible during generation.

## Development

### Adding New Currencies
To add more currencies, update the `currencies` array in `components/settings-form.tsx` and ensure formatting logic in `lib/utils.ts` handles the new codes correctly.

### Modifying PDF Templates
The PDF template is located in `components/pdf-template/invoice-pdf.tsx`. Styling is handled via `StyleSheet.create`.
