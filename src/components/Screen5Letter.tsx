import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { letterMemories } from '../data/memories'
import type { Secret } from '../data/secrets'
import { secrets } from '../data/secrets'

interface Props {
  onComplete: () => void
  onSecretFound: (secret: Secret) => void
}

const LETTER_LINES = [
  "Dear Ploy,",
  "",
  "I wanted to leave a little note here for you.",
  "",
  "Just in case today feels a little uncertain.",
  "Just in case you've been thinking too much.",
  "Just in case you're being harder on yourself than you should be.",
  "",
  "I know the last few months probably weren't easy.",
  "",
  "You graduated.",
  "Started your first job.",
  "Stepped into a completely new chapter of life.",
  "",
  "And somewhere along the way, you realized",
  "it wasn't really where your heart wanted to stay.",
  "",
  "I can only imagine how difficult that decision must have been.",
  "",
  "Because walking away from something isn't always the easy choice.",
  "",
  "Sometimes staying is easier.",
  "Sometimes pretending everything is okay is easier.",
  "",
  "But you chose to be honest with yourself.",
  "",
  "And I think that's incredibly brave.",
  "",
  "Maybe right now it feels like you're standing in between chapters.",
  "Not quite where you were.",
  "Not quite where you're going.",
  "And that's a scary place to be sometimes.",
  "",
  "But I hope you know something.",
  "",
  "You are not behind.",
  "You are not lost.",
  "And you definitely haven't failed.",
  "",
  "You're simply figuring out what kind of life fits you best.",
  "",
  "And honestly?",
  "I think that's something worth being proud of.",
  "",
  "There are so many good things about you",
  "that I hope you never forget.",
  "",
  "The way you care about people.",
  "The way you always try your best.",
  "The way you're kind even when nobody asks you to be.",
  "The way you keep going, even when you're worried.",
  "",
  "I don't think you realize how much strength there is in that.",
  "",
  "So if things feel uncertain right now,",
  "please don't rush yourself.",
  "",
  "You don't need to have all the answers today.",
  "You don't need to know exactly what comes next.",
  "",
  "One step at a time is enough.",
  "",
  "And while you're figuring everything out,",
  "I hope you'll remember that there is at least one person",
  "who is cheering for you very, very sincerely.",
  "",
  "Someone who wants good things for you.",
  "Someone who believes you're going to find",
  "a place that makes you happier.",
  "A place where you'll smile more.",
  "A place that feels right.",
  "",
  "And until then,",
  "I hope you'll be gentle with yourself.",
  "",
  "Because if there's one thing I'm sure about,",
  "it's that someone as kind, thoughtful, and lovely as you",
  "deserves good things too.",
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

function MemoryCard({ memory, index }: { memory: typeof letterMemories[0]; index: number }) {
  return (
    <motion.div
      className="rounded-2xl px-5 py-4 mt-4"
      style={{
        background: [
          'rgba(255,214,228,0.4)',
          'rgba(214,200,255,0.4)',
          'rgba(200,230,255,0.4)',
        ][index % 3],
        border: `1.5px solid ${['rgba(245,147,176,0.3)', 'rgba(200,180,232,0.3)', 'rgba(181,216,247,0.3)'][index % 3]}`,
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.2, duration: 0.5 }}
    >
      <p className="text-xs font-body font-bold tracking-wide mb-1.5" style={{ color: '#c8b4e8' }}>
        {memory.prompt}
      </p>
      <p className="font-display text-sm leading-relaxed" style={{ color: '#5a3d5c' }}>
        {memory.text}
      </p>
    </motion.div>
  )
}

export default function Screen5Letter({ onComplete, onSecretFound }: Props) {
  const [phase, setPhase] = useState<'envelope' | 'letter' | 'hug'>('envelope')
  const [showButton, setShowButton] = useState(false)
  const [hearts, setHearts] = useState<FloatingHeart[]>([])
  const [hugSent, setHugSent] = useState(false)
  const [showMemories, setShowMemories] = useState(false)

  useEffect(() => {
    if (phase === 'envelope') {
      const t = setTimeout(() => setPhase('letter'), 1800)
      return () => clearTimeout(t)
    }
    if (phase === 'letter') {
      const t1 = setTimeout(() => setShowMemories(true), 5200)
      const t2 = setTimeout(() => setShowButton(true), 6000)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [phase])

  const handleHug = () => {
    if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200])

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
      style={{ background: 'linear-gradient(160deg, #fff0f7 0%, #f5eeff 50%, #fffaf0 100%)' }}
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
            style={{ left: `${h.x}%`, bottom: '30%', fontSize: `${h.size}rem` }}
            initial={{ y: 0, opacity: 1, scale: 0.3 }}
            animate={{ y: -(150 + Math.random() * 200), x: Math.random() * 80 - 40, opacity: 0, scale: 1, rotate: Math.random() * 40 - 20 }}
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
            <p className="font-body text-base" style={{ color: '#9a7a9a' }}>Opening your letter...</p>
            <div className="flex gap-1 mt-2">
              {[0, 1, 2].map(i => (
                <motion.div key={i} className="w-2 h-2 rounded-full bg-ploy-pink"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }} />
              ))}
            </div>
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
            {/* Header */}
            <motion.div
              className="flex-shrink-0 pt-10 pb-3 px-6 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-ploy-lavender opacity-50" />
                {/* Hidden secret on the letter emoji */}
                <motion.button
                  onClick={() => onSecretFound(secrets.letter)}
                  whileTap={{ scale: 0.9 }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <span className="text-xl">💌</span>
                </motion.button>
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
              {/* Main letter lines */}
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

              {/* Personalized memory cards */}
              <AnimatePresence>
                {showMemories && (
                  <motion.div
                    className="mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.p
                      className="text-xs font-body tracking-widest uppercase mt-4 mb-1"
                      style={{ color: '#c8b4e8' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      ✦ just between us ✦
                    </motion.p>
                    {letterMemories.map((memory, i) => (
                      <MemoryCard key={memory.id} memory={memory} index={i} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Floating hearts at bottom of letter */}
              <motion.div
                className="flex justify-center gap-2 mt-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
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

            {/* Hug button */}
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
                      boxShadow: ['0 4px 20px rgba(245,147,176,0.3)', '0 4px 35px rgba(245,147,176,0.6)', '0 4px 20px rgba(245,147,176,0.3)'],
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

            {/* Sending hug */}
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
