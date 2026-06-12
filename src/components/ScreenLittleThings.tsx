import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { littleThings } from '../data/littleThings'
import type { Secret } from '../data/secrets'
import { secrets } from '../data/secrets'

interface Props {
  onContinue: () => void
  onSecretFound: (secret: Secret) => void
}

function ScrapbookCard({
  thing,
  index,
  onSecretFound,
}: {
  thing: typeof littleThings[0]
  index: number
  onSecretFound: (secret: Secret) => void
}) {
  const [focused, setFocused] = useState(false)
  const base = import.meta.env.BASE_URL

  return (
    <motion.div
      className="relative"
      style={{ transform: `rotate(${thing.rotation}deg)` }}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.15, type: 'spring', stiffness: 180, damping: 16 }}
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => {
        if (thing.id === 'animal') {
          onSecretFound(secrets.cat)
        }
        setFocused(f => !f)
      }}
    >
      {/* Polaroid card */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.92)',
          border: '1.5px solid rgba(200,180,232,0.3)',
          boxShadow: '0 6px 24px rgba(180,130,200,0.18), 0 2px 6px rgba(0,0,0,0.06)',
          width: '100%',
        }}
      >
        {/* Polaroid top strip */}
        <div className="h-2" style={{ background: thing.color, opacity: 0.6 }} />

        {/* Image or emoji area */}
        <div
          className="mx-3 mt-3 rounded-lg overflow-hidden flex items-center justify-center"
          style={{
            background: thing.bgColor,
            height: thing.imageFilename ? '90px' : '70px',
            border: `1px solid ${thing.color}50`,
          }}
        >
          {thing.imageFilename ? (
            <img
              src={`${base}${thing.imageFilename}`}
              alt={thing.label}
              className="w-full h-full object-cover"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          ) : (
            <span className="text-4xl">{thing.emoji}</span>
          )}
        </div>

        {/* Content */}
        <div className="px-3 pt-2 pb-3">
          <p className="text-[10px] font-body font-bold tracking-widest uppercase mb-0.5"
            style={{ color: thing.color }}>
            {thing.emoji} {thing.label}
          </p>
          <p className="font-display text-base leading-tight" style={{ color: '#4a2d5a' }}>
            {thing.value}
          </p>
          <AnimatePresence>
            {(focused || index === 0) && (
              <motion.p
                className="font-display text-xs mt-1 italic"
                style={{ color: '#9a7a9a' }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {thing.note}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Sticker */}
        {thing.stickerEmoji && (
          <motion.div
            className="absolute -top-3 -right-2 text-xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
          >
            {thing.stickerEmoji}
          </motion.div>
        )}
      </div>

      {/* Tape strip at top */}
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-4 rounded-sm opacity-60"
        style={{ background: 'rgba(200,180,232,0.5)' }}
      />
    </motion.div>
  )
}

export default function ScreenLittleThings({ onContinue, onSecretFound }: Props) {
  return (
    <motion.div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #fff5f0 0%, #f5eeff 40%, #f0f8ff 100%)',
      }}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.55 }}
    >
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\'%3E%3Crect width=\'4\' height=\'4\' fill=\'%23ffd6ea\'/%3E%3Crect width=\'1\' height=\'1\' fill=\'%23f0d0ff\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Floating hearts */}
      {['💕', '🌷', '✨', '🌸'].map((e, i) => (
        <motion.div
          key={i}
          className="absolute text-lg pointer-events-none"
          style={{ right: `${6 + i * 8}%`, top: `${12 + i * 5}%` }}
          animate={{ y: [0, -8, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3 + i * 0.7, repeat: Infinity, delay: i * 0.5 }}
        >
          {e}
        </motion.div>
      ))}

      {/* Header */}
      <div className="flex-shrink-0 pt-10 px-5 pb-3">
        <motion.div
          className="flex items-center gap-2 mb-1"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-ploy-lavender opacity-40" />
          <span className="text-base">🎀</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-ploy-lavender opacity-40" />
        </motion.div>
        <motion.h2
          className="font-display text-3xl text-center"
          style={{ color: '#5a3d5c' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Little Things About Ploy
        </motion.h2>
        <motion.p
          className="text-xs font-body text-center mt-1"
          style={{ color: 'rgba(154,90,154,0.65)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          tap a card to read more ✨
        </motion.p>
      </div>

      {/* Cards grid */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-4">
        <div className="grid grid-cols-2 gap-5 pt-3 pb-2">
          {littleThings.map((thing, i) => (
            <ScrapbookCard
              key={thing.id}
              thing={thing}
              index={i}
              onSecretFound={onSecretFound}
            />
          ))}
        </div>

        {/* Hidden moon secret */}
        <motion.div
          className="flex justify-center mt-4 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <motion.button
            className="text-2xl"
            onClick={() => onSecretFound(secrets.moon)}
            animate={{ rotate: [0, 10, -10, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 5, repeat: Infinity }}
            title="✨"
          >
            🌙
          </motion.button>
        </motion.div>
      </div>

      {/* Continue */}
      <div className="flex-shrink-0 px-6 py-5">
        <motion.button
          onClick={onContinue}
          className="w-full py-4 rounded-full font-body font-semibold text-white text-base shadow-lg relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #f593b0 0%, #c8b4e8 100%)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
          />
          <span className="relative z-10">Continue 🌸</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
