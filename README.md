# Jon D. Elton — Website Enhancement Project

Personal website refresh for Jon D. Elton (jondelton.com).
Jon is a singer, poet, family man, and writer who sends a monthly newsletter
called "Gems from Jon" to ~1,075 subscribers.

## Repository Contents

```
jondelton-website/
├── README.md                # This file
├── demo/                    # Full multi-page static demo (open index.html)
│   ├── index.html           # Home (with featured YouTube video)
│   ├── lake-house.html      # The Elton Lake House
│   ├── poems.html           # D.H. Elton Poems index
│   ├── poems/*.html         # 8 full poems
│   ├── desiderata.html      # My Desiderata (full text)
│   ├── thoughts-poems.html  # Thoughts & Poems
│   ├── music.html           # Interactive YouTube video gallery
│   ├── family.html          # Family
│   ├── jons-gems.html       # Gems from Jon archive
│   ├── css/style.css        # Shared styles + animations
│   ├── js/main.js           # Mobile nav + scroll reveal + form feedback
│   ├── js/youtube.js        # YouTube channel integration (15 real videos)
│   └── img/                 # Free photos (Public Domain / CC0, Wikimedia Commons)
├── child-theme/
│   ├── style.css            # WordPress child theme (child of Hello Elementor)
│   └── functions.php        # Enqueues styles + small tweaks
└── docs/
    ├── site-audit.md        # What the current site has / needs
    ├── roadmap.md           # Plan for the next 3 months
    └── newsletter-migration.md  # Mailchimp -> free ESP switch
```

## Why This Repo Exists

This is a working project board for the website work. Every change to the
site's design or code can be tracked here, so we always know:

- What was changed
- When it was changed
- Why it was changed
- How to roll it back if needed

## Current Site — Quick Summary

| Item           | Value                                    |
|----------------|------------------------------------------|
| URL            | https://jondelton.com                    |
| Platform       | WordPress 7.0.3                          |
| Theme          | Hello Elementor (parent)                 |
| Page builder   | Elementor 4.2.2                          |
| Current pages  | Home, Lake House, D.H. Elton Poems,
|                | My Desiderata, Jon's Thoughts & Poems,
|                | Family                                   |
| Newsletter     | "Gems from Jon" via Mailchimp ($65/mo)   |
| Subscribers    | ~1,075 (open rate < 50%)                 |
| Admin email    | jondelton@gmail.com (updated Aug 2026)   |

## Demo

Open `demo/index.html` in any browser to see the proposed new site.
It is a complete multi-page static demo with:

- Real content pulled from jondelton.com (poems, Desiderata, lake house reviews, family)
- A navy + gold palette that matches Jon's original branding
- Free photos (Public Domain / CC0 from Wikimedia Commons)
- **Interactive YouTube integration** — all 15 real videos from
  `youtube.com/@jondelton`, with category filters, a click-to-play featured
  player, and a subscribe button (see `demo/music.html` and `demo/js/youtube.js`)
- **Animated ambient background** — soft drifting color, floating orbs and
  music notes (respects `prefers-reduced-motion`)
- Scroll-reveal animations, mobile nav, and a working newsletter sign-up form (demo only)
- Pages: Home, Lake House, D.H. Elton Poems (8 poems), My Desiderata,
  Thoughts & Poems, Music & Videos, Family, Jon's Gems archive

No server needed — open `index.html` in any browser.

## Next Steps

1. Review the demo and roadmap together (our meeting).
2. Set up a staging copy of the live site for safe experimentation.
3. Export the Mailchimp audience and import to a free ESP.
4. Build the child theme and apply visual refresh on staging.
5. Launch when Jon is happy with the result.
