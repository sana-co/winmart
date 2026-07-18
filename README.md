
  # WinMart Fashion

  This is a code bundle for WinMart Fashion. The original project is available at https://www.figma.com/design/aYmPG8wkVNBI4bZysDCkRo/Redesign-Fashion-Landing-Page.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Backend and Supabase setup

  This project uses Vercel serverless functions in the `api` folder:

  - `POST /api/feedback`
  - `POST /api/loyalty-card`
  - `POST /api/send-loyalty-email`
  - `POST /api/supplier-applications`

  Create a `.env.local` file in the project root and add:

  ```env
  SUPABASE_URL=https://your-project-id.supabase.co
  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
  GMAIL_USER=your-gmail-address@gmail.com
  GMAIL_APP_PASSWORD=your-gmail-app-password
  ```

  Get these from Supabase:

  - `SUPABASE_URL`: Project Settings > API > Project URL
  - `SUPABASE_SERVICE_ROLE_KEY`: Project Settings > API > service_role key

  Keep the service role key private. Do not put it in frontend files or commit it to git.
  Keep Gmail credentials private as well. Add `GMAIL_USER` and `GMAIL_APP_PASSWORD`
  in Vercel project environment variables for production.

  In Supabase, open SQL Editor and run the full contents of `supabase/schema.sql`.

  To view submissions in Supabase SQL Editor:

  ```sql
  select * from public.feedback order by created_at desc;
  select * from public.loyalty_card_requests order by created_at desc;
  select * from public.supplier_applications order by created_at desc;
  ```

  For local testing, run:

  ```bash
  npm run dev
  ```

  The Vite dev server includes local `/api/*` middleware for the same routes used on Vercel.
  
