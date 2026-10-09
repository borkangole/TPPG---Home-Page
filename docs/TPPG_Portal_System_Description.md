# TPPG Portal — System Description

**Project:** The Premier Property Group (TPPG) Portal
**Type:** Real estate listing and management system (capstone project)
**Stack:** Node.js / Express (backend) · Supabase / PostgreSQL (database) · Vanilla HTML, JavaScript, Tailwind CSS (frontend) · Hosted on Railway

---

## 1. Overview

The TPPG Portal is a role-based web application that manages a real estate sales organization end-to-end — from agent recruitment and team hierarchy, to property/unit listings, buyer records, commission computation, and commission payout tracking from developers. Every role has its own dashboard, scoped to what that role is allowed to see and do.

---

## 2. System Roles & Hierarchy

| Role | Login | Dashboard | Can add clients? | Sees org chart? |
|---|---|---|---|---|
| **Admin** | ID + email + password | `admin-dashboard.html` | No (view/manage only) | Full company org chart |
| **Unit Manager (UM)** | UM-ID + email + password | `team-dashboard.html` | Yes | Own downward team |
| **Sales Manager (SM)** | SM-ID + email + password | `team-dashboard.html` | Yes | Own downward team |
| **Team Leader (TL)** | TL-ID + email + password | `team-dashboard.html` | Yes | Own downward team |
| **Agent** | Agent-ID + email + password | `agent-dashboard.html` | Yes | Own team (read-only) |

**Hierarchy:** Admin → Unit Manager → Sales Manager → Team Leader → Agent

Agents can report directly to a Sales Manager or Unit Manager, skipping Team Leader. Sales Managers can be "solo," reporting to no Unit Manager.

### Applying & Approval
- Anyone applies via the public **Register** page as an "Agent" applicant.
- Admin reviews applicants under **Pending Agents** and approves them into a role (Agent / Team Leader / Sales Manager / Unit Manager), assigning their place in the hierarchy and a Commission Rank.
- Approving into a management role migrates the applicant's row into the corresponding table, reusing their hashed password.

### Generated IDs
Each role gets an auto-generated ID: `AGT-xxxxx`, `TL-xxxxx`, `SM-xxxxx`, `UM-xxxxx`, `ADMIN-xxxxx`. Login requires **ID + email + password** for every role.

---

## 3. Commission System

Commission is **per-person**, assigned by Admin at approval/edit time.

| Role | Rank Options | Base Rate |
|---|---|---|
| Agent | Property Specialist / Junior PS / Senior PS | 2.0% / 2.5% / 2.75% |
| Team Leader | Team Leader (only tier) | 3.0% |
| Sales Manager | Sales Manager / Junior SM / Senior SM | 3.25% / 3.5% / 3.7% |
| Unit Manager | Unit Manager (only tier) | 4.0% |

