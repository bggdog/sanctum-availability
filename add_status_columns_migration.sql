-- Migration: Add Status Columns for Yellow "Needs Confirmation" Support
-- Run this in your Supabase SQL Editor

-- Step 1: Add status columns (replacing the boolean fields)
ALTER TABLE public.zip_code_services 
ADD COLUMN speech_therapy_status VARCHAR(20) DEFAULT 'available',
ADD COLUMN occupational_therapy_status VARCHAR(20) DEFAULT 'available',
ADD COLUMN physical_therapy_status VARCHAR(20) DEFAULT 'available';

-- Step 2: Migrate existing boolean data to status columns
-- Convert true -> 'available', false -> 'unavailable'
UPDATE public.zip_code_services
SET 
  speech_therapy_status = CASE WHEN speech_therapy = true THEN 'available' ELSE 'unavailable' END,
  occupational_therapy_status = CASE WHEN occupational_therapy = true THEN 'available' ELSE 'unavailable' END,
  physical_therapy_status = CASE WHEN physical_therapy = true THEN 'available' ELSE 'unavailable' END;

-- Step 3: Add constraints to enforce valid status values
ALTER TABLE public.zip_code_services
ADD CONSTRAINT check_speech_therapy_status 
CHECK (speech_therapy_status IN ('available', 'needs_confirmation', 'unavailable'));

ALTER TABLE public.zip_code_services
ADD CONSTRAINT check_occupational_therapy_status 
CHECK (occupational_therapy_status IN ('available', 'needs_confirmation', 'unavailable'));

ALTER TABLE public.zip_code_services
ADD CONSTRAINT check_physical_therapy_status 
CHECK (physical_therapy_status IN ('available', 'needs_confirmation', 'unavailable'));

-- Step 4: Set NOT NULL constraints
ALTER TABLE public.zip_code_services
ALTER COLUMN speech_therapy_status SET NOT NULL,
ALTER COLUMN occupational_therapy_status SET NOT NULL,
ALTER COLUMN physical_therapy_status SET NOT NULL;

-- You can now drop the old boolean columns if you want (optional):
-- ALTER TABLE public.zip_code_services
-- DROP COLUMN speech_therapy,
-- DROP COLUMN occupational_therapy,
-- DROP COLUMN physical_therapy;

