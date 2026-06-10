// Validates that data/schedule-data.js parses correctly and has required fields.
const fs = require('fs');

const src = fs.readFileSync('data/schedule-data.js', 'utf8');
const match = src.match(/var SCHEDULE_DATA\s*=\s*(\{[\s\S]*\});/);
if (!match) {
  console.error('ERROR: Could not find SCHEDULE_DATA in data/schedule-data.js');
  process.exit(1);
}

let data;
try {
  data = JSON.parse(match[1]);
} catch (e) {
  console.error('ERROR: schedule-data.js contains invalid JSON:', e.message);
  process.exit(1);
}

const VALID_TYPES = new Set(['meeting', 'starparty', 'virtual', 'outreach']);
const REQUIRED = ['date', 'type', 'time', 'title', 'details', 'location'];
let errors = 0;

for (const month of data.months) {
  if (!month.name) { console.error(`ERROR: month missing "name"`); errors++; }
  for (const ev of month.events) {
    for (const field of REQUIRED) {
      if (!ev[field] && ev[field] !== 0) {
        console.error(`ERROR: [${month.name}] event "${ev.title || '?'}" missing required field "${field}"`);
        errors++;
      }
    }
    if (!VALID_TYPES.has(ev.type)) {
      console.error(`ERROR: [${month.name}] event "${ev.title}" has unknown type "${ev.type}". Must be: ${[...VALID_TYPES].join(', ')}`);
      errors++;
    }
  }
}

if (errors) {
  process.exit(1);
}

const total = data.months.reduce((n, m) => n + m.events.length, 0);
console.log(`schedule-data.js OK — ${data.months.length} months, ${total} events`);
