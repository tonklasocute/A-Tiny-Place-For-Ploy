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
export const playlist: Song[] = [
  // Example (uncomment and edit):
  // { id: 's1', title: 'Soft Evening', artist: 'lo-fi mix', filename: 'soft-evening.mp3' },
  // { id: 's2', title: 'Ploy\'s Theme', filename: 'ploy-theme.mp3' },
]

export const playerLabel = 'Ploy\'s Playlist 🎵'
