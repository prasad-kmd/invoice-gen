# PC Repair Invoice Generator

A private, general-purpose invoice generator web app designed specifically for PC repair technicians. Completely dynamic with zero hardcoded services or prices.

## Features

- **Dashboard:** At-a-glance summary of total invoices, paid amounts, outstanding balances, and overdue accounts.
- **Client Management:** Store and manage client contact details for reuse. View full invoice history per client.
- **Dynamic Invoices:** Create invoices with customizable line items, quantities, and prices. Automatic calculation of subtotals, tax, discounts, and grand totals.
- **Professional PDF Generation:** Download print-optimized, professional-grade PDF invoices using `@react-pdf/renderer`.
- **Business Settings:** Configure your business profile (name, logo, address) and set global defaults for tax rates and payment terms.
- **Role-Based Security:** Integrated with Better Auth and Supabase. Admin-only access restricted to users with the `admin` role.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Database:** Supabase (PostgreSQL)
- **ORM:** Drizzle ORM
- **Auth:** Better Auth
- **PDF:** `@react-pdf/renderer`
- **Validation:** Zod

## Prerequisites

- Node.js 20+
- pnpm (recommended)
- Supabase account and a PostgreSQL database

## Setup Instructions

1.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd pc-repair-invoice-generator
    ```

2.  **Install Dependencies:**
    ```bash
    pnpm install
    ```

3.  **Configure Environment Variables:**
    Copy `.env.example` to `.env.local` and fill in the required values:
    - `DATABASE_URL`: Your Supabase connection string.
    - `BETTER_AUTH_SECRET`: A secure 32-character string.
    - `BETTER_AUTH_URL`: Your app's base URL (e.g., `http://localhost:3000`).
    - `NEXT_PUBLIC_APP_URL`: Same as above.

4.  **Database Migration:**
    Push the schema to your existing Supabase database:
    ```bash
    pnpm db:push
    ```
    *Note: This will only add the new tables (`clients`, `invoices`, etc.) and will not modify existing user/auth tables.*

5.  **Admin User Setup:**
    Ensure at least one user in your `user` table has the `role` column set to `admin`.

6.  **Run Locally:**
    ```bash
    pnpm dev
    ```

7.  **Initial Configuration:**
    Log in, navigate to the **Settings** page, and configure your business profile to enable invoice generation.

## Deployment

Deploy to Vercel as a new project, ensuring all environment variables from `.env.local` are configured in the Vercel dashboard.

## Project Structure

- `app/`: Next.js routes and pages.
- `actions/`: Server actions for database mutations.
- `components/`: UI components, invoice forms, and PDF templates.
- `db/`: Drizzle schema and migration files.
- `lib/`: Utility functions and auth/database configuration.
- `types/` & `validators/`: TypeScript definitions and Zod schemas.

## License

This project is licensed under the AGPL-3.0 License.
