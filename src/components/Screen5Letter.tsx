import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onComplete: () => void
}

const LETTER_LINES = [
  "Dear Ploy,",
  "",
  "I know this season may feel uncertain.",
  "",
  "But I hope you remember that leaving",
  "something that no longer makes you happy",
  "is not failure.",
  "",
  "It takes courage.",
  "",
  "You have already come so far.",
  "",
  "And whether today feels exciting,",
  "scary, or somewhere in between...",
  "",
  "I hope you will be gentle with yourself.",
  "",
  "You don't have to rush.",
  "You don't have to prove anything.",
  "",
  "One step at a time is enough.",
  "",
  "And for what it's worth,",
  "there is someone cheering for you.",
  "",
  "Always.",
  "",
  "🌷",
]

interface FloatingHeart {
  id: number
  x: number
  size: number
  emoji: string
}

export default function Screen5Letter({ onComplete }: Props) {
  const [phase, setPhase] = useState<'envelope' | 'letter' | 'hug'>('envelope')
  const [showButton, setShowButton] = useState(false)
  const [hearts, setHearts] = useState<FloatingHeart[]>([])
  const [hugSent, setHugSent] = useState(false)

  useEffect(() => {
    if (phase === 'envelope') {
      const t = setTimeout(() => setPhase('letter'), 1800)
      return () => clearTimeout(t)
    }
    if (phase === 'letter') {
      const t = setTimeout(() => setShowButton(true), 2000)
      return () => clearTimeout(t)
    }
  }, [phase])

  const handleHug = () => {
    // Try haptic vibration
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 200])
    }

    const newHearts: FloatingHeart[] = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: 10 + Math.random() * 80,
      size: 0.8 + Math.random() * 1.2,
      emoji: ['💕', '💗', '💖', '💝', '🩷', '💓'][Math.floor(Math.random() * 6)],
    }))
    setHearts(newHearts)
    setHugSent(true)

    setTimeout(() => {
      setHearts([])
      setTimeout(onComplete, 800)
    }, 2500)
  }

  return (
    <motion.div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #fff0f7 0%, #f5eeff 50%, #fffaf0 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Floating heart burst */}
      <AnimatePresence>
        {hearts.map(h => (
          <motion.div
            key={h.id}
            className="absolute pointer-events-none z-50"
            style={{
              left: `${h.x}%`,
              bottom: '30%',
              fontSize: `${h.size}rem`,
            }}
            initial={{ y: 0, opacity: 1, scale: 0.3 }}
            animate={{
              y: -(150 + Math.random() * 200),
              x: Math.random() * 80 - 40,
              opacity: 0,
              scale: 1,
              rotate: Math.random() * 40 - 20,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: 'easeOut' }}
          >
            {h.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Envelope phase */}
      <AnimatePresence>
        {phase === 'envelope' && (
          <motion.div
            className="flex flex-col items-center gap-4 z-10"
            exit={{ opacity: 0, scale: 0.7, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-8xl"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14 }}
            >
              💌
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="font-body text-base" style={{ color: '#9a7a9a' }}>Opening your letter...</p>
            </motion.div>
            {/* Animated envelope opening */}
            <motion.div
              className="flex gap-1 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-ploy-pink"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Letter phase */}
      <AnimatePresence>
        {phase === 'letter' && (
          <motion.div
            className="w-full h-full flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Letter header */}
            <motion.div
              className="flex-shrink-0 pt-10 pb-3 px-6 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-ploy-lavender opacity-50" />
                <span className="text-xl">💌</span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-ploy-lavender opacity-50" />
              </div>
              <p className="text-xs font-body tracking-widest uppercase" style={{ color: '#c8b4e8' }}>
                A letter for you
              </p>
            </motion.div>

            {/* Letter scroll */}
            <div
              className="flex-1 overflow-y-auto no-scrollbar mx-5 rounded-3xl px-5 py-6"
              style={{
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(200,180,232,0.3)',
                boxShadow: '0 8px 32px rgba(200,150,200,0.15)',
              }}
            >
              {LETTER_LINES.map((line, i) => (
                <motion.p
                  key={i}
                  className={`font-display leading-relaxed ${line === '' ? 'h-3' : 'text-base'} ${
                    line === 'Dear Ploy,' ? 'text-xl font-bold mb-2' : ''
                  } ${line === 'Always.' ? 'text-lg font-bold' : ''} ${
                    line === '🌷' ? 'text-3xl mt-2' : ''
                  }`}
                  style={{ color: '#5a3d5c' }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                >
                  {line}
                </motion.p>
              ))}

              {/* Floating hearts at bottom of letter */}
              <motion.div
                className="flex justify-center gap-2 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                {['💕', '🌷', '💕'].map((e, i) => (
                  <motion.span
                    key={i}
                    className="text-lg"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                  >
                    {e}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Receive hug button */}
            <AnimatePresence>
              {showButton && !hugSent && (
                <motion.div
                  className="flex-shrink-0 px-6 py-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.button
                    onClick={handleHug}
                    className="w-full py-4 rounded-full font-body font-semibold text-white text-base shadow-lg relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #f593b0 0%, #c8b4e8 100%)' }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    animate={{
                      boxShadow: [
                        '0 4px 20px rgba(245,147,176,0.3)',
                        '0 4px 35px rgba(245,147,176,0.6)',
                        '0 4px 20px rgba(245,147,176,0.3)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)' }}
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
                    />
                    <span className="relative z-10">Receive a Hug 🤗</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sending hug message */}
            <AnimatePresence>
              {hugSent && (
                <motion.div
                  className="flex-shrink-0 px-6 py-5 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  <p className="font-body font-semibold text-base" style={{ color: '#f593b0' }}>
                    Sending virtual hug to Ploy... 💕
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
