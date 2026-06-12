import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onOpenLetter: () => void
}

const PETAL_CONFIGS = [
  { angle: 0, color: '#FFB5C8' },
  { angle: 45, color: '#C8B4E8' },
  { angle: 90, color: '#FFD5B5' },
  { angle: 135, color: '#B5D8F7' },
  { angle: 180, color: '#FFB5C8' },
  { angle: 225, color: '#C8B4E8' },
  { angle: 270, color: '#FFD5B5' },
  { angle: 315, color: '#B5D8F7' },
]

function BloomingFlower({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="relative w-14 h-14"
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay, duration: 0.7, type: 'spring', stiffness: 180, damping: 12 }}
    >
      {PETAL_CONFIGS.map((petal, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 flex items-start justify-center"
          style={{ transform: `rotate(${petal.angle}deg)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + i * 0.05 }}
        >
          <div
            className="w-3.5 h-5 rounded-full"
            style={{
              background: petal.color,
              opacity: 0.85,
              marginTop: '4px',
            }}
          />
        </motion.div>
      ))}
      {/* Center */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.4, type: 'spring' }}
      >
        <div className="w-5 h-5 rounded-full" style={{ background: '#FFE066', border: '2px solid #FFB5C8' }} />
      </motion.div>
    </motion.div>
  )
}

function FloatingFlowers() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {['🌸', '🌷', '🌺', '🌼', '🌻', '🌹', '💐', '🌸'].map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${8 + i * 12}%`,
            bottom: '-10%',
          }}
          animate={{
            y: [0, -(Math.random() * 200 + 300)],
            x: [0, Math.random() * 60 - 30],
            rotate: [0, Math.random() * 360],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1.2, 0.8, 0],
          }}
          transition={{
            duration: 3.5,
            delay: i * 0.25,
            ease: 'easeOut',
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  )
}

export default function Screen4Achievement({ onOpenLetter }: Props) {
  const [phase, setPhase] = useState<'bloom' | 'card'>('bloom')

  useEffect(() => {
    const t = setTimeout(() => setPhase('card'), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #ffe8f5 0%, #e8ddff 40%, #d6f0ff 80%, #fff5cc 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <FloatingFlowers />

      {/* Bloom phase */}
      <AnimatePresence>
        {phase === 'bloom' && (
          <motion.div
            className="flex flex-col items-center gap-4 z-10"
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
          >
            <p className="font-body text-base" style={{ color: '#9a7a9a' }}>Something is blooming...</p>
            <div className="flex gap-4">
              <BloomingFlower delay={0} />
              <BloomingFlower delay={0.3} />
              <BloomingFlower delay={0.6} />
            </div>
            <motion.div className="text-5xl" initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}>
              🌟
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement card */}
      <AnimatePresence>
        {phase === 'card' && (
          <motion.div
            className="flex flex-col items-center gap-6 z-10 px-6 w-full max-w-sm"
            initial={{ opacity: 0, y: 40, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 160, damping: 18 }}
          >
            {/* Glow ring */}
            <motion.div
              className="relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center"
                style={{
                  background: 'conic-gradient(from 0deg, #FFB5C8, #C8B4E8, #B5D8F7, #FFD5B5, #FFB5C8)',
                  padding: '3px',
                }}
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{ background: '#FFF9F0' }}
                >
                  <span className="text-5xl">🏅</span>
                </div>
              </div>
            </motion.div>

            {/* Achievement text */}
            <div
              className="w-full rounded-3xl px-6 py-6 text-center"
              style={{
                background: 'rgba(255,255,255,0.65)',
                backdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(200,180,232,0.4)',
                boxShadow: '0 8px 32px rgba(200,150,200,0.2)',
              }}
            >
              <motion.p
                className="text-xs font-body font-semibold tracking-widest uppercase mb-2"
                style={{ color: '#c8b4e8' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Achievement Unlocked
              </motion.p>
              <motion.h2
                className="font-display text-2xl leading-snug mb-3"
                style={{ color: '#5a3d5c' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Brave Enough<br />To Start Again
              </motion.h2>
              <motion.p
                className="text-sm font-body leading-relaxed"
                style={{ color: '#8a6a8a' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                For choosing yourself and embracing a new beginning.
              </motion.p>

              {/* Stars */}
              <motion.div
                className="flex justify-center gap-2 mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {['⭐', '⭐', '⭐'].map((s, i) => (
                  <motion.span
                    key={i}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                  >
                    {s}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Open letter button */}
            <motion.button
              onClick={onOpenLetter}
              className="w-full py-4 rounded-full font-body font-semibold text-white text-base shadow-lg relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #f593b0 0%, #c8b4e8 100%)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)' }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
              />
              <span className="relative z-10">Open Letter 💌</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
