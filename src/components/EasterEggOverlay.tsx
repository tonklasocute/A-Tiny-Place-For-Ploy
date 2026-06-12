import { motion, AnimatePresence } from 'framer-motion'
import { useMemo } from 'react'

interface EasterEggOverlayProps {
  open: boolean
  onClose: () => void
}

const MESSAGE_LINES = [
  "Hey Ploy.",
  "",
  "If you found this,",
  "there's something I wanted to tell you.",
  "",
  "No matter how uncertain things feel right now,",
  "I genuinely believe good things are waiting for you.",
  "",
  "And I'm really glad I got to know you.",
  "",
  "🌷",
]

export default function EasterEggOverlay({ open, onClose }: EasterEggOverlayProps) {
  const stars = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      delay: Math.random() * 2,
      duration: 1.5 + Math.random() * 2,
    })), [])

  const sparkles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 90,
      emoji: ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)],
      delay: Math.random() * 3,
    })), [])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden"
          style={{ background: '#0a0820' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Stars */}
          {stars.map(s => (
            <motion.div
              key={s.id}
              className="absolute rounded-full bg-white"
              style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.3, 1, 0] }}
              transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }}
            />
          ))}

          {/* Sparkles */}
          {sparkles.map(sp => (
            <motion.div
              key={sp.id}
              className="absolute text-sm pointer-events-none"
              style={{ left: `${sp.x}%`, top: `${sp.y}%` }}
              animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.3, 1, 0.3], rotate: [0, 20, -20, 0] }}
              transition={{ duration: 3, delay: sp.delay, repeat: Infinity }}
            >
              {sp.emoji}
            </motion.div>
          ))}

          {/* Central glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(200,180,232,0.18) 0%, transparent 65%)',
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Message card */}
          <motion.div
            className="relative z-10 px-8 py-10 mx-6 rounded-3xl text-center max-w-sm w-full"
            style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(200,180,232,0.3)',
              boxShadow: '0 0 60px rgba(200,180,232,0.15)',
            }}
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 160, damping: 18 }}
          >
            {MESSAGE_LINES.map((line, i) => (
              <motion.p
                key={i}
                className={`font-display leading-relaxed ${
                  i === 0 ? 'text-2xl font-bold mb-2' : 'text-base'
                } ${line === '' ? 'h-3' : ''} ${line === '🌷' ? 'text-4xl mt-3' : ''}`}
                style={{ color: i === 0 ? '#e8d4ff' : 'rgba(232,212,255,0.85)' }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.12, duration: 0.5 }}
              >
                {line}
              </motion.p>
            ))}

            <motion.button
              onClick={onClose}
              className="mt-6 px-7 py-2.5 rounded-full font-body text-sm font-semibold"
              style={{
                background: 'rgba(200,180,232,0.25)',
                border: '1px solid rgba(200,180,232,0.5)',
                color: '#e8d4ff',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              whileHover={{ background: 'rgba(200,180,232,0.4)' }}
              whileTap={{ scale: 0.96 }}
            >
              ✨ Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
