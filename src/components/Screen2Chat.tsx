import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const base = import.meta.env.BASE_URL

interface Props {
  onContinue: () => void
}

const MESSAGES = [
  "Hi Ploy.",
  "If you're reading this...",
  "you probably just made a very brave decision.",
  "I know you're worried.",
  "I know you're thinking about many things.",
  "But I want you to know something.",
  "Everything did not fall apart.",
  "You'll be okay.",
  "Actually...",
  "You'll become stronger than you think.",
  "Someone is cheering for you today. 🌷",
]

function TypingIndicator() {
  return (
    <motion.div
      className="flex items-end gap-3 px-4 py-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
    >
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border-2 border-ploy-pink-light">
        <img src={`${base}ploy3.jpg`} alt="Ploy" className="w-full h-full object-cover" draggable={false} />
      </div>
      <div className="glass-pink rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-ploy-pink-deep"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.7, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ChatBubble({ text, index }: { text: string; index: number }) {
  return (
    <motion.div
      className="flex items-end gap-3 px-4 py-1"
      initial={{ opacity: 0, x: -20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {index === 0 && (
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border-2 border-ploy-pink-light">
          <img src={`${base}ploy3.jpg`} alt="Ploy" className="w-full h-full object-cover" draggable={false} />
        </div>
      )}
      {index > 0 && <div className="w-8 flex-shrink-0" />}
      <div
        className="rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%] text-sm md:text-base font-body leading-relaxed"
        style={{
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,181,200,0.35)',
          color: '#5a3d5c',
          boxShadow: '0 2px 12px rgba(200,150,200,0.15)',
        }}
      >
        {text}
      </div>
    </motion.div>
  )
}

export default function Screen2Chat({ onContinue }: Props) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [showTyping, setShowTyping] = useState(false)
  const [done, setDone] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Extra long pause before dramatic messages (0-indexed)
    const dramaticPause: Record<number, number> = {
      5: 3200,   // "But I want you to know something."
      6: 3600,   // "Everything did not fall apart."
      8: 4000,   // "Actually..."
      9: 3400,   // "You'll become stronger than you think."
    }

    const showNext = (idx: number) => {
      if (idx >= MESSAGES.length) {
        setShowTyping(false)
        setDone(true)
        return
      }
      setShowTyping(true)
      const base = 1800 + Math.random() * 900   // 1.8 – 2.7 s
      const typingDelay = dramaticPause[idx] ?? base
      timerRef.current = setTimeout(() => {
        setShowTyping(false)
        setTimeout(() => {
          setVisibleCount(idx + 1)
          timerRef.current = setTimeout(() => showNext(idx + 1), 800)
        }, 220)
      }, typingDelay)
    }

    timerRef.current = setTimeout(() => showNext(0), 1000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [visibleCount, showTyping])

  return (
    <motion.div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #fde8f2 0%, #f0e5ff 50%, #e8f4ff 100%)',
      }}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
    >
      {/* Header */}
      <motion.div
        className="flex-shrink-0 px-4 pt-10 pb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl glass shadow-sm">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-ploy-pink-light shadow-sm">
            <img src={`${base}ploy3.jpg`} alt="Ploy" className="w-full h-full object-cover" draggable={false} />
          </div>
          <div>
            <p className="font-body font-bold text-sm" style={{ color: '#5a3d5c' }}>Ploy from the Future</p>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <p className="text-xs font-body" style={{ color: '#9a7a9a' }}>online · typing…</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col justify-end pb-4">
        <div className="flex flex-col gap-1">
          {MESSAGES.slice(0, visibleCount).map((msg, i) => (
            <ChatBubble key={i} text={msg} index={i} />
          ))}
          <AnimatePresence>
            {showTyping && <TypingIndicator key="typing" />}
          </AnimatePresence>
          <div ref={bottomRef} className="h-2" />
        </div>
      </div>

      {/* Continue button */}
      <AnimatePresence>
        {done && (
          <motion.div
            className="flex-shrink-0 px-6 py-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <button
              onClick={onContinue}
              className="w-full py-4 rounded-full font-body font-semibold text-white text-base shadow-lg relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #f593b0 0%, #c8b4e8 100%)' }}
            >
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)' }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
              />
              <span className="relative z-10">Continue 🌸</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative bottom sparkles */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none h-32"
        style={{ background: 'linear-gradient(to top, rgba(240,229,255,0.6), transparent)' }} />
    </motion.div>
  )
}
