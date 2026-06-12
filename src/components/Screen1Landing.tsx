import { motion } from 'framer-motion'
import Cloud from './Cloud'
import FloatingParticles from './FloatingParticles'
import { useEasterEgg } from '../hooks/useEasterEgg'
import type { Secret } from '../data/secrets'
import { secrets } from '../data/secrets'

interface Props {
  onEnter: () => void
  onPloyEasterEgg: () => void
  onSecretFound: (secret: Secret) => void
}

export default function Screen1Landing({ onEnter, onPloyEasterEgg, onSecretFound }: Props) {
  const { onTap: onPloyTap, count: ployCount } = useEasterEgg(5, 10000, onPloyEasterEgg)

  return (
    <motion.div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden select-none"
      style={{
        background: 'linear-gradient(160deg, #c8e6fb 0%, #d4c5f0 30%, #ffb5c8 60%, #ffd5b5 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.8 }}
    >
      {/* Clouds */}
      <Cloud y="8%" scale={1.1} duration={28} delay={0} opacity={0.8} />
      <Cloud y="20%" scale={0.7} duration={22} delay={-8} opacity={0.6} />
      <Cloud y="35%" scale={0.85} duration={35} delay={-15} opacity={0.7} />
      <Cloud y="55%" scale={0.6} duration={25} delay={-5} opacity={0.5} />

      {/* Sparkle particles */}
      <FloatingParticles count={22} emojis={['✨', '⭐', '💫', '🌸', '🌷', '🍀']} />

      {/* Sun glow */}
      <motion.div
        className="absolute top-8 right-12 w-20 h-20 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,224,102,0.9) 0%, rgba(255,200,100,0.4) 50%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Hidden flower secret — subtly pulsing in the corner */}
      <motion.button
        className="absolute bottom-24 left-6 text-2xl"
        onClick={() => onSecretFound(secrets.flower)}
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.05, 0.9] }}
        transition={{ duration: 5, repeat: Infinity }}
        title="✨"
      >
        🌷
      </motion.button>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        {/* Flower icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 14 }}
          className="text-6xl"
        >
          🌷
        </motion.div>

        {/* Title — "Ploy" is the secret trigger */}
        <motion.h1
          className="font-display text-5xl md:text-6xl leading-tight"
          style={{ color: '#5a3d5c', textShadow: '0 2px 12px rgba(200,180,232,0.5)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          A Tiny Place For{' '}
          <motion.span
            className="relative cursor-pointer inline-block"
            onClick={onPloyTap}
            whileTap={{ scale: 0.92 }}
            animate={ployCount >= 2 ? {
              color: ['#5a3d5c', '#c8b4e8', '#f593b0', '#5a3d5c'],
            } : {}}
            transition={{ duration: 1, repeat: ployCount >= 2 ? Infinity : 0 }}
            title=""
          >
            Ploy
            {/* Tap progress sparkles */}
            {ployCount >= 1 && ployCount < 5 && (
              <motion.span
                className="absolute -top-4 -right-1 text-xs"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                {'✨'.repeat(Math.min(ployCount, 3))}
              </motion.span>
            )}
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-body text-base md:text-lg max-w-xs leading-relaxed"
          style={{ color: '#7a5c7a' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          For days when everything feels uncertain.
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-ploy-lavender" />
          <span className="text-sm text-ploy-lavender">✦</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-ploy-lavender" />
        </motion.div>

        {/* Enter button */}
        <motion.button
          onClick={onEnter}
          className="mt-2 px-10 py-4 rounded-full font-body font-semibold text-white text-lg shadow-lg relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #f593b0 0%, #c8b4e8 100%)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          whileHover={{ scale: 1.06, boxShadow: '0 8px 30px rgba(245,147,176,0.5)' }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
          />
          <span className="relative z-10">Enter ✨</span>
        </motion.button>

        <motion.p
          className="text-xs font-body"
          style={{ color: 'rgba(120,80,120,0.6)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          made with care, just for you
        </motion.p>
      </div>

      {/* Bottom wave decoration */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(255,214,240,0.4), transparent)' }}
      />

      {/* Floating petals at bottom */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-16 text-2xl pointer-events-none"
          style={{ left: `${15 + i * 18}%` }}
          animate={{ y: [0, -60, -120], opacity: [0, 0.7, 0], scale: [0.5, 1, 0.3] }}
          transition={{ duration: 4, delay: i * 1.2 + 1.5, repeat: Infinity, ease: 'easeOut' }}
        >
          🌸
        </motion.div>
      ))}
    </motion.div>
  )
}
