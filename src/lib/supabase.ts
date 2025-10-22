import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UserProfile {
  id: string;
  username: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  sports_preferences: string[];
  height: number;
  weight: number;
  weekly_frequency: number;
  fitness_goal: string;
  created_at: string;
  updated_at: string;
}

export interface Activity {
  id: string;
  user_id: string;
  activity_type: string;
  distance: number;
  steps: number;
  duration: number;
  calories: number;
  activity_date: string;
  created_at: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  cover_image: string;
  tags: string[];
  member_count: number;
  creator_id: string;
  created_at: string;
}

export interface SkillExchange {
  id: string;
  user_id: string;
  skill_offer: string;
  skill_wanted: string;
  created_at: string;
  user_profiles?: UserProfile;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at: string;
}

export interface Badge {
  id: string;
  user_id: string;
  badge_type: string;
  badge_name: string;
  badge_icon: string;
  earned_at: string;
}

export interface AIConversation {
  id: string;
  user_id: string;
  message: string;
  response: string;
  created_at: string;
}
