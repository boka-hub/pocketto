# 🏗️ Technical Architecture Document

## System Overview

**Your Room** is a single-page Progressive Web App (PWA) built with vanilla JavaScript, HTML5, and CSS3. It operates entirely client-side with no backend requirements, using browser APIs for persistence and offline functionality.

---

## Architecture Layers

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (HTML/CSS - Visual Components)         │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│      Interaction Layer (app.js)         │
│  • RoomInteractions                     │
│  • Event Handlers                       │
│  • Animation Controllers                │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│       Business Logic Layer              │
│  • AppState (mood engine)               │
│  • DiarySystem                          │
│  • Message Selection                    │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│       Data Persistence Layer            │
│  • LocalStorage API                     │
│  • Service Worker Cache                 │
└─────────────────────────────────────────┘
```

---

## Core Components

### 1. AppState Class

**Purpose**: Manages application state and daily mood selection

**Responsibilities**:
- Load/save state from LocalStorage
- Determine daily mood using seeded randomness
- Track visit count and last visit time
- Detect special modes (birthday, late night, missed you, rain)

**Key Methods**:
```javascript
load()                    // Load state from storage
save()                    // Persist state to storage
checkDailyMood()          // Determine today's mood
selectDailyMood(date)     // Weighted random selection
seededRandom(seed)        // Deterministic randomness
checkSpecialModes()       // Activate special behaviors
```

**State Properties**:
- `currentMood`: string (soft_comfort | playful | quiet_lover | best_friend | extra_affection)
- `lastVisit`: Date
- `visitCount`: number
- `birthday`: Date (optional)
- `characterTapCount`: number (transient)

### 2. DiarySystem Class

**Purpose**: Handle diary entries and generate contextual responses

**Responsibilities**:
- Store diary entries in LocalStorage
- Analyze entry content for sentiment
- Generate mood-appropriate responses
- Retrieve recent entries for display

**Key Methods**:
```javascript
load()                    // Load entries from storage
save()                    // Persist entries to storage
addEntry(text)            // Save entry and generate response
generateResponse(text)    // Sentiment analysis + response selection
getRecentEntries(count)   // Retrieve last N entries
```

**Entry Schema**:
```javascript
{
    text: string,
    date: ISO8601 string,
    responded: boolean
}
```

### 3. RoomInteractions Class

**Purpose**: Coordinate all user interactions and visual feedback

**Responsibilities**:
- Initialize event listeners for all objects
- Manage interaction states (hugging, tapping, etc.)
- Display messages and animations
- Create visual effects (sparkles, etc.)
- Schedule spontaneous interactions

**Interaction Types**:

| Object | Interaction | Behavior |
|--------|-------------|----------|
| Window | Click | Show time-based message |
| Character | Click | Tap response, count for annoyance |
| Character | Long-press | Trigger hug animation |
| Bed | Click | Enter comfort mode (dimmed overlay) |
| Music Player | Click | Show mood-based affectionate line |
| Jar | Click | Pull random note (10% long) |
| Diary | Click | Open diary modal |

**Key Methods**:
```javascript
setupWindowInteraction()
setupCharacterInteraction()
setupBedInteraction()
setupMusicPlayerInteraction()
setupJarInteraction()
setupDiaryInteraction()
triggerHug()
showCharacterMessage(text)
enterComfortMode()
pullNote()
createSparkles(x, y)
scheduleSpontaneousInteraction()
```

---

## Data Flow

### 1. Initial Load Sequence

```
User visits URL
    ↓
Service Worker intercepts (if registered)
    ↓
Serve from cache (if available) OR fetch from network
    ↓
HTML loads + CSS applied
    ↓
app.js executes
    ↓
DOMContentLoaded fires
    ↓
AppState.load() from LocalStorage
    ↓
DiarySystem.load() from LocalStorage
    ↓
RoomInteractions.init()
    ↓
Register Service Worker (if not registered)
    ↓
Check daily mood + special modes
    ↓
Schedule spontaneous interactions
    ↓
