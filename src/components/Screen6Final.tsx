import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

interface ShootingStar {
  id: number
  startX: number
  startY: number
  angle: number
  delay: number
}

function StarField({ stars }: { stars: Star[] }) {
  return (
    <>
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            background: 'white',
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  )
}

function ShootingStars({ shootingStars }: { shootingStars: ShootingStar[] }) {
  return (
    <>
      {shootingStars.map(ss => (
        <motion.div
          key={ss.id}
          className="absolute pointer-events-none"
          style={{ left: `${ss.startX}%`, top: `${ss.startY}%` }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 1.2,
            delay: ss.delay,
            repeat: Infinity,
            repeatDelay: 4 + Math.random() * 5,
          }}
        >
          <motion.div
            className="relative"
            style={{ transform: `rotate(${ss.angle}deg)` }}
            animate={{
              x: [0, 200],
              y: [0, 200],
            }}
            transition={{
              duration: 1.2,
              delay: ss.delay,
              repeat: Infinity,
              repeatDelay: 4 + Math.random() * 5,
              ease: 'easeIn',
            }}
          >
            <div
              className="h-0.5 rounded-full"
              style={{
                width: '60px',
                background: 'linear-gradient(90deg, white, rgba(255,255,255,0))',
              }}
            />
            <div
              className="absolute -top-0.5 left-0 w-2 h-2 rounded-full bg-white"
              style={{ boxShadow: '0 0 6px 2px rgba(255,255,255,0.8)' }}
            />
          </motion.div>
        </motion.div>
      ))}
    </>
  )
}

export default function Screen6Final() {
  const [phase, setPhase] = useState(0)

  const stars: Star[] = useMemo(() => Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 85,
    size: 1 + Math.random() * 3,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 3,
  })), [])

  const shootingStars: ShootingStar[] = useMemo(() => Array.from({ length: 4 }, (_, i) => ({
    id: i,
    startX: Math.random() * 60,
    startY: Math.random() * 40,
    angle: 20 + Math.random() * 25,
    delay: i * 2.5,
  })), [])

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1100),
      setTimeout(() => setPhase(3), 2000),
      setTimeout(() => setPhase(4), 2800),
      setTimeout(() => setPhase(5), 3600),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <motion.div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden select-none"
      style={{
        background: 'linear-gradient(180deg, #0d0921 0%, #1a1040 25%, #2d1b5e 55%, #3d2a70 75%, #5a3d7a 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Stars */}
      <StarField stars={stars} />
      <ShootingStars shootingStars={shootingStars} />

      {/* Moon glow */}
      <motion.div
        className="absolute top-10 right-12 w-16 h-16 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,250,230,0.95) 0%, rgba(255,220,150,0.3) 50%, transparent 70%)',
          boxShadow: '0 0 30px 10px rgba(255,220,150,0.15)',
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center">
        {/* Flower */}
        <motion.div
          className="text-5xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}
        >
          🌷
        </motion.div>

        {/* Main text */}
        <motion.h1
          className="font-display text-4xl md:text-5xl leading-tight"
          style={{ color: '#f5e6ff', textShadow: '0 0 30px rgba(200,180,232,0.6)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          The next chapter<br />is waiting.
        </motion.h1>

        {/* Divider */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={phase >= 3 ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-ploy-lavender to-transparent" />
          <span className="text-ploy-lavender text-sm">✦</span>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-ploy-lavender to-transparent" />
        </motion.div>

        {/* Level badge */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <motion.div
            className="px-6 py-3 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(200,180,232,0.3), rgba(245,147,176,0.3))',
              border: '1.5px solid rgba(200,180,232,0.5)',
              backdropFilter: 'blur(8px)',
            }}
            animate={{ boxShadow: ['0 0 15px rgba(200,180,232,0.3)', '0 0 30px rgba(200,180,232,0.6)', '0 0 15px rgba(200,180,232,0.3)'] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <p className="font-body font-bold text-xl" style={{ color: '#e8d4ff' }}>
              Ploy  Lv. 26
            </p>
          </motion.div>

          {/* Subtitle */}
          <p className="font-body text-sm font-medium tracking-wider" style={{ color: '#c8b4e8' }}>
            ✨ New Journey Unlocked ✨
          </p>
        </motion.div>

        {/* Final whisper */}
        <motion.p
          className="text-xs font-body max-w-xs leading-relaxed"
          style={{ color: 'rgba(200,180,232,0.65)' }}
          initial={{ opacity: 0 }}
          animate={phase >= 5 ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          Wherever you go, you carry everything you need.
        </motion.p>

        {/* Stars burst */}
        <motion.div
          className="flex gap-3 mt-1"
          initial={{ opacity: 0 }}
          animate={phase >= 5 ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {['🌸', '🌟', '🌷', '🌟', '🌸'].map((e, i) => (
            <motion.span
              key={i}
              className="text-lg"
              animate={{ y: [0, -5, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(90,60,120,0.4), transparent)' }}
      />
    </motion.div>
  )
}
