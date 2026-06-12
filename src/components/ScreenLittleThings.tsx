import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { littleThings, type LittleThing } from '../data/littleThings'
import type { Secret } from '../data/secrets'
import { secrets } from '../data/secrets'

interface Props {
  onContinue: () => void
  onSecretFound: (secret: Secret) => void
}

interface Sparkle {
  id: number
  pct: number
  emoji: string
  tx: number
  ty: number
}

// ─── Card ────────────────────────────────────────────────────────────────────

function MemoryCard({ card, index }: { card: LittleThing; index: number }) {
  const base = import.meta.env.BASE_URL
  const [isOpen, setIsOpen] = useState(false)
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  const handleTap = () => {
    if (!isOpen) {
      const burst: Sparkle[] = Array.from({ length: 9 }, (_, i) => ({
        id: Date.now() + i,
        pct: 10 + Math.random() * 80,
        emoji: card.sparkleEmojis[i % card.sparkleEmojis.length],
        tx: (Math.random() - 0.5) * 80,
        ty: -(36 + Math.random() * 60),
      }))
      setSparkles(burst)
      setTimeout(() => setSparkles([]), 1500)
    }
    setIsOpen(o => !o)
  }

  const glow = `rgba(${card.glowRgb},0.55)`
  const glowSoft = `rgba(${card.glowRgb},0.22)`

  return (
    // Outer wrapper: no overflow-hidden so sparkles escape upward
    <motion.div layout className="relative" style={{ borderRadius: '24px' }}>
      {/* Sparkles — outside the visual card so they escape freely */}
      <AnimatePresence>
        {sparkles.map(s => (
          <motion.span
            key={s.id}
            className="absolute z-30 pointer-events-none text-lg select-none"
            style={{ left: `${s.pct}%`, top: '45%' }}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.4 }}
            animate={{ opacity: 0, x: s.tx, y: s.ty, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.95, ease: 'easeOut' }}
          >
            {s.emoji}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Visual card (overflow-hidden for rounded photo corners) */}
      <motion.div
        layout
        className="rounded-3xl overflow-hidden cursor-pointer select-none"
        animate={{
          boxShadow: isOpen
            ? `0 0 0 2.5px ${glow}, 0 18px 52px ${glowSoft}`
            : '0 4px 20px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)',
        }}
        onClick={handleTap}
        whileTap={{ scale: 0.985 }}
        transition={{ layout: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }}
      >
        {/* ── TOP: Photo OR gradient header ─────────────────────────────── */}
        {card.imageFilename ? (
          <div className="relative" style={{ height: '180px' }}>
            <img
              src={`${base}${card.imageFilename}`}
              alt={card.title}
              draggable={false}
              className="w-full h-full object-cover pointer-events-none"
              style={{ objectPosition: card.objectPosition ?? 'center center' }}
            />
            {/* Gradient blend: photo → card body color */}
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{
                height: '100px',
                background: `linear-gradient(to bottom, transparent 0%, ${card.fadeColor} 100%)`,
              }}
            />
            {/* Live badge while open */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-body font-bold text-white"
                  style={{ background: `rgba(${card.glowRgb},0.7)`, backdropFilter: 'blur(6px)' }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                >
                  ✨ secret
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Gradient header with large emoji for non-image cards */
          <div
            className="relative flex items-center justify-center"
            style={{
              height: '108px',
              background: card.gradient,
            }}
          >
            {/* Soft radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, rgba(${card.glowRgb},0.30) 0%, transparent 70%)`,
              }}
            />
            <motion.span
              className="text-5xl relative z-10 select-none"
              animate={isOpen
                ? { scale: [1, 1.25, 1.1], rotate: [0, 10, 0] }
                : { scale: [1, 1.07, 1], rotate: [0, 4, -4, 0] }
              }
              transition={isOpen
                ? { duration: 0.5 }
                : { duration: 5 + index * 0.5, repeat: Infinity, delay: index * 0.3 }
              }
            >
              {card.emoji}
            </motion.span>
          </div>
        )}

        {/* ── BODY ──────────────────────────────────────────────────────── */}
        <div
          className="px-5 py-4"
          style={{ background: card.gradient }}
        >
          {/* Title row */}
          <div className="flex items-center gap-3">
            {card.imageFilename && (
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 select-none"
                style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(4px)' }}
                animate={isOpen ? { scale: [1, 1.18, 1] } : {}}
                transition={{ duration: 0.45 }}
              >
                {card.emoji}
              </motion.div>
            )}
            <div className="flex-1 min-w-0">
              <p
                className="font-body font-bold text-[15px] leading-tight"
                style={{ color: card.textColor }}
              >
                {card.title}
              </p>
              <p
                className="font-body text-[11px] mt-0.5"
                style={{ color: card.textColor, opacity: 0.55 }}
              >
                {card.subtitle}
              </p>
            </div>
            <motion.span
              className="text-xs flex-shrink-0 select-none"
              style={{ color: card.textColor, opacity: 0.45 }}
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▼
            </motion.span>
          </div>

          {/* Description */}
          <p
            className="mt-3 font-body text-[13px] leading-relaxed"
            style={{ color: card.textColor, opacity: 0.82 }}
          >
            {card.description}
          </p>

          {/* Tap hint (closed) */}
          <AnimatePresence>
            {!isOpen && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-3 text-center text-[10px] font-body select-none"
                style={{ color: card.textColor, opacity: 0.38 }}
              >
                tap to peek ✨
              </motion.p>
            )}
          </AnimatePresence>

          {/* Hidden note (open) */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <div
                  className="mt-4 mb-3"
                  style={{ borderTop: `1.5px dashed rgba(${card.glowRgb},0.40)` }}
                />
                <motion.div
                  className="rounded-2xl px-4 py-3"
                  style={{ background: card.noteAlpha }}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <p
                    className="font-display text-[16px] italic leading-snug"
                    style={{ color: card.hiddenColor }}
                  >
                    "{card.hiddenMessage}"
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function ScreenLittleThings({ onContinue, onSecretFound }: Props) {
  return (
    <motion.div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fce8f4 0%, #f0e5ff 55%, #e8f2ff 100%)' }}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
    >
      {/* Ambient particles */}
      {['🌸', '✨', '🌷', '💫', '🌼'].map((e, i) => (
        <motion.div
          key={i}
          className="absolute text-sm pointer-events-none"
          style={{ left: `${7 + i * 20}%`, top: `${2 + (i % 3) * 4}%`, opacity: 0.3 }}
          animate={{ y: [0, -10, 0], opacity: [0.18, 0.50, 0.18] }}
          transition={{ duration: 4 + i * 0.7, repeat: Infinity, delay: i * 0.55 }}
        >
          {e}
        </motion.div>
      ))}

      {/* Header */}
      <motion.div
        className="flex-shrink-0 pt-12 pb-3 px-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <p
          className="text-[10px] font-body font-bold tracking-[0.25em] uppercase"
          style={{ color: '#c8a0d0' }}
        >
          things about ploy
        </p>
        <h2 className="font-display text-4xl mt-1 leading-tight" style={{ color: '#4a2d5c' }}>
          Little Things 🌷
        </h2>
        <p
          className="font-body text-xs mt-1.5"
          style={{ color: '#7a5a7a', opacity: 0.65 }}
        >
          tap a card to peek inside
        </p>
      </motion.div>

      {/* Scrollable cards */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-2">
        <motion.div className="flex flex-col gap-4 pb-5" layout>
          {littleThings.map((card, i) => (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 * i + 0.28, duration: 0.45, ease: 'easeOut' }}
            >
              <MemoryCard card={card} index={i} />
            </motion.div>
          ))}

          {/* Hidden moon secret */}
          <motion.div
            className="flex justify-center py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.button
              type="button"
              onClick={() => onSecretFound(secrets.moon)}
              animate={{ opacity: [0.12, 0.42, 0.12] }}
              transition={{ duration: 7, repeat: Infinity }}
            >
              🌙
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Continue */}
      <motion.div
        className="flex-shrink-0 px-6 py-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <button
          type="button"
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
    </motion.div>
  )
}
