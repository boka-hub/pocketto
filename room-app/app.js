// ═══════════════════════════════════════════════════════════════
// EMOTIONAL ROOM PWA - Main Application Logic
// ═══════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────
// MESSAGE DATABASE
// ───────────────────────────────────────────────────────────────

const MESSAGE_DATABASE = {
    window: {
        morning: [
            "early light through the glass",
            "the sky is soft today",
            "mornings feel quieter lately",
            "everything looks different in this light",
            "still waking up too"
        ],
        afternoon: [
            "the day is halfway done",
            "time moves differently here",
            "clouds are drifting by",
            "wondered if you'd look outside",
            "the world keeps turning"
        ],
        evening: [
            "the light is fading now",
            "evenings feel longer somehow",
            "it's getting dark earlier",
            "stars will be out soon",
            "day is almost over"
        ],
        night: [
            "the stars are out",
            "it's quiet tonight",
            "late for you isn't it",
            "the moon is different tonight",
            "wondered if you'd come by"
        ],
        soft_comfort: [
            "the sky is soft today",
            "everything looks different in this light",
            "it's quiet out there",
            "you can just look as long as you need",
            "the light is gentle"
        ],
        playful: [
            "clouds are drifting by",
            "the world keeps turning",
            "something different every time you look",
            "still the same view, still nice though"
        ],
        quiet_lover: [
            "the stars will be out soon",
            "wondered if you'd look outside",
            "this feels like our corner of the world",
            "the light is fading now"
        ],
        best_friend: [
            "the day is halfway done",
            "time moves differently here",
            "good spot to stare for a bit",
            "nothing wrong with just looking"
        ],
        extra_affection: [
            "thought you might look out today",
            "the sky is soft today",
            "glad you're here to see it",
            "this view is better with you here"
        ]
    },
    
    bed: {
        soft_comfort: [
            "you can rest here if you need to",
            "it's okay to just lie down for a while",
            "some days are heavier than others",
            "you don't have to explain anything",
            "this space is yours"
        ],
        playful: [
            "already tired? it's barely started",
            "taking a break i see",
            "guess we're doing this today",
            "comfort mode activated apparently"
        ],
        quiet_lover: [
            "i'll stay here with you",
            "don't go yet",
            "this feels right",
            "we can just be here",
            "i'm not going anywhere"
        ],
        best_friend: [
            "need a moment? that's fine",
            "take your time",
            "i get it, sometimes you just need this",
            "no judgment here"
        ],
        extra_affection: [
            "you being here feels important",
            "glad you found your way back",
            "i've been thinking about you",
            "this means something to me"
        ]
    },
    
    music: {
        soft_comfort: [
            "maybe this will help",
            "just something soft",
            "thought you might need this",
            "here's something gentle"
        ],
        playful: [
            "again? not complaining",
            "you really like this one",
            "i know what you're doing",
            "third time today interesting"
        ],
        quiet_lover: [
            "this reminds me of you",
            "been saving this one",
            "knew you'd come for this",
            "our song"
        ],
        best_friend: [
            "you always pick the same ones",
            "yeah this one's good",
            "solid choice honestly",
            "can't argue with that"
        ],
        extra_affection: [
            "i played this earlier thinking of you",
            "wanted to share this with you",
            "this felt like something you'd understand",
            "thought you should hear this"
        ]
    },
    
    jar: {
        short: [
            "you're doing fine actually",
            "this counts for something",
            "small things add up",
            "you showed up today",
            "that's enough for now",
            "better than you think",
            "you're still here",
            "progress isn't linear",
            "one day at a time",
            "you're not alone in this",
            "it's okay to be uncertain",
            "your pace is valid",
            "feeling this is okay",
            "you matter here",
            "trying counts",
            "you're allowed to rest",
            "tomorrow is different",
            "this moment passes",
            "you're more than enough",
            "being here is brave"
        ],
        soft_comfort: [
            "you can rest here", "this counts for something", "your pace is valid",
            "you're allowed to rest", "you matter here", "one day at a time",
            "it's okay to be uncertain", "being here is brave", "that's enough for now"
        ],
        playful: [
            "you showed up today", "small things add up", "better than you think",
            "trying counts", "this moment passes", "you're still here",
            "progress isn't linear", "tomorrow is different", "you're doing fine actually"
        ],
        quiet_lover: [
            "you matter here", "stay a little", "you're not alone in this",
            "this counts for something", "you're more than enough", "feeling this is okay",
            "that's enough for now", "being here is brave", "one day at a time"
        ],
        best_friend: [
            "you're doing fine actually", "no judgment here", "you showed up today",
            "that's enough for now", "trying counts", "progress isn't linear",
            "you're allowed to rest", "one day at a time", "better than you think"
        ],
        extra_affection: [
            "i'm glad you're here", "you matter here", "you're more than enough",
            "this counts for something", "being here is brave", "you showed up today",
            "that's enough for now", "one day at a time", "you're not alone in this"
        ],
        long: [
            "i've been thinking about how you keep coming back here, even on the days when everything feels heavy. that says something about you that you probably don't give yourself credit for. you don't have to be perfect or have it all figured out. just being here, trying, choosing to show up even when it's hard—that matters. i see it. i want you to know that.",
            "there's something about the way you move through your days that makes me think you're carrying more than you let on. you don't have to carry it all alone. some weight is meant to be shared, or at least acknowledged. i can't take it from you, but i can sit with you in it. that has to count for something, doesn't it?",
            "you know what i notice? you're harder on yourself than anyone else would be. the standards you hold yourself to, the way you dismiss your own efforts—it's like you're determined to prove you're not enough. but you are. you really, genuinely are. i wish you could see yourself the way i see you visiting this room."
        ]
    },
    
    character: {
        idle: [
            "...",
            "still here",
            "hey",
            "hi",
            "you came back"
        ],
        tap: {
            soft_comfort: ["hey", "i see you", "still here", "that tickles", "hi again"],
            playful: ["what", "okay okay", "yeah?", "noticed", "hey there", "you again"],
            quiet_lover: ["hi", "you came back", "still here", "i see you", "hey"],
            best_friend: ["what", "yeah?", "hey there", "okay okay", "noticed"],
            extra_affection: ["hi again", "you came back", "i see you", "still here", "hey"]
        },
        annoyed: [
            "okay that's enough",
            "seriously?",
            "you done?",
            "stop that",
            "getting annoying honestly"
        ],
        hug: {
            soft_comfort: ["...thank you", "needed this", "stay for a second", "you're warm", "oh"],
            playful: ["okay okay", "that's nice", "hey", "got me", "oh"],
            quiet_lover: ["...thank you", "stay for a second", "you're warm", "needed this", "don't go yet"],
            best_friend: ["thanks", "needed that", "you're warm", "good hug", "oh"],
            extra_affection: ["...thank you", "needed this", "stay", "you're so warm", "i'm not letting go yet"]
        },
        spontaneous: [
            "been waiting for you",
            "thought about you earlier",
            "you're late today",
            "wondered if you'd forgotten",
            "there you are"
        ]
    },
    
    diary_responses: {
        positive_keywords: ["good", "happy", "great", "love", "excited", "wonderful", "amazing", "perfect"],
        negative_keywords: ["bad", "sad", "tired", "alone", "difficult", "hard", "struggle", "anxiety", "worried", "scared"],
        neutral_keywords: ["day", "work", "school", "today", "time", "life"],
        
        positive: {
            soft_comfort: ["i'm glad you're feeling this way", "this is nice to read", "you deserve these moments", "hold onto this feeling"],
            playful: ["this is nice to read", "love it", "you deserve these moments", "hold onto this feeling"],
            quiet_lover: ["i'm glad you're feeling this way", "this is nice to read", "hold onto this feeling", "you deserve these moments"],
            best_friend: ["this is nice to read", "you deserve these moments", "hold onto this feeling", "good to hear"],
            extra_affection: ["i'm glad you're feeling this way", "this is nice to read", "you deserve these moments", "hold onto this feeling"]
        },
        negative: {
            soft_comfort: ["i hear you", "that sounds heavy", "you don't have to carry this alone", "it's okay to feel this way", "some days are just like this"],
            playful: ["i hear you", "some days are just like this", "it's okay to feel this way", "that sounds heavy"],
            quiet_lover: ["i hear you", "you don't have to carry this alone", "it's okay to feel this way", "i'm here", "some days are just like this"],
            best_friend: ["i hear you", "that sounds heavy", "it's okay to feel this way", "some days are just like this", "no judgment"],
            extra_affection: ["i hear you", "you don't have to carry this alone", "it's okay to feel this way", "some days are just like this", "i'm here"]
        },
        neutral: {
            soft_comfort: ["thanks for sharing this", "i'm listening", "noted", "i see you"],
            playful: ["thanks for sharing", "noted", "i'm listening", "i see you"],
            quiet_lover: ["thanks for sharing this", "i'm listening", "i see you", "noted"],
            best_friend: ["thanks for sharing", "noted", "i'm listening", "i see you"],
            extra_affection: ["thanks for sharing this", "i'm listening", "i see you", "noted"]
        }
    }
};

