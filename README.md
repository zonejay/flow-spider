# FlowScrape

FlowScrape is a workflow automation platform built with Next.js, enabling users to create and manage automated workflows through a visual interface.

[中文文档](README.cn.md)

## Key Features

- 🔄 Visual Workflow Editor
- 🤖 Automated Task Execution
- 📊 Execution Status Monitoring
- 🔐 User Authentication & Authorization
- 🌙 Dark Mode Support
- 🌍 Internationalization
- 📅 Scheduled Tasks
- 🔄 Real-time Progress Tracking

## Tech Stack

### Core Framework

- [Next.js 14](https://nextjs.org/) - React Framework
- [React 18](https://react.dev/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety

### Data Layer

- [Prisma](https://www.prisma.io/) - Database ORM
- [React Query](https://tanstack.com/query/latest) - Data Fetching & Caching

### UI Framework

- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [shadcn/ui](https://ui.shadcn.com/) - UI Component Library
- [Radix UI](https://www.radix-ui.com/) - Accessible Component Primitives
- [Lucide Icons](https://lucide.dev/) - Icon Library
- [Sonner](https://sonner.emilkowal.ski/) - Toast Notifications
- [Vaul](https://vaul.emilkowal.ski/) - Drawer Component

### Feature Components

- [@xyflow/react](https://reactflow.dev/) - Workflow Editor
- [Recharts](https://recharts.org/) - Data Visualization
- [React Hook Form](https://react-hook-form.com/) - Form Handling
- [Zod](https://zod.dev/) - Data Validation
- [date-fns](https://date-fns.org/) - Date Manipulation
- [Puppeteer](https://pptr.dev/) - Web Automation
- [Cheerio](https://cheerio.js.org/) - HTML Parsing

### Enhancements

- [Clerk](https://clerk.com/) - Authentication
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme Switching
- [i18next](https://www.i18next.com/) - Internationalization
- [cron-parser](https://github.com/harrisiirak/cron-parser) - Cron Expression Parser
- [nextjs-toploader](https://github.com/TheSGJ/nextjs-toploader) - Page Load Progress

## Getting Started

1. Clone and install dependencies:

```bash
git clone <repository-url>
cd flowscrape
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env.local
```

3. Initialize database:

```bash
npx prisma generate
npx prisma db push
```

4. Start development server:

```bash
npm run dev
```

## Project Structure

```
flowscrape/
├── app/           # Next.js app routes and pages
├── components/    # React components
├── lib/          # Utility functions and business logic
├── prisma/       # Database models and migrations
├── public/       # Static assets
├── actions/      # Server actions
└── i18n/         # Internationalization files
```

## Requirements

- Node.js 18+
- PostgreSQL Database
- npm or yarn package manager

## Development Tools

- [TypeScript](https://www.typescriptlang.org/) - Type Checking
- [ESLint](https://eslint.org/) - Code Linting
- [Prisma Studio](https://www.prisma.io/studio) - Database Management
- [React Query Devtools](https://tanstack.com/query/latest/docs/react/devtools) - Query Debugging

## License

[MIT](LICENSE)