App ready
```

### 2. Interaction Flow Example (Character Tap)

```
User taps character
    ↓
Event listener fires
    ↓
createSparkles(x, y)
    ↓
Increment characterTapCount
    ↓
Reset tap timer (2s)
    ↓
If count >= 5:
    Show annoyed message
    Reset count
Else:
    Show tap response
    ↓
Message animates in
    ↓
3s timeout → fade out
```

### 3. Daily Mood Selection

```
App loads
    ↓
AppState.checkDailyMood()
    ↓
Get today's date (year, month, day)
    ↓
Compare with lastVisit date
    ↓
If different day OR first visit:
    ↓
    Generate seed from date (YYYYMMDD)
    ↓
    seededRandom(seed)
    ↓
    Select mood based on weights:
        soft_comfort: 30%
        playful: 20%
        quiet_lover: 20%
        best_friend: 20%
        extra_affection: 10%
    ↓
    Set currentMood
    ↓
Update lastVisit
    ↓
Save state
```

**Why seeded random?**
- Ensures same mood throughout the day
- Different users get different moods (based on their date)
- Feels intentional, not arbitrary

---

## Offline Architecture (PWA)

### Service Worker Strategy

**Cache First, Network Fallback**

```
Request arrives
    ↓
SW intercepts
    ↓
Check cache
    ↓
If cached:
    Return from cache
Else:
    Fetch from network
    ↓
    If successful:
        Cache response
        Return response
    If failed:
        Return cached index.html (offline fallback)
```

**Cached Resources**:
- `index.html`
- `styles.css`
- `app.js`
- `sw.js`
- `manifest.json`
- `icon-192.png`
- `icon-512.png`

**Cache Versioning**:
```javascript
const CACHE_NAME = 'room-app-v1';
```
Increment version to force cache refresh on updates.

### LocalStorage Schema

**Key: `roomAppState`**
```json
{
    "currentMood": "soft_comfort",
    "lastVisit": "2024-02-14T15:30:00.000Z",
    "visitCount": 42,
    "birthdaySet": true,
    "birthday": "1995-06-15T00:00:00.000Z"
}
```

**Key: `diaryEntries`**
```json
[
    {
        "text": "had a long day at work today...",
        "date": "2024-02-14T22:15:00.000Z",
        "responded": true
    },
    {
        "text": "feeling better than yesterday",
        "date": "2024-02-13T19:45:00.000Z",
        "responded": true
    }
]
```

---

## Message Selection Algorithm

### 1. Mood-Based Selection

All messages categorized by mood type:

```javascript
MESSAGE_DATABASE = {
    bed: {
        soft_comfort: [...],
        playful: [...],
        quiet_lover: [...],
        best_friend: [...],
        extra_affection: [...]
    }
}
```

Selection:
```javascript
const mood = state.currentMood || 'soft_comfort';
const messages = MESSAGE_DATABASE.bed[mood];
return randomFrom(messages);
```

### 2. Time-Based Selection (Window)

```javascript
getTimeBasedMessage() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12)       timeOfDay = 'morning';
    else if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
    else if (hour >= 17 && hour < 21) timeOfDay = 'evening';
    else                               timeOfDay = 'night';
    
    return randomFrom(MESSAGE_DATABASE.window[timeOfDay]);
}
```

### 3. Sentiment-Based Selection (Diary)

```javascript
generateResponse(text) {
    const lower = text.toLowerCase();
    
    // Check positive keywords
    if (hasKeyword(lower, positive_keywords))
        return randomFrom(positive_responses);
    
    // Check negative keywords
    if (hasKeyword(lower, negative_keywords))
        return randomFrom(negative_responses);
    
    // Default neutral
    return randomFrom(neutral_responses);
}
```

### 4. Probability-Based Selection (Jar)

```javascript
pullNote() {
    const isLong = Math.random() < 0.1; // 10% chance
    
    const message = isLong ?
        randomFrom(MESSAGE_DATABASE.jar.long) :
        randomFrom(MESSAGE_DATABASE.jar.short);
    
    displayNote(message);
}
```

---

## Animation System

### CSS Transitions & Keyframes

**Design Principles**:
- Soft easing functions (`ease`, `ease-out`, `ease-in-out`)
- Slow durations (0.3s - 2s)
- Breathing animations (4s infinite)
- Gentle opacity changes

**Key Animations**:

```css
@keyframes fadeInUp {
    /* Message appearance */
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
}

