/*
  # Add Community Posts Feature

  ## Overview
  Adds community posts functionality to allow users to share content within communities

  ## New Tables
  
  ### `community_posts`
  Posts/updates within communities
  - `id` (uuid, primary key)
  - `community_id` (uuid, references communities)
  - `user_id` (uuid, references user_profiles)
  - `content` (text) - post content
  - `image_url` (text) - optional image
  - `likes_count` (integer) - number of likes
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on community_posts table
  - Community members can view posts
  - Authenticated users can create posts in communities they've joined
  - Users can update/delete their own posts
*/

-- Create community_posts table
CREATE TABLE IF NOT EXISTS community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id uuid REFERENCES communities(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  image_url text DEFAULT '',
  likes_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Community members can view posts"
  ON community_posts FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM community_members
      WHERE community_members.community_id = community_posts.community_id
      AND community_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create posts in joined communities"
  ON community_posts FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM community_members
      WHERE community_members.community_id = community_posts.community_id
      AND community_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own posts"
  ON community_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts"
  ON community_posts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_community_posts_community ON community_posts(community_id, created_at DESC);