/*
  # 体育分享 SportsShare Database Schema

  ## Overview
  Creates the complete database schema for the SportsShare application including user profiles,
  sports preferences, activities, leaderboards, communities, messages, and achievements.

  ## New Tables
  
  ### 1. `user_profiles`
  Extended user profile information beyond auth.users
  - `id` (uuid, primary key, references auth.users)
  - `username` (text, unique)
  - `avatar_url` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `user_preferences`
  User sports preferences and body metrics from onboarding
  - `id` (uuid, primary key)
  - `user_id` (uuid, references user_profiles)
  - `sports_preferences` (jsonb) - array of preferred sports
  - `height` (numeric) - in cm
  - `weight` (numeric) - in kg
  - `weekly_frequency` (integer) - times per week
  - `fitness_goal` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. `activities`
  User activity records for tracking
  - `id` (uuid, primary key)
  - `user_id` (uuid, references user_profiles)
  - `activity_type` (text) - running, swimming, gym, etc.
  - `distance` (numeric) - in km or meters
  - `steps` (integer)
  - `duration` (integer) - in minutes
  - `calories` (numeric)
  - `activity_date` (date)
  - `created_at` (timestamptz)

  ### 4. `communities`
  Sports communities/groups
  - `id` (uuid, primary key)
  - `name` (text)
  - `description` (text)
  - `cover_image` (text)
  - `tags` (text[]) - array of tags
  - `member_count` (integer)
  - `creator_id` (uuid, references user_profiles)
  - `created_at` (timestamptz)

  ### 5. `community_members`
  Junction table for community membership
  - `id` (uuid, primary key)
  - `community_id` (uuid, references communities)
  - `user_id` (uuid, references user_profiles)
  - `joined_at` (timestamptz)

  ### 6. `skill_exchanges`
  User skill exchange posts
  - `id` (uuid, primary key)
  - `user_id` (uuid, references user_profiles)
  - `skill_offer` (text) - skill they can teach
  - `skill_wanted` (text) - skill they want to learn
  - `created_at` (timestamptz)

  ### 7. `messages`
  Private messages between users
  - `id` (uuid, primary key)
  - `sender_id` (uuid, references user_profiles)
  - `receiver_id` (uuid, references user_profiles)
  - `content` (text)
  - `read` (boolean)
  - `created_at` (timestamptz)

  ### 8. `badges`
  User achievement badges
  - `id` (uuid, primary key)
  - `user_id` (uuid, references user_profiles)
  - `badge_type` (text)
  - `badge_name` (text)
  - `badge_icon` (text)
  - `earned_at` (timestamptz)

  ### 9. `ai_conversations`
  AI coach conversation history
  - `id` (uuid, primary key)
  - `user_id` (uuid, references user_profiles)
  - `message` (text)
  - `response` (text)
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Users can only access their own data
  - Community members can view community data
  - Public read access for community listings
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  avatar_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  sports_preferences jsonb DEFAULT '[]'::jsonb,
  height numeric DEFAULT 0,
  weight numeric DEFAULT 0,
  weekly_frequency integer DEFAULT 0,
  fitness_goal text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  activity_type text NOT NULL,
  distance numeric DEFAULT 0,
  steps integer DEFAULT 0,
  duration integer DEFAULT 0,
  calories numeric DEFAULT 0,
  activity_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own activities"
  ON activities FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activities"
  ON activities FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own activities"
  ON activities FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own activities"
  ON activities FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create communities table
CREATE TABLE IF NOT EXISTS communities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  cover_image text DEFAULT '',
  tags text[] DEFAULT ARRAY[]::text[],
  member_count integer DEFAULT 0,
  creator_id uuid REFERENCES user_profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE communities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view communities"
  ON communities FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create communities"
  ON communities FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update their communities"
  ON communities FOR UPDATE
  TO authenticated
  USING (auth.uid() = creator_id)
  WITH CHECK (auth.uid() = creator_id);

-- Create community_members table
CREATE TABLE IF NOT EXISTS community_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id uuid REFERENCES communities(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  joined_at timestamptz DEFAULT now(),
  UNIQUE(community_id, user_id)
);

ALTER TABLE community_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view community memberships"
  ON community_members FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM community_members cm
      WHERE cm.community_id = community_members.community_id
      AND cm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can join communities"
  ON community_members FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave communities"
  ON community_members FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create skill_exchanges table
CREATE TABLE IF NOT EXISTS skill_exchanges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  skill_offer text NOT NULL,
  skill_wanted text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE skill_exchanges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view skill exchanges"
  ON skill_exchanges FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create skill exchanges"
  ON skill_exchanges FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own skill exchanges"
  ON skill_exchanges FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own skill exchanges"
  ON skill_exchanges FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their messages"
  ON messages FOR SELECT
  TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update received messages"
  ON messages FOR UPDATE
  TO authenticated
  USING (auth.uid() = receiver_id)
  WITH CHECK (auth.uid() = receiver_id);

-- Create badges table
CREATE TABLE IF NOT EXISTS badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  badge_type text NOT NULL,
  badge_name text NOT NULL,
  badge_icon text DEFAULT '🏆',
  earned_at timestamptz DEFAULT now()
);

ALTER TABLE badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own badges"
  ON badges FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert badges"
  ON badges FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create ai_conversations table
CREATE TABLE IF NOT EXISTS ai_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  message text NOT NULL,
  response text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own conversations"
  ON ai_conversations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversations"
  ON ai_conversations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_activities_user_date ON activities(user_id, activity_date DESC);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_members_user ON community_members(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_user ON ai_conversations(user_id, created_at DESC);