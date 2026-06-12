# Hosting & Repository Notes

## Current repo
- URL: https://github.com/hvaastronomy/hvaastronomy.github.io
- Branch: `main`
- Org: `hvaastronomy` (GitHub Organization for the club)
- Live site: https://hvaastronomy.github.io

## Custom domain (optional)
To serve from `hvaastronomy.com` instead of `hvaastronomy.github.io`:
1. In the repo: Settings → Pages → Custom domain → enter `hvaastronomy.com`
2. With your DNS registrar, add these records:
   ```
   A     @   185.199.108.153
   A     @   185.199.109.153
   A     @   185.199.110.153
   A     @   185.199.111.153
   CNAME www hvaastronomy.github.io
   ```
3. Check "Enforce HTTPS" once DNS propagates (can take up to 24 hours).

## Deploying changes
Every push to `main` triggers an automatic GitHub Pages rebuild — the live site
updates within 1–2 minutes. Progress is visible at:
https://github.com/hvaastronomy/hvaastronomy.github.io/actions

## CI checks
Three automated checks run on every push and pull request:

| Check | File | What it catches |
|---|---|---|
| HTML validation | `ci/validate-schedule.js` | Malformed markup, missing alt text, bad nesting |
| Schedule data | `ci/validate-schedule.js` | Invalid JSON, missing fields, unknown event types |
| Internal links | `ci/check-links.js` | Links to pages or assets that don't exist |

A red ✗ on a commit means one of these failed — check the Actions tab for details.

---

## Schedule maintenance

A non-technical club member can update events by editing one file — no HTML knowledge needed.

### Steps
1. Go to https://github.com/hvaastronomy/hvaastronomy.github.io
2. Click `data/schedule-data.js`
3. Click the pencil (Edit) icon
4. Add, remove, or update events following the existing pattern
5. Click **Commit changes** — the site updates within ~1 minute

### Event fields

| Field      | Required | Example |
|------------|----------|---------|
| `date`     | yes | `"14"` or `"TBA"` |
| `type`     | yes | `"meeting"` `"starparty"` `"virtual"` `"outreach"` |
| `time`     | yes | `"7:00 PM PDT"` |
| `title`    | yes | `"HVA Club Meeting — In Person!"` |
| `details`  | yes | `"See email from [HVAAstronomy.groups.io](https://hvaastronomy.groups.io)"` |
| `location` | yes | `"Scott Zimbrick Memorial Fire Station, Walnut Community Room"` |
| `address`  | no  | `"4950 NW Fair Oaks Dr, Corvallis, OR 97330"` |
| `map`      | no  | `"https://maps.google.com/?q=Adair+County+Park,+Corvallis,+OR"` |

### Adding links in the details field
URLs in the `details` text are automatically turned into clickable links on the page.
Two formats are supported:

- **Named link:** `[link text](https://url)` — e.g. `[Facebook](https://www.facebook.com/hvaastronomy)`
- **Bare URL:** `https://hvaastronomy.groups.io` — becomes a clickable link automatically

### Adding a new month
Copy an existing month block and update the `name` and `events`:
```js
{
  "name": "August 2026",
  "events": [
    {
      "date": "11",
      "type": "meeting",
      "time": "7:00 PM PDT",
      "title": "HVA Club Meeting — In Person!",
      "details": "See details in email from [HVAAstronomy.groups.io](https://hvaastronomy.groups.io)",
      "location": "Scott Zimbrick Memorial Fire Station, Walnut Community Room",
      "address": "4950 NW Fair Oaks Dr, Corvallis, OR 97330",
      "map": "https://maps.google.com/?q=4950+NW+Fair+Oaks+Dr,+Corvallis,+OR+97330"
    }
  ]
}
```

### Valid event types
| Type | Badge shown |
|---|---|
| `meeting` | Club Meeting (gold) |
| `starparty` | Star Party (blue) |
| `virtual` | Virtual (purple) |
| `outreach` | Outreach (green) |

---

## Site structure

```
hvaastronomy.github.io/
├── index.html              Home page
├── schedule.html           Events calendar (rendered from data/)
├── articles.html           Article listing
├── membership.html         Dues & PayPal
├── links.html              Curated links
├── articles/               Individual article pages
├── constellations/         Constellation guide pages
├── assets/                 Images, logo, SVG icon, PDFs, PPTs
├── css/style.css           All site styles (single stylesheet)
├── js/
│   ├── nav.js              Hamburger menu + active link
│   ├── schedule.js         Schedule renderer
│   └── home-events.js      Home page event cards renderer
├── data/
│   └── schedule-data.js    ← Edit this to update the schedule
├── ci/                     CI validation scripts
└── docs/                   This documentation
```

## PayPal integration
The membership page uses a PayPal SDK button. The client ID is tied to the account
that originally set up the integration. To identify or change the receiving account,
log in to developer.paypal.com and check "My Apps & Credentials."

Current client ID:
```
ATvqvCgUW_W4YF4w-PLnmhA9rhnyZNCz4nsztpxr6EwXmFBawtlbYkIq-PTvvaL5eVJUZKUQLlimjs6Z
```