// ───────────────────────────────────────────────────────────────
// STATE MANAGEMENT
// ───────────────────────────────────────────────────────────────

class AppState {
    constructor() {
        this.currentMood = null;
        this.lastVisit = null;
        this.characterTapCount = 0;
        this.characterTapTimer = null;
        this.isHugging = false;
        this.birthdaySet = false;
        this.birthday = null;
        this.visitCount = 0;
        
        this.load();
        this.checkDailyMood();
        this.checkSpecialModes();
    }
    
    load() {
        try {
            const saved = localStorage.getItem('roomAppState');
            if (saved) {
                const data = JSON.parse(saved);
                Object.assign(this, data);
                if (this.lastVisit) this.lastVisit = new Date(this.lastVisit);
                if (this.birthday) this.birthday = new Date(this.birthday);
            }
        } catch (err) {
            // Corrupt or invalid stored state; continue with defaults
        }
    }
    
    save() {
        try {
            const data = {
                currentMood: this.currentMood,
                lastVisit: this.lastVisit,
                birthdaySet: this.birthdaySet,
                birthday: this.birthday,
                visitCount: this.visitCount
            };
            localStorage.setItem('roomAppState', JSON.stringify(data));
        } catch (err) {
            // localStorage disabled or full (e.g. file://, private mode)
        }
    }
    
