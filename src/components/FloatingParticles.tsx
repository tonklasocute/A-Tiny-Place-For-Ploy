import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  emoji: string
}

interface FloatingParticlesProps {
  count?: number
  emojis?: string[]
  className?: string
}

export default function FloatingParticles({
  count = 18,
  emojis = ['✨', '🌸', '⭐', '💫', '🌷', '🍀'],
  className = '',
}: FloatingParticlesProps) {
  const particles: Particle[] = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.6 + Math.random() * 0.8,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 5,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    })), [count, emojis])

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}rem`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 10 - 5, 0],
            opacity: [0.4, 0.9, 0.4],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  )
}
