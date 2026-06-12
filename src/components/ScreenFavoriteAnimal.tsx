import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Secret } from '../data/secrets'
import { secrets } from '../data/secrets'

interface Props {
  onContinue: () => void
  onSecretFound: (secret: Secret) => void
}

interface Particle { id: number; x: number; emoji: string }

interface StarDot { id: number; x: number; y: number; size: number; delay: number; duration: number }

function OrbitRing({ radius, speed, reverse = false, dotCount = 6 }: {
  radius: number; speed: number; reverse?: boolean; dotCount?: number
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: radius * 2,
        height: radius * 2,
        top: '50%',
        left: '50%',
        marginLeft: -radius,
        marginTop: -radius,
      }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
    >
      {Array.from({ length: dotCount }).map((_, i) => {
        const angle = (i * 360) / dotCount
        const rad = (angle * Math.PI) / 180
        const cx = radius + (radius - 6) * Math.cos(rad) - 3
        const cy = radius + (radius - 6) * Math.sin(rad) - 3
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: cx,
              top: cy,
              width: reverse ? 4 : 6,
              height: reverse ? 4 : 6,
              background: ['#ffb5c8', '#c8b4e8', '#b5d8f7', '#ffd5b5', '#ffe066', '#ffb5c8'][i % 6],
              opacity: 0.75,
            }}
            animate={{ scale: [0.7, 1.4, 0.7] }}
            transition={{ duration: 1.8, delay: i * 0.3, repeat: Infinity }}
          />
        )
      })}
    </motion.div>
  )
}

export default function ScreenFavoriteAnimal({ onContinue, onSecretFound }: Props) {
  const base = import.meta.env.BASE_URL
  const [tapped, setTapped] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [showMeow, setShowMeow] = useState(false)

  const stars: StarDot[] = useMemo(() => Array.from({ length: 45 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2.5,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 3,
  })), [])

  const handleCatTap = () => {
    if (tapped) return
    setTapped(true)
    setShowMeow(true)

    const burst: Particle[] = Array.from({ length: 14 }, (_, i) => ({
      id: Date.now() + i,
      x: 28 + Math.random() * 44,
      emoji: ['🐱', '🐾', '💕', '✨', '💗', '🌸'][Math.floor(Math.random() * 6)],
    }))
    setParticles(burst)

    setTimeout(() => setShowMeow(false), 1400)
    setTimeout(() => setParticles([]), 2000)
    setTimeout(() => setTapped(false), 400)

    onSecretFound(secrets.cat)
  }

  return (
    <motion.div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden select-none"
      style={{
        background: 'linear-gradient(160deg, #180830 0%, #3c1258 30%, #6e1a5a 60%, #a82860 85%, #d04070 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.7 }}
    >
      {/* Starfield */}
      {stars.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }}
        />
      ))}

      {/* Radial bloom glow behind photo */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '340px',
          height: '340px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,80,120,0.45) 0%, rgba(180,50,200,0.2) 45%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -56%)',
        }}
      />

      {/* Floating ambient emojis */}
      {['🐾', '🐱', '✨', '💕', '🐾'].map((e, i) => (
        <motion.div
          key={i}
          className="absolute text-lg pointer-events-none"
          style={{ left: `${6 + i * 20}%`, top: `${10 + (i % 3) * 12}%`, opacity: 0.45 }}
          animate={{ y: [0, -12, 0], opacity: [0.25, 0.55, 0.25], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4 + i * 0.7, repeat: Infinity, delay: i * 0.6 }}
        >
          {e}
        </motion.div>
      ))}

      {/* Burst particles */}
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute z-20 pointer-events-none text-2xl"
            style={{ left: `${p.x}%`, top: '44%' }}
            initial={{ y: 0, opacity: 1, scale: 0.3 }}
            animate={{ y: -(80 + Math.random() * 120), x: Math.random() * 100 - 50, opacity: 0, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Mrrrow text */}
      <AnimatePresence>
        {showMeow && (
          <motion.div
            className="absolute z-20 pointer-events-none font-display text-2xl"
            style={{ top: '28%', left: '50%', transform: 'translateX(-50%)', color: 'white', textShadow: '0 0 20px rgba(255,150,180,0.9)' }}
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -20, scale: 1.1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            mrrrow~ 🐱
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center">

        {/* Label */}
        <motion.p
          className="text-[10px] font-body font-bold tracking-[0.25em] uppercase"
          style={{ color: 'rgba(255,190,210,0.7)' }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Favorite Animal
        </motion.p>

        {/* Photo hero with orbit rings */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 140, damping: 16 }}
          style={{ width: '260px', height: '260px' }}
        >
          {/* Outer slow orbit */}
          <OrbitRing radius={128} speed={12} dotCount={8} />
          {/* Inner fast counter-orbit */}
          <OrbitRing radius={104} speed={7} reverse dotCount={5} />

          {/* Pulsing glow ring */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ inset: '18px' }}
            animate={{
              boxShadow: [
                '0 0 20px 6px rgba(220,80,140,0.4)',
                '0 0 45px 14px rgba(220,80,140,0.7)',
                '0 0 20px 6px rgba(220,80,140,0.4)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />

          {/* The photo */}
          <motion.div
            className="absolute rounded-full overflow-hidden cursor-pointer z-10"
            style={{
              inset: '24px',
              border: '3px solid rgba(255,255,255,0.9)',
              boxShadow: '0 0 0 6px rgba(220,80,140,0.3), 0 8px 40px rgba(0,0,0,0.4)',
            }}
            onClick={handleCatTap}
            animate={{ scale: tapped ? 0.93 : [1, 1.025, 1] }}
            transition={tapped ? { duration: 0.15 } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.04 }}
          >
            <img
              src={`${base}cat.jpg`}
              alt="Cat"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </motion.div>
        </motion.div>

        {/* "Cats" title */}
        <motion.h1
          className="font-display leading-none"
          style={{
            fontSize: '4.5rem',
            color: 'white',
            textShadow: '0 0 30px rgba(255,120,160,0.8), 0 4px 12px rgba(0,0,0,0.3)',
            lineHeight: 1,
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
        >
          Cats
        </motion.h1>

        {/* Thin sparkle divider */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.95 }}
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-300 opacity-60" />
          <span className="text-pink-200 text-sm">🐾</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-300 opacity-60" />
        </motion.div>

        {/* Note */}
        <motion.p
          className="font-body text-sm italic leading-relaxed max-w-[220px]"
          style={{ color: 'rgba(255,200,220,0.72)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          especially the fluffy, grumpy ones
        </motion.p>

        {/* Tap hint */}
        <motion.p
          className="text-[10px] font-body"
          style={{ color: 'rgba(255,180,200,0.4)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          tap the cat ✨
        </motion.p>
      </div>

      {/* Continue button */}
      <motion.div
        className="absolute bottom-8 left-6 right-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
      >
        <motion.button
          onClick={onContinue}
          className="w-full py-4 rounded-full font-body font-semibold text-white text-base relative overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(12px)',
            border: '1.5px solid rgba(255,255,255,0.25)',
          }}
          whileHover={{ background: 'rgba(255,255,255,0.2)', scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
          />
          <span className="relative z-10">Continue 🌸</span>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
