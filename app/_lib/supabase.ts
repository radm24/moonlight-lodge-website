import { createClient } from "@supabase/supabase-js";
import { Database } from "@/app/_lib/database.types";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