    checkDailyMood() {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const lastVisitDay = this.lastVisit ? 
            new Date(this.lastVisit.getFullYear(), this.lastVisit.getMonth(), this.lastVisit.getDate()) : 
            null;
        
        // Set new mood at midnight or first visit
        if (!lastVisitDay || today > lastVisitDay) {
            this.currentMood = this.selectDailyMood(today);
        }
        
        this.lastVisit = now;
        this.visitCount++;
        this.save();
    }
    
    selectDailyMood(date) {
        // Seeded random based on date
        const seed = date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate();
        const random = this.seededRandom(seed);
        
        const moods = [
            { name: 'soft_comfort', weight: 0.30 },
            { name: 'playful', weight: 0.20 },
            { name: 'quiet_lover', weight: 0.20 },
            { name: 'best_friend', weight: 0.20 },
            { name: 'extra_affection', weight: 0.10 }
        ];
        
        let cumulative = 0;
        for (const mood of moods) {
            cumulative += mood.weight;
            if (random < cumulative) {
                return mood.name;
            }
        }
        
        return 'soft_comfort';
    }
    
    seededRandom(seed) {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }
    
    checkSpecialModes() {
        const now = new Date();
        const hour = now.getHours();
        
        // Late night mode
        if (hour >= 23 || hour < 6) {
            this.currentMode = 'late_night';
        }
        
        // Birthday check
        if (this.birthdaySet && this.birthday) {
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const bday = new Date(now.getFullYear(), this.birthday.getMonth(), this.birthday.getDate());
            if (today.getTime() === bday.getTime()) {
                this.currentMode = 'birthday';
            }
        }
        
        // Missed you mode (24h+ inactivity)
        if (this.lastVisit) {
            const hoursSinceVisit = (now - this.lastVisit) / (1000 * 60 * 60);
            if (hoursSinceVisit >= 24) {
                this.currentMode = 'missed_you';
            }
        }
        
        // Rare rain mode (5% chance per day)
        const rainRandom = this.seededRandom(now.getDate() * 100 + now.getMonth());
        if (rainRandom < 0.05) {
            this.currentMode = 'rain';
            this.showRain();
        }
    }
    
