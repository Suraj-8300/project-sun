# Project Sun Website Redesign Handoff

## Overview

The public homepage has been reshaped from a hub with separate destinations into a single-page personal portfolio. The visual direction combines an editorial portfolio layout with the brighter, grid-based accents from the supplied references. The featured visual is a screenshot of the V-NEURON routing app, not a stock portrait.

The landing page includes:

- Intro, role, location, and contact calls to action
- Anchored Work, About, Notes, and Contact sections
- D1-backed project cards, notes, and social/contact links
- Responsive navigation and reduced-motion support
- Protocol validation and escaped database text before rendering

## Admin Panel & Content Console

Accessing the Admin Drawer:
- Direct route: Navigating to `/admin` opens the admin console automatically.
- Discreet footer link: Click the "Admin Console" button at the bottom of the page.
- Hidden trigger: Five quick clicks on the site name in the header also opens the drawer.

Features & Controls:
- **SUNDB Live Telemetry**: Live stats bar showing counts of projects, notes, and active links fetched from `/api/admin/stats`.
- **Profile Tab**: Granular editing for identity (name, role, location), Signal Strip curiosities, About statement & bio, technical skills, and contact coordinates & email.
- **Projects Tab**: Complete metadata management:
  - Fields: Name, Category badge, Status, Tech stack tags, Live URL, Preview Image URL, Primary Action CTA Label, Primary Action CTA URL, Sort Order, and Pinned status.
  - Reordering: Move Up (⬆️) and Move Down (⬇️) buttons alongside HTML5 drag-and-drop reordering.
- **Posts Tab**:
  - Filter pills: Filter by type (`All`, `Blog`, `Log`, `Photo`).
  - Search filter: Real-time text search across post titles and contents.
  - Markdown composer: Quick-insert toolbar for Images, Videos, Audio, and Links with live character counter.
  - Frontend rendering: Supports Markdown links (`[text](url)`), bold, italics, inline code, blockquotes, and media embeds with XSS sanitization.
- **Links Tab**:
  - Real-time SVG icon preview based on the platform name (supporting GitHub, LinkedIn, LeetCode, X, Instagram, YouTube, Discord, Telegram, Substack, Medium, Codeforces, Resume/CV, and generic links).
  - Categorization into `social`, `contact`, or `internal`.
- **UX & Security**:
  - Replaced browser `alert()` popups with responsive toast notifications (`showAdminToast`).
  - Automatic 401 token invalidation: Stale or revoked credentials prompt immediate re-authentication.
  - Protocol validation on external links (`http:`, `https:`, `mailto:`, or internal relative paths).

## V-NEURON Basemap

V-NEURON uses CARTO's keyed Voyager raster tiles. Leaflet requests the `@2x` tile variant on high-density displays. The API key is intentionally used by the browser tile URL as required by CARTO; it is not repeated in this document.

## Database Changes

Versioned D1 migrations in `migrations/`:

- `migrations/0001_projects_ordering_and_pins.sql` adds project ordering and pin fields.
- `migrations/0002_site_profile_settings.sql` creates and seeds the editable profile settings table.
- `migrations/0003_projects_metadata_and_settings.sql` adds `category`, `summary`, `image_url`, `action_label`, `action_url` to `projects` and seeds extended site settings (`about_statement`, `about_detail`, `skills`, `curiosities`, `contact_email`, `contact_coordinate`).

`schema.sql` is updated to reflect all schema extensions and seed rows for fresh bootstrap deployments. For existing deployments, apply versioned migrations sequentially via Wrangler.

## Verification

- **Vitest worker tests**: 17 passed (100% passing across public routes, `/admin`, auth validation, unauthenticated mutation guards, profile updates, project creation with metadata, and admin stats).
- **TypeScript check**: `npx tsc --noEmit` passed cleanly (0 errors).
- **Wrangler types**: `npx wrangler types` synchronized.
- **Local Dev Server**: Run `npx wrangler dev`; the site is served at `http://localhost:8787/` (or `http://localhost:8787/admin`).

## Git And Deployment Status

Before deploying to Cloudflare:
1. Apply migrations to remote D1: `npx wrangler d1 migrations apply SUNDB --remote`
2. Ensure the `ADMIN_KEY` secret is configured: `npx wrangler secret put ADMIN_KEY`
3. Deploy worker & assets: `npx wrangler deploy`
