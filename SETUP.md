# ESA 2027 — Setup guide (Astro + Sanity + Vercel)

This is the Emerson Souza BJJ site rebuilt from the Webflow export. It looks and animates the same; the difference is that content now lives in **Sanity** (the CMS) and the site is hosted on **Vercel**.

**How the pieces fit**

```
Sanity Studio (yoursite.com/studio)  ──publish──▶  webhook  ──▶  Vercel rebuilds the site (~1 min)
            ▲                                                         │
     you edit content here                                  visitors get fast static pages
```

- **Astro** turns the content into plain HTML pages at build time.
- **Sanity** stores the content. The editor ("Studio") is built into the site at `/studio`.
- **Vercel** hosts the site and rebuilds it whenever the code changes on GitHub or someone hits *Publish* in Sanity.

> The site works before Sanity is connected — it falls back to the content in `seed/content.mjs`, which is the same content. So you can deploy first and connect Sanity second.

---

## 1. Get the code on GitHub

The repo is `loyaldesignco/ESA27`. If the code isn't in it yet, the easiest way is **GitHub Desktop**: *File → Add local repository* → pick this folder → *Publish / Push*.

## 2. Deploy to Vercel (5 min)

1. Go to **vercel.com/new** → *Import Git Repository* → choose **ESA27**.
2. Vercel detects **Astro** automatically. Don't change any settings.
3. Click **Deploy**. In about a minute you get a `…vercel.app` URL with the full site.

## 3. Create the Sanity project (5 min)

1. Go to **sanity.io/manage** and sign in (Google login is fine).
2. **Create new project** → name it `ESA 2027` → choose the **Free** plan → dataset name **`production`** (public).
3. On the project page, copy the **Project ID** (8 characters, e.g. `a1b2c3d4`).
4. Still in sanity.io/manage → your project → **API → CORS origins → Add CORS origin**. Add each of these with **"Allow credentials" checked**:
   - your Vercel URL, e.g. `https://esa27.vercel.app`
   - your real domain later, e.g. `https://souzabjj.com`
   - `http://localhost:4321` (only needed if you run the site on your own computer)

## 4. Connect Vercel to Sanity

1. Vercel → your project → **Settings → Environment Variables**. Add:

   | Name | Value |
   |---|---|
   | `PUBLIC_SANITY_PROJECT_ID` | the Project ID from step 3 |
   | `PUBLIC_SANITY_DATASET` | `production` |
   | `PUBLIC_SITE_URL` | `https://souzabjj.com` (or the vercel.app URL for now) |

2. **Deployments** tab → ⋯ on the latest one → **Redeploy**.

## 5. Load the content into Sanity (one time)

This copies every page's copy, the schedule, the black belt roster, the gallery and all 37 images into Sanity. You need Node.js (nodejs.org → LTS) on your computer.

```bash
# in the project folder
npm install
cp .env.example .env            # then put your Project ID in .env
npx sanity login                # opens the browser once
npm run seed:build              # packs content + images → seed/esa-seed.tar.gz
npm run seed:import             # uploads it to the "production" dataset
```

Then trigger one more redeploy in Vercel (or publish anything in the Studio once step 6 is done). The site is now reading from Sanity.

> Run the import **only once**. It uses `--replace`, so running it again later would overwrite edits made in the Studio with the original content.

## 6. Make "Publish" rebuild the site

1. Vercel → project → **Settings → Git → Deploy Hooks** → name `Sanity publish`, branch `main` → **Create** → copy the URL.
2. sanity.io/manage → project → **API → Webhooks → Create webhook**:
   - **URL:** the deploy hook URL
   - **Dataset:** `production`
   - **Trigger on:** Create, Update, Delete
   - **HTTP method:** POST
   - Leave everything else as is → **Save**.

Now every time someone clicks **Publish** in the Studio, the live site updates about a minute later.

## 7. Editing content

Go to **`https://yoursite/studio`** and sign in with the same Sanity account. (Invite other editors in sanity.io/manage → Members.)

| In the Studio | What it controls |
|---|---|
| **Pages → Home, Adult classes, …** | All copy and images on that page, split into *Hero / Sections / Bottom CTA / SEO* tabs |
| **Class schedule** | Every "Up next" widget, the weekly grids on Home and Schedule, and the opening hours Google sees |
| **Black belts** | The roster. Enter the black-belt date and degrees add themselves on each anniversary (IBJJF 3-3-3-5-5-5). Coaches on the Instructors page link to these records. |
| **Site settings** | Phone, email, address, hours, towns list, social links, footer, the scrolling marquee, and the booking form |

**Headline trick:** headlines are one line per row (each row animates in on its own). Start a row with `*` to make it red — e.g.

```
World
champion
jiu-jitsu
*in Baldwin
```

## 8. The booking form (Google Forms)

The *Book a free class* form on /visit-us submits straight into the existing Google Form — same form and field IDs the Webflow site used, so responses keep landing in the same Google Sheet. The IDs live in **Site settings → Booking form**.

If you ever change the Google Form, to find the new IDs:

1. Open the form in Google Forms → ⋮ menu → **Get pre-filled link**.
2. Type `NAME`, `PHONE` etc. into the fields, pick a class, click **Get link** → **Copy link**.
3. The link contains pieces like `entry.701788627=NAME` — the `entry.701788627` part is the field ID. Paste each into Site settings.
4. **Form response URL** = the form's URL with `/viewform…` replaced by `/formResponse`.
5. If the form collects email addresses automatically, keep **Email field** as `emailAddress`.
6. Each **Class option** has the label shown on the site and the **exact** choice text from the Google Form.

## 9. Custom domain

Vercel → project → **Settings → Domains** → add `souzabjj.com` and follow the DNS instructions. Then update `PUBLIC_SITE_URL`, **Site settings → Live site URL**, and add the domain to Sanity CORS (step 3.4).

---

## For developers

```bash
npm run dev        # http://localhost:4321  (Studio at /studio)
npm run build      # static build → .vercel/output
```

- `src/pages/*.astro` — one file per page; markup is the Webflow export's, class for class.
- `src/styles/` — the Webflow CSS untouched, plus `embeds.css` (code that lived in Webflow embeds).
- `public/js/` — the original GSAP / Lenis / three.js scripts, now reading CMS data from `window.__ESA` instead of hardcoded arrays. jQuery and webflow.js were dropped (the site used no Webflow interactions).
- `schemas/` — Sanity content model. `sanity.config.ts` — Studio layout.
- `seed/content.mjs` — the original content; also the fallback when no Project ID is set.
- `src/lib/content.ts` — the only place pages fetch data.
