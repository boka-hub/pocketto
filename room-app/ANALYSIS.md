# Project Analysis: How It Works & Browser Run Blockers

## Part 1: How It Works

### High-level flow

1. **Load**  
   The browser loads `index.html`, then `styles.css` and `app.js`. A small inline script registers the service worker (if supported).

2. **DOMContentLoaded**  
   When the DOM is ready, `app.js`:
   - Creates `AppState` (loads from LocalStorage, picks daily mood, checks special modes).
   - Creates `DiarySystem` (loads diary entries from LocalStorage).
   - Creates `RoomInteractions` (attaches all click/touch handlers).
   - Optionally shows a first-visit “hi there” message from the character.

3. **State (AppState)**  
   - Persists in LocalStorage under `roomAppState`.  
   - Daily mood is chosen once per calendar day via **seeded random** (same date ⇒ same mood).  
   - Tracks last visit, visit count, optional birthday.  
   - Sets special modes: late night, birthday, missed you (24h+ away), rain (5% chance).

4. **Interactions (RoomInteractions)**  
   Each room element has listeners:
   - **Window**: click → time-based message (morning/afternoon/evening/night) + sparkles. A separate interval (every 30s) has a 5% chance to trigger a shooting-star animation.
   - **Character**: click → tap message (or “annoyed” after 5 taps); mousedown/touchstart 1s → hug; spontaneous messages every 5–15 min (30% chance).
   - **Bed**: click → open comfort overlay with mood-based message.
   - **Music player**: click → mood-based message.
   - **Jar**: click → random short note, or 10% long note.
   - **Diary**: click → open modal; save → `DiarySystem.addEntry()` + keyword-based response (positive/negative/neutral).

5. **Messages**  
   All copy lives in `MESSAGE_DATABASE` in `app.js`. Picks:
   - By time of day (window).
   - By current mood (bed, music).
   - By keyword sentiment (diary).
   - By probability (jar short vs long).

6. **Persistence**  
   - **LocalStorage**: `roomAppState`, `diaryEntries`.  
   - **Service worker**: caches HTML, CSS, JS, manifest, icons; fetch handler serves cache first, then network; offline fallback is `index.html`.

7. **Visuals**  
   CSS handles layout (positioned room objects), pastel theme (variables), and animations (fade, breathe, hug, sparkles, rain). Sparkles are created in JS (DOM elements, removed after ~800 ms).

---

## Part 2: What Can Prevent It From Running in a Browser

### A. Will stop the app from running (crash or blank)

| Issue | Where | Why it prevents running |
|-------|--------|---------------------------|
| **Corrupt LocalStorage** | `AppState.load()` (line 231), `DiarySystem.load()` (line 362) | `JSON.parse(saved)` is not in try/catch. If `roomAppState` or `diaryEntries` is invalid JSON (manual edit, bug, extension), parsing throws, the constructors throw, and the `DOMContentLoaded` handler never finishes. The page can stay blank or show only static HTML/CSS. |
| **Missing DOM elements** | All `getElementById` usages in `app.js` | If any required element is removed or renamed in `index.html`, `getElementById` returns `null`. Calling e.g. `null.addEventListener(...)` or `null.classList` throws and can prevent init or break a specific interaction. |

### B. Will break behavior or features (app “runs” but wrong)