    showRain() {
        const rainOverlay = document.getElementById('rain-overlay');
        if (!rainOverlay) return;
        rainOverlay.classList.remove('hidden');
        
        // Create raindrops
        for (let i = 0; i < 50; i++) {
            const drop = document.createElement('div');
            drop.className = 'raindrop';
            drop.style.left = Math.random() * 100 + '%';
            drop.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
            drop.style.animationDelay = Math.random() * 2 + 's';
            rainOverlay.appendChild(drop);
        }
        
        setTimeout(() => {
            rainOverlay.classList.add('show');
        }, 100);
    }
}

// ───────────────────────────────────────────────────────────────
// DIARY SYSTEM
// ───────────────────────────────────────────────────────────────

class DiarySystem {
    constructor() {
        this.entries = [];
        this.load();
    }
    
    load() {
        try {
            const saved = localStorage.getItem('diaryEntries');
            if (saved) {
                this.entries = JSON.parse(saved);
                if (!Array.isArray(this.entries)) this.entries = [];
            }
        } catch (err) {
            this.entries = [];
        }
    }
    
    save() {
        try {
            localStorage.setItem('diaryEntries', JSON.stringify(this.entries));
        } catch (err) {
            // localStorage disabled or full
        }
    }
    
    addEntry(text, mood) {
        const entry = {
            text: text,
            date: new Date().toISOString(),
            responded: false
        };
        this.entries.unshift(entry);
        this.save();
        return this.generateResponse(text, mood || 'soft_comfort');
    }
    
    generateResponse(text, mood) {
        const lowerText = text.toLowerCase();
        const responses = MESSAGE_DATABASE.diary_responses;
        const m = mood || 'soft_comfort';
        
        const hasPositive = responses.positive_keywords.some(word => lowerText.includes(word));
        if (hasPositive) {
            const pool = responses.positive[m] || responses.positive.soft_comfort;
            return this.randomFrom(pool);
        }
        
        const hasNegative = responses.negative_keywords.some(word => lowerText.includes(word));
        if (hasNegative) {
            const pool = responses.negative[m] || responses.negative.soft_comfort;
            return this.randomFrom(pool);
        }
        
        const pool = responses.neutral[m] || responses.neutral.soft_comfort;
        return this.randomFrom(pool);
    }
    
    randomFrom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    getRecentEntries(count = 5) {
        return this.entries.slice(0, count);
    }
}

// ───────────────────────────────────────────────────────────────
// INTERACTION HANDLERS
// ───────────────────────────────────────────────────────────────

class RoomInteractions {
    constructor(state, diary) {
        this.state = state;
        this.diary = diary;
        this.init();
    }
    
    init() {
        this.setupWindowInteraction();
        this.setupCharacterInteraction();
        this.setupBedInteraction();
        this.setupMusicPlayerInteraction();
        this.setupJarInteraction();
        this.setupDiaryInteraction();
        this.setupShootingStar();
        
        // Spontaneous character interaction
        this.scheduleSpontaneousInteraction();
    }
    
    // ─── WINDOW ───
    setupWindowInteraction() {
        const windowEl = document.getElementById('window');
        const message = document.getElementById('window-message');
        if (!windowEl || !message) return;
        
        windowEl.addEventListener('click', (e) => {
            this.triggerGlowPulse(e.currentTarget);
            this.createSparkles(e.clientX, e.clientY);
            const msg = this.getWindowMessage();
            this.showMessage(message, msg);
        });
    }
    
