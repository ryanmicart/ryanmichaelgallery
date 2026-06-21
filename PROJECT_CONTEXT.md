# Ryan Michael Artist Website - Project Context

**Location:** C:\Users\rsm80\OneDrive\Documents\Art Website\website_project

## Files
- index.html - main page with catalogue, hero, cart, newsletter, inequality exhibition section
- artwork.html - detail page with zoom, gallery mockups, wall preview, purchase options
- styles.css - all styling
- script.js - catalogue filters, cart, wishlist, newsletter, image protection
- detail.js - zoom, tabs, wall preview, purchase quote form, image protection
- faq.html, shipping.html - info pages
- inequality-exhibition/ - folder containing 5 real photos for the Inequality Exhibition 2026 section

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

## Notes
- Instagram sharing not implemented (Instagram API doesn't support posting from static sites; discussed alternatives)
- Screenshot prevention is best-effort (watermark is the real protection since OS-level screenshots can't be blocked)
- faq.html and shipping.html can be deleted — content is now in the Contact section of index.html
