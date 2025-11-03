# Spark Map Coverage - Setup Guide

## Overview
This application provides an interactive map showing therapy service coverage by zip code, powered by Supabase and Mapbox.

## Features
- **Real-time zip code search** with Supabase database
- **Interactive map** with actual geographical features using Mapbox
- **Service indicators** positioned at correct coordinates
- **Service coverage visualization** with color-coded markers
- **Responsive design** for all devices

## Setup Instructions

### 1. Environment Variables
Create a `.env` file in the root directory with your Supabase credentials:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

### 2. Supabase Database
The database schema is already set up with the `zip_code_services` table. To add your own data:

```sql
INSERT INTO public.zip_code_services (
  zip_code, 
  state, 
  city, 
  latitude, 
  longitude, 
  speech_therapy, 
  occupational_therapy, 
  physical_therapy, 
  service_coverage_level
) VALUES (
  '12345', 
  'TX', 
  'Your City', 
  32.7767, 
  -96.7970, 
  true, 
  true, 
  false, 
  4
);
```

### 3. Mapbox Token
To enable the interactive map:
1. Get a free token at [mapbox.com](https://mapbox.com)
2. Enter it in the application when prompted
3. The map will show real geographical features with service indicators

### 4. Running the Application
```bash
npm install
npm run dev
```

## Database Schema
The `zip_code_services` table includes:
- `zip_code`: 5-digit zip code
- `state`: 2-letter state code
- `city`: City name
- `latitude`/`longitude`: Coordinates for map positioning
- `speech_therapy`/`occupational_therapy`/`physical_therapy`: Boolean service availability
- `service_coverage_level`: 1-5 intensity rating

## Sample Data
The database includes sample data for:
- Dallas Fort Worth area (75201, 76054, 76102, etc.)
- New York City (10001, 10002, 10003)
- Los Angeles (90210, 90211)
- Chicago (60601, 60602)
- Miami (33101, 33102)

## Map Features
- **Real geographical map** with roads, landmarks, and terrain
- **Interactive markers** with service indicators
- **Clickable popups** showing service details
- **Auto-fit bounds** to show all service locations
- **Navigation controls** for zoom and pan
