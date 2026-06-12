export interface LittleThing {
  id: string
  emoji: string
  title: string
  subtitle: string
  description: string      // 2-line preview shown on compact card
  story: string            // full poetic text shown in the pop-up sheet
  hiddenMessage: string
  imageFilename?: string
  objectPosition?: string
  fadeColor: string
  gradient: string
  glowRgb: string
  noteAlpha: string
  textColor: string
  hiddenColor: string
  sparkleEmojis: string[]
}

export const littleThings: LittleThing[] = [
  {
    id: 'racing',
    emoji: '🏎️',
    title: 'Race Day Ploy',
    subtitle: 'Formula One · #LC16',
    description: 'On race weekends, she probably knows the F1 schedule better than her own plans.',
    story: 'On race weekends, there\'s a good chance Ploy knows the F1 schedule better than her own plans.\n\nEverything seems normal before the lights go out.\n\nBut the moment the race starts, she becomes a full-time LC16 supporter.\n\nEvery overtake matters. Every pit stop matters. Every lap feels personal.',
    hiddenMessage: 'Today, all I\'m asking for is a clean race and no drama. 🏁',
    imageFilename: 'lc16.jpg',
    objectPosition: '50% 65%',
    fadeColor: '#c8d0ff',
    gradient: 'linear-gradient(160deg, #c8d0ff 0%, #aab8ff 100%)',
    glowRgb: '80,100,230',
    noteAlpha: 'rgba(80,100,230,0.11)',
    textColor: '#141e6a',
    hiddenColor: '#2030a8',
    sparkleEmojis: ['🏁', '⚡', '🔴', '✨'],
  },
  {
    id: 'cats',
    emoji: '🐱',
    title: 'Cat Magnet',
    subtitle: 'They always find her first',
    description: 'No one really knows whether Ploy loves cats — or cats simply love Ploy back.',
    story: 'No one really knows whether Ploy loves cats...\n\nor cats simply love Ploy back.\n\nBut somehow, whenever there\'s a cat nearby, she\'s always the first one to spot it.\n\nAnd before long, there\'s usually a smile on her face.\n\nMaybe cats are just very good judges of character.',
    hiddenMessage: 'Every cat that walks up to you made the right choice. 🐾',
    imageFilename: 'cat.jpg',
    objectPosition: 'center 30%',
    fadeColor: '#dbbeff',
    gradient: 'linear-gradient(160deg, #dbbeff 0%, #c89cff 100%)',
    glowRgb: '140,70,220',
    noteAlpha: 'rgba(140,70,220,0.11)',
    textColor: '#2e0060',
    hiddenColor: '#5020a0',
    sparkleEmojis: ['🐾', '😺', '💜', '✨'],
  },
  {
    id: 'memory',
    emoji: '🧠',
    title: 'Loading...',
    subtitle: 'Please wait · 3%',
    description: 'Walk into a room. Forget why. Walk back. Remember. Walk in again. Forget once more.',
    story: 'Ploy has a very special talent.\n\nWalk into a room.\nForget why she went there.\nWalk back.\nRemember.\nWalk in again.\nForget once more.\nRepeat as necessary.\n\nSome days her memory takes a little longer to load.\n\nBut somehow, that\'s part of her charm.',
    hiddenMessage: 'Too many tabs open. System still running. 💭',
    imageFilename: 'forget.jpg',
    objectPosition: 'center center',
    fadeColor: '#b0f0d8',
    gradient: 'linear-gradient(160deg, #b0f0d8 0%, #86e4c0 100%)',
    glowRgb: '30,160,120',
    noteAlpha: 'rgba(30,160,120,0.12)',
    textColor: '#093d2c',
    hiddenColor: '#10573e',
    sparkleEmojis: ['💭', '🌀', '⭐', '✨'],
  },
  {
    id: 'kind',
    emoji: '🌷',
    title: 'Softer Than She Thinks',
    subtitle: 'Considers everyone · always',
    description: 'Ploy is the kind of person who worries about everyone else first.',
    story: 'Ploy is the kind of person who worries about everyone else first.\n\nShe checks if people are okay.\nShe thinks about how others might feel.\nShe says sorry even when she doesn\'t need to.\n\nAnd sometimes she carries things quietly on her own.\n\nEvery now and then, she forgets that she deserves the same kindness she gives to everyone else.',
    hiddenMessage: 'Maybe next time, choose yourself first. Just a little. 🌷',
    imageFilename: 'ploy4.jpg',
    objectPosition: 'center 48%',
    fadeColor: '#ffcce0',
    gradient: 'linear-gradient(160deg, #ffcce0 0%, #ffaece 100%)',
    glowRgb: '220,70,130',
    noteAlpha: 'rgba(220,70,130,0.11)',
    textColor: '#5a0028',
    hiddenColor: '#8c0038',
    sparkleEmojis: ['💕', '🌸', '🌷', '💗'],
  },
  {
    id: 'food',
    emoji: '🍜',
    title: 'Professional Food Enjoyer',
    subtitle: 'All cuisines welcome',
    description: 'If someone asks "What should we eat?" — Ploy is probably the easiest person to ask.',
    story: 'If someone asks,\n"What should we eat?"\n\nPloy is probably the easiest person to ask.\n\nBecause the answer is usually:\n"Anything is fine."\n\nNew places. Late-night snacks.\nStreet food. Desserts. Comfort food.\nTrying something she\'s never had before.\n\nFood isn\'t just food.\nIt\'s part of the adventure.',
    hiddenMessage: 'Life gets a little better when there\'s something delicious involved. ✨',
    imageFilename: 'food.jpg',
    objectPosition: 'center center',
    fadeColor: '#ffd880',
    gradient: 'linear-gradient(160deg, #ffd880 0%, #ffca50 100%)',
    glowRgb: '200,140,20',
    noteAlpha: 'rgba(200,140,20,0.13)',
    textColor: '#3e2200',
    hiddenColor: '#5a3200',
    sparkleEmojis: ['🍣', '🍡', '🌟', '✨'],
  },
]
