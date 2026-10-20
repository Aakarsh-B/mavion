# mavion.in

The Mavion website: one static page, hosted free on GitHub Pages. Every push to `main` is live within a minute or two.

## Files

| File | What it is |
|---|---|
| `index.html` | All page text and sections |
| `css/style.css` | Colours, fonts and layout |
| `js/script.js` | Menu, scroll effects and the "message sent" note on the form |
| `images/` | Logos, favicon and section images |

## Editing

- **Text:** open `index.html` on GitHub, click the pencil icon, change the words, then **Commit changes**.
- **Images:** open `images/`, click **Add file → Upload files**, and upload the new image with the **same filename** as the one it replaces.
- Keep the HTML tags (`<p>`, `<h2>`, `<a href=...>`) as they are and change only the text between them.

## Contact form

The form sends through [FormSubmit](https://formsubmit.co) to **maya@mavion.in**. There is no server code.

- To change the inbox, edit `action="https://formsubmit.co/maya@mavion.in"` in `index.html`. FormSubmit emails the new address an activation link on the first enquiry, and nothing is delivered until that link is clicked.
- After sending, the visitor comes back to `mavion.in/?sent=1#contact` and sees a "message sent" note.
- The hidden `_honey` field catches spam bots. Leave it in place.

## Email and DNS

Email runs on **Zoho Mail**, not on this website. Changing this repo never affects email. The Zoho records (MX, SPF, DKIM `zmail._domainkey`, DMARC and the `zoho-verification` TXT) live in the domain's DNS and must never be deleted.