| Issue | Where | Why it’s a problem |
|-------|--------|--------------------|
| **Global `event` in window click** | `app.js` line 439–440 | The window click handler uses `event.clientX` and `event.clientY` but does not take an event parameter (`(e) =>`). It relies on the legacy global `event`. In strict mode or when the global isn’t set, `event` can be `undefined`, so `createSparkles(undefined, undefined)` runs and sparkle positions become `NaN` (e.g. `"NaNpx"`). Window still shows a message but sparkles are wrong or invisible. |
| **Service worker only on secure context** | `index.html` inline script, `sw.js` | Service workers require HTTPS or `localhost`. Opening `index.html` via **file://** means the SW registration fails (rejected or no-op). The app still runs (HTML/CSS/JS load), but **offline caching and PWA install** do not work. |
| **Service worker cache URLs are root-relative** | `sw.js` lines 3–11 | `urlsToCache` uses `'/', '/index.html', '/styles.css', ...`. Those resolve to the **origin root**. If the app is served from a **subpath** (e.g. `https://user.github.io/room-app/`), the worker caches `https://user.github.io/index.html` instead of `.../room-app/index.html`. Result: install may fail (404 on `/index.html`), and offline will not serve the real app. |
| **Manifest `start_url` is root** | `manifest.json` | `"start_url": "/"` points to the site root. When the app is installed from a subpath (e.g. GitHub Pages repo URL), the installed PWA may open the wrong page (e.g. GitHub profile or 404) instead of the room app. |
| **Diary XSS** | `app.js` line 713 | `entryDiv.innerHTML = \`...${entry.text}...\`\`` injects raw diary text into the DOM. If a user (or corrupted data) includes HTML/script (e.g. `<img onerror="...">`, `<script>...</script>`), it runs in the page. Does not prevent load, but is a security and stability risk. |

### C. Environment / deployment issues

| Issue | When | Effect |
|------|------|--------|
| **Opening via file://** | User opens `index.html` from disk | App runs; service worker does not register, so no offline and no install. |
| **Hosting from a subdirectory** | e.g. GitHub Pages at `.../repo-name/` | Root-relative cache and `start_url` make PWA/offline wrong or broken; online use of the page can still work if you navigate to the correct URL. |
| **LocalStorage disabled or full** | Private mode, strict settings, or quota exceeded | `localStorage.setItem` can throw; the code doesn’t catch it. If it throws during `save()`, it can break the flow (e.g. during `checkDailyMood()` or diary save). |
| **Very old browsers** | No ES6 classes, no `addEventListener`, etc. | Syntax or API errors can prevent `app.js` from running at all. |

---

## Summary Table

| Category | Prevents running? | Fix idea |
|----------|--------------------|----------|
| Corrupt LocalStorage JSON | Yes (crash on load) | Wrap `JSON.parse` in try/catch; fall back to default state / empty array. |
| Missing DOM element | Yes (crash in init or on interaction) | Ensure HTML IDs match JS; optionally guard with `if (!el) return;`. |
| Window handler uses global `event` | No (wrong sparkles) | Use `(e) =>` and `e.clientX`, `e.clientY`. |
| Service worker on file:// | No (no offline/install) | Document that app must be served over HTTP(S); use a local server. |
| Root-relative cache/start_url | No (broken PWA when in subpath) | Use relative or configurable base (e.g. `self.location.origin + basePath`) in SW and manifest. |
| Diary innerHTML with user text | No (XSS risk) | Use `textContent` or escape before inserting into HTML. |
| LocalStorage throws (disabled/full) | Can crash on save | Wrap `localStorage` access in try/catch; degrade gracefully. |

---

## Recommended Fixes (in order of impact)

1. **AppState.load() / DiarySystem.load()**: Wrap `JSON.parse(localStorage.getItem(...))` in try/catch; on error, use default state / empty array and optionally clear the bad key.
2. **Window click**: Change to `(e) => { this.createSparkles(e.clientX, e.clientY); ... }`.
3. **loadDiaryEntries()**: Render `entry.text` with `textContent` (or escape HTML) instead of `innerHTML` with raw `${entry.text}`.
4. **Service worker**: Make cached URLs work for subpath (e.g. derive base from `self.location.pathname` or a constant).
5. **manifest.json**: Set `start_url` to `"./"` or the real app path when deployed under a subpath.
6. **localStorage**: Wrap `setItem`/`getItem` in try/catch where used, and handle quota/disabled storage without throwing.

After these changes, the app should run reliably in the browser and behave correctly when served from a subpath or with bad/strict storage.
