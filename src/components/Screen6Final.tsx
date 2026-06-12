import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import HiddenStarPage from './HiddenStarPage'

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  isHidden?: boolean
}

interface ShootingStar {
  id: number
  startX: number
  startY: number
  delay: number
}

function StarField({ stars, onHiddenStarTap }: { stars: Star[]; onHiddenStarTap: () => void }) {
  return (
    <>
      {stars.map(star =>
        star.isHidden ? (
          <motion.button
            key={star.id}
            className="absolute rounded-full cursor-pointer"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size + 2,
              height: star.size + 2,
              background: 'radial-gradient(circle, #ffe066 0%, rgba(255,200,80,0.4) 70%, transparent 100%)',
            }}
            animate={{
              opacity: [0.35, 1, 0.35],
              scale: [0.9, 1.5, 0.9],
              boxShadow: [
                '0 0 4px 2px rgba(255,220,80,0.25)',
                '0 0 12px 5px rgba(255,220,80,0.65)',
                '0 0 4px 2px rgba(255,220,80,0.25)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            onClick={onHiddenStarTap}
          />
        ) : (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{ opacity: [0.15, 0.9, 0.15], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        )
      )}
    </>
  )
}

function ShootingStars({ items }: { items: ShootingStar[] }) {
  return (
    <>
      {items.map(ss => (
        <motion.div
          key={ss.id}
          className="absolute pointer-events-none"
          style={{ left: `${ss.startX}%`, top: `${ss.startY}%` }}
        >
          <motion.div
            animate={{ x: [0, 200], y: [0, 200], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 1.1,
              delay: ss.delay,
              repeat: Infinity,
              repeatDelay: 6 + Math.random() * 4,
              ease: 'easeIn',
            }}
            style={{ transform: 'rotate(45deg)' }}
          >
            <div
              className="h-px rounded-full"
              style={{ width: '55px', background: 'linear-gradient(90deg, rgba(255,255,255,0.9), transparent)' }}
            />
            <div
              className="absolute -top-0.5 left-0 w-1.5 h-1.5 rounded-full bg-white"
              style={{ boxShadow: '0 0 5px 2px rgba(255,255,255,0.7)' }}
            />
          </motion.div>
        </motion.div>
      ))}
    </>
  )
}

export default function Screen6Final() {
  const [phase, setPhase] = useState(0)
  const [showHiddenStar, setShowHiddenStar] = useState(false)

  const stars: Star[] = useMemo(() => [
    ...Array.from({ length: 72 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 78,
      size: 1 + Math.random() * 2.5,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
    })),
    { id: 999, x: 72, y: 26, size: 5, delay: 0, duration: 2.5, isHidden: true },
  ], [])

  const shootingStars: ShootingStar[] = useMemo(() => Array.from({ length: 3 }, (_, i) => ({
    id: i,
    startX: Math.random() * 55,
    startY: Math.random() * 30,
    delay: i * 3 + 1.5,
  })), [])

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => setPhase(4), 3500),
      setTimeout(() => setPhase(5), 5000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <>
      <motion.div
        className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden select-none"
        style={{
          background: `linear-gradient(180deg,
            #09061a 0%,
            #140d38 18%,
            #261550 36%,
            #3e1f60 52%,
            #6b2a62 67%,
            #a84060 80%,
            #c86444 91%,
            #d8924e 100%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <StarField stars={stars} onHiddenStarTap={() => setShowHiddenStar(true)} />
        <ShootingStars items={shootingStars} />

        {/* Moon */}
        <motion.div
          className="absolute top-9 right-11 w-12 h-12 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,252,235,0.92) 0%, rgba(255,225,155,0.22) 55%, transparent 75%)',
            boxShadow: '0 0 22px 7px rgba(255,220,140,0.10)',
          }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Warm horizon bloom */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '40%',
            background: 'linear-gradient(to top, rgba(216,146,78,0.20) 0%, rgba(168,64,96,0.10) 55%, transparent 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center max-w-xs w-full">

          {/* Tulip */}
          <motion.div
            className="text-5xl"
            initial={{ opacity: 0, scale: 0.2, y: 10 }}
            animate={phase >= 1 ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          >
            🌷
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display leading-none"
            style={{
              color: '#f7eeff',
              fontSize: '3rem',
              textShadow: '0 0 48px rgba(220,170,255,0.45)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            You made it.
          </motion.h1>

          {/* Divider */}
          <motion.div
            className="flex items-center gap-3 w-full"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={phase >= 3 ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.65 }}
          >
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent)' }} />
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '9px' }}>✦</span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent)' }} />
          </motion.div>

          {/* Body */}
          <motion.div
            className="flex flex-col items-center gap-1.5"
            initial={{ opacity: 0, y: 18 }}
            animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {[
              'The uncertainty.',
              'The hard choice.',
              'The quiet courage you carried through it all.',
            ].map((line, i) => (
              <motion.p
                key={i}
                className="font-body text-sm leading-relaxed"
                style={{ color: 'rgba(238,218,255,0.75)' }}
                initial={{ opacity: 0 }}
                animate={phase >= 4 ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.22, duration: 0.6 }}
              >
                {line}
              </motion.p>
            ))}
            <div className="h-3" />
            <motion.p
              className="font-display text-lg italic"
              style={{ color: 'rgba(255,240,255,0.92)', textShadow: '0 0 20px rgba(220,150,255,0.3)' }}
              initial={{ opacity: 0 }}
              animate={phase >= 4 ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              All of it brought you here.
            </motion.p>
          </motion.div>

          {/* Closing */}
          <motion.div
            className="flex flex-col items-center gap-2 mt-1"
            initial={{ opacity: 0, y: 12 }}
            animate={phase >= 5 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)' }} />
            <div className="h-2" />
            <p className="font-body text-sm" style={{ color: 'rgba(238,218,255,0.68)' }}>
              The next chapter is yours to write.
            </p>
            <p className="font-body text-sm" style={{ color: 'rgba(238,218,255,0.68)' }}>
              Go gently. Go bravely.
            </p>
            <div className="h-3" />
            <p className="font-body text-xs" style={{ color: 'rgba(238,218,255,0.32)' }}>
              — with love, always
            </p>
          </motion.div>
        </div>
      </motion.div>

      <HiddenStarPage open={showHiddenStar} onClose={() => setShowHiddenStar(false)} />
    </>
  )
}
