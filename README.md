# PC Repair Invoice Generator

A modern, production-grade invoice management platform for tech professionals. Built with a premium aesthetic inspired by NEXT-Notion-CMS.

## ✨ New Redesign Highlights

- **Aesthetic UI:** Redesigned from the ground up with glassy surfaces, teal/cyan accents, and a dark-first experience.
- **Premium Homepage:** A high-fidelity marketing landing page with interactive hero sections and feature showcases.
- **Improved Layout:** A sophisticated app shell featuring a collapsible desktop sidebar, floating utility navbar, and a mobile bottom dock navigation.
- **Multi-Currency:** Support for Sri Lankan Rupee (LKR) as default, plus major international currencies (USD, EUR, GBP, etc.).
- **Workflow Efficiency:** Create clients inline directly from the invoice form without losing your progress.
- **High-Fidelity PDFs:** Upgraded PDF engine with brand-consistent typography, subtle borders, and professional layout.

## 🚀 Features

- **Redesigned Dashboard:** At-a-glance summary with bento-style stat cards and latest activity tracking.
- **Client Management:** Fully responsive CRM interface for managing client relationships and invoice history.
- **Dynamic Invoices:** Interactive invoice builder with real-time preview and automated calculations.
- **Professional PDF Generation:** Download print-optimized, professional-grade PDF invoices.
- **Business Settings:** Centralized configuration for business profile, tax rates, and default currency.
- **Next.js 16 Ready:** Leveraging the latest App Router features, including custom error boundaries and loading states.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI & shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **ORM:** Drizzle ORM
- **Auth:** Better Auth
- **PDF:** @react-pdf/renderer

## ⚙️ Prerequisites

- Node.js 20+
- pnpm 9+
- Supabase account and a PostgreSQL database

## 📝 Setup Instructions

1.  **Clone the Repository**
2.  **Install Dependencies**
3.  **Configure Environment Variables:**
    Copy `.env.example` to `.env.local` and fill in:
    - `DATABASE_URL`
    - `BETTER_AUTH_SECRET`
    - `BETTER_AUTH_URL`
    - `NEXT_PUBLIC_APP_URL`
4.  **Database Migration:** `pnpm db:push`
5.  **Admin User Setup:** Set `role` to `admin` for your user in the Supabase `user` table.
6.  **Run Locally:** `pnpm dev`

## 🎨 Design System

The design is governed by `DESIGN.md`, utilizing a single teal accent system (`hsl(181 100% 28%)`) and local fonts (Mozilla Headline, Inter, JetBrains Mono) for a high-performance, offline-friendly experience.

## 📄 License

This project is licensed under the AGPL-3.0 License.
