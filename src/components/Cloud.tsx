import { motion } from 'framer-motion'

interface CloudProps {
  y: string
  scale?: number
  duration: number
  delay: number
  opacity?: number
}

export default function Cloud({ y, scale = 1, duration, delay, opacity = 0.85 }: CloudProps) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: y, opacity }}
      initial={{ x: '-15vw' }}
      animate={{ x: '115vw' }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <div
        className="relative"
        style={{ transform: `scale(${scale})` }}
      >
        {/* Cloud body */}
        <div className="relative flex items-end">
          <div className="w-16 h-10 bg-white rounded-full opacity-90" />
          <div className="w-24 h-14 bg-white rounded-full -ml-4 -mb-1" />
          <div className="w-14 h-9 bg-white rounded-full -ml-3" />
        </div>
      </div>
    </motion.div>
  )
}
