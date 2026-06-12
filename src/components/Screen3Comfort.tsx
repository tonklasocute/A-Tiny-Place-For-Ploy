import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MochiCharacter from './MochiCharacter'
import { mochiDialogues, encouragingMessages } from '../utils/messages'

interface Props {
  onUnlock: () => void
}

const ACTIONS = [
  { key: 'bubbleTea', label: '🧋 Bubble Tea', points: 15 },
  { key: 'hug', label: '🤗 Give Hug', points: 20 },
  { key: 'walk', label: '🌸 Go For A Walk', points: 18 },
  { key: 'encourage', label: '✨ Encourage', points: 25 },
] as const

const UNLOCK_THRESHOLD = 100

function Plant({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      animate={{ rotate: ['-3deg', '3deg', '-3deg'] }}
      transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{ transformOrigin: 'bottom center' }}
    >
      <div className="flex gap-1">
        <motion.div className="text-2xl" animate={{ y: [0, -3, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 + delay }}>🌿</motion.div>
        <motion.div className="text-2xl" animate={{ y: [0, -4, 0] }} transition={{ duration: 2.8, repeat: Infinity, delay: 0.5 + delay }}>🌸</motion.div>
        <motion.div className="text-2xl" animate={{ y: [0, -3, 0] }} transition={{ duration: 2.3, repeat: Infinity, delay: 0.1 + delay }}>🌿</motion.div>
      </div>
    </motion.div>
  )
}

function FairyLights() {
  return (
    <div className="flex gap-2 flex-wrap justify-center px-2">
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{
            background: ['#FFB5C8', '#C8B4E8', '#FFD5B5', '#B5D8F7', '#FFE066'][i % 5],
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 1.5 + Math.random(),
            delay: i * 0.12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default function Screen3Comfort({ onUnlock }: Props) {
  const [points, setPoints] = useState(0)
  const [message, setMessage] = useState("Hello Ploy. I was created to take care of you. 🌷")
  const [expression, setExpression] = useState<'happy' | 'excited' | 'cozy' | 'love'>('happy')
  const [showMessage, setShowMessage] = useState(true)
  const [activeAction, setActiveAction] = useState<string | null>(null)
  const [unlocked, setUnlocked] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; emoji: string }>>([])

  const progress = Math.min(points / UNLOCK_THRESHOLD, 1)

  useEffect(() => {
    if (points >= UNLOCK_THRESHOLD && !unlocked) {
      setUnlocked(true)
      setTimeout(() => onUnlock(), 1500)
    }
  }, [points, unlocked, onUnlock])

  const handleAction = (key: string, pts: number) => {
    if (unlocked) return
    const dialogueList = mochiDialogues[key as keyof typeof mochiDialogues] || encouragingMessages
    const randomMsg = dialogueList[Math.floor(Math.random() * dialogueList.length)]

    setActiveAction(key)
    setMessage(randomMsg)
    setShowMessage(false)

    const newExpression = key === 'hug' ? 'love' : key === 'encourage' ? 'excited' : key === 'walk' ? 'cozy' : 'happy'
    setExpression(newExpression)

    // Spawn emoji particles
    const emoji = key === 'bubbleTea' ? '🧋' : key === 'hug' ? '💕' : key === 'walk' ? '🌸' : '✨'
    const newParticles = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: 30 + Math.random() * 40,
      emoji,
    }))
    setParticles(prev => [...prev, ...newParticles])
    setTimeout(() => setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id))), 2000)

    setTimeout(() => {
      setShowMessage(true)
      setActiveAction(null)
      setExpression('happy')
    }, 100)

    setPoints(prev => Math.min(prev + pts, UNLOCK_THRESHOLD))
  }

  return (
    <motion.div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #ffe4f0 0%, #f5eeff 40%, #e8f4ff 80%, #fff5e0 100%)',
      }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.6 }}
    >
      {/* Fairy lights */}
      <div className="flex-shrink-0 pt-10 pb-2">
        <FairyLights />
        <div className="flex justify-center mt-1">
          <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-ploy-lavender to-transparent opacity-50" />
        </div>
      </div>

      {/* Room title */}
      <motion.p
        className="text-center font-display text-2xl flex-shrink-0 pb-1"
        style={{ color: '#7a5c7a' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        The Comfort Room
      </motion.p>

      {/* Plants decoration */}
      <div className="flex justify-between px-6 flex-shrink-0 pb-2">
        <Plant delay={0} />
        <Plant delay={0.3} />
        <Plant delay={0.6} />
      </div>

      {/* Mochi character + speech bubble */}
      <div className="flex flex-col items-center flex-shrink-0 relative">
        {/* Particles */}
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute text-2xl pointer-events-none z-20"
            style={{ left: `${p.x}%`, bottom: '30%' }}
            initial={{ y: 0, opacity: 1, scale: 0.5 }}
            animate={{ y: -100, opacity: 0, scale: 1.3 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            {p.emoji}
          </motion.div>
        ))}

        <MochiCharacter expression={expression} />

        {/* Speech bubble */}
        <AnimatePresence mode="wait">
          {showMessage && (
            <motion.div
              key={message}
              className="mx-6 mt-2 px-4 py-3 rounded-2xl glass-pink text-center max-w-xs relative"
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.35 }}
            >
              {/* Bubble pointer */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2 overflow-hidden">
                <div className="w-3 h-3 rotate-45 glass-pink mx-auto -mt-1.5" />
              </div>
              <p className="text-sm font-body leading-snug" style={{ color: '#5a3d5c' }}>
                {message}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="mx-6 mt-3 flex-shrink-0">
        <div className="flex justify-between text-xs font-body mb-1.5" style={{ color: '#9a7a9a' }}>
          <span>Kindness collected</span>
          <span>{points} / {UNLOCK_THRESHOLD}</span>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(200,180,232,0.25)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #f593b0, #c8b4e8, #b5d8f7)' }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
        {progress >= 0.7 && progress < 1 && (
          <motion.p className="text-xs text-center mt-1 font-body" style={{ color: '#c8b4e8' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Almost there... 🌟
          </motion.p>
        )}
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3 mx-6 mt-3 flex-shrink-0">
        {ACTIONS.map((action) => (
          <motion.button
            key={action.key}
            onClick={() => handleAction(action.key, action.points)}
            className="py-3 px-2 rounded-2xl font-body font-semibold text-sm text-center relative overflow-hidden"
            style={{
              background: activeAction === action.key
                ? 'rgba(245,147,176,0.35)'
                : 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid rgba(200,180,232,0.4)',
              color: '#5a3d5c',
              boxShadow: '0 2px 10px rgba(200,150,200,0.12)',
            }}
            whileHover={{ scale: 1.04, boxShadow: '0 4px 18px rgba(200,150,200,0.22)' }}
            whileTap={{ scale: 0.96 }}
            disabled={unlocked}
          >
            {action.label}
          </motion.button>
        ))}
      </div>

      {/* Unlock glow */}
      <AnimatePresence>
        {unlocked && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="text-5xl"
              animate={{ scale: [0.8, 1.3, 0.8], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              🌟
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom padding */}
      <div className="flex-shrink-0 h-4" />
    </motion.div>
  )
}
