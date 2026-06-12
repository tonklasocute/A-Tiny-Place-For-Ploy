import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { littleThings, type LittleThing } from '../data/littleThings'
import type { Secret } from '../data/secrets'
import { secrets } from '../data/secrets'

interface Props {
  onContinue: () => void
  onSecretFound: (secret: Secret) => void
}

// ─── Bottom sheet ─────────────────────────────────────────────────────────────

function CardSheet({ card, onClose }: { card: LittleThing; onClose: () => void }) {
  const base = import.meta.env.BASE_URL

  return (
    // Backdrop
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{
        background: 'rgba(8,4,20,0.60)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        paddingBottom: 'max(env(safe-area-inset-bottom), 20px)',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      {/* Sheet */}
      <motion.div
        className="w-full rounded-3xl overflow-hidden"
        style={{
          background: card.gradient,
          maxWidth: '440px',
          boxShadow: `0 -8px 60px rgba(${card.glowRgb},0.45), 0 24px 60px rgba(0,0,0,0.35)`,
        }}
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        exit={{ y: '110%' }}
        transition={{ type: 'spring', stiffness: 340, damping: 32, mass: 0.75 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div
            className="w-9 h-1 rounded-full"
            style={{ background: `rgba(${card.glowRgb},0.4)` }}
          />
        </div>

        {/* Photo */}
        {card.imageFilename && (
          <motion.div
            className="mx-4 rounded-2xl overflow-hidden"
            style={{
              boxShadow: `0 8px 32px rgba(${card.glowRgb},0.40), 0 2px 8px rgba(0,0,0,0.18)`,
            }}
            initial={{ scale: 0.88, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.08, type: 'spring', stiffness: 280, damping: 24 }}
          >
            {/* Fixed-height container — required for object-fit + object-position to crop correctly */}
            <div style={{ height: '260px', overflow: 'hidden' }}>
              <img
                src={`${base}${card.imageFilename}`}
                alt={card.title}
                draggable={false}
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: card.objectPosition ?? 'center center',
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Content */}
        <div className="px-5 pt-4 pb-5">
          {/* Title */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl select-none">{card.emoji}</span>
            <div className="flex-1">
              <p
                className="font-body font-bold text-base leading-tight"
                style={{ color: card.textColor }}
              >
                {card.title}
              </p>
              <p
                className="font-body text-xs mt-0.5"
                style={{ color: card.textColor, opacity: 0.55 }}
              >
                {card.subtitle}
              </p>
            </div>
          </div>

          {/* Secret note */}
          <motion.div
            className="rounded-2xl px-4 py-4 mb-4"
            style={{ background: card.noteAlpha }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.32 }}
          >
            <p
              className="text-[10px] font-body font-bold tracking-widest uppercase mb-1.5"
              style={{ color: card.textColor, opacity: 0.5 }}
            >
              secret ✨
            </p>
            <p
              className="font-display text-[18px] italic leading-snug"
              style={{ color: card.hiddenColor }}
            >
              "{card.hiddenMessage}"
            </p>
          </motion.div>

          {/* Close */}
          <motion.button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl font-body font-semibold text-sm"
            style={{
              background: `rgba(${card.glowRgb},0.18)`,
              color: card.textColor,
              border: `1.5px solid rgba(${card.glowRgb},0.30)`,
            }}
            whileTap={{ scale: 0.97 }}
          >
            close ✕
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Compact card ─────────────────────────────────────────────────────────────

function MemoryCard({
  card,
  index,
  onOpen,
}: {
  card: LittleThing
  index: number
  onOpen: () => void
}) {
  return (
    <motion.div
      className="rounded-2xl overflow-hidden cursor-pointer select-none"
      style={{ background: card.gradient }}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index + 0.24, duration: 0.4, ease: 'easeOut' }}
      onClick={onOpen}
      whileTap={{ scale: 0.975 }}
    >
      <div className="flex items-center gap-4 px-4 py-4">
        {/* Emoji */}
        <motion.div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-[28px] flex-shrink-0 select-none"
          style={{ background: 'rgba(255,255,255,0.48)' }}
          animate={{ scale: [1, 1.06, 1], rotate: [0, 4, -4, 0] }}
          transition={{ duration: 5 + index * 0.5, repeat: Infinity, delay: index * 0.4 }}
        >
          {card.emoji}
        </motion.div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p
            className="font-body font-bold text-[15px] leading-tight"
            style={{ color: card.textColor }}
          >
            {card.title}
          </p>
          <p
            className="font-body text-[11px] mt-0.5"
            style={{ color: card.textColor, opacity: 0.52 }}
          >
            {card.subtitle}
          </p>
          <p
            className="font-body text-[12px] mt-1.5 leading-snug"
            style={{ color: card.textColor, opacity: 0.72, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
          >
            {card.description}
          </p>
        </div>

        {/* Tap arrow */}
        <motion.div
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-base"
          style={{ background: `rgba(${card.glowRgb},0.22)` }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.88 }}
        >
          <span style={{ color: card.textColor }}>→</span>
        </motion.div>
      </div>

      {/* "Has photo" hint */}
      {card.imageFilename && (
        <div className="px-4 pb-3 flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: `rgba(${card.glowRgb},0.55)` }}
          />
          <p
            className="text-[10px] font-body"
            style={{ color: card.textColor, opacity: 0.45 }}
          >
            has a photo ✨
          </p>
        </div>
      )}
    </motion.div>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ScreenLittleThings({ onContinue, onSecretFound }: Props) {
  const [openCard, setOpenCard] = useState<LittleThing | null>(null)

  const handleOpen = (card: LittleThing) => {
    setOpenCard(card)
  }

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
          style={{ left: `${7 + i * 20}%`, top: `${2 + (i % 3) * 4}%` }}
          animate={{ y: [0, -10, 0], opacity: [0.18, 0.48, 0.18] }}
          transition={{ duration: 4 + i * 0.7, repeat: Infinity, delay: i * 0.55 }}
        >
          {e}
        </motion.div>
      ))}

      {/* Header */}
      <motion.div
        className="flex-shrink-0 pt-12 pb-3 px-6 text-center"
        initial={{ opacity: 0, y: -18 }}
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

      {/* Card list */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-2">
        <div className="flex flex-col gap-3 pb-5">
          {littleThings.map((card, i) => (
            <MemoryCard
              key={card.id}
              card={card}
              index={i}
              onOpen={() => handleOpen(card)}
            />
          ))}

          {/* Hidden moon secret */}
          <motion.div
            className="flex justify-center py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <motion.button
              type="button"
              onClick={() => onSecretFound(secrets.moon)}
              animate={{ opacity: [0.12, 0.40, 0.12] }}
              transition={{ duration: 7, repeat: Infinity }}
            >
              🌙
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Continue */}
      <motion.div
        className="flex-shrink-0 px-6 py-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
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

      {/* Bottom sheet portal */}
      <AnimatePresence>
        {openCard && (
          <CardSheet
            card={openCard}
            onClose={() => setOpenCard(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
