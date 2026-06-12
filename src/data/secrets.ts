export interface Secret {
  id: string
  emoji: string
  title: string
  message: string
}

// Each secret is attached to a hidden tappable object on a specific screen.
// Edit message text freely.
export const secrets: Record<string, Secret> = {
  flower: {
    id: 'flower',
    emoji: '🌷',
    title: 'A little note',
    message: 'You make people smile more than you realize. This flower is for you.',
  },
  star: {
    id: 'star',
    emoji: '⭐',
    title: 'From the stars',
    message: 'Someone is proud of you. From a distance, but genuinely.',
  },
  moon: {
    id: 'moon',
    emoji: '🌙',
    title: 'Night whisper',
    message: 'Even on the quiet nights, you are not forgotten. Sleep well.',
  },
  bubbleTea: {
    id: 'bubbleTea',
    emoji: '🧋',
    title: 'A tiny truth',
    message: 'You\'ve already come a long way. Much further than you give yourself credit for.',
  },
  mochi: {
    id: 'mochi',
    emoji: '🍡',
    title: 'Mochi says',
    message: 'It\'s okay to move at your own pace. There is no race here. Take your time.',
  },
  cat: {
    id: 'cat',
    emoji: '🐱',
    title: 'Psst',
    message: 'Even cats nap 16 hours a day and nobody judges them. Rest is natural.',
  },
  letter: {
    id: 'letter',
    emoji: '💌',
    title: 'P.S.',
    message: 'This letter will be here whenever you need to read it again.',
  },
}
