# Romantic Website (Multi-page)

A soft, multi-page experience: landing, love story timeline, open-when messages, photo gallery with captions, compliment generator, personalized vault, playlist with Spotify embed, surprise easter egg, and a final kiss page.

## Customize
- Swap names, copy, and images in the individual HTML pages (start at `index.html`).
- Update compliments and open-when messages in `script.js`.
- Set allowed nicknames for the unlock in `script.js` (`allowed` array).
- Tweak colors and layout in `styles.css`.

## Run
Open `index.html` directly or serve locally:

```powershell
# From the project folder
Start-Process msedge index.html
```

Or with a quick static server (Node):

```powershell
# Install once
npm i -g serve
# Run
serve -l 5500 .
# Then open http://localhost:5500
```
