import { motion } from 'framer-motion'

interface MusicButtonProps {
  isMuted: boolean
  onToggle: () => void
}

export default function MusicButton({ isMuted, onToggle }: MusicButtonProps) {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 w-11 h-11 rounded-full glass flex items-center justify-center shadow-md"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      title={isMuted ? 'Play ambient music' : 'Mute music'}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <span className="text-lg select-none">{isMuted ? '🔇' : '🎵'}</span>
      {!isMuted && (
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-ploy-pink"
          animate={{ scale: [1, 1.4], opacity: [0.7, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.button>
  )
}
