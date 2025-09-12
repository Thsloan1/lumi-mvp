# 🚀 Option A: Supabase Database Setup

## Step 1: Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" 
3. Sign up with GitHub (recommended) or email

## Step 2: Create New Project
1. Click "New Project"
2. Choose your organization (or create one)
3. Fill in project details:
   - **Name**: `learning-management-system` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your location
4. Click "Create new project"
5. Wait 2-3 minutes for setup to complete

## Step 3: Get Database Connection String
1. In your Supabase dashboard, go to **Settings** → **Database**
2. Scroll down to "Connection string" section
3. Select **URI** tab
4. Copy the connection string (it looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with the password you created in Step 2

## Step 4: Update Your .env File
1. In Bolt, open your `.env` file
2. Replace the DATABASE_URL line with your Supabase connection string:
   ```
   DATABASE_URL="postgresql://postgres:your-password@db.your-project-ref.supabase.co:5432/postgres"
   ```

## Step 5: Test Database Connection
Run these commands in Bolt:
```bash
npm run db:push    # Push your schema to Supabase
npm run db:seed    # Add sample data
```

✅ **Success!** Your Supabase database is now connected and ready to use.

---

## 🔧 Troubleshooting

**Connection Issues:**
- Double-check your password in the connection string
- Ensure no extra spaces in the DATABASE_URL
- Verify your project is fully provisioned (green status in Supabase)

**Schema Issues:**
- If `db:push` fails, check the Supabase logs in the dashboard
- Make sure your Supabase project has completed setup

**Need Help?**
- Supabase has excellent docs at [supabase.com/docs](https://supabase.com/docs)
- Their Discord community is very helpful