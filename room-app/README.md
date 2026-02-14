# 🏠 Your Room - Emotional Companion PWA

A soft, cozy Progressive Web App that acts as a private emotional sanctuary. The room itself is the interface—tap objects to receive gentle companionship and affectionate interactions.

## ✨ Features

- **Completely Offline**: Works fully offline after first load
- **Installable**: Add to home screen on mobile and desktop
- **Daily Mood System**: App personality changes daily with weighted randomness
- **Interactive Objects**:
  - 🪟 **Window**: Time-based daily messages, rare shooting stars
  - 👤 **Character**: Tap reactions, long-press hugs, spontaneous interactions
  - 🛏️ **Bed**: Comfort mode with dimmed screen and slow-appearing text
  - 🎵 **Music Player**: Random affectionate lines
  - 📓 **Diary**: Write entries, get contextual responses
  - 🏺 **Jar**: Pull random notes (10% chance for long messages)
- **Special Modes**: Birthday, missed you (24h+ away), late night, rare rain
- **No Notifications Spam**: Only meaningful, optional interactions
- **Local Storage**: All data stored privately in your browser

---

## 🚀 Quick Start - Run Locally

### Method 1: Simple Python Server (Recommended for Beginners)

1. **Download/clone all files** into a folder named `room-app`

2. **Open terminal** in the `room-app` folder

3. **Start the server**:
   ```bash
   # Python 3
   python3 -m http.server 8000
   
   # OR Python 2
   python -m SimpleHTTPServer 8000
   ```

4. **Open your browser** to: `http://localhost:8000`

5. **Done!** The app should load.

### Method 2: Node.js Server

1. **Install Node.js** (if not installed): https://nodejs.org

2. **Install http-server** globally:
   ```bash
   npm install -g http-server
   ```

3. **Navigate to folder** and run:
   ```bash
   cd room-app
   http-server -p 8000
   ```

4. **Open**: `http://localhost:8000`

### Method 3: VS Code Live Server

1. **Install VS Code**: https://code.visualstudio.com
2. **Install "Live Server" extension** from the marketplace
3. **Right-click `index.html`** → "Open with Live Server"

---

## 🌐 Deploy Online (Free Hosting)

### Option 1: GitHub Pages (Recommended)

1. **Create a GitHub account**: https://github.com

2. **Create a new repository** called `emotional-room`

3. **Upload all files** to the repository

4. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / root
   - Click Save

5. **Access your site** at: `https://yourusername.github.io/emotional-room`

### Option 2: Netlify (Drag & Drop)

1. **Go to**: https://netlify.com

2. **Sign up** (free)

3. **Drag and drop** your `room-app` folder onto Netlify

4. **Done!** You'll get a URL like: `https://random-name.netlify.app`

5. **(Optional) Custom domain**: Settings → Domain management

### Option 3: Vercel

1. **Go to**: https://vercel.com

2. **Sign up** with GitHub

3. **Import your repository**

4. **Deploy** (automatic)

5. **Access** your live site

### Option 4: Cloudflare Pages

1. **Go to**: https://pages.cloudflare.com

2. **Connect GitHub** repository

3. **Deploy** with default settings

4. **Site live** within minutes

---

## 📱 Install as PWA

### On Mobile (iOS/Android):

1. **Open the site** in your browser
2. **Tap the share button** (iOS) or **menu** (Android)
3. **Select "Add to Home Screen"**
4. **Confirm** - now it's an app!

### On Desktop (Chrome/Edge):

1. **Open the site**
2. **Look for the install icon** in the address bar (⊕)
3. **Click "Install"**
4. **App launches** like a native application

---

## 🎨 Customization Guide

### Change Messages

All messages are in `app.js` in the `MESSAGE_DATABASE` object. Edit the arrays to customize:

```javascript
const MESSAGE_DATABASE = {
    window: {
        morning: [
            "your custom morning message",
            "another one",
            // add as many as you want
        ],
        afternoon: [...],
        evening: [...],
        night: [...]
    },
    
    bed: {
        soft_comfort: ["your comfort messages"],
        playful: ["playful messages"],
        quiet_lover: ["intimate messages"],
        best_friend: ["casual messages"],
        extra_affection: ["affectionate messages"]
    },
    
    music: { /* same mood structure */ },
    
    jar: {
        short: [
            "short note 1",
            "short note 2",
            // 15-20 recommended
        ],
        long: [
            "longer, paragraph-length messages here",
            // 3-5 recommended, 10% chance to appear
        ]
    },
    
    character: {
        tap: ["tap response"],
        annoyed: ["annoyed after 5+ taps"],
        hug: ["long-press hug response"],
        spontaneous: ["random initiated messages"]
    },
    
    diary_responses: {
        positive_keywords: ["happy", "good", "love"],
        negative_keywords: ["sad", "tired", "alone"],
        positive: ["glad you're feeling this"],
        negative: ["that sounds heavy"],
        neutral: ["i hear you"]
    }
};
```

**Tips for writing messages**:
- Keep them lowercase and casual
- Short sentences (5-10 words ideal)
- Avoid poetry, love confessions, or motivational quotes
- Sound human and familiar, not like a chatbot
- Use restraint—less is more

### Change Colors

Edit the color variables in `styles.css`:

```css
:root {
    --blush-pink: #FFB3BA;    /* Change this */
    --lavender: #C5B9E6;      /* And this */
    --warm-cream: #FFF5F7;    /* And this */
    --baby-blue: #BAE1FF;     /* Etc. */
    --peach: #FFDFBA;
    --faded-gold: #FFE4B5;
}
```

**Recommended palette tools**:
- https://coolors.co (generate soft palettes)
- https://color.adobe.com (color harmony)

