export interface LittleThing {
  id: string
  emoji: string
  title: string
  subtitle: string
  description: string
  hiddenMessage: string
  imageFilename?: string    // shown as card header photo (from /public/)
  objectPosition?: string   // CSS object-position for photo crop
  fadeColor: string         // hex – photo or header fades into this → body start color
  gradient: string          // card body gradient
  glowRgb: string           // "r,g,b" for rgba shadows
  noteAlpha: string         // tinted bg for revealed note
  textColor: string
  hiddenColor: string
  sparkleEmojis: string[]
}

export const littleThings: LittleThing[] = [
  {
    id: 'racing',
    emoji: '🏎️',
    title: 'Sunday Race Energy',
    subtitle: 'Formula One · #LC16',
    description: 'Ploy enjoys Formula 1 and always roots for Leclerc. Race weekends hit differently.',
    hiddenMessage: 'Hopefully LC16 gets a podium today.',
    imageFilename: 'lc16.jpg',
    objectPosition: '50% 10%',
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
    title: 'Cat Distribution System',
    subtitle: 'Soft paws · loud purrs',
    description: 'Cats seem to find her wherever she goes. Something about her energy, maybe.',
    hiddenMessage: 'Every cat deserves a nap.',
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
    title: 'Memory Loading...',
    subtitle: 'Please wait · 3%',
    description: 'Adorably forgetful in the most endearing way. Why did she come into this room? Unknown.',
    hiddenMessage: 'Achievement Unlocked: Forgot what I was doing.',
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
    title: 'Too Kind For Her Own Good',
    subtitle: 'Considers everyone · always',
    description: 'She will worry about how others are doing before she ever thinks about herself.',
    hiddenMessage: 'You deserve kindness too.',
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
    title: 'Certified Food Explorer',
    subtitle: 'All cuisines welcome',
    description: '"Let\'s try that place?" — her answer is always yes. Always.',
    hiddenMessage: 'Mission: Find the next delicious thing.',
    fadeColor: '#ffd880',
    gradient: 'linear-gradient(160deg, #ffd880 0%, #ffca50 100%)',
    glowRgb: '200,140,20',
    noteAlpha: 'rgba(200,140,20,0.13)',
    textColor: '#3e2200',
    hiddenColor: '#5a3200',
    sparkleEmojis: ['🍣', '🍡', '🌟', '✨'],
  },
]