    getWindowMessage() {
        const mood = this.state.currentMood || 'soft_comfort';
        const moodMessages = MESSAGE_DATABASE.window[mood];
        if (moodMessages && moodMessages.length) {
            return this.randomFrom(moodMessages);
        }
        const hour = new Date().getHours();
        let timeOfDay = hour >= 5 && hour < 12 ? 'morning' : hour >= 12 && hour < 17 ? 'afternoon' : hour >= 17 && hour < 21 ? 'evening' : 'night';
        return this.randomFrom(MESSAGE_DATABASE.window[timeOfDay]);
    }
    
    setupShootingStar() {
        // Random shooting star (5% chance every 30 seconds)
        setInterval(() => {
            if (Math.random() < 0.05) {
                const star = document.getElementById('shooting-star');
                if (!star) return;
                star.style.animation = 'none';
                setTimeout(() => {
                    star.style.animation = 'shooting 2s ease-out';
                }, 10);
            }
        }, 30000);
    }
    
    // ─── CHARACTER ───
    setupCharacterInteraction() {
        const character = document.getElementById('character');
        const message = document.getElementById('character-message');
        const hugEffect = document.getElementById('hug-effect');
        if (!character) return;
        
        let longPressTimer;
        
        // Tap interaction
        character.addEventListener('click', (e) => {
            if (this.state.isHugging) return;
            
            this.triggerGlowPulse(e.currentTarget);
            this.createSparkles(e.clientX, e.clientY);
            this.state.characterTapCount++;
            
            clearTimeout(this.state.characterTapTimer);
            this.state.characterTapTimer = setTimeout(() => {
                this.state.characterTapCount = 0;
            }, 2000);
            
            // Annoyed after 5 taps (shared messages); otherwise mood-based tap
            const mood = this.state.currentMood || 'soft_comfort';
            if (this.state.characterTapCount >= 5) {
                this.showCharacterMessage(this.randomFrom(MESSAGE_DATABASE.character.annoyed));
                this.state.characterTapCount = 0;
            } else {
                const tapMessages = MESSAGE_DATABASE.character.tap[mood];
                this.showCharacterMessage(this.randomFrom(tapMessages || MESSAGE_DATABASE.character.tap.soft_comfort));
            }
        });
        
        // Long press for hug
        character.addEventListener('mousedown', () => {
            longPressTimer = setTimeout(() => {
                this.triggerHug();
            }, 1000);
        });
        
        character.addEventListener('mouseup', () => {
            clearTimeout(longPressTimer);
        });
        
        character.addEventListener('touchstart', (e) => {
            e.preventDefault();
            longPressTimer = setTimeout(() => {
                this.triggerHug();
            }, 1000);
        });
        
        character.addEventListener('touchend', () => {
            clearTimeout(longPressTimer);
        });
    }
    
    showCharacterMessage(text) {
        const message = document.getElementById('character-message');
        if (!message) return;
        message.classList.add('message-fade-out');
        message.classList.remove('message-visible');
        
        setTimeout(() => {
            message.textContent = text;
            message.classList.remove('message-fade-out');
            message.classList.add('message-visible');
            setTimeout(() => {
                message.classList.add('message-fade-out');
                message.classList.remove('message-visible');
            }, 3200);
        }, 320);
    }
    
    triggerHug() {
        if (this.state.isHugging) return;
        
        const hugEffect = document.getElementById('hug-effect');
        const character = document.getElementById('character');
        if (!hugEffect || !character) return;
        
        this.state.isHugging = true;
        hugEffect.classList.add('active');
        character.style.transform = 'translateX(-50%) scale(1.1)';
        
        const mood = this.state.currentMood || 'soft_comfort';
        const hugMessages = MESSAGE_DATABASE.character.hug[mood];
        this.showCharacterMessage(this.randomFrom(hugMessages || MESSAGE_DATABASE.character.hug.soft_comfort));
        
        setTimeout(() => {
            hugEffect.classList.remove('active');
            character.style.transform = '';
            this.state.isHugging = false;
        }, 1000);
    }
    
