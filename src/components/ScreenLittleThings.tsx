import { motion } from 'framer-motion'
import { littleThings } from '../data/littleThings'
import type { Secret } from '../data/secrets'
import { secrets } from '../data/secrets'

interface Props {
  onContinue: () => void
  onSecretFound: (secret: Secret) => void
}

const GRADIENTS = [
  {
    bg: 'linear-gradient(140deg, #fff8ee 0%, #ffecd2 100%)',
    accent: '#d4844a',
    border: 'rgba(255,180,100,0.3)',
    labelColor: '#c07040',
    textColor: '#5a3010',
  },
  {
    bg: 'linear-gradient(140deg, #f8eeff 0%, #ead6ff 100%)',
    accent: '#9b6dce',
    border: 'rgba(200,160,240,0.3)',
    labelColor: '#8050b0',
    textColor: '#3d1a6a',
  },
  {
    bg: 'linear-gradient(140deg, #fff0f6 0%, #ffd6e8 100%)',
    accent: '#d85090',
    border: 'rgba(240,150,190,0.3)',
    labelColor: '#c03070',
    textColor: '#6a1040',
  },
  {
    bg: 'linear-gradient(140deg, #eef6ff 0%, #d0e8ff 100%)',
    accent: '#4888d0',
    border: 'rgba(120,180,240,0.3)',
    labelColor: '#3060a8',
    textColor: '#102050',
  },
]

function ThingCard({
  thing,
  index,
  onSecretFound,
}: {
  thing: typeof littleThings[0]
  index: number
  onSecretFound: (s: Secret) => void
}) {
  const base = import.meta.env.BASE_URL
  const theme = GRADIENTS[index % GRADIENTS.length]

  return (
    <motion.div
      className="w-full rounded-3xl relative overflow-hidden"
      style={{
        background: theme.bg,
        border: `1.5px solid ${theme.border}`,
        boxShadow: '0 6px 28px rgba(180,120,200,0.12), 0 2px 6px rgba(0,0,0,0.04)',
      }}
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.18, type: 'spring', stiffness: 150, damping: 20 }}
      onClick={() => thing.id === 'animal' && onSecretFound(secrets.cat)}
    >
      {/* Decorative corner sticker */}
      <motion.span
        className="absolute top-4 right-5 text-xl pointer-events-none"
        animate={{ rotate: [0, 12, -8, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 5 + index, repeat: Infinity, delay: index * 0.7, ease: 'easeInOut' }}
      >
        {thing.stickerEmoji}
      </motion.span>

      {/* Faint decorative circle in background */}
      <div
        className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: theme.accent, opacity: 0.06 }}
      />

      <div className="px-7 pt-7 pb-6 flex flex-col items-center text-center gap-3">
        {/* Icon or round photo */}
        {thing.imageFilename ? (
          <motion.div
            className="w-20 h-20 rounded-full overflow-hidden shadow-md"
            style={{ border: `3px solid rgba(255,255,255,0.9)` }}
            whileTap={{ scale: 0.97 }}
          >
            <img
              src={`${base}${thing.imageFilename}`}
              alt={thing.label}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </motion.div>
        ) : (
          <motion.div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.7)', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
          >
            <span className="text-4xl leading-none">{thing.emoji}</span>
          </motion.div>
        )}

        {/* Label */}
        <p
          className="text-[10px] font-body font-bold tracking-[0.18em] uppercase"
          style={{ color: theme.labelColor }}
        >
          {thing.label}
        </p>

        {/* Thin divider */}
        <div className="flex items-center gap-2 w-full justify-center">
          <div className="h-px flex-1 max-w-[48px]" style={{ background: theme.accent, opacity: 0.3 }} />
          <div className="w-1 h-1 rounded-full" style={{ background: theme.accent, opacity: 0.5 }} />
          <div className="h-px flex-1 max-w-[48px]" style={{ background: theme.accent, opacity: 0.3 }} />
        </div>

        {/* Main value */}
        <p
          className="font-display text-2xl leading-snug"
          style={{ color: theme.textColor }}
        >
          {thing.value}
        </p>

        {/* Note */}
        <p
          className="font-body text-xs italic leading-relaxed"
          style={{ color: theme.textColor, opacity: 0.6 }}
        >
          {thing.note}
        </p>
      </div>
    </motion.div>
  )
}

export default function ScreenLittleThings({ onContinue, onSecretFound }: Props) {
  return (
    <motion.div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #fffaf4 0%, #f8f0ff 55%, #f0f8ff 100%)' }}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.55 }}
    >
      {/* Ambient floating petals */}
      {['🌸', '✨', '🌷', '💫', '🌼'].map((e, i) => (
        <motion.div
          key={i}
          className="absolute text-base pointer-events-none"
          style={{ left: `${8 + i * 20}%`, top: `${4 + (i % 3) * 5}%` }}
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4 + i * 0.6, repeat: Infinity, delay: i * 0.5 }}
        >
          {e}
        </motion.div>
      ))}

      {/* Header */}
      <div className="flex-shrink-0 pt-10 pb-5 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <p className="text-[10px] font-body font-bold tracking-[0.22em] uppercase mb-2"
            style={{ color: '#c8b4e8' }}>
            a little collection
          </p>
          <h2 className="font-display text-4xl leading-tight" style={{ color: '#4a2d5c' }}>
            Little Things<br />About Ploy
          </h2>
          <motion.div
            className="flex items-center gap-2 justify-center mt-3"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-ploy-lavender opacity-50" />
            <span className="text-base">🌷</span>
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-ploy-lavender opacity-50" />
          </motion.div>
        </motion.div>
      </div>

      {/* Cards list */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-4">
        <div className="flex flex-col gap-4">
          {littleThings.map((thing, i) => (
            <ThingCard
              key={thing.id}
              thing={thing}
              index={i}
              onSecretFound={onSecretFound}
            />
          ))}

          {/* Hidden moon secret — very subtle */}
          <motion.div
            className="flex justify-center py-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              onClick={() => onSecretFound(secrets.moon)}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="text-xl"
            >
              🌙
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Continue */}
      <div className="flex-shrink-0 px-6 py-5">
        <motion.button
          onClick={onContinue}
          className="w-full py-4 rounded-full font-body font-semibold text-white text-base shadow-lg relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #f593b0 0%, #c8b4e8 100%)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
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
