import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playlist } from '../data/music'
import { useAmbientMusic } from '../hooks/useAmbientMusic'

interface FloatingNote {
  id: number
  x: number
  note: string
}

function CassetteSVG({ playing }: { playing: boolean }) {
  return (
    <svg width="72" height="46" viewBox="0 0 72 46" fill="none">
      {/* Body */}
      <rect x="1" y="1" width="70" height="44" rx="6" fill="url(#cassBody)" stroke="rgba(200,180,232,0.6)" strokeWidth="1.5" />
      {/* Window */}
      <rect x="16" y="10" width="40" height="24" rx="4" fill="#1a0d2e" opacity="0.85" />
      {/* Left spool */}
      <motion.g
        style={{ transformOrigin: '28px 22px' }}
        animate={playing ? { rotate: 360 } : { rotate: 0 }}
        transition={playing ? { duration: 3, repeat: Infinity, ease: 'linear' } : {}}
      >
        <circle cx="28" cy="22" r="7" fill="#2d1b4e" />
        <circle cx="28" cy="22" r="3" fill="url(#spoolCenter)" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <line key={i} x1="28" y1="22"
            x2={28 + 6 * Math.cos((angle * Math.PI) / 180)}
            y2={22 + 6 * Math.sin((angle * Math.PI) / 180)}
            stroke="rgba(200,180,232,0.5)" strokeWidth="1" />
        ))}
      </motion.g>
      {/* Right spool */}
      <motion.g
        style={{ transformOrigin: '44px 22px' }}
        animate={playing ? { rotate: 360 } : { rotate: 0 }}
        transition={playing ? { duration: 3, repeat: Infinity, ease: 'linear' } : {}}
      >
        <circle cx="44" cy="22" r="7" fill="#2d1b4e" />
        <circle cx="44" cy="22" r="3" fill="url(#spoolCenter)" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <line key={i} x1="44" y1="22"
            x2={44 + 6 * Math.cos((angle * Math.PI) / 180)}
            y2={22 + 6 * Math.sin((angle * Math.PI) / 180)}
            stroke="rgba(200,180,232,0.5)" strokeWidth="1" />
        ))}
      </motion.g>
      {/* Tape line */}
      <path d="M 21 30 Q 36 34 51 30" stroke="rgba(200,180,232,0.4)" strokeWidth="1" fill="none" />
      {/* Bottom label strip */}
      <rect x="8" y="37" width="56" height="5" rx="2" fill="rgba(255,181,200,0.35)" />
      {/* Side holes */}
      <circle cx="8" cy="22" r="4" fill="#0f0820" />
      <circle cx="64" cy="22" r="4" fill="#0f0820" />
      <defs>
        <linearGradient id="cassBody" x1="0" y1="0" x2="72" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f0e6ff" />
          <stop offset="1" stopColor="#ffd6ea" />
        </linearGradient>
        <radialGradient id="spoolCenter" cx="50%" cy="50%" r="50%">
          <stop stopColor="#c8b4e8" />
          <stop offset="1" stopColor="#9a7ab8" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export default function CassetteMusicPlayer() {
  const hasSongs = playlist.length > 0

  // Ambient music fallback (Web Audio API)
  const { isMuted: ambientMuted, toggleMute: toggleAmbient } = useAmbientMusic()

  // HTML5 audio for real songs
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [songIndex, setSongIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [expanded, setExpanded] = useState(false)
  const [floatingNotes, setFloatingNotes] = useState<FloatingNote[]>([])
  const noteTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const constraintsRef = useRef<HTMLDivElement>(null)
  const base = import.meta.env.BASE_URL

  // Load audio when song changes
  useEffect(() => {
    if (!hasSongs) return
    const song = playlist[songIndex]
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.volume = volume
    }
    audioRef.current.src = `${base}music/${song.filename}`
    audioRef.current.load()
    if (playing) audioRef.current.play().catch(() => setPlaying(false))
  }, [songIndex, hasSongs, base])

  useEffect(() => {
    if (!audioRef.current || !hasSongs) return
    audioRef.current.volume = volume
  }, [volume, hasSongs])

  const spawnNotes = useCallback(() => {
    noteTimerRef.current = setInterval(() => {
      const note: FloatingNote = {
        id: Date.now(),
        x: 20 + Math.random() * 60,
        note: ['♪', '♫', '♬', '🎵', '🎶'][Math.floor(Math.random() * 5)],
      }
      setFloatingNotes(prev => [...prev.slice(-6), note])
    }, 1200)
  }, [])

  const stopNotes = useCallback(() => {
    if (noteTimerRef.current) clearInterval(noteTimerRef.current)
    noteTimerRef.current = null
    setFloatingNotes([])
  }, [])

  const togglePlay = useCallback(() => {
    if (!hasSongs) {
      // Ambient fallback
      toggleAmbient()
      setPlaying(p => !p)
      return
    }
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
      stopNotes()
    } else {
      audioRef.current.play().catch(() => setPlaying(false))
      setPlaying(true)
      spawnNotes()
    }
  }, [playing, hasSongs, toggleAmbient, spawnNotes, stopNotes])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopNotes()
      audioRef.current?.pause()
    }
  }, [stopNotes])

  // When playing state changes, manage notes
  useEffect(() => {
    if (playing) spawnNotes()
    else stopNotes()
    return () => stopNotes()
  }, [playing])

  const currentSong = hasSongs ? playlist[songIndex] : null
  const songTitle = currentSong
    ? `${currentSong.title}${currentSong.artist ? ` — ${currentSong.artist}` : ''}`
    : hasSongs ? '' : 'Ambient lo-fi ✨'

  return (
    <>
      {/* Drag constraint layer */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[90]" />

      {/* Floating notes */}
      <AnimatePresence>
        {floatingNotes.map(n => (
          <motion.div
            key={n.id}
            className="fixed pointer-events-none z-[89] text-base"
            style={{ left: `${n.x}%`, bottom: '100px' }}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: -100, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
          >
            {n.note}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Player */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        className="fixed bottom-20 left-4 z-[100] cursor-grab active:cursor-grabbing touch-none"
        initial={{ x: 0, y: 0, opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
      >
        <motion.div
          className="rounded-2xl px-3 pt-3 pb-2"
          style={{
            background: 'rgba(255,255,255,0.75)',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(200,180,232,0.45)',
            boxShadow: '0 8px 32px rgba(180,130,220,0.2)',
            minWidth: '88px',
          }}
          animate={playing ? {
            boxShadow: [
              '0 8px 32px rgba(180,130,220,0.2)',
              '0 8px 40px rgba(245,147,176,0.4)',
              '0 8px 32px rgba(180,130,220,0.2)',
            ],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Cassette */}
          <div onClick={() => setExpanded(e => !e)} className="cursor-pointer">
            <CassetteSVG playing={playing} />
          </div>

          {/* Controls row */}
          <div className="flex items-center gap-2 mt-1.5 justify-center">
            {/* Play/Pause */}
            <motion.button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
              style={{ background: 'linear-gradient(135deg, #f593b0, #c8b4e8)' }}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              {playing ? '⏸' : '▶'}
            </motion.button>

            {/* Next (only if real songs) */}
            {hasSongs && playlist.length > 1 && (
              <motion.button
                onClick={() => setSongIndex(i => (i + 1) % playlist.length)}
                className="text-xs"
                style={{ color: '#9a7ab8' }}
                whileTap={{ scale: 0.9 }}
              >
                ⏭
              </motion.button>
            )}
          </div>

          {/* Expanded: song title + volume */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="pt-2 pb-1">
                  {/* Song title marquee */}
                  <div className="overflow-hidden">
                    <motion.p
                      className="text-xs font-body whitespace-nowrap"
                      style={{ color: '#7a5a9a' }}
                      animate={songTitle.length > 18 ? { x: [0, -(songTitle.length * 5), 0] } : {}}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    >
                      {songTitle}
                    </motion.p>
                  </div>
                  {/* Volume */}
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-xs">🔈</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={e => setVolume(Number(e.target.value))}
                      className="flex-1 h-1 rounded-full accent-pink-400"
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                  {!hasSongs && (
                    <p className="text-[9px] font-body mt-1 opacity-60 text-center" style={{ color: '#9a7ab8' }}>
                      Add songs to /public/music/
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  )
}
