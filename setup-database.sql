-- Spark Map Coverage - Database Setup
-- Run this in your Supabase SQL Editor

-- Create therapy services lookup table
CREATE TABLE public.zip_code_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  zip_code VARCHAR(10) NOT NULL,
  state VARCHAR(2) NOT NULL,
  city VARCHAR(100) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  speech_therapy BOOLEAN DEFAULT false,
  occupational_therapy BOOLEAN DEFAULT false,
  physical_therapy BOOLEAN DEFAULT false,
  service_coverage_level INTEGER DEFAULT 1 CHECK (service_coverage_level BETWEEN 1 AND 5), -- 1-5 intensity for heatmap
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for fast zip code lookups
CREATE INDEX idx_zip_code_services_zip ON public.zip_code_services(zip_code);
CREATE INDEX idx_zip_code_services_location ON public.zip_code_services(latitude, longitude);

-- Enable Row Level Security (make data publicly readable for this use case)
ALTER TABLE public.zip_code_services ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (since this is service coverage lookup)
CREATE POLICY "Public can view service coverage" 
ON public.zip_code_services 
FOR SELECT 
USING (true);

-- Create policy for admin inserts (if needed later)
CREATE POLICY "Authenticated users can insert service data" 
ON public.zip_code_services 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_zip_code_services_updated_at
BEFORE UPDATE ON public.zip_code_services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for demonstration
INSERT INTO public.zip_code_services (zip_code, state, city, latitude, longitude, speech_therapy, occupational_therapy, physical_therapy, service_coverage_level) VALUES
-- Dallas Fort Worth Area
('75201', 'TX', 'Dallas', 32.7833, -96.8039, true, true, true, 5),
('75202', 'TX', 'Dallas', 32.7833, -96.7939, true, true, false, 4),
('75203', 'TX', 'Dallas', 32.7733, -96.8139, true, false, true, 3),
('76054', 'TX', 'Hurst', 32.8233, -97.1833, true, true, true, 4),
('76051', 'TX', 'Euless', 32.8333, -97.1933, true, true, false, 3),
('76052', 'TX', 'Bedford', 32.8433, -97.2033, false, true, true, 4),
('76102', 'TX', 'Fort Worth', 32.7533, -97.3333, true, true, true, 5),
('76103', 'TX', 'Fort Worth', 32.7433, -97.3433, true, false, true, 3),
('76104', 'TX', 'Fort Worth', 32.7333, -97.3533, false, true, true, 2),
-- Other major cities for testing
('10001', 'NY', 'New York', 40.7589, -73.9851, true, true, true, 5),
('10002', 'NY', 'New York', 40.7152, -73.9877, true, true, false, 4),
('10003', 'NY', 'New York', 40.7312, -73.9897, true, false, true, 3),
('90210', 'CA', 'Beverly Hills', 34.0736, -118.4004, true, true, true, 5),
('90211', 'CA', 'Beverly Hills', 34.0836, -118.4104, false, true, true, 3),
('60601', 'IL', 'Chicago', 41.8856, -87.6235, true, true, true, 4),
('60602', 'IL', 'Chicago', 41.8796, -87.6295, true, false, true, 2),
('33101', 'FL', 'Miami', 25.7823, -80.1977, true, true, false, 3),
('33102', 'FL', 'Miami', 25.7823, -80.1877, false, true, true, 4);

