export interface LittleThing {
  id: string
  emoji: string
  label: string
  value: string
  note: string
  color: string           // card accent color
  bgColor: string         // card background tint
  imageFilename?: string  // optional image from public/
  rotation: number
  stickerEmoji?: string   // decorative sticker on card
}

// Edit value and note to personalize. Colors use pastel palette.
export const littleThings: LittleThing[] = [
  {
    id: 'drink',
    emoji: '🧋',
    label: 'Favorite Drink',
    value: 'Brown sugar milk tea',
    note: 'extra pearls, always 🫧',
    color: '#FFD5B5',
    bgColor: '#FFF0E0',
    rotation: -2.5,
    stickerEmoji: '✨',
  },
  {
    id: 'animal',
    emoji: '🐱',
    label: 'Favorite Animal',
    value: 'Cats',
    note: 'especially the fluffy, grumpy ones',
    color: '#C8B4E8',
    bgColor: '#F0EAFF',
    imageFilename: 'cat.jpg',
    rotation: 1.8,
    stickerEmoji: '💜',
  },
  {
    id: 'comfort',
    emoji: '🌸',
    label: 'Favorite Comfort Thing',
    value: 'Soft playlists & warm blankets',
    note: 'and maybe a good snack nearby',
    color: '#FFB5C8',
    bgColor: '#FFF0F5',
    rotation: -1.2,
    stickerEmoji: '🎀',
  },
  {
    id: 'memory',
    emoji: '✨',
    label: 'Something Worth Remembering',
    value: 'The way you laugh at your own jokes',
    note: 'it is genuinely contagious 🌟',
    color: '#B5D8F7',
    bgColor: '#EEF7FF',
    rotation: 2.2,
    stickerEmoji: '🌷',
  },
]
