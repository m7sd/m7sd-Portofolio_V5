// src/supabase.js
import { createClient } from "@supabase/supabase-js";

// Local dev env variables
const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fallback values for GitHub Pages
const fallbackUrl = "https://bouauugawmbcvzdmvwpr.supabase.co";
const fallbackKey = "sb_publishable_MtVerupDWvbibTPhzUgkTg_DaFwSQSn";

const supabaseUrl = envUrl || fallbackUrl;
const supabaseAnonKey = envKey || fallbackKey;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase config missing");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
