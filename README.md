# FindAPaw Landing Page

A landing page for **FindAPaw**, a pet adoption app. Includes a hero section, "How It Works" overview, a pet showcase, and an adoption application form.

## Files

- `index.html` — page markup
- `styles.css` — styling
- `script.js` — form validation and submission behavior

## Design patterns applied

The adoption application form was audited and refined using the [**Designing Interfaces**](https://www.oreilly.com/library/view/designing-interfaces-3rd/9781492051954/) pattern library (Tidwell, Brewer & Valencia, 3rd ed., O'Reilly 2020). The following named patterns were applied:

### Forms (ch. 10 — Getting Input from Users)

| Pattern | What changed | Why |
|---|---|---|
| **One column beats multi-column** | Email and Phone fields were stacked into a single column instead of side-by-side. | Single-column forms are faster and less error-prone to complete than multi-column layouts. |
| **Match the control to the data** | Home Type changed from a `<select>` dropdown to visible radio buttons (House / Apartment). | For a small, closed set of options (2), radios show all choices at a glance; dropdowns unnecessarily hide them behind a click. |
| **Input Hints** | Added short helper text under the Email and Phone fields (e.g. "We'll only use this to contact you about your application."). | Answers the user's question at the exact moment it arises, preventing hesitation or errors before they happen. |
| **Good Defaults / Smart Prefills** | Added `autocomplete="name"`, `autocomplete="email"`, and `autocomplete="tel"` attributes. | Lets the browser prefill known values, reducing typing and errors — the cheapest field is one the user only has to confirm. |
| **Error Messages** | Replaced reliance on native browser validation tooltips with custom, field-level error messages shown on blur/submit. Errors are specific ("Please enter your email address"), positioned next to the field, and entered values are always preserved. | Bad errors ("Invalid input") strand users; specific, human-worded errors turn a failure into a quick fix and preserve trust. |

### Actions (ch. 8 — Doing Things: Actions and Commands)

| Pattern | What changed | Why |
|---|---|---|
| **Prominent "Done" Button** | The submit button remains the single, full-width, high-contrast primary action, labeled with a specific verb ("Submit Application") rather than a generic label. | Users finish a task and look for the way to commit it; the button must be unmistakable and specific about what it does. |
| **Spinners and Loading Indicators** | Submitting the form now disables the button, shows a spinner, and displays "Submitting…" before the success message appears. | Silent waits read as frozen or broken; visible feedback during an in-progress operation maintains user trust and patience. |

## Running locally

Serve the folder with any static file server, for example:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.
