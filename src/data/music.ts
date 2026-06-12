export interface Song {
  id: string
  title: string
  artist?: string
  filename: string   // stored in /public/music/  e.g. "lofi-1.mp3"
}

// ─────────────────────────────────────────────────────────
// HOW TO ADD MUSIC
// 1. Drop your .mp3 / .ogg files into /public/music/
// 2. Add an entry below with the exact filename
// 3. Run `npm run build` — done!
// ─────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────
// To activate: drop the mp3 file into /public/music/
// then rename it to exactly: love-wave-to-earth.mp3
// ─────────────────────────────────────────────────────────
export const playlist: Song[] = [
  {
    id: 'love',
    title: 'Love',
    artist: 'wave to earth',
    filename: 'love-wave-to-earth.mp3',
  },
]

export const playerLabel = 'Ploy\'s Playlist 🎵'