@keyframes breathe {
    /* Character body */
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
}

@keyframes popIn {
    /* Quick feedback */
    0% { opacity: 0; transform: scale(0.8); }
    100% { opacity: 1; transform: scale(1); }
}

@keyframes hugPulse {
    /* Hug effect ring */
    0% { opacity: 0.8; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.8); }
}
```

### Sparkle Effect

Dynamic DOM elements created on interaction:

```javascript
createSparkles(x, y) {
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Circular distribution
        const angle = (Math.PI * 2 * i) / 5;
        const distance = 30 + Math.random() * 20;
        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;
        
        sparkle.style.left = (x + offsetX) + 'px';
        sparkle.style.top = (y + offsetY) + 'px';
        
        container.appendChild(sparkle);
        
        // Auto-remove after animation
        setTimeout(() => sparkle.remove(), 800);
    }
}
```

---

## Special Modes

### 1. Birthday Mode

**Trigger**: Date matches stored birthday
**Behavior**: 
- Special greeting messages
- Different window messages
- Increased affection in responses

**Implementation**:
```javascript
checkSpecialModes() {
    if (this.birthdaySet && this.birthday) {
        const today = getDateOnly(new Date());
        const bday = getDateOnly(this.birthday, currentYear);
        if (today === bday) {
            this.currentMode = 'birthday';
        }
    }
}
```

### 2. Missed You Mode

**Trigger**: 24+ hours since last visit
**Behavior**:
- Character shows "missed you" spontaneous message
- Slightly more affectionate responses

**Implementation**:
```javascript
const hoursSinceVisit = (now - lastVisit) / (1000 * 60 * 60);
if (hoursSinceVisit >= 24) {
    this.currentMode = 'missed_you';
}
```

### 3. Late Night Mode

**Trigger**: 11:30 PM - 6:00 AM
**Behavior**:
- Softer colors
- More intimate messages
- Comfort suggestions

**Implementation**:
```javascript
const hour = new Date().getHours();
if (hour >= 23 || hour < 6) {
    this.currentMode = 'late_night';
}
```

### 4. Rain Mode

**Trigger**: 5% daily chance (seeded random)
**Behavior**:
- Rain overlay animation
- Cozy indoor messaging theme

**Implementation**:
```javascript
const seed = date.getDate() * 100 + date.getMonth();
const random = seededRandom(seed);
if (random < 0.05) {
    this.currentMode = 'rain';
    showRainAnimation();
}
```

---

## Performance Considerations

### Memory Management

- **Sparkles**: Auto-removed after animation (800ms)
- **Event listeners**: Single delegation pattern where possible
- **Timers**: Cleared on component destruction

### Storage Optimization

- **LocalStorage limits**: ~10MB typical
- **Diary entries**: Keep last 50 entries, auto-prune old ones
- **State size**: Minimal (< 1KB per user)

### Network Optimization

- **No external dependencies**: Zero HTTP requests after initial load
- **Asset size**: Total < 100KB (HTML + CSS + JS + icons)
- **Service Worker**: Aggressive caching

---

## Browser Compatibility

| Feature | Chrome | Safari | Firefox | Edge |
|---------|--------|--------|---------|------|
| Service Workers | ✅ | ✅ (11.3+) | ✅ | ✅ |
| LocalStorage | ✅ | ✅ | ✅ | ✅ |
| CSS Grid/Flexbox | ✅ | ✅ | ✅ | ✅ |
| CSS Animations | ✅ | ✅ | ✅ | ✅ |
| Touch Events | ✅ | ✅ | ✅ | ✅ |
| PWA Install | ✅ | ✅ (iOS 11.3+) | ✅ | ✅ |

**Minimum Requirements**:
- Chrome 45+
- Safari 11.3+
- Firefox 44+
- Edge 17+

---

## Security Considerations

### No Backend = No Server Vulnerabilities

- No SQL injection risk
- No server-side code execution
- No authentication to compromise
- No user data transmitted

### Client-Side Security

- **LocalStorage**: Domain-scoped, cannot be accessed by other sites
- **Service Worker**: Same-origin policy enforced
- **XSS Prevention**: No `innerHTML` with user content, only `textContent`

### Privacy

- **Zero analytics**
- **Zero tracking**
- **Zero external requests**
- **All data stays local**

---

## Testing Strategy

### Manual Testing Checklist

**Core Interactions**:
- [ ] Click window shows message
- [ ] Tap character 5 times triggers annoyance
- [ ] Long-press character triggers hug
- [ ] Bed opens comfort mode
- [ ] Music player shows mood message
- [ ] Jar pulls notes (test 10+ times for long note)
- [ ] Diary saves entries and responds

**Special Modes**:
- [ ] Change system time to 11:30 PM → late night mode
- [ ] Clear LocalStorage → first visit greeting
- [ ] Set last visit to 48h ago → missed you mode

**PWA Functionality**:
- [ ] Install to home screen works
- [ ] App works offline (disconnect network)
- [ ] App icon displays correctly
- [ ] Service worker registers (DevTools → Application)

### Browser Testing

Test on:
- Chrome (desktop)
- Safari (iOS)
- Chrome (Android)
- Firefox (desktop)

---

## Deployment Checklist

### Pre-Deploy

- [ ] Test all interactions
- [ ] Check responsive design (mobile, tablet, desktop)
- [ ] Verify offline functionality
- [ ] Test PWA installation
- [ ] Validate manifest.json (https://manifest-validator.appspot.com)
- [ ] Test icon display

### Deploy

- [ ] Upload all files to hosting
- [ ] Verify HTTPS enabled (required for PWA)
- [ ] Test from public URL
- [ ] Install from public URL
- [ ] Check service worker registration

### Post-Deploy

- [ ] Test on multiple devices
- [ ] Verify offline works after network disconnect
- [ ] Check LocalStorage persists across sessions
- [ ] Test uninstall/reinstall

---

## Future Enhancement Ideas

### Technical Improvements
- IndexedDB for larger storage
- Background sync API for cross-device state
- Web Push API (optional, minimal notifications)
- Web Share API for sharing diary entries
- Web Speech API for voice journaling

### Feature Ideas
- Multiple room themes (seasons, time of day)
- Achievement system (visit streaks)
- Exportable diary archive
- Ambient sound toggle
- Customizable character appearance
- Mini-games (stargazing, plant watering)

---

## Maintenance

### Updating Content

1. Edit `MESSAGE_DATABASE` in `app.js`
2. Increment service worker version:
   ```javascript
   const CACHE_NAME = 'room-app-v2'; // v1 → v2
   ```
3. Redeploy
4. Users get update on next visit

### Updating Styles

1. Edit `styles.css`
2. Increment service worker version
3. Redeploy

### Debugging

**Service Worker issues**:
```
DevTools → Application → Service Workers → Unregister
Hard refresh (Ctrl+Shift+R)
```

**LocalStorage issues**:
```
DevTools → Application → Local Storage → Clear
```

**Cache issues**:
```
DevTools → Application → Cache Storage → Delete
```

---

## Code Style Guidelines

### JavaScript
- ES6+ syntax
- Class-based architecture
- Descriptive variable names
- Comments for complex logic only
- No external dependencies

### CSS
- BEM-like naming where appropriate
- Mobile-first responsive design
- CSS custom properties for colors
- Keyframe animations for all motion

### HTML
- Semantic elements
- Accessibility attributes (role, tabindex)
- Minimal inline styles

---

**Architecture Version**: 1.0
**Last Updated**: February 2024
