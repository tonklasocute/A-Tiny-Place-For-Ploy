import { motion } from 'framer-motion'

interface MochiProps {
  expression?: 'happy' | 'excited' | 'cozy' | 'love'
}

export default function MochiCharacter({ expression = 'happy' }: MochiProps) {
  const eyeConfig = {
    happy: { path: 'M 36 38 Q 39 35 42 38', stroke: '#5a3d5c' },
    excited: { path: 'M 36 36 Q 39 32 42 36', stroke: '#5a3d5c' },
    cozy: { path: 'M 37 38 Q 39 36 41 38', stroke: '#5a3d5c' },
    love: { path: 'M 36 37 Q 39 34 42 37', stroke: '#e05a8a' },
  }
  const currentEye = eyeConfig[expression]

  return (
    <motion.div
      className="relative inline-block"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shadow */}
        <ellipse cx="60" cy="122" rx="28" ry="6" fill="rgba(200,150,200,0.2)" />

        {/* Body */}
        <ellipse cx="60" cy="90" rx="28" ry="22" fill="#FFD5E8" />

        {/* Ears */}
        <ellipse cx="30" cy="55" rx="10" ry="13" fill="#FFC0D8" />
        <ellipse cx="90" cy="55" rx="10" ry="13" fill="#FFC0D8" />
        <ellipse cx="30" cy="55" rx="6" ry="9" fill="#FFB5C8" />
        <ellipse cx="90" cy="55" rx="6" ry="9" fill="#FFB5C8" />

        {/* Head */}
        <circle cx="60" cy="65" r="34" fill="#FFF0F5" />

        {/* Cheeks */}
        <ellipse cx="41" cy="70" rx="9" ry="6" fill="rgba(255,160,180,0.45)" />
        <ellipse cx="79" cy="70" rx="9" ry="6" fill="rgba(255,160,180,0.45)" />

        {/* Eyes */}
        <path d={currentEye.path} stroke={currentEye.stroke} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d={currentEye.path.replace(/36/g, '57').replace(/42/g, '63')} stroke={currentEye.stroke} strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Nose */}
        <ellipse cx="60" cy="72" rx="2.5" ry="1.8" fill="#F593B0" />

        {/* Mouth */}
        <path d="M 56 76 Q 60 80 64 76" stroke="#F593B0" strokeWidth="1.8" strokeLinecap="round" fill="none" />

        {/* Tiny accessory - bow */}
        <path d="M 72 38 Q 76 34 80 36 Q 76 40 72 38Z" fill="#C8B4E8" />
        <path d="M 80 36 Q 84 34 88 38 Q 84 40 80 36Z" fill="#C8B4E8" />
        <circle cx="80" cy="37" r="2.5" fill="#D4C5F0" />

        {/* Arms */}
        <path d="M 32 88 Q 22 82 24 94 Q 30 100 38 96" fill="#FFD5E8" stroke="#FFAAC8" strokeWidth="1" />
        <path d="M 88 88 Q 98 82 96 94 Q 90 100 82 96" fill="#FFD5E8" stroke="#FFAAC8" strokeWidth="1" />

        {/* Tiny paws */}
        <ellipse cx="24" cy="95" rx="5" ry="4" fill="#FFAAC8" />
        <ellipse cx="96" cy="95" rx="5" ry="4" fill="#FFAAC8" />

        {/* Tiny feet */}
        <ellipse cx="50" cy="110" rx="10" ry="6" fill="#FFD5E8" />
        <ellipse cx="70" cy="110" rx="10" ry="6" fill="#FFD5E8" />

        {/* Love heart if expression is love */}
        {expression === 'love' && (
          <motion.text
            x="50" y="28" fontSize="14" fill="#F593B0"
            animate={{ y: [28, 20, 28], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            💕
          </motion.text>
        )}
      </svg>
    </motion.div>
  )
}
