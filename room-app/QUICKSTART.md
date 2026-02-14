# 🚀 Quick Start Guide - Your Room PWA

## 5-Minute Setup

### Step 1: Get the Files
Download all files into a folder called `room-app`:
- index.html
- styles.css
- app.js
- sw.js
- manifest.json
- icon-192.png
- icon-512.png

### Step 2: Start a Local Server

**Option A - Python (Easiest)**
```bash
cd room-app
python3 -m http.server 8000
```
Open: http://localhost:8000

**Option B - Node.js**
```bash
npm install -g http-server
cd room-app
http-server -p 8000
```
Open: http://localhost:8000

**Option C - VS Code**
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"

### Step 3: Test It
- Click the window → see a message
- Click the character → get a response
- Long-press the character → get a hug
- Click the bed → enter comfort mode
- Click the diary → write an entry

### Step 4: Deploy Online (Optional)

**Netlify (Drag & Drop)**
1. Go to https://netlify.com
2. Sign up (free)
3. Drag your `room-app` folder onto the page
4. Done! You get a URL

**GitHub Pages**
1. Create a GitHub repo
2. Upload all files
3. Settings → Pages → Enable
4. Your site is live at `username.github.io/repo-name`

### Step 5: Install as App

**On Phone:**
- Open the site in browser
- Tap share button
- "Add to Home Screen"
- Now it's an app!

**On Computer:**
- Open the site in Chrome/Edge
- Click install icon (⊕) in address bar
- Click "Install"

---

## What to Try First

1. **Tap the character multiple times** → See them get annoyed after 5 taps
2. **Long-press the character** → Get a hug animation
3. **Click the bed** → Dim comfort mode with slow text
4. **Click the jar** → Pull random notes (keep trying for a long one!)
5. **Open the diary** → Write something, get a contextual response
6. **Click the window** → Different messages based on time of day
7. **Click the music player** → Get mood-based affectionate lines
8. **Come back tomorrow** → See the mood change
9. **Don't visit for 24h+** → Get a "missed you" greeting
10. **Visit at 11:30 PM** → Late night mode activates

---

## Common Issues

**"It's not working offline"**
- Make sure you visited the site at least once while online
- Check if service worker registered: DevTools → Application → Service Workers

**"Changes aren't showing"**
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or increment version in `sw.js`: `'room-app-v1'` → `'room-app-v2'`

**"Can't install to home screen"**
- Make sure you're using HTTPS (localhost is okay)
- Try Chrome/Edge/Safari (Firefox has limited PWA support)

---

## How to Customize

### Change Messages
Open `app.js`, find `MESSAGE_DATABASE`, edit the arrays:
```javascript
window: {
    morning: [
        "your custom message here",
        "another one",
    ]
}
```

### Change Colors
Open `styles.css`, edit at the top:
```css
:root {
    --blush-pink: #FFB3BA;
    --lavender: #C5B9E6;
    /* etc. */
}
```

### Move Objects
Open `styles.css`, find the object (e.g., `.bed`), change position:
```css
.bed {
    bottom: 10%;  /* Distance from bottom */
    left: 15%;    /* Distance from left */
}
```

---

## Need Help?

Read the full **README.md** for:
- Complete customization guide
- Writing guidelines for messages
- Deployment options
- Troubleshooting

Read **ARCHITECTURE.md** for:
- Technical details
- Code structure
- How everything works

---

**You're all set! Enjoy your cozy room 💕**
