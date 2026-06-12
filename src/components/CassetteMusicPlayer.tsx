import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playlist } from '../data/music'

interface Note { id: number; x: number; glyph: string }

const GLYPHS = ['♪', '♫', '♬', '🎵', '🎶']

export default function MusicPlayer() {
  const base = import.meta.env.BASE_URL
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const noteTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const constraintsRef = useRef<HTMLDivElement>(null)

  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.65)
  const [expanded, setExpanded] = useState(false)
  const [notes, setNotes] = useState<Note[]>([])
  const [hasError, setHasError] = useState(false)

  const hasSongs = playlist.length > 0
  const song = playlist[0] ?? null

  // ── Bootstrap audio + autoplay ──────────────────────────────────────
  useEffect(() => {
    if (!hasSongs) return

    const audio = new Audio(`${base}music/${song.filename}`)
    audio.volume = volume
    audio.loop = true
    audioRef.current = audio

    audio.addEventListener('error', () => setHasError(true))

    const tryPlay = () =>
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {
          // Browser blocked autoplay — start on first user interaction
          const unlock = () => {
            audio.play().then(() => setPlaying(true)).catch(() => {})
          }
          document.addEventListener('click',      unlock, { once: true })
          document.addEventListener('touchstart', unlock, { once: true })
          document.addEventListener('keydown',    unlock, { once: true })
        })

    tryPlay()

    return () => {
      audio.pause()
      audio.src = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, hasSongs])

  // ── Volume sync ─────────────────────────────────────────────────────
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  // ── Floating notes when playing ──────────────────────────────────────
  useEffect(() => {
    if (playing) {
      noteTimer.current = setInterval(() => {
        setNotes(prev => [
          ...prev.slice(-7),
          { id: Date.now(), x: 8 + Math.random() * 84, glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)] },
        ])
      }, 1400)
    } else {
      if (noteTimer.current) clearInterval(noteTimer.current)
      setNotes([])
    }
    return () => { if (noteTimer.current) clearInterval(noteTimer.current) }
  }, [playing])

  // ── Toggle play / pause ───────────────────────────────────────────────
  const togglePlay = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      a.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  if (!hasSongs || hasError) return null   // silent if no file

  return (
    <>
      {/* Drag constraint layer */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[90]" />

      {/* Floating notes */}
      <AnimatePresence>
        {notes.map(n => (
          <motion.div
            key={n.id}
            className="fixed pointer-events-none z-[89]"
            style={{ left: `${n.x}%`, bottom: '72px', fontSize: '1rem', color: '#c8b4e8' }}
            initial={{ y: 0, opacity: 0.9 }}
            animate={{ y: -90, opacity: 0, rotate: Math.random() > 0.5 ? 20 : -20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            {n.glyph}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Player pill */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        className="fixed bottom-6 right-4 z-[100] cursor-grab active:cursor-grabbing touch-none"
        initial={{ opacity: 0, y: 12, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 220, damping: 18 }}
      >
        <motion.div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1.5px solid rgba(200,180,232,0.45)',
            boxShadow: playing
              ? '0 4px 24px rgba(245,147,176,0.35)'
              : '0 4px 18px rgba(180,130,220,0.15)',
          }}
          animate={playing ? {
            boxShadow: [
              '0 4px 18px rgba(245,147,176,0.2)',
              '0 4px 28px rgba(245,147,176,0.45)',
              '0 4px 18px rgba(245,147,176,0.2)',
            ],
          } : {}}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          {/* Main row */}
          <div
            className="flex items-center gap-2 px-3 py-2.5 cursor-pointer"
            onClick={() => setExpanded(e => !e)}
          >
            {/* Animated note icon */}
            <motion.span
              className="text-base leading-none select-none"
              animate={playing ? { y: [0, -3, 0], opacity: [0.7, 1, 0.7] } : { opacity: 0.4 }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{ color: '#c8b4e8' }}
            >
              ♪
            </motion.span>

            {/* Song info */}
            <div className="overflow-hidden" style={{ maxWidth: '110px' }}>
              <motion.p
                className="text-xs font-body font-semibold whitespace-nowrap"
                style={{ color: '#5a3d5c' }}
                animate={playing && song.title.length > 14 ? { x: [0, -60, 0] } : {}}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
              >
                {song.title}
              </motion.p>
              {song.artist && (
                <p className="text-[10px] font-body truncate" style={{ color: '#9a7a9a' }}>
                  {song.artist}
                </p>
              )}
            </div>

            {/* Play / Pause */}
            <motion.button
              onClick={e => { e.stopPropagation(); togglePlay() }}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs"
              style={{ background: 'linear-gradient(135deg, #f593b0, #c8b4e8)' }}
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.1 }}
            >
              {playing ? '⏸' : '▶'}
            </motion.button>
          </div>

          {/* Expanded: volume */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-2 px-3 pb-2.5">
                  <span className="text-xs" style={{ color: '#c8b4e8' }}>🔈</span>
                  <input
                    type="range"
                    aria-label="Volume"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={e => setVolume(Number(e.target.value))}
                    className="flex-1 h-1 rounded-full accent-pink-400"
                    style={{ cursor: 'pointer' }}
                    onClick={e => e.stopPropagation()}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  )
}
