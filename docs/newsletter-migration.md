# Newsletter Migration — "Gems from Jon"

## The Problem

- **Current provider:** Mailchimp
- **Cost:** jumped to ~$65/month
- **Usage:** one email per month to ~1,075 subscribers
- **Status:** sending blocked as of July 17 (per Jon's July 15 email)
- **Open rate:** less than 50% — many contacts may not be engaged

That is a lot of money for one email a month, and we risk losing the list
entirely if Mailchimp fully locks the account.

## The Plan

### Step 1 — Export Contacts (Jon, 5 minutes)

In Mailchimp:
1. Audience → Manage Audience → **Export Audience**
2. Choose the "Gems from Jon" audience
3. Wait for the CSV download link (email or button)
4. Save the file — it is ours now, even if we leave Mailchimp

### Step 2 — Pick a Free Replacement (Recommendation: MailerLite)

| Provider    | Free tier                                   | Notes                                      |
|-------------|---------------------------------------------|--------------------------------------------|
| **MailerLite** | 1,000 subscribers, 12,000 emails/month     | Easiest editor, simple CSV import, built-in forms. **Best fit.** |
| Brevo (Sendinblue) | Unlimited contacts, 300 emails/day     | Good automations, but daily cap is limiting |
| Mailjet      | 2,000 contacts, 6,000 emails/month          | Fine, but limits are lower                  |

**Why MailerLite:** free for Jon's list size, has a drag-and-drop editor,
imports the CSV directly, and can embed a sign-up form on the WordPress site
so the footer form actually captures emails into the new list.

### Step 3 — Create the Account & Verify Domain

1. Sign up at MailerLite (free tier, no card needed).
2. Add a "Gems from Jon" subscriber group.
3. Verify ownership of `jondelton.com` (simple DNS/HTML tag step).
   - Without this, emails are more likely to land in spam.

### Step 4 — Import the CSV

1. MailerLite → Subscribers → Import
2. Upload the exported CSV
3. Map the `Email` column; ignore duplicate rows (MailerLite handles this)
4. Run the import and check the count

### Step 5 — Build the Newsletter Template

- Recreate the "Gems from Jon" header/colors (navy + gold palette).
- Keep the personal letter format — plain and warm, just like Jon writes.
- Add a footer with unsubscribe (auto-added by MailerLite, which is required by law).

### Step 6 — Connect the Website Sign-up Form

The current site footer has a raw Elementor form ("Enter your email to receive
Jon's Gems") that is **not** connected to any email list. Options:

1. **MailerLite official WordPress plugin** (simplest) — replace the footer form
   with MailerLite's embeddable form. New sign-ups land in the list instantly.
2. **Elementor + MailerLite integration** — keep the look of the current form,
   wire it to MailerLite via their Elementor form action (works with Elementor Pro).
3. **Shortcode** — MailerLite provides a shortcode we can paste into the footer.

### Step 7 — Test, Then Switch

1. Send a test email to your own address (and Jon's) using the template.
2. Verify the sign-up form adds a new subscriber.
3. Confirm the unsubscribe link works.
4. Only then tell readers (via the next "Gems" issue) that they may get a
   double-opt-in confirmation email from the new provider.

### Step 8 — Cancel Mailchimp

After the move, export all data one final time and cancel the paid plan
so the $65/month charge stops.

## Cost Comparison

| Item                | Before (Mailchimp) | After (MailerLite) |
|---------------------|--------------------|--------------------|
| Monthly cost        | ~$65               | **$0**             |
| Emails/month        | 1                  | Up to 12,000       |
| Subscribers covered | 1,075              | 1,000 (free tier)  |
| Contacts ownership  | Mailchimp          | Ours (exportable CSV) |

**Savings: ~$780/year** — money that could instead go toward Jon's cause for
children in Africa.

## Risks & How We Handle Them

- **Unengaged contacts** — optional "re-engagement" email; otherwise the open
  rate will stay low and may hurt deliverability. We can prune contacts that
  haven't opened in 12+ months (only with Jon's approval).
- **Spam filters** — solved by domain verification + a clean list + consistent
  monthly sending.
- **Contact loss** — avoided by exporting the CSV **before** touching anything.

## Decision Needed From Jon

1. Which provider? (Recommend **MailerLite**.)
2. Keep all 1,075 contacts, or prune inactive ones?
3. Should we send one final "we've moved" email from Mailchimp before switching?
