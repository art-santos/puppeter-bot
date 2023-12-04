import { createClient } from "@supabase/supabase-js";
// Create a single supabase client for interacting with your database

// Import the createClient function from the @supabase/supabase-js package

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://nppurifjgyngjmtarotr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wcHVyaWZqZ3luZ2ptdGFyb3RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE2Mzk2NjYsImV4cCI6MjAxNzIxNTY2Nn0.53EejgmiWjYEUdTYVVXQ4twxIJiXcpI4ldqr9fSfJ_o"
);

export default supabase;
