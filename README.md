## 🚀 Quick Start

1. **Environment Setup:**
   ```bash
   # Copy environment template
   cp .env.example .env
   ```
   
   Then edit `.env` and add your actual values (see setup guides below).

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Database Setup:**
   
   **Option A: Local PostgreSQL**
   ```bash
   # Install PostgreSQL locally, then create database
   createdb learning_management_system
   
   # Update DATABASE_URL in .env:
   # DATABASE_URL="postgresql://username:password@localhost:5432/learning_management_system"
   ```
   
   **Option B: Supabase (Recommended)**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Go to Settings > Database
   - Copy connection string to `.env`
   
   **Option C: Railway**
   - Go to [railway.app](https://railway.app)
   - Create PostgreSQL database
   - Copy connection string to `.env`

4. **Initialize database:**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

## 🔐 Clerk Authentication Setup

1. **Create Clerk Account:**
   - Visit [clerk.com](https://clerk.com)
   - Sign up for free account
   - Create new application

2. **Configure Clerk:**
   - In Clerk Dashboard, go to "API Keys"
   - Copy "Publishable key" and "Secret key"
   - Add to your `.env` file:
   ```
   CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   CLERK_SECRET_KEY=sk_test_your_key_here
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   ```

3. **Test Authentication:**
   - Restart your dev server: `npm run dev`
   - Visit your app and try signing up/in

## 🚀 Deployment to Vercel

1. **Connect to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Import your repository

2. **Configure Environment Variables:**
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add all variables from your `.env` file
   - Make sure to use production database URL

3. **Deploy:**
   - Vercel will automatically deploy
   - Future pushes to main branch auto-deploy

## 📊 Features

- **Authentication**: Secure user management with Clerk
- **Course Management**: Create, edit, and organize courses
- **Progress Tracking**: Monitor student progress and completion
- **File Uploads**: Support for videos, documents, and images
- **Payment Integration**: Stripe integration for course purchases
- **Admin Dashboard**: Comprehensive analytics and management tools
- **API Routes**: RESTful endpoints for all operations
- **Responsive Design**: Works on all devices

## 🛠️ Development Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Push schema to database
npm run db:seed      # Seed with sample data
npm run db:studio    # Open Prisma Studio
npm run db:reset     # Reset database (careful!)

# Utilities
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript
```

## 🏗️ Project Structure

```
├── app/                 # Next.js 13+ app directory
│   ├── (dashboard)/     # Dashboard routes
│   ├── api/            # API routes
│   └── globals.css     # Global styles
├── components/         # Reusable components
├── lib/               # Utility functions
├── prisma/            # Database schema and migrations
├── public/            # Static assets
└── README.md
```

## 🔧 Troubleshooting

**Database Connection Issues:**
- Verify DATABASE_URL format
- Check database server is running
- Ensure database exists

**Clerk Authentication Issues:**
- Verify all three Clerk environment variables are set
- Check keys are from same Clerk application
- Restart dev server after adding keys

**Build/Deploy Issues:**
- Run `npm run build` locally first
- Check all environment variables in Vercel
- Verify database is accessible from production

## 📝 License

MIT License - feel free to use this project for your educational needs.