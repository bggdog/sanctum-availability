# Upgrading to Status-Based Service Availability (Yellow Support)

## Current Problem

Right now, services are stored as **boolean** fields (`true`/`false`), which only supports Green and Red. To add Yellow (needs confirmation), we need to upgrade to **status-based** fields.

## Migration Steps

### Step 1: Add the New Status Columns

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/zpkhfwwaintjrldrkcqj
2. Click on **"SQL Editor"**
3. Click **"New Query"**
4. Copy and paste the contents of `add_status_columns_migration.sql` into the editor
5. Click **"Run"** to execute the migration

This will:
- Add three new columns: `speech_therapy_status`, `occupational_therapy_status`, `physical_therapy_status`
- Migrate your existing data from booleans to status values
- Set up constraints to only allow: `'available'`, `'needs_confirmation'`, or `'unavailable'`

### Step 2: Update the Code

After running the migration, you'll need to update the frontend code to use the new status fields instead of booleans. I can help with this.

### Step 3: Drop Old Boolean Columns (Optional)

Once everything is working, you can optionally remove the old boolean columns:

```sql
ALTER TABLE public.zip_code_services
DROP COLUMN speech_therapy,
DROP COLUMN occupational_therapy,
DROP COLUMN physical_therapy;
```

---

## Using the New Status System

After migration, you can update statuses like this:

### Make Physical Therapy need confirmation (Yellow) for 76054
```sql
UPDATE public.zip_code_services
SET physical_therapy_status = 'needs_confirmation'
WHERE zip_code = '76054';
```

### Make Speech Therapy available (Green) for 76054
```sql
UPDATE public.zip_code_services
SET speech_therapy_status = 'available'
WHERE zip_code = '76054';
```

### Make Occupational Therapy not available (Red) for 76054
```sql
UPDATE public.zip_code_services
SET occupational_therapy_status = 'unavailable'
WHERE zip_code = '76054';
```

---

## Quick Decision Guide

**Keep it simple (Current):** Use booleans if you only need Green/Red
- ✅ Easier to manage
- ✅ Less data
- ❌ No Yellow support

**Get Yellow support (New):** Migrate to status-based columns
- ✅ Full three-color system
- ✅ More flexible
- ❌ Requires code changes
- ❌ Slightly more complex

---

## What Happens After Migration?

The application will support:
- 🟢 **Green**: Service is available
- 🟡 **Yellow**: Service needs confirmation (call to verify)
- 🔴 **Red**: Service not available

After you run the migration, let me know and I'll update the frontend code to use these new status fields!

