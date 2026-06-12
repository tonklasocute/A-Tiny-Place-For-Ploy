// Re-export from the original utils so both import paths work
export { encouragingMessages, mochiDialogues } from '../utils/messages'

// Mochi evolution level labels and dialogue
export interface MochiLevel {
  level: number
  name: string
  description: string
  dialogue: string[]
  emoji: string
}

export const mochiLevels: MochiLevel[] = [
  {
    level: 1,
    name: 'Sleepy',
    description: 'Just woke up...',
    emoji: '😴',
    dialogue: [
      'Thanks for visiting... *yawn*',
      'Mochi is here. A little sleepy, but here.',
      'You showed up. That already counts.',
    ],
  },
  {
    level: 2,
    name: 'Smiling',
    description: 'Getting cozy!',
    emoji: '😊',
    dialogue: [
      'I think Ploy smiled. Mochi noticed.',
      'Something is getting warmer in here.',
      'This feels nice. You feel nice to be around.',
    ],
  },
  {
    level: 3,
    name: 'Excited',
    description: 'Full of energy!',
    emoji: '🌟',
    dialogue: [
      'Today is getting better, I can feel it!',
      'Mochi is doing a little happy bounce right now.',
      'Look at us!! Taking care of ourselves!!',
    ],
  },
  {
    level: 4,
    name: 'Sparkling',
    description: 'Mission mode: ON',
    emoji: '✨',
    dialogue: [
      'Mission: Protect Ploy\'s smile. Status: ACTIVE. ✨',
      'You did it!! Mochi is fully charged because of you!',
      'No matter what, Mochi will always be here cheering for you.',
    ],
  },
]

export function getMochiLevel(points: number): number {
  if (points < 25) return 1
  if (points < 50) return 2
  if (points < 75) return 3
  return 4
}
