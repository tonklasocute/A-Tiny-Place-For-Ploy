import { motion } from 'framer-motion'

interface MochiProps {
  expression?: 'happy' | 'excited' | 'cozy' | 'love'
  level?: 1 | 2 | 3 | 4
}

// Eye paths per expression
const eyePaths: Record<string, string> = {
  happy: 'M 36 38 Q 39 35 42 38',
  excited: 'M 35 36 Q 39 31 43 36',
  cozy: 'M 37 39 Q 39 37 41 39',
  love: 'M 36 37 Q 39 33 42 37',
}

export default function MochiCharacter({ expression = 'happy', level = 1 }: MochiProps) {
  const eye = eyePaths[expression] ?? eyePaths.happy
  const eyeStroke = expression === 'love' ? '#e05a8a' : '#5a3d5c'

  // Level 3+: sparkles around head
  const showSparkles = level >= 3
  // Level 4: star halo + glow
  const showHalo = level === 4

  // Body color shifts with level
  const bodyColor = level === 4 ? '#FFc0e8' : level === 3 ? '#FFD0E8' : '#FFD5E8'
  const headColor = level === 4 ? '#FFF5FF' : '#FFF0F5'

  return (
    <motion.div
      className="relative inline-block"
      animate={{
        y: level >= 3 ? [0, -12, 0] : [0, -8, 0],
      }}
      transition={{ duration: level >= 3 ? 2 : 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Level 4: golden halo */}
      {showHalo && (
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-6 rounded-full border-2"
          style={{ borderColor: '#FFE066', background: 'rgba(255,224,102,0.15)' }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Level 3-4: sparkles */}
      {showSparkles && (
        <>
          {['-28px', '22px', '-22px'].map((left, i) => (
            <motion.span
              key={i}
              className="absolute -top-2 text-sm"
              style={{ left }}
              animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.4, 1, 0.4], rotate: [0, 20, -20, 0] }}
              transition={{ duration: 1.5, delay: i * 0.4, repeat: Infinity }}
            >
              {level === 4 ? '⭐' : '✨'}
            </motion.span>
          ))}
        </>
      )}

      <svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shadow */}
        <ellipse cx="60" cy="122" rx="28" ry="6" fill="rgba(200,150,200,0.2)" />
        {/* Body */}
        <ellipse cx="60" cy="90" rx="28" ry="22" fill={bodyColor} />
        {/* Ears */}
        <ellipse cx="30" cy="55" rx="10" ry="13" fill="#FFC0D8" />
        <ellipse cx="90" cy="55" rx="10" ry="13" fill="#FFC0D8" />
        <ellipse cx="30" cy="55" rx="6" ry="9" fill="#FFB5C8" />
        <ellipse cx="90" cy="55" rx="6" ry="9" fill="#FFB5C8" />
        {/* Head */}
        <circle cx="60" cy="65" r="34" fill={headColor} />
        {/* Level 4: subtle glow ring on head */}
        {showHalo && (
          <circle cx="60" cy="65" r="34" fill="none" stroke="#FFE066" strokeWidth="1.5" opacity="0.5" />
        )}
        {/* Cheeks */}
        <ellipse cx="41" cy="70" rx="9" ry="6" fill="rgba(255,160,180,0.45)" />
        <ellipse cx="79" cy="70" rx="9" ry="6" fill="rgba(255,160,180,0.45)" />

        {/* Eyes — Level 1 (sleepy): half-closed */}
        {level === 1 ? (
          <>
            <path d="M 36 38 Q 39 38 42 38" stroke="#5a3d5c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 36 38 Q 39 36 42 38" stroke="#5a3d5c" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
            <path d="M 57 38 Q 60 38 63 38" stroke="#5a3d5c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 57 38 Q 60 36 63 38" stroke="#5a3d5c" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
          </>
        ) : level === 4 ? (
          // Level 4: star eyes
          <>
            <text x="32" y="43" fontSize="12" textAnchor="middle" fill="#f0c040">★</text>
            <text x="56" y="43" fontSize="12" textAnchor="middle" fill="#f0c040">★</text>
          </>
        ) : (
          // Normal arched eyes
          <>
            <path d={eye} stroke={eyeStroke} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d={eye.replace(/36/g, '57').replace(/42/g, '63').replace(/39/g, '60')}
              stroke={eyeStroke} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        )}

        {/* Level 1: Zzz */}
        {level === 1 && (
          <motion.text x="80" y="38" fontSize="10" fill="#c8b4e8" opacity="0.8"
            animate={{ opacity: [0.4, 0.9, 0.4], y: [38, 33, 38] }}
            transition={{ duration: 2, repeat: Infinity }}>
            z z
          </motion.text>
        )}

        {/* Nose */}
        <ellipse cx="60" cy="72" rx="2.5" ry="1.8" fill="#F593B0" />
        {/* Mouth */}
        <path d="M 56 76 Q 60 80 64 76" stroke="#F593B0" strokeWidth="1.8" strokeLinecap="round" fill="none" />

        {/* Accessory — bow (level 2+) */}
        {level >= 2 && (
          <>
            <path d="M 72 38 Q 76 34 80 36 Q 76 40 72 38Z" fill={level === 4 ? '#FFE066' : '#C8B4E8'} />
            <path d="M 80 36 Q 84 34 88 38 Q 84 40 80 36Z" fill={level === 4 ? '#FFE066' : '#C8B4E8'} />
            <circle cx="80" cy="37" r="2.5" fill={level === 4 ? '#FFD000' : '#D4C5F0'} />
          </>
        )}

        {/* Arms */}
        <path d="M 32 88 Q 22 82 24 94 Q 30 100 38 96" fill={bodyColor} stroke="#FFAAC8" strokeWidth="1" />
        <path d="M 88 88 Q 98 82 96 94 Q 90 100 82 96" fill={bodyColor} stroke="#FFAAC8" strokeWidth="1" />
        {/* Paws */}
        <ellipse cx="24" cy="95" rx="5" ry="4" fill="#FFAAC8" />
        <ellipse cx="96" cy="95" rx="5" ry="4" fill="#FFAAC8" />
        {/* Feet */}
        <ellipse cx="50" cy="110" rx="10" ry="6" fill={bodyColor} />
        <ellipse cx="70" cy="110" rx="10" ry="6" fill={bodyColor} />

        {/* Love hearts (expression) */}
        {expression === 'love' && (
          <motion.text x="50" y="28" fontSize="14" fill="#F593B0"
            animate={{ y: [28, 20, 28], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}>
            💕
          </motion.text>
        )}
      </svg>
    </motion.div>
  )
}