    scheduleSpontaneousInteraction() {
        // Random spontaneous message every 5-15 minutes
        const scheduleNext = () => {
            const delay = (Math.random() * 10 + 5) * 60 * 1000; // 5-15 min
            setTimeout(() => {
                if (Math.random() < 0.3) { // 30% chance when timer fires
                    this.showCharacterMessage(this.randomFrom(MESSAGE_DATABASE.character.spontaneous));
                }
                scheduleNext();
            }, delay);
        };
        scheduleNext();
    }
    
    // ─── BED ───
    setupBedInteraction() {
        const bed = document.getElementById('bed');
        if (!bed) return;
        
        bed.addEventListener('click', (e) => {
            this.triggerGlowPulse(e.currentTarget);
            this.createSparkles(e.clientX, e.clientY);
            this.enterComfortMode();
        });
    }
    
    enterComfortMode() {
        const comfortMode = document.getElementById('comfort-mode');
        const comfortText = document.getElementById('comfort-text');
        const closeBtn = document.getElementById('comfort-close');
        if (!comfortMode || !comfortText || !closeBtn) return;
        
        const mood = this.state.currentMood || 'soft_comfort';
        const message = this.randomFrom(MESSAGE_DATABASE.bed[mood]);
        
        comfortText.textContent = message;
        comfortMode.classList.remove('hidden');
        
        setTimeout(() => {
            comfortMode.classList.add('show');
            setTimeout(() => {
                comfortText.classList.add('show');
            }, 300);
        }, 50);
        
        closeBtn.onclick = () => {
            comfortMode.classList.remove('show');
            comfortText.classList.remove('show');
            setTimeout(() => {
                comfortMode.classList.add('hidden');
            }, 500);
        };
    }
    
    // ─── MUSIC PLAYER ───
    setupMusicPlayerInteraction() {
        const player = document.getElementById('music-player');
        const message = document.getElementById('music-message');
        if (!player || !message) return;
        
        player.addEventListener('click', (e) => {
            this.triggerGlowPulse(e.currentTarget);
            this.createSparkles(e.clientX, e.clientY);
            const mood = this.state.currentMood || 'soft_comfort';
            const text = this.randomFrom(MESSAGE_DATABASE.music[mood]);
            this.showMessage(message, text);
        });
    }
    
    // ─── JAR ───
    setupJarInteraction() {
        const jar = document.getElementById('jar');
        if (!jar) return;
        
        jar.addEventListener('click', (e) => {
            this.triggerGlowPulse(e.currentTarget);
            this.createSparkles(e.clientX, e.clientY);
            this.pullNote();
        });
    }
    
    pullNote() {
        const noteDisplay = document.getElementById('note-display');
        const noteContent = document.getElementById('note-content');
        const closeBtn = document.getElementById('note-close');
        if (!noteDisplay || !noteContent || !closeBtn) return;
        
        const mood = this.state.currentMood || 'soft_comfort';
        const isLong = Math.random() < 0.1;
        const shortPool = MESSAGE_DATABASE.jar[mood] || MESSAGE_DATABASE.jar.short;
        const message = isLong ? 
            this.randomFrom(MESSAGE_DATABASE.jar.long) :
            this.randomFrom(shortPool);
        
        noteContent.textContent = message;
        noteDisplay.classList.remove('hidden');
        
        setTimeout(() => {
            noteDisplay.classList.add('show');
        }, 50);
        
        closeBtn.onclick = () => {
            noteDisplay.classList.remove('show');
            setTimeout(() => {
                noteDisplay.classList.add('hidden');
            }, 300);
        };
    }
    
