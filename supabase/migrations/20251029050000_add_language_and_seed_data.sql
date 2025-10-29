/*
  # Add Language Preference and Seed Data Support

  ## Overview
  Adds language preference support and tables for preset/seed data to enhance new user experience

  ## Changes

  1. Language Preference
    - Add `language_preference` column to `user_preferences` table
    - Support for zh-CN, zh-TW, and en

  2. Important Notes
    - Language preference defaults to 'zh-CN'
    - Existing users will have default language preference
*/

-- Add language_preference column to user_preferences
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_preferences' AND column_name = 'language_preference'
  ) THEN
    ALTER TABLE user_preferences ADD COLUMN language_preference text DEFAULT 'zh-CN';
  END IF;
END $$;
