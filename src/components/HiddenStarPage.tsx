import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { hiddenStarMessages } from '../data/memories'

interface HiddenStarPageProps {
  open: boolean
  onClose: () => void
}

const CARD_COLORS = [
  { bg: '#fff0f7', border: '#ffb5c8', text: '#7a3a5a' },
  { bg: '#f5eeff', border: '#c8b4e8', text: '#5a3a7a' },
  { bg: '#eef7ff', border: '#b5d8f7', text: '#3a5a7a' },
  { bg: '#fff5e0', border: '#ffd5b5', text: '#7a5a3a' },
  { bg: '#f0fff5', border: '#b5e8d5', text: '#3a7a5a' },
]

function MemoryCard({ text, index, colorIndex }: { text: string; index: number; colorIndex: number }) {
  const color = CARD_COLORS[colorIndex % CARD_COLORS.length]
  return (
    <motion.div
      className="rounded-2xl px-5 py-4 text-sm font-body leading-relaxed"
      style={{
        background: color.bg,
        border: `1.5px solid ${color.border}`,
        color: color.text,
        boxShadow: '0 4px 15px rgba(200,150,200,0.12)',
      }}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, duration: 0.4, type: 'spring', stiffness: 200 }}
    >
      {text}
    </motion.div>
  )
}

export default function HiddenStarPage({ open, onClose }: HiddenStarPageProps) {
  const [revealed, setRevealed] = useState(false)

  const selectedMessages = useMemo(() => {
    const shuffled = [...hiddenStarMessages].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 12) // show 12 random from the pool
  }, [])

  return (
    <AnimatePresence onExitComplete={() => setRevealed(false)}>
      {open && (
        <motion.div
          className="fixed inset-0 z-[250] flex flex-col overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #fff0f7 0%, #f0eaff 50%, #eef7ff 100%)' }}
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => setRevealed(true)}
        >
          {/* Floating particles */}
          {['✨', '🌸', '⭐', '💫', '🌷'].map((e, i) => (
            <motion.div
              key={i}
              className="absolute text-lg pointer-events-none"
              style={{ left: `${10 + i * 18}%`, top: `${8 + (i % 3) * 10}%` }}
              animate={{ y: [0, -12, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
            >
              {e}
            </motion.div>
          ))}

          {/* Header */}
          <div className="flex-shrink-0 pt-10 pb-4 px-6 relative">
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-5 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(200,180,232,0.25)', border: '1px solid rgba(200,180,232,0.4)' }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-ploy-lavender text-lg">×</span>
            </motion.button>

            <motion.div
              className="flex items-center gap-2 mb-1"
              initial={{ opacity: 0, y: -10 }}
              animate={revealed ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              <span className="text-2xl">⭐</span>
              <p className="text-xs font-body tracking-widest uppercase" style={{ color: '#c8b4e8' }}>
                Hidden discovery
              </p>
            </motion.div>

            <motion.h2
              className="font-display text-2xl leading-snug"
              style={{ color: '#5a3d5c' }}
              initial={{ opacity: 0, y: 10 }}
              animate={revealed ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Things You Probably<br />Forgot About Yourself
            </motion.h2>
          </div>

          {/* Cards */}
          <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-8">
            <div className="flex flex-col gap-3">
              {selectedMessages.map((msg, i) => (
                <MemoryCard key={i} text={msg} index={i} colorIndex={i} />
              ))}

              {/* Closing note */}
              <motion.div
                className="text-center py-4"
                initial={{ opacity: 0 }}
                animate={revealed ? { opacity: 1 } : {}}
                transition={{ delay: selectedMessages.length * 0.08 + 0.5 }}
              >
                <p className="font-display text-lg" style={{ color: '#c8b4e8' }}>All of this is true. 🌷</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
