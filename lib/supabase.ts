import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bgeyvmgxkfuibgihorxi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZXl2bWd4a2Z1aWJnaWhvcnhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExODI1NjksImV4cCI6MjA5Njc1ODU2OX0.ujYNvsP-oC5SGgouDzuOpol_VQH64Wgx12FkfyKH__o';

export function getSupabase() {
  return createClient(supabaseUrl, supabaseAnonKey);
}
