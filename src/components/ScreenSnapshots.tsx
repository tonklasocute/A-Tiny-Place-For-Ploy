import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { photos } from '../data/photos'
import type { Secret } from '../data/secrets'
import { secrets } from '../data/secrets'

interface Props {
  onContinue: () => void
  onSecretFound: (secret: Secret) => void
}

function PolaroidCard({
  photo,
  index,
  onTap,
}: {
  photo: typeof photos[0]
  index: number
  onTap: () => void
}) {
  const base = import.meta.env.BASE_URL

  return (
    <motion.div
      className="cursor-pointer select-none"
      style={{ transform: `rotate(${photo.rotation}deg)` }}
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.12, type: 'spring', stiffness: 180, damping: 16 }}
      whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
      whileTap={{ scale: 0.97 }}
      onClick={onTap}
    >
      <div
        className="rounded-lg overflow-hidden"
        style={{
          background: 'white',
          boxShadow: '0 8px 28px rgba(150,100,180,0.2), 0 2px 8px rgba(0,0,0,0.08)',
          padding: '8px 8px 28px 8px',
        }}
      >
        {/* Photo area */}
        <div
          className="rounded overflow-hidden"
          style={{ width: '100%', aspectRatio: '1', background: '#f5eeff' }}
        >
          <img
            src={`${base}${photo.filename}`}
            alt={photo.caption}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
        {/* Caption */}
        <div className="pt-1 px-1">
          <p className="font-display text-xs leading-snug text-center" style={{ color: '#5a3d5c' }}>
            {photo.caption}
          </p>
          {photo.date && (
            <p className="text-[10px] text-center mt-0.5" style={{ color: '#c8b4e8' }}>
              {photo.date}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function LightboxPhoto({
  photo,
  onClose,
}: {
  photo: typeof photos[0]
  onClose: () => void
}) {
  const base = import.meta.env.BASE_URL

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0" style={{ background: 'rgba(30,10,50,0.75)', backdropFilter: 'blur(8px)' }} />
      <motion.div
        className="relative z-10"
        style={{
          background: 'white',
          padding: '12px 12px 48px 12px',
          borderRadius: '10px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
          maxWidth: '320px',
          width: '100%',
        }}
        initial={{ scale: 0.7, y: 30, rotate: (photo.rotation ?? 0) }}
        animate={{ scale: 1, y: 0, rotate: 0 }}
        exit={{ scale: 0.7, y: 20 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="rounded overflow-hidden" style={{ aspectRatio: '1' }}>
          <img src={`${base}${photo.filename}`} alt={photo.caption} className="w-full h-full object-cover" />
        </div>
        <div className="pt-3 text-center">
          <p className="font-display text-base" style={{ color: '#4a2d5a' }}>{photo.caption}</p>
          {photo.date && <p className="text-sm mt-0.5" style={{ color: '#c8b4e8' }}>{photo.date}</p>}
        </div>
        <motion.button
          className="absolute top-2 right-3 text-xl"
          style={{ color: '#c8b4e8' }}
          onClick={onClose}
          whileTap={{ scale: 0.9 }}
        >
          ×
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default function ScreenSnapshots({ onContinue, onSecretFound }: Props) {
  const [focusedPhoto, setFocusedPhoto] = useState<typeof photos[0] | null>(null)

  return (
    <motion.div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #f5eeff 0%, #fff0f7 50%, #eef7ff 100%)',
      }}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.55 }}
    >
      {/* Floating decorations */}
      {['🌸', '✨', '💫', '🌷'].map((e, i) => (
        <motion.div
          key={i}
          className="absolute text-lg pointer-events-none"
          style={{ left: `${5 + i * 22}%`, top: `${6 + (i % 2) * 8}%` }}
          animate={{ y: [0, -8, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, delay: i * 0.6 }}
        >
          {e}
        </motion.div>
      ))}

      {/* Header */}
      <div className="flex-shrink-0 pt-10 px-5 pb-3">
        <motion.div
          className="flex items-center gap-2 mb-1"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-ploy-pink opacity-40" />
          <span className="text-base">📷</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-ploy-pink opacity-40" />
        </motion.div>
        <motion.h2
          className="font-display text-3xl text-center"
          style={{ color: '#5a3d5c' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Snapshots
        </motion.h2>
        <motion.p
          className="text-xs font-body text-center mt-1"
          style={{ color: 'rgba(154,90,154,0.65)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          moments worth keeping 🌷
        </motion.p>
      </div>

      {/* Photo grid */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-4">
        <div className="grid grid-cols-2 gap-6 pt-4 pb-8">
          {photos.map((photo, i) => (
            <PolaroidCard
              key={photo.id}
              photo={photo}
              index={i}
              onTap={() => setFocusedPhoto(photo)}
            />
          ))}
        </div>

        {/* Hidden star secret */}
        <motion.div
          className="flex justify-center mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <motion.button
            onClick={() => onSecretFound(secrets.star)}
            className="text-xl"
            animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 4, repeat: Infinity }}
            title="✨"
          >
            ⭐
          </motion.button>
        </motion.div>
      </div>

      {/* Continue */}
      <div className="flex-shrink-0 px-6 py-5">
        <motion.button
          onClick={onContinue}
          className="w-full py-4 rounded-full font-body font-semibold text-white text-base shadow-lg relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #f593b0 0%, #c8b4e8 100%)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
          />
          <span className="relative z-10">Continue 💌</span>
        </motion.button>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {focusedPhoto && (
          <LightboxPhoto photo={focusedPhoto} onClose={() => setFocusedPhoto(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
