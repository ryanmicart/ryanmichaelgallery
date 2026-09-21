# Ryan Michael Artist Website - Project Context

**Location:** C:\Users\rsm80\OneDrive\Documents\Art Website\website_project

## Files
- index.html - main page: hero slideshow, about/bio, reels, photography tabs, inequality exhibition, contact/FAQ/shipping
- artwork.html - detail page with zoom, gallery mockups, wall preview, purchase quote form
- styles.css - all styling
- script.js - hero slideshow, reels autoplay, photography tabs, newsletter popup, image protection (catalogue/filter code guarded — not active)
- detail.js - zoom, tabs, wall preview, purchase quote form, image protection
- faq.html, shipping.html - exist but not linked (content merged into #contact section)
- inequality-exhibition/ - 5 real photos
- reels/ - 20 MP4 files (7 numbered originals + 13 named reels)

## Features Implemented (May 2026)

### Purchase Options (Quote-based)
No prices shown. Users select product type (Fine Art Print, Mug/Cup, T-Shirt, Tablet Skin) and size, then fill a quote request form with name, preferred contact method (email and/or phone checkboxes that show/hide fields), and optional message.

### Image Protection
- Canvas-based watermark overlay ("© Ryan Michael") on all artwork images (15% opacity, repeating diagonal pattern)
- Right-click disabled on image containers
- CSS drag disabled (user-drag: none, user-select: none)
- Visibility-change blur (images blur when tab loses focus to deter capture tools)
- Print media query hides images
- Images remain clickable for navigation and zoom

### Inequality Exhibition 2026
- Dedicated section on index.html with nav link "Inequality 2026"
- 5 real photos from C:\Users\rsm80\OneDrive\Documents\Art Website\Inequality Exhibition Images\ copied into inequality-exhibition/ subfolder:
  - scooter fam bnw.jpg
  - 20260220_095709 2.jpg
  - Hunger India 2.JPG
  - _MG_0945 mono.JPG
  - 20251222_192215(1).jpg
- Responsive grid (auto-fill, minmax 280px)
- Watermark protection applied

### Typography
- Title font changed to Cormorant Garamond (Google Fonts) — artistic, minimalist serif
- Applied to: .logo, h2, .hero-overlay h2
- Weights loaded: 300, 400, 600, italic 300
- Current weight: 600 (bold) for logo and all headings
- Body text remains Helvetica Neue

### Responsive Design
- Fluid typography via clamp() for logo, h2, hero heading, hero paragraph, hero image height
- Breakpoints: ≤480px (mobile), 481–768px (tablet), 769–1024px (small laptop), ≥1400px (large/4K)
- Nav links use white-space: nowrap and tighter spacing (1.4rem) to stay on one line
- Tablet breakpoint no longer stacks header vertically — stays in a row
- Large screen breakpoint adds slightly larger base font and wider grid cards

### Existing Features (pre-existing)
- Catalogue with search, year/theme/topic filters
- Cart system with size/price selection
- Wishlist buttons
- Artwork detail page with click-to-zoom, gallery/living room mockups, wall preview tool
- Related works section
- Newsletter popup

## Tech Stack
- Static HTML/CSS/JS (no framework, no backend)
- Images from picsum.photos (placeholder) + real photos in inequality-exhibition/
- No build tools
- Google Fonts: Cormorant Garamond

## Deployment
- Hosting: GitHub Pages
- GitHub username: ryanmicart
- Repository: ryanmichaelgallery
- URL (once live): https://ryanmicart.github.io/ryanmichaelgallery
- To deploy: push to `main` branch, then enable Pages in repo Settings → Pages → Deploy from branch → main / root
- Git push requires a Personal Access Token (not account password) — generate at github.com → Settings → Developer settings → Personal access tokens → Tokens (classic) → repo scope
- Git was installed but needs a fresh terminal session to be recognised in PATH

## Session Updates (May 19 2026)

### GitHub Deployment
- Repo initialized and pushed to https://github.com/ryanmicart/ryanmichaelgallery
- GitHub Pages enabled — deploys from main branch / root
- Git user set to ryanmicart (noreply email)

### Under Development Banner
- Added dark banner at top of index.html: "🚧 This website is currently under development. Some features may be incomplete."

### Enquiry Forms → info@ryanmichael.com.au
- Using Formspree: https://formspree.io/f/mkoegqqq
- Contact form (index.html): action set to Formspree endpoint
- Quote request form (artwork.html / detail.js): async fetch POST to Formspree with artwork, product, size, name, email, phone, message fields
- Fallback message directs users to email directly if submission fails
- Note: Formspree email must be verified to receive submissions

### Custom Domain
- Domain: ryanmichael.com.au (hosted via Crazy Domains, email via Titan)
- DNS A records added in Crazy Domains pointing to GitHub Pages IPs:
  185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- CNAME record: www → ryanmicart.github.io
- Custom domain set in GitHub repo Settings → Pages → ryanmichael.com.au
- Status: DNS pending propagation (up to 24hrs), HTTPS will auto-provision after

## Session Updates (June 21 2026)

### Saatchi-Inspired Redesign
Inspired by saatchiart.com. Goal: cleaner, more gallery-like UX with fewer tabs.

#### Nav — reduced to 3 tabs only
- Gallery · Inequality 2026 · Contact
- Removed: About, Media & Events, Shipping, FAQ as separate nav items

#### Hero
- Now full-viewport height (100vh) instead of fixed clamp height
- Single CTA: "View Works" button

#### About / Bio
- Moved inline as a section below the hero on index.html
- No longer a separate nav destination

#### Artwork Cards
- Removed: price dropdowns, Add to Cart button, wishlist heart
- Added: medium + dimensions subtitle (e.g. "Photography · 60 × 80 cm")
- Added: "Enquire" hover overlay on each card image (links to #contact)
- Cart sidebar and cart JS removed from index.html (cart still exists in detail.js / artwork.html if needed)

#### Filter Chips
- Replaced 3 dropdown selects (Year, Theme, Topic) with horizontal pill chip buttons
- Two filter rows: Year chips + Theme chips
- Active chip highlighted in black

#### Contact Section (merged)
- Enquiry form remains at top
- Shipping & Returns accordion added below form
- FAQ accordion added below shipping
- faq.html and shipping.html still exist as files but are no longer linked from nav or footer

#### Files changed
- index.html — full rewrite
- styles.css — hero full-viewport, chip styles, enquire overlay, work-meta, info-block
- script.js — chip filter logic, removed cart/wishlist/size-select code

#### Deployed
- Commit: a4f74fc
- Pushed to main → ryanmichael.com.au (GitHub Pages)

## Session Updates (July 2 2026)

### About / Bio — Updated with real text
- Source file: C:\Users\rsm80\OneDrive\Documents\Art Website\About Me.docx
- Replaced placeholder bio in #about section of index.html with real biography
- 5 paragraphs covering: practice overview, academic background (Curtin Master's, Myanmar thesis, apprenticeship with Bamba Surang in Mauritius), evolution from street photography to portraiture, themes of inequality and immigrant identity, artistic philosophy
- Commit: 610c7eb

### Reels Section — Added
- 7 MP4 files copied from C:\Users\rsm80\OneDrive\Documents\Art Website\Art Reels\ into website_project/reels/
- Files: 17890768773052858.mp4, 17923116144005158.mp4, 17947289363907724.mp4, 18048375338092318.mp4, 18049870856087218.mp4, 18069077215678762.mp4, 18364597924186010.mp4
- New #reels section added to index.html between Gallery and Inequality 2026
- "Reels" nav link added (nav is now: Gallery · Reels · Inequality 2026 · Contact)
- Portrait aspect ratio (9:16) grid — auto-fill minmax 200px columns
- On large screens (≥1200px): all 7 in a single row
- On mobile (≤480px): 2-column grid
- Behaviour: autoplay muted loop when scrolled into view (IntersectionObserver, 50% threshold), click to pause/resume
- Commit: a4003dd

### DNS Issue — Not yet resolved
- Site is NOT live at ryanmichael.com.au due to DNS misconfiguration in Crazy Domains
- Root domain A records mostly correct (GitHub Pages IPs) but 27.124.125.171 (Crazy Domains) also present — needs removing
- www CNAME resolves only to 27.124.125.171 — NOT pointing to ryanmicart.github.io
- Fix required in Crazy Domains DNS settings:
  1. Change www CNAME value to: ryanmicart.github.io
  2. Remove 27.124.125.171 from root A records — keep only:
     185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
  3. After propagation: confirm GitHub Pages Settings → Custom domain = ryanmichael.com.au, Enforce HTTPS ticked
- GitHub Pages and all code pushes are working correctly — DNS is the only blocker

## Session Updates (July 2 2026 — Evening)

### Hero Slideshow
- Replaced single static cover image (Freedom.JPG) with a 3-image crossfade slideshow
- Images cycle every 5 seconds with a 1-second fade transition
- Cover images used:
  1. Freedom.JPG (already in website_project/)
  2. _MG_1545.JPG — copied from C:\Users\rsm80\OneDrive\Documents\Art Website\Cover Images\
  3. _MG_1372.JPG — copied from C:\Users\rsm80\OneDrive\Documents\Art Website\Cover Images\
- Implementation:
  - index.html: `.hero-slideshow` div containing 3 `.hero-slide` divs with background-image; first slide has `class="active"`
  - styles.css: slides are `position: absolute; opacity: 0` by default; `.active` sets `opacity: 1` with `transition: opacity 1s ease-in-out`
  - script.js: `setInterval` at top of DOMContentLoaded rotates `.active` class every 5000ms
- Commit: fb45235
- Pushed to main → ryanmichael.com.au (GitHub Pages)

## Session Updates (July 5 2026)

### 13 New Named Reels Added
- New MP4 files copied from C:\Users\rsm80\OneDrive\Documents\Art Website\Art Reels\ into website_project/reels/
- Files added (kebab-case names):
  - indian-freedom.mp4
  - lewis-hamilton.mp4
  - barrack-obama.mp4
  - abstract-city-scape.mp4
  - indigenous-lady.mp4
  - gandhi.mp4
  - anthony-bourdaine-train.mp4
  - actor-orange.mp4
  - contemporary-lady-portrait.mp4
  - lady-panther.mp4
  - finding-our-way-home.mp4
  - ady-fidelin-paris.mp4
  - nelson-mandela.mp4
- All 13 added as reel-card entries in index.html with .reel-title labels
- Total reels on page: 20 (7 original numbered + 13 new named)
- Commit: 69a8e58

### Mobile JS Crash Fix
- Bug: script.js called `document.getElementById("search-input").addEventListener(...)` — but #search-input was removed in the June redesign
- This caused an uncaught TypeError on page load, crashing all JS (reels, tabs, newsletter) on mobile
- Fix: wrapped all catalogue/search/filter/chip code in a guard (`if (cards.length && searchInput)`) so it only runs when those elements exist
- Also added null checks throughout for robustness
- Additional fixes in index.html:
  - Hero CTA "View Works" button: changed href from broken `#catalogue` → `#reels`
  - Nav: removed duplicate "Gallery" link (both Gallery and Reels pointed to #reels); nav is now: Reels · Photography · Inequality 2026 · Contact
- Commit: ad0decb
- Pushed to main → ryanmichael.com.au (GitHub Pages)

## Session Updates (August 12 2026)

### Nav Tab Renamed
- "Inequality 2026" → "Inequality Exhibition" in nav and section heading

### Inequality Exhibition — 4 Sub-tabs Added
- Section now has 4 clickable sub-tabs using the same pattern as Photography tabs
- CSS classes: `.ineq-tabs`, `.ineq-tab`, `.ineq-tab.active`, `.ineq-panel`, `.ineq-panel.active`
- JS: new block in script.js using `data-panel` attribute and `ineq-panel-{name}` IDs
- Tab 1: **Motivation** — real content from Exhibition Motivation.docx ("The Exhibition" section)
- Tab 2: **Inspiration** — real content from Exhibition Motivation.docx ("The Inspiration" section)
- Tab 3: **Message** — real content from Exhibition Motivation.docx ("The Message" section)
- Tab 4: **Merchandise** — placeholder (content pending)
- Source file: C:\Users\rsm80\OneDrive\Documents\Art Website\Inequality Exhibition\Exhibition Motivation.docx

### Exhibition Posters Copied to website_project
- poster-mps.png — Manning Primary School Library, 5–11 Oct
- poster-langley.png — Langley Park Pavillion, 3–4 Oct
- Source: C:\Users\rsm80\OneDrive\Documents\Art Website\Promotional Material\

### Pending
- Exhibition banner / front-page poster promotion (not yet implemented — in progress)
- Merchandise tab content (images in C:\Users\rsm80\OneDrive\Documents\Art Website\Merchandise\: 79651.png, 79653.png, 79666.png, 79668.png)

## Session Updates (August 28 2026)

### DNS Issue — Root Cause Confirmed (Site inaccessible from all devices)
- Users cannot access the site from mobile or desktop — confirmed DNS misconfiguration is the cause
- The website code (HTML/CSS/JS) is correct and fully functional — not a code issue
- Fix required in Crazy Domains DNS settings:
  1. **Root A records** — remove `27.124.125.171` (Crazy Domains IP); keep ONLY:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
  2. **www CNAME** — change value from `27.124.125.171` to: `ryanmicart.github.io`
  3. After propagation (up to 24hrs): confirm in GitHub repo Settings → Pages that custom domain = `ryanmichael.com.au` and "Enforce HTTPS" is ticked
- GitHub Pages, all code, and deployment pipeline are working correctly

### Current Site State (as of this session — code confirmed)
- index.html: hero slideshow → about/bio → exhibition banner (posters) → reels (20 videos) → photography tabs (South Africa, Namibia, Mauritius, India, Australia-placeholder) → inequality exhibition tabs (Motivation, Inspiration, Message, Merchandise) → contact/FAQ/shipping
- Nav: Reels · Photography · Inequality Exhibition · Contact
- Exhibition banner live on homepage with poster-langley.png and poster-mps.png
- Merchandise tab in Inequality Exhibition: 4 images (79651.png, 79653.png, 79666.png, 79668.png)
- All photography images in website_project/photography/ subfolders (south-africa, namibia, mauritius, india)
- Font: Ubuntu (Google Fonts)
- No catalogue/gallery section (removed in June 2026 redesign)

## Notes
- Instagram sharing not implemented (Instagram API doesn't support posting from static sites; discussed alternatives)
- Screenshot prevention is best-effort (watermark is the real protection since OS-level screenshots can't be blocked)
- faq.html and shipping.html can be deleted — content is now in the Contact section of index.html
- Font: Ubuntu (Google Fonts) — applied to logo, headings, body. Earlier notes referencing Cormorant Garamond are outdated.
- DNS issue (Crazy Domains misconfiguration) unresolved as of August 28 — see August 28 session notes for fix instructions

## Session Updates (September 3 2026)

### Old Exhibition Flyers Removed
- Deleted `poster-mps.png` and `poster-langley.png` from `website_project/` (outdated venue-specific posters)
- `poster-all-dates.png` (Sep 03, 3.7MB) retained as the current exhibition flyer
- Neither deleted file was referenced in any HTML/CSS/JS (only mentioned in PROJECT_CONTEXT.md)

### Hero Slideshow — Updated with Cover Images
- Replaced old hero slides (Freedom.JPG, _MG_1545.JPG, _MG_1372.JPG) with 3 new cover images
- New images copied from `C:\Users\rsm80\OneDrive\Documents\Art Website\Cover Images\` into `website_project/`:
  - cover-1.JPG (4.1MB)
  - cover-2.JPG (3.8MB)
  - cover-3.JPG (8.8MB)
- index.html hero-slide divs updated to reference cover-1.JPG, cover-2.JPG, cover-3.JPG
- Old images (Freedom.JPG, _MG_1545.JPG, _MG_1372.JPG) still in website_project/ but no longer used
- Commit: 766a5f1
- Pushed to main → GitHub Pages


## Session Updates (September 14 2026)

### Hero Slideshow — Expanded to 6 Cover Images
- 3 additional cover images added from `C:\Users\rsm80\OneDrive\Documents\Art Website\Cover Images\`:
  - cover-4.JPG (4.3MB)
  - cover-5.JPG (4.1MB)
  - cover-6.JPG (4.2MB)
- index.html hero slideshow updated from 3 slides to 6 slides
- Committed and pushed to main

## Session Updates (September 18 2026)

### Exhibition Poster Updated
- New flyer copied from `C:\Users\rsm80\OneDrive\Documents\Art Website\Promotional Material\Art Exhibition Poster - Ryan Michael.png` (dated Sep 18)
- Replaced `poster-all-dates.png` in `website_project/` (same filename, no HTML change needed)

### Nav Tab Renamed
- "Inequality Exhibition" → "Marginalised Exhibition" in both the nav link and section heading (index.html)

### Exhibition Section — Clarified as Paintings Exhibition
- Intro line updated to: "A collection of original paintings exploring themes of social and economic inequality."
- Inspiration panel: added opening sentence — "The Marginalised is an exhibition of original paintings — each work hand-painted in oils on canvas or board. It is not a photographic exhibition."
- Merchandise panel intro updated to reference "the Marginalised paintings series"

### Hero Slideshow — Expanded to 11 Cover Images
- 5 new cover images added today (Sep 18) from `C:\Users\rsm80\OneDrive\Documents\Art Website\Cover Images\`:
  - cover-2.jpg (2.9MB) — replaced old cover-2.JPG
  - cover-4.jpg (3.6MB) — replaced old cover-4.JPG
  - cover-6.jpg (2.8MB) — replaced old cover-6.JPG
  - cover-7.JPG (4.2MB) — new
  - cover-8.jpg (1.8MB) — new
  - cover-9.JPG (3.9MB) — new
  - cover-10.jpg (1.4MB) — new
  - cover-11.JPG (4.3MB) — new
- index.html hero slideshow updated from 6 slides to 11 slides (cover-1 through cover-11)
- Note: cover-2, cover-4, cover-6 file extensions changed from .JPG to .jpg (new files from source folder)

### Profile Image — Real Photo Added
- Source: `C:\Users\rsm80\OneDrive\Documents\Art Website\Profile\profile pic painting.png`
- Copied to `website_project/profile.png`
- index.html #about section: replaced placeholder `https://picsum.photos/seed/ryanm/400/500` with `profile.png`

### SSL / HTTPS
- Site shows "Not Secure" warning — discussed fix:
  - Hosted on GitHub Pages with custom domain ryanmichael.com.au (registrar: Crazy Domains)
  - Fix: in GitHub repo Settings → Pages, ensure custom domain is set and tick "Enforce HTTPS"
  - DNS A records must point only to GitHub Pages IPs (see August 28 notes)
  - No certificate purchase needed — GitHub Pages provisions free SSL via Let's Encrypt

### Commits (Sep 18)
- d8b9da5 — Update poster, cover images (1–11), and exhibition section text
- 81bfff7 — Add real profile image to Ryan Michael bio section


## Session Updates (September 20–21 2026)

### RSVP Modal — Launch Event
- RSVP button added to exhibition banner in index.html
- Modal dialog with form fields: First Name, Last Name, Email, Phone, Number of Guests
- Submits to Formspree (same endpoint: mkoegqqq) with subject "RSVP — Launch Event 3 Oct"
- Success state shown after submission; form resets on close
- Keyboard accessible (Escape key closes modal)

### Exhibition Banner — Layout & Venue Updates
- All 5 exhibition venues listed in the banner (3 Oct Launch, 4 Oct Open Day, 5–11 Oct Manning Primary, 12–17 Oct Indian Society of WA, 18 Oct Rod Evens Community Centre)
- Supported by: City of Perth & Indian Society of Western Australia

### Exhibition Map — Added
- Interactive Leaflet.js map showing all 4 venue pin locations on Perth metro area
- Dark background section below the exhibition banner
- Custom gold circular markers with popup showing venue name, dates, and times

### Photography — Additional Cover Images
- cover-9.JPG through cover-11.JPG and 8 additional cover images added to hero slideshow (now 11 total)

### DNS / Email Fix (Sep 21 2026)
- Titan email stopped working — error: "SPF records not set correctly"
- Root cause: SPF TXT record was missing from Crazy Domains DNS
- Fix applied: Added new TXT record `v=spf1 include:spf.titan.email ~all` in Crazy Domains
- Existing DKIM TXT record (`v=DKIM1; k=rsa; p=...`) retained — DKIM and SPF are separate records
- Both email and SSL certificate issues resolved after SPF record added

### Bamba Photos Design Elements — Incorporated (Sep 21 2026)
Inspired by bambaphotos.com (French-Senegalese photographer Bamba Sourang, Ryan's mentor)

#### Editorial Intro Section (#editorial-intro)
- New section added to index.html between the hero and the exhibition banner
- Two-column layout (desktop): left column has preface label ("Art & Practice"), heading ("Portraiture as witness"), and 2-sentence editorial body copy
- Right column: pull-quote blockquote attributed to Ryan Michael
- Mobile: stacks to single column
- CSS classes: `#editorial-intro`, `.editorial-preface`, `.editorial-heading`, `.editorial-body`, `.editorial-pull`, `.pull-quote`

#### Featured Works Carousel (#featured-works)
- Horizontal scroll carousel added below the editorial intro
- 6 slides using cover-1, cover-3, cover-5, cover-7, cover-9, cover-11 images
- Each slide has a caption label (e.g. "Portraiture & Identity", "Cultural Observation")
- Background: off-white (#f7f5f2) — warm, editorial feel
- Drag to scroll (mouse) + native touch scroll on mobile
- "View All Works →" CTA links to Reels page
- CSS classes: `#featured-works`, `.featured-carousel`, `.featured-slide`, `.featured-caption`
- JS: drag-to-scroll on `.featured-carousel-wrap`

#### Photography Country Descriptions (.photo-description)
- Short evocative paragraph added above the photo grid for each country tab
- South Africa: contradiction, resilience, end-of-day light
- Namibia: silence, scale, the oldest desert
- Mauritius: where photographic practice was shaped under Bamba Sourang's mentorship
- India: heritage, insider/outsider tension, staggering contrast
- Styled with left border line and italic text

#### CSS Added (styles.css)
- `#editorial-intro` — two-column grid, responsive
- `.pull-quote` — left-bordered blockquote on off-white background
- `#featured-works` — carousel section with off-white background
- `.featured-carousel-wrap` — overflow-x scroll, drag cursor, no scrollbar
- `.photo-description` — italic bordered description under each photo tab