### Adjust Mood Weights

In `app.js`, find `selectDailyMood()`:

```javascript
const moods = [
    { name: 'soft_comfort', weight: 0.30 },    // 30% chance
    { name: 'playful', weight: 0.20 },         // 20% chance
    { name: 'quiet_lover', weight: 0.20 },     // 20% chance
    { name: 'best_friend', weight: 0.20 },     // 20% chance
    { name: 'extra_affection', weight: 0.10 }  // 10% chance
];
```

Weights must add up to 1.0 (100%)

### Change Object Positions

In `styles.css`, edit the position styles:

```css
.window {
    top: 5%;        /* Distance from top */
    left: 50%;      /* Horizontal position */
}

.character {
    bottom: 25%;    /* Distance from bottom */
    left: 50%;      /* Centered */
}

.bed {
    bottom: 10%;
    left: 15%;      /* Change to right: 15%; for right side */
}

/* Etc. */
```

### Disable Special Modes

In `app.js`, comment out modes in `checkSpecialModes()`:

```javascript
checkSpecialModes() {
    // Late night mode
    // if (hour >= 23 || hour < 6) {
    //     this.currentMode = 'late_night';
    // }
    
    // Birthday check
    // if (this.birthdaySet && this.birthday) { ... }
    
    // Rain mode
    // if (rainRandom < 0.05) { ... }
}
```

### Change Spontaneous Interaction Timing

In `app.js`, find `scheduleSpontaneousInteraction()`:

```javascript
const delay = (Math.random() * 10 + 5) * 60 * 1000;
// Change the numbers:
// (Math.random() * 10 + 5) means 5-15 minutes
// For 2-5 minutes: (Math.random() * 3 + 2)
// For 10-30 minutes: (Math.random() * 20 + 10)
```

---

## 🗂️ File Structure

```
room-app/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── app.js              # Core logic and interactions
├── sw.js               # Service worker (offline functionality)
├── manifest.json       # PWA manifest (installability)
├── icon-192.png        # App icon (192x192)
├── icon-512.png        # App icon (512x512)
└── README.md           # This file
```

---

## 🔧 Technical Details

### Architecture

- **Frontend Only**: No backend/server required
- **State Management**: Custom class-based system (`AppState`, `DiarySystem`)
- **Data Persistence**: Browser LocalStorage API
- **Offline**: Service Worker caches all assets
- **Installable**: Web App Manifest + Service Worker

### Browser Support

- **Chrome/Edge**: Full support
- **Safari**: Full support (iOS 11.3+)
- **Firefox**: Full support
- **Opera**: Full support

### Storage Limits

- **LocalStorage**: ~10MB per domain (varies by browser)
- **Cache Storage**: ~50MB+ (varies by browser)

### Privacy

- **All data stored locally** in your browser
- **No analytics** or tracking
- **No external requests** after initial load
- **No accounts** or sign-ins

---

## 🎯 Writing Guidelines (Expanding Messages)

When adding your own messages, follow these principles:

### ✅ DO:
- Write like you're texting a close friend
- Use lowercase for casual tone
- Keep sentences short and simple
- Show care through observation, not declaration
- Be specific to the interaction
- Use restraint—imply more than you say

### ❌ DON'T:
- Write love confessions or romantic poetry
- Use motivational quotes or inspirational speeches
- Be overly enthusiastic or fake-positive
- Explain feelings in detail
- Use formal language or capitalization
- Sound like a chatbot or AI assistant

### Examples:

**Good** (for bed/comfort):
```
"you can rest here if you need to"
"some days are heavier than others"
"this space is yours"
```

**Bad**:
```
"You are strong and capable of anything!" ❌
"Rest now, dear one, for tomorrow brings hope" ❌
"I love you so much and will always be here" ❌
```

**Good** (for character/tap):
```
"still here"
"hey"
"wondered if you'd come by"
```

**Bad**:
```
"Hello! How are you doing today?" ❌
"I'm so happy to see you!" ❌
"Welcome back, my dear friend!" ❌
```

---

## 🐛 Troubleshooting

### App won't load offline
- Clear browser cache
- Uninstall and reinstall PWA
- Check if service worker registered (Console → Application → Service Workers)

### Changes not showing
- Hard refresh: `Ctrl+Shift+R` (PC) or `Cmd+Shift+R` (Mac)
- Clear cache
- Update service worker version in `sw.js`:
  ```javascript
  const CACHE_NAME = 'room-app-v2'; // Increment version
  ```

### Icons not displaying
- Ensure `icon-192.png` and `icon-512.png` are in root folder
- Check file names match exactly (case-sensitive)
- Regenerate icons if needed

### LocalStorage not persisting
- Check browser settings (some browsers block storage in private mode)
- Ensure you're not in incognito/private browsing
- Check available storage in DevTools

---

## 📝 License

This is a personal project template. Feel free to:
- Use it for personal use
- Modify it completely
- Share it with friends
- Deploy your own version

**Not allowed**:
- Sell it as is
- Claim original authorship

---

## 💡 Ideas for Extension

- Add more interactive objects (plants, bookshelf, photos)
- Create seasonal variations (winter/summer themes)
- Add subtle background music
- Implement achievement system (visit streaks, etc.)
- Add customizable character appearance
- Create shareable room codes (optional online sync)
- Add journaling prompts based on mood
- Implement meditation timer
- Add stargazing mini-game for window

---

## 🤝 Credits

Built as a cozy emotional companion experience.
Designed with soft pastels and gentle interactions.

**Technologies**: Vanilla JavaScript, CSS3, Service Workers, LocalStorage

**No frameworks. No dependencies. Just vibes.**

---

**Made with care 💕**
