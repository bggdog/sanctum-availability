# How to Update Service Availability in Your Database

## Current Database Structure

Each zip code has **both** boolean fields (legacy) and status fields (new):

### Legacy Boolean Fields (still supported):
- `speech_therapy` (true/false)
- `occupational_therapy` (true/false)
- `physical_therapy` (true/false)

### New Status Fields (recommended):
- `speech_therapy_status` ('available', 'needs_confirmation', 'unavailable')
- `occupational_therapy_status` ('available', 'needs_confirmation', 'unavailable')
- `physical_therapy_status` ('available', 'needs_confirmation', 'unavailable')

---

## Status Values & Colors

- **'available'** → 🟢 **Green** - Service is available
- **'needs_confirmation'** → 🟡 **Yellow** - Call to confirm availability
- **'unavailable'** → 🔴 **Red** - Service not available

---

## Method 1: Using Supabase SQL Editor (Recommended)

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/zpkhfwwaintjrldrkcqj
2. Click on **"SQL Editor"** in the left sidebar
3. Click **"New Query"**
4. Paste one of these queries and modify as needed:

### Example: Set Physical Therapy to Yellow for zip code 76054

```sql
UPDATE public.zip_code_services
SET physical_therapy_status = 'needs_confirmation'
WHERE zip_code = '76054';
```

### Example: Set Speech Therapy to Green for zip code 76054

```sql
UPDATE public.zip_code_services
SET speech_therapy_status = 'available'
WHERE zip_code = '76054';
```

### Example: Set Occupational Therapy to Red for zip code 76054

```sql
UPDATE public.zip_code_services
SET occupational_therapy_status = 'unavailable'
WHERE zip_code = '76054';
```

### Example: Update multiple services at once

```sql
UPDATE public.zip_code_services
SET 
  speech_therapy_status = 'available',
  occupational_therapy_status = 'needs_confirmation',
  physical_therapy_status = 'unavailable'
WHERE zip_code = '76054';
```

5. Click **"Run"** to execute the query
6. Refresh your application to see the changes!

---

## Method 2: Using Supabase Table Editor

1. Go to your Supabase dashboard
2. Click on **"Table Editor"** in the left sidebar
3. Select the **`zip_code_services`** table
4. Find the row for your zip code (e.g., 76054)
5. Click on the status field you want to change
6. Select from the dropdown: `available`, `needs_confirmation`, or `unavailable`
7. The changes save automatically!

---

## Method 3: Bulk Updates

If you need to update multiple zip codes at once:

```sql
-- Set Physical Therapy to Yellow for multiple zip codes
UPDATE public.zip_code_services
SET physical_therapy_status = 'needs_confirmation'
WHERE zip_code IN ('76054', '76102', '75201');
```

---

## Common Update Scenarios

### Scenario 1: Set Physical Therapy to Yellow for 76054
```sql
UPDATE public.zip_code_services
SET physical_therapy_status = 'needs_confirmation'
WHERE zip_code = '76054';
```

### Scenario 2: Set Speech Therapy to Green for 76052
```sql
UPDATE public.zip_code_services
SET speech_therapy_status = 'available'
WHERE zip_code = '76052';
```

### Scenario 3: Set all services to specific statuses for a zip code
```sql
UPDATE public.zip_code_services
SET 
  speech_therapy_status = 'available',
  occupational_therapy_status = 'available',
  physical_therapy_status = 'needs_confirmation'
WHERE zip_code = '76054';
```

### Scenario 4: Add a completely new zip code
```sql
INSERT INTO public.zip_code_services 
(zip_code, state, city, latitude, longitude, speech_therapy_status, occupational_therapy_status, physical_therapy_status, service_coverage_level) 
VALUES
('12345', 'TX', 'New City', 32.7767, -97.3308, 'available', 'available', 'needs_confirmation', 5);
```

---

## Understanding the Priority System

When a zip code has multiple locations, the system shows the **most restrictive** status:
- If ANY location has 'unavailable' → Red
- Else if ANY location has 'needs_confirmation' → Yellow
- Else if ANY location has 'available' → Green

---

## Tips

- **Always test** in the SQL Editor first before running destructive queries
- Use `WHERE zip_code = 'XXXXX'` to be specific about which row you're updating
- The `service_coverage_level` field (1-5) affects map visualization but NOT the availability colors
- Refresh your app after making changes to see them immediately
- Status fields take precedence over boolean fields if both are present

---

## Migration from Booleans

If you still have data in the boolean fields, you can migrate it:

```sql
-- Migrate from boolean to status (one-time migration)
UPDATE public.zip_code_services
SET 
  speech_therapy_status = CASE WHEN speech_therapy = true THEN 'available' ELSE 'unavailable' END,
  occupational_therapy_status = CASE WHEN occupational_therapy = true THEN 'available' ELSE 'unavailable' END,
  physical_therapy_status = CASE WHEN physical_therapy = true THEN 'available' ELSE 'unavailable' END;
```

---

## Need Help?

If you get an error message, make sure:
1. You're connected to the right Supabase project (zpkhfwwaintjrldrkcqj)
2. You have the correct table name (`zip_code_services`)
3. Your SQL syntax is correct (use the examples above as templates)
4. Status values are exactly: 'available', 'needs_confirmation', or 'unavailable'
