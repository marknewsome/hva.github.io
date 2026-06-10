# Hosting & Repository Notes

## Current repo
- URL: https://github.com/marknewsome/hva.github.io
- Branch: `main`
- Hosted under Mark's personal account (`marknewsome`) as a staging/development repo.

## Moving to the club's own account (recommended)

For a clean nonprofit/club presence, the site should live under a **GitHub Organization**
for the club rather than a personal account.

### Steps
1. Someone with the club's email creates a free GitHub Organization — suggested handle: `hvaastronomy`
2. Transfer this repo to that org: Settings → Danger Zone → Transfer ownership
3. Rename the repo to `hvaastronomy.github.io`
4. Enable GitHub Pages: Settings → Pages → Source: Deploy from branch `main`, folder `/` (root)
5. The site will be live at `https://hvaastronomy.github.io`

### Custom domain (optional)
To serve from `hvaastronomy.com`:
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

## Schedule maintenance

A non-technical club member can update events without touching HTML:

1. Go to https://github.com/hvaastronomy/hvaastronomy.github.io
2. Click `data/schedule.json`
3. Click the pencil icon (Edit)
4. Update the JSON — add/remove events or months following the existing pattern
5. Click "Commit changes"

The site updates automatically within ~1 minute.

### schedule.json event fields
| Field      | Required | Example                                      |
|------------|----------|----------------------------------------------|
| `date`     | yes      | `"14"` or `"TBA"`                            |
| `type`     | yes      | `"meeting"` `"starparty"` `"virtual"` `"outreach"` |
| `time`     | yes      | `"7:00 PM PDT"`                              |
| `title`    | yes      | `"HVA Club Meeting — In Person!"`            |
| `details`  | yes      | `"See email from HVAAstronomy.groups.io"`    |
| `location` | yes      | `"Scott Zimbrick Memorial Fire Station"`     |
| `address`  | no       | `"4950 NW Fair Oaks Dr, Corvallis, OR 97330"` |
| `map`      | no       | `"../hvaastronomy.com/mapadair.htm"`         |
