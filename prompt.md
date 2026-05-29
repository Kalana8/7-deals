Build a single-page React functional prototype for "DealzAU" — 
an Australian deals & community platform.

## Brand colors
Primary green: #047c1f
Primary yellow: #fdc800
Black: #0d0d0d
White: #ffffff
Light gray bg: #f5f5f5
Card border: #e8e8e8

## Goal
Maximum user engagement and time-on-site for Australian users.
Dense with deals but not cluttered. Fast-feeling UI.

---

## TECH
React single file. useState for all state.
Tailwind CSS via CDN.
No backend. All dummy data hardcoded.
Images: use https://picsum.photos/seed/[keyword]/400/300

---

## DUMMY DATA — AUSTRALIAN MARKET

### 24 deal cards
All Australian brands and retailers.
Each has: id, brand, title, code, originalPrice (AUD), 
salePrice (AUD), discount, expiry (days), category, 
image (picsum url), description, featured: bool

Australian brands to use:
Woolworths, Coles, Bunnings, JB Hi-Fi, Harvey Norman,
The Iconic, Cotton On, David Jones, Myer, Dan Murphy's,
Menulog, Uber Eats, Doordash, Chemist Warehouse,
Officeworks, Rebel Sport, BCF (Boating Camping Fishing),
SuperCheap Auto, Kmart Australia, Target Australia,
Boost Juice, Grill'd, Guzman y Gomez, Hungry Jack's,
Flight Centre, Webjet, Airbnb Australia, Qantas,
Petbarn, Anaconda

Price ranges in AUD:
Food deals: $5–$30 off
Retail: $20–$150 off
Travel: $50–$300 off
Tech: $30–$200 off

Sample promo codes (Australian style):
WOOLIES10, JBHIFI20, ICONIC15, CHEMMIE25, 
BUNNINGS30, MENULOG5, FLYQF50, WEBJET30

Categories: Food & Drink, Tech, Fashion, Travel, 
Health & Beauty, Home & Garden, Outdoors, Groceries, 
Pets, Auto, Sports

### 12 community posts
Australian users posting deals. Usernames:
OzBargainKing, SydneyDeals, MelbFoodie, 
BrisbaneBargains, PerthSaver, AdelaideDealz,
AussieShopaholic, QLDMum, NSWTechGuy, 
VICFashionista, SAGardenGuru, WASurfer

Deal examples they post:
- "Woolies half price chips this week"
- "JB Hi-Fi Samsung TV $400 off"
- "Guzman y Gomez BOGO burrito Tuesday"
- "Chemist Warehouse 40% off vitamins"
- "Flight Centre $200 off Bali packages"

### 3 consumer stores (Australian businesses)
1. "OzTech Deals" — electronics, 8 products (AUD prices)
2. "Aussie Bites Bakery" — food/bakery, 6 products
3. "DownUnder Fashion" — clothing, 10 products

Products priced in AUD. Stock descriptions in 
Australian English ("G'day", "arvo", "heaps good").

### 5 users
user@demo.com / password → "Matilda W." Sydney, NSW
consumer@demo.com / password → "OzTech Deals" owner
admin@demo.com / password → "Admin"
Dummy commenters: "BlakeyB" Melbourne, "TashFromPerth"

---

## ANNOUNCEMENT BAR
Black bg, yellow text.
"🔥 247 new deals today — Updated for Aussie shoppers 🦘 
⭐ Top retailers updated"
Right: Sign In | Register

---

## NAVBAR
Logo: "Dealz" black bold + "AU" in #047c1f green + 
yellow tag icon.
Nav: Trending | All Deals | Community | Retailers | 
Search "Search Aussie deals..."

---

## DEAL TICKER ROW 1 — PILL TICKER
Australian brands scrolling:
Woolworths WOOLIES10 · 10% OFF · Expires in 3 days |
JB Hi-Fi JBHIFI20 · $200 OFF · Expires in 1 day |
The Iconic ICONIC15 · 15% OFF · Expires in 5 days |
Chemist Warehouse CHEMMIE25 · 25% OFF · 2 days |
Menulog MENULOG5 · $5 OFF · Expires today |
Hungry Jack's HUNJACKS · Whopper $3 · 4 days |
Qantas FLYQF50 · $50 OFF flights · 7 days |
Bunnings BUNNINGS30 · 30% OFF tools · 3 days

