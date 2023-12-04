import { createClient } from "@supabase/supabase-js";
// Create a single supabase client for interacting with your database

// Import the createClient function from the @supabase/supabase-js package

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://YOUR_SUPABASE_URL.supabase.co",
  "YOUR_SUPABASE_KEY"
);

export default supabase;
