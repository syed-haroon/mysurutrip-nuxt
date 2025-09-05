## **📝 PRD – Tourism Lead Capture MVP**

### **1. Overview**

A fast, SEO-friendly tourism site for Mysuru (and later other locations) that drives organic & social traffic, subtly captures leads via a dynamic trip request form, and nurtures them via WhatsApp Business broadcasts.
No real-time pricing, booking engine, or sign-up required — focus is on *engagement → lead capture → personal quote*.

---

### **2. Goals**

* Generate **high-intent tourism leads**.
* Keep UX **frictionless** while still capturing essential trip details.
* Support **customizable itineraries** based on trip type (honeymoon, family, corporate, solo).
* Maintain **low operational overhead** with a SSG (static site generator), not sure about we need SSR-friendly for the requirement that we have here.

---

### **3. User Flow**

1. User discovers site via SEO, ads, or social media.
2. Browses **listings** (hotels, homestays, dormitories, activities).
3. May **add up to 3 listings** to a *Wishlist* (subtle feature, not attention-grabbing).
4. Clicks **“Get My Best Quote”** → lands on a **Dynamic Trip Form**.
5. Fills in:

   * Trip type (Honeymoon, Family, Business, Friends, Solo)
   * Dates (check-in/out)
   * Guest count
   * Food preferences
   * Add-ons (Campfire, Spa, Taxi, etc.)
   * Contact info (+ WhatsApp opt-in)
6. On submit:

   * WhatsApp message to admin (full lead details).
   * Auto WhatsApp acknowledgment to user.
   * Save to Google Sheet (or Airtable).
   * Add to **WhatsApp Broadcast list** for future offers.

---

### **4. Features**

#### 4.1 Frontend

* **Static pages** via Nuxt for speed + SEO.
* Landing pages for:

  * Destination overview (with images + slider.js and click and zoom images with larger slider)
  * Stay listings (hotels, homestays, dormitories)
  * Things to do (itinerary ideas)
  * Seasonal/event-specific offers
* Wishlist: Stored in localStorage, max 3 items, passed to form on submit.

#### 4.2 Form & Lead Handling

* Form submits to **Netlify Forms** or **Basin** (no backend required).
* Serverless script → sends:

  * WhatsApp to admin
  * WhatsApp acknowledgment to user
  * Stores lead in Google Sheet/Airtable
* Google Apps Script for broadcast list management.

#### 4.3 Add-ons & Monetization

* **Free inclusions:** Pool, gym (if venue provides).
* **Paid upsells:** Campfire, spa, special dinners, local transport.
* **Venue commissions:** Mark-up or referral fee from stays.

---

### **5. Tech Stack**

* **Nuxt** → We need to use Nuxt as Static site generator, I am not sure we need SSR - do the need full config changes to nuxt.config.ts.
* **Hosting:** Netlify/Vercel (fast, scalable, free tier).
* **Forms:** Netlify Forms / Basin (free tier).
* **WhatsApp API:** Twilio or Meta Business API.
* **Storage:** Google Sheets (Apps Script automation) or Airtable.

---

### **6. Admin Tools**

* Google Sheet for lead storage.
* Easy filter by trip type, travel date, and status.
* Manual or automated price calculation before sending quote.
* Broadcast offers via WhatsApp Business.

---

### **7. Why This Works**

✅ Low cost to launch.
✅ SEO & social-driven traffic.
✅ Personal quoting increases booking rates.
✅ Subtle wishlist = psychological nudge without distraction.
✅ Scales to multiple destinations easily.
