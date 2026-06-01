const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Parse .env.local manually to avoid extra dependencies
let supabaseUrl = '';
let supabaseServiceKey = '';

try {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const envLines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of envLines) {
      const match = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = match[2] || '';
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
        
        if (key === 'NEXT_PUBLIC_SUPABASE_URL') supabaseUrl = val.trim();
        if (key === 'SUPABASE_SERVICE_ROLE_KEY') supabaseServiceKey = val.trim();
      }
    }
  }
} catch (err) {
  console.error("Error reading .env.local:", err);
}

supabaseUrl = supabaseUrl || process.env.NEXT_PUBLIC_SUPABASE_URL;
supabaseServiceKey = supabaseServiceKey || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase configuration in .env.local!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runSeed() {
  console.log("Reading data.json...");
  const dataPath = path.join(__dirname, '..', 'data.json');
  if (!fs.existsSync(dataPath)) {
    console.error("data.json not found!");
    process.exit(1);
  }
  const rawData = fs.readFileSync(dataPath, 'utf8');
  const data = JSON.parse(rawData);

  console.log("Migrating Building...");
  const { error: bErr } = await supabase.from('buildings').upsert([data.building]);
  if (bErr) throw bErr;

  console.log("Migrating Floors...");
  const { error: fErr } = await supabase.from('floors').upsert(data.floors);
  if (fErr) throw fErr;

  console.log("Migrating Suites...");
  const { error: sErr } = await supabase.from('suites').upsert(data.suites);
  if (sErr) throw sErr;

  console.log("Migrating Businesses...");
  const cleanBusinesses = data.businesses.map(b => {
    const { suite, ...rest } = b;
    return rest;
  });
  const { error: busErr } = await supabase.from('businesses').upsert(cleanBusinesses);
  if (busErr) throw busErr;

  console.log("🎉 Database Migration Successful!");
}

runSeed().catch(err => {
  console.error("Migration failed:", err);
  process.exit(1);
});