## DEAL TICKER ROW 2 — CARD TICKER
Same Australian brands, colorful cards:
Woolworths (green #007837 brand color)
JB Hi-Fi (yellow/red brand feel — use #FFD100 bg)
The Iconic (black bg)
Chemist Warehouse (red #E31837)
Kmart (red)
Cotton On (dark navy)
David Jones (black)
Bunnings (dark green + orange)
Harvey Norman (dark red)
Rebel Sport (black)
Dan Murphy's (dark red)
Uber Eats (black)

---

## FEATURED DEAL
Rotate between top 3 Australian deals every 8s.
Example featured deals:
1. "Samsung 65" QLED TV — $800 OFF at JB Hi-Fi" 
   Code: JBHIFI20, Was $2,499 → Now $1,699 AUD
2. "Return flights Sydney to Bali — $299 pp"
   Code: FLYQF50, Was $599 → $299 AUD
3. "Dyson V15 Vacuum — $200 OFF"
   Code: DYSON200, Was $999 → $799 AUD

Countdown timer in AEST timezone label 
"Expires AEST 11:59 PM"

---

## TRENDING DEALS GRID
Australian deals. Show AUD prices with $ sign.
"Heaps of savings 🦘" as section subtitle.
Price always shown as: ~~$XX.00~~ → $XX.00 AUD

Deal card footer text examples:
"Grab it before it's gone, mate! 🔥"
"Legendarily good deal 🤙"

---

## COMMUNITY PANEL
Floating button label: "Aussie Community 🦘"
Modal header: "Aussie Deal Community 🇦🇺"
Subtitle: "Real deals found by real Aussies"

Post a deal form placeholder text:
Store name: "e.g. Woolworths, JB Hi-Fi..."
Deal title: "e.g. Half price chips at Woolies"
Link: "Paste the deal link here, mate"

Hot deals badge: "🔥 Heaps Hot"

---

## STORE PAGES
OzTech Deals — "Sydney's best tech deals 🇦🇺"
Products: MacBook Air M3, Samsung Galaxy S24, 
Sony WH-1000XM5 headphones, iPad Pro,
DJI Mini 4 Pro drone, GoPro Hero 12,
Garmin Forerunner watch, Bose SoundLink speaker
Prices in AUD.

Aussie Bites Bakery — "Freshly baked Aussie goodness"
Products: Lamingtons (6 pack), Anzac Biscuits,
Tim Tam gift box, Meat pie (dozen),
Pavlova kit, Vegemite scrolls
Prices: $8–$45 AUD

DownUnder Fashion — "Aussie style, Aussie prices"
Products: Akubra hat, RM Williams boots,
Rip Curl wetsuit, Billabong boardshorts,
Country Road dress, Bonds underwear pack,
Quiksilver hoodie, UGG boots, Birkenstocks AU,
Seafolly swimwear
Prices: $29–$450 AUD

---

## AUTH MODAL
Login success toast: 
"Welcome back, [name]! 🦘 Ready to find some ripper deals?"

Register note: 
"Join thousands of Aussie bargain hunters! 🇦🇺"

Consumer registration note:
"Consumer accounts need admin verification. 
We'll be in touch within 1 business day (AEST)."

---

## TOAST MESSAGES (Australian tone)
- "✓ Code copied! Go get that bargain, mate! 🤙"
- "✓ Deal saved to your list!"
- "👋 Welcome back! Heaps of new deals waiting!"
- "✓ Deal posted to the Aussie community! 🦘"
- "Please sign in to grab this deal"

---

## FOOTER
Links: About | Contact | Advertise With Us | 
For Businesses | Terms & Conditions | Privacy Policy
Tagline: "Australia's #1 community deals platform 🇦🇺"
"Prices in AUD. Deals verified by the DealzAU community."
ABN placeholder: "ABN: XX XXX XXX XXX"
"🇦🇺 Proudly Australian"

---

## CONSUMER DASHBOARD
Store owner: "OzTech Deals"
Location shown: Sydney, NSW 🇦🇺
Plan badge: "Pro Plan 🇦🇺"
Currency: AUD throughout

## ADMIN PANEL
Same structure as before.
Site name: "DealzAU"
Tagline: "Australia's #1 Community Deals Platform"

---

## AUSTRALIAN UX DETAILS
- All prices in AUD with $ sign
- Timezone references: AEST / AEDT
- "Expiring soon" deals labeled "Ends tonight AEST"
- Location filter pill row below categories:
  All Australia | NSW | VIC | QLD | WA | SA | TAS | ACT | NT
- State badges on community posts 
  (e.g. "Sydney, NSW" next to username)
- Mobile optimised — Australians heavily use mobile 
  for deal hunting
- Fast load feel — skeleton loaders on all cards

---

## ALL OTHER FEATURES
(Keep identical to previous prompt)
- 2-row auto-scroll ticker
- Featured deal with live countdown
- Deal detail modal on card click  
- Community floating button → centered popup modal
- Retailers horizontal scroll section
- Store page modal with tabs
- Consumer dashboard full page
- Admin panel full page
- All login gates on interactive actions
- Toast notifications
- ESC + backdrop close on all modals
- Smooth fade transitions
- Green (#047c1f) CTAs, Yellow (#fdc800) badges/codes