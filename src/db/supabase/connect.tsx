import { createClient } from "@supabase/supabase-js";

 export const supabase = createClient(  
    //   'https://mlbkrzsqhtwajzmuygbj.supabase.co',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sYmtyenNxaHR3YWp6bXV5Z2JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM3MjI5OTksImV4cCI6MjAwOTI5ODk5OX0.6BaQsMNfii2eTI8LnjRk0KNKCtItDUJKVNZtsxpxlXg'

       process.env.NEXT_PUBLIC_SUPABASE_URL as string,
       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
