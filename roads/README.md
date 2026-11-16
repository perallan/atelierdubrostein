# ATELIER DU BROSTEIN — ROADS 001 / v0.9

Static photographic journal. Built on v0.8 with **no visual, header, navigation, or animation changes**.

## v0.9 metadata and integrations
- GA4 `G-H5M2D723YM` exactly matches supplied root markup, with one gtag loader + config.
- Cloudflare email-decode script placed before closing `body`, mirroring supplied root. Note: root’s encoded email markup is generated/obfuscated; this page currently has no email address requiring decoding. Cloudflare may add/modify scripts at the edge.
- SEO: distinct canonical URL `/roads/`, robots directive, social/Open Graph/Twitter metadata, site icons, manifest, and supplied Google Search Console verification.
- JSON-LD: Article, WebPage, ImageObject and BreadcrumbList; references existing Organization/WebSite IDs from the root (no competing brand entity).
- Markdown twin: `/roads/index.md`, with `rel=alternate` advertised in HTML and human-readable chronological story with image links.
- Link to `/llms.txt` retained. **Optional**: add `/roads/` and `/roads/index.md` to root sitemap/llms.txt, and add a link from the root page to `/roads/`. Neither root file is altered here.

## Deployment
Place **contents** of this folder inside the web root's `/roads/` directory so both `/roads/` and `/roads/index.md` resolve. Ensure `.md` is served as `text/markdown; charset=utf-8` (Cloudflare Pages static hosting may default otherwise). Do not deploy this ZIP at root: its canonical URL is `/roads/`.

Local: `python3 -m http.server 8080` from this folder, open `http://localhost:8080/`.

No CMS or framework, no bundler. Existing CSS and JavaScript are unchanged from v0.8.
