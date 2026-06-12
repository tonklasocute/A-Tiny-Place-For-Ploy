import { motion, AnimatePresence } from 'framer-motion'
import type { Secret } from '../data/secrets'

interface SecretModalProps {
  secret: Secret | null
  onClose: () => void
}

export default function SecretModal({ secret, onClose }: SecretModalProps) {
  return (
    <AnimatePresence>
      {secret && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0" style={{ background: 'rgba(80,40,100,0.55)', backdropFilter: 'blur(8px)' }} />

          {/* Card */}
          <motion.div
            className="relative z-10 w-full max-w-xs rounded-3xl px-7 py-8 text-center"
            style={{
              background: 'rgba(255,255,255,0.88)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(200,180,232,0.5)',
              boxShadow: '0 20px 60px rgba(150,80,200,0.2)',
            }}
            initial={{ scale: 0.7, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Glow ring */}
            <motion.div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl"
              style={{ background: 'linear-gradient(135deg, #ffd6ea, #e8d4ff)' }}
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {secret.emoji}
            </motion.div>

            <motion.p
              className="font-display text-lg mb-3"
              style={{ color: '#9a5c9a' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {secret.title}
            </motion.p>

            <motion.p
              className="font-body text-sm leading-relaxed"
              style={{ color: '#5a3d5c' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              {secret.message}
            </motion.p>

            <motion.div
              className="flex justify-center gap-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {['✨', '🌷', '✨'].map((e, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.8, delay: i * 0.3, repeat: Infinity }}
                  className="text-base"
                >
                  {e}
                </motion.span>
              ))}
            </motion.div>

            <motion.button
              onClick={onClose}
              className="mt-5 px-6 py-2 rounded-full text-sm font-body font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #f593b0, #c8b4e8)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Close 🌸
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