**Net commission formula:**
`Gross = TCN × Rate% → Net = Gross − (10% Withholding Tax) − (3% Percentage Tax)`
(TCN = Total Net Price, the sale's contract price basis.)

- **Commission Monitoring** (Admin): breakdown by role level — Rank, Rate, TCN, Gross, Withholding, Percentage Tax, Net.
- **Commission** (UM/SM/TL/Agent's own dashboard): shows their personal rank/rate/TCN/gross/net, computed only from sales they personally recorded.
- **Computation Tool**: standalone gross→net calculator available to every role.

### Manager Overrides & Incentives (per sale)
- Set directly inside the **Add/Edit Commission Release** form (Commission Monitoring page): Team Leader Override, Sales Manager Override, Unit Manager Override, and Incentive — all optional, all tied to a specific sale.
- **Visibility is strictly scoped:**
  - Each manager/Team Leader sees only **their own** override amount, on their own Sales & Buyers page.
  - **Incentive is visible only to the specific agent who made that sale** — shown on their own Commission tab, never to their Team Leader, Sales Manager, Unit Manager, or teammates.

### Commission Receivables (tranches from developers)
Admin logs each commission **release from a developer** against a specific sale:
- Developer (auto-derived from the linked sale), Linked Sale, Release Date, Notes.
- **Type:** Monthly Tranche (enter Monthly Amount + Number of Months, total auto-computed) or Annual (single Amount).
- Overrides & Incentive for that sale are entered in the same form.
- Every agent/TL/SM/UM sees their own **"My Commission Releases"** on their dashboard, scoped to sales they personally made.

---

## 4. Teams

- **Admin → Teams page:** browse Unit Managers / Sales Managers / Team Leaders / Agents as flat cards, or drill into an animated org chart rooted at any node.
- **UM/SM/TL → My Team page:** same org-chart style, rooted at themselves, drilling into subordinates.
- **Agent → My Team page (read-only):** rooted at whoever the agent reports to (their TL, or SM, or UM), showing the agent alongside their teammates. No edit controls — pure viewing.
- Every card shows role, ID, and (on management dashboards) **Personal Sales** vs **Team Sales** (rolled up).
- A **"Reports To"** badge in the sidebar shows Sales Managers and Team Leaders who their immediate superior is.

---

## 5. Property Listings

**Structure:** Developer → Property → Units (three-level drill-down), consistent across every role's dashboard (view-only for everyone except Admin, who can add/edit/delete).

- **Developers:** name, logo, optional Drive link.
- **Properties:** name, location, image, Property Type (Condo / House and Lot / Lot), Selling Status (RFO / Pre-selling), map pin (Leaflet + Nominatim geocoding).
- **Units:** unit name, TCP, Reservation Fee, Full Downpayment, Downpayment Terms (months), auto-computed Monthly DP, Bedrooms (including a **Studio** option), Sqm, Lot Type, Furnishing, Construction Status (RFO / Under Construction / **Pre-selling**, each with its own est. finish date support), unit status (Available / Hold / Sold, auto-managed based on buyer records).
- Unit detail view (all roles) shows the full downpayment breakdown: Reservation Fee, Full Downpayment, Monthly DP, and Downpayment Terms — not just TCP.

### Property Search
Available on every dashboard. Filters: **Type**, **Selling Status**, **Location** (free text), and **Filter By** (TCP / Monthly DP / Full DP) with independent Min/Max fields — either can be used alone.
- Selling Status matching also checks each unit's own Construction Status, so a property/unit status mismatch doesn't hide otherwise-matching listings.
- Clicking a result that matched on a budget filter jumps straight to that **specific unit's** detail view, not just the property's unit list.

---

## 6. Sales & Buyers

- Each role (Agent, TL, SM, UM) records their **own** clients from their dashboard; Admin only views/deletes.
- **Admin's "Sales & Buyers"** page: Sales Dashboard (org-chart drill-down of Personal vs Team Sales) and Buyer Dashboard (flat table of every client).
- **UM/SM/TL's "Sales & Buyers"** page shows their whole downward team's sales, with a "Sold By" column and their own Override column — never Incentive.
- **Agent's "My Clients"** page shows only their own sales — no Override or Incentive columns (Incentive lives in their Commission tab instead).
- Recording a buyer against a unit automatically marks it **Sold**; deleting/reassigning reverts it to **Available**.

---

## 7. Reports & Analytics

**Admin** — five tabs, each with two Chart.js charts, stat cards, a data table, and CSV export: Sales Summary, Team Performance, Inventory, Commission Payout, Portfolio Overview.

**UM/SM/TL** — team-scoped only: stat cards, sales-by-month line chart, sales-by-team-member bar chart.

---

## 8. Deployment

- **Repo:** `Jamespadilla1/tppg-portal-updated-`
- **Hosting:** Railway (auto-deploys on push), `node server.js`
- **Database:** Supabase (PostgreSQL), Supabase Storage for images
- **Auth:** JWT
- Standard deployment loop:
  1. Apply any needed SQL (`ALTER TABLE` / `CREATE TABLE`) in the Supabase SQL Editor.
  2. Update the relevant file(s) in `public/`, `controllers/`, or `routes/`.
  3. Push:
     ```powershell
     cd "C:\Users\ASUS TUF\OneDrive\Documents\tppg-portal-updated-"
     git add .
     git commit -m "..."
     git push
     ```
  4. Railway auto-deploys.

---

## 9. Known Gaps

- Dashboard (Admin Overview) redesign still pending final content/layout decisions.
- Thesis manuscript (Chapters 1–5) is a separate, parallel-track deliverable, not part of this technical build.