    // ─── DIARY ───
    setupDiaryInteraction() {
        const diaryBtn = document.getElementById('diary');
        const modal = document.getElementById('diary-modal');
        const closeBtn = document.getElementById('diary-close');
        const saveBtn = document.getElementById('diary-save');
        const input = document.getElementById('diary-input');
        const response = document.getElementById('diary-response');
        const entriesContainer = document.getElementById('diary-entries');
        if (!diaryBtn || !modal) return;
        
        diaryBtn.addEventListener('click', (e) => {
            this.triggerGlowPulse(e.currentTarget);
            this.createSparkles(e.clientX, e.clientY);
            this.openDiary();
        });
        
        if (closeBtn) {
            closeBtn.onclick = () => {
                modal.classList.remove('show');
                setTimeout(() => modal.classList.add('hidden'), 300);
            };
        }
        
        if (saveBtn && input && response) {
            saveBtn.onclick = () => {
                const text = input.value.trim();
                if (text) {
                    const mood = this.state.currentMood || 'soft_comfort';
                    const responseText = this.diary.addEntry(text, mood);
                    response.textContent = responseText;
                    response.classList.add('show');
                    input.value = '';
                    setTimeout(() => this.loadDiaryEntries(), 500);
                }
            };
        }
    }
    
    openDiary() {
        const modal = document.getElementById('diary-modal');
        if (!modal) return;
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('show'), 50);
        this.loadDiaryEntries();
    }
    
    loadDiaryEntries() {
        const entriesContainer = document.getElementById('diary-entries');
        if (!entriesContainer) return;
        entriesContainer.innerHTML = '';
        
        const entries = this.diary.getRecentEntries();
        entries.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'diary-entry';
            
            const date = new Date(entry.date);
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            
            const dateEl = document.createElement('div');
            dateEl.className = 'diary-entry-date';
            dateEl.textContent = dateStr;
            const textEl = document.createElement('div');
            textEl.className = 'diary-entry-text';
            textEl.textContent = entry.text || '';
            
            entryDiv.appendChild(dateEl);
            entryDiv.appendChild(textEl);
            entriesContainer.appendChild(entryDiv);
        });
    }
    
    // ─── UTILITIES ───
    triggerGlowPulse(element) {
        if (!element) return;
        element.classList.remove('tap-glow');
        void element.offsetWidth;
        element.classList.add('tap-glow');
        setTimeout(() => element.classList.remove('tap-glow'), 920);
    }
    
    showMessage(element, text) {
        if (!element) return;
        element.classList.add('message-fade-out');
        element.classList.remove('message-visible');
        
        setTimeout(() => {
            element.textContent = text;
            element.classList.remove('message-fade-out');
            element.classList.add('message-visible');
            setTimeout(() => {
                element.classList.add('message-fade-out');
                element.classList.remove('message-visible');
            }, 3600);
        }, 320);
    }
    
    createSparkles(x, y) {
        const container = document.getElementById('sparkles');
        if (!container) return;
        const px = (typeof x === 'number' && !isNaN(x)) ? x : 0;
        const py = (typeof y === 'number' && !isNaN(y)) ? y : 0;
        const sparkleCount = 5;
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            const angle = (Math.PI * 2 * i) / sparkleCount;
            const distance = 30 + Math.random() * 20;
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;
            
            sparkle.style.left = (px + offsetX) + 'px';
            sparkle.style.top = (py + offsetY) + 'px';
            
            container.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 800);
        }
    }
    
    randomFrom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}

// ───────────────────────────────────────────────────────────────
// INITIALIZATION
// ───────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    try {
        const state = new AppState();
        const diary = new DiarySystem();
        const interactions = new RoomInteractions(state, diary);
        
        // Welcome message on first visit (fade in, then fade out)
        if (state.visitCount === 1) {
            setTimeout(() => {
                const characterMsg = document.getElementById('character-message');
                if (characterMsg) {
                    characterMsg.textContent = "hi there";
                    characterMsg.classList.remove('message-fade-out');
                    characterMsg.classList.add('message-visible');
                    setTimeout(() => {
                        characterMsg.classList.add('message-fade-out');
                        characterMsg.classList.remove('message-visible');
                    }, 3200);
                }
            }, 1000);
        }
    } catch (err) {
        console.error('Room app failed to start:', err);
    }
});
