# Site Audit — jondelton.com

Performed: August 11, 2026

## What the site has right now

### Platform & Tech
- **CMS:** WordPress 7.0.3 (up to date)
- **Theme:** Hello Elementor 2.5.0 (lightweight starter theme)
- **Page Builder:** Elementor 4.2.2 (free) — all pages built with it
- **Plugins detected:** PDF Poster, PDF Embedder, Elementor, Elementor Pro (referenced)
- **Hosting:** Unknown (need to check with Byron or hosting panel)

### Pages & Navigation
| Page                       | URL                                         | Notes                          |
|---------------------------|---------------------------------------------|--------------------------------|
| Home                      | jondelton.com                               | Welcome text + photo of Jon & Mary |
| Lake House                | /elton-lake-house-2/                        | Family lake house info         |
| D.H. Elton Poems          | /d-h-elton-poems-2/                         | Grandfather's poems            |
| My Desiderata             | /my-desiderata/                             | Personal affirmation page     |
| Jon's Thoughts & Poems    | /jons-thoughts-and-poems/                   | Collected poems/thoughts       |
| Family                    | /jon-d-elton-family                         | Family page                    |

### Newsletter
- **Name:** "Gems from Jon"
- **Platform:** Mailchimp (currently paid, ~$65/month)
- **List size:** ~1,075 subscribers
- **Open rate:** Less than 50% (per Jon)
- **Sending blocked:** As of July 17 (Mailchimp limits hit)
- **Sign-up form on site:** There IS a simple email-capture form in the footer ("Enter your email to receive Jon's Gems" + "Yes, Please" button), but it does NOT appear connected to Mailchimp — it's a raw Elementor form that may just email Jon or sit unconnected. **Needs investigation.**

### Other Observations
- Header uses image-based buttons (PNG tabs) rather than text — not mobile-friendly or accessible
- Mobile layout has a different header with stacked image tabs
- Photos load from plain HTTP (`http://jondelton.com/wp-content/...`) while the site is HTTPS — mixed-content issue, browsers may warn
- No visible SEO meta tags (no description, no Open Graph tags)
- No Google Analytics or Search Console verification detected
- Footer copyright reads "© 2020" — outdated
- No blog/news post archive visible — "Thoughts & Poems" is likely a static page, not a post feed
- Commenting not enabled on any page

## Security Concerns (URGENT)

1. **Admin password shared in plain email** ("mormon100") — this is a weak, publicly-exposed password. **Must be changed immediately** before any other work.
2. **No 2FA** — should enable two-factor authentication on the admin account.
3. **Admin email** has been changed to jondelton@gmail.com (good) — must confirm the WordPress verification email.

## What the site needs (priority order)

| Priority | Need                          | Why                                                   |
|----------|-------------------------------|-------------------------------------------------------|
| 1        | Change admin password + 2FA   | Current credentials are compromised via email         |
| 2        | Fix mixed-content (HTTP→HTTPS)| Browsers warn users; hurts trust & SEO               |
| 3        | Switch newsletter ESP        | Mailchimp blocked, $65/mo is overpriced for 1 send/mo |
| 4        | Make site responsive/mobile   | Image-tab nav breaks on phones                        |
| 5        | Add SEO basics               | No meta tags, no analytics                             |
| 6        | Convert "Thoughts & Poems" to a real blog | Enables archive, search, comments, RSS     |
| 7        | Modernize the visual design  | Dated layout, small text, not reflective of Jon        |
| 8        | Add donation button          | Jon's Africa children's cause                          |
| 9        | Embed songs/YouTube           | Showcase Jon as a singer                              |
| 10       | Backup solution               | No visible backup system                               |
