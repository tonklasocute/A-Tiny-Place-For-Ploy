import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'

import Screen1Landing from './components/Screen1Landing'
import Screen2Chat from './components/Screen2Chat'
import Screen3Comfort from './components/Screen3Comfort'
import Screen4Achievement from './components/Screen4Achievement'
import Screen5Letter from './components/Screen5Letter'
import Screen6Final from './components/Screen6Final'
import ScreenLittleThings from './components/ScreenLittleThings'
import ScreenSnapshots from './components/ScreenSnapshots'
import CassetteMusicPlayer from './components/CassetteMusicPlayer'
import SecretModal from './components/SecretModal'
import EasterEggOverlay from './components/EasterEggOverlay'

import type { Secret } from './data/secrets'

type Screen =
  | 'landing'
  | 'littleThings'
  | 'snapshots'
  | 'chat'
  | 'comfort'
  | 'achievement'
  | 'letter'
  | 'final'

const SCREEN_ORDER: Screen[] = [
  'landing',
  'littleThings',
  'snapshots',
  'chat',
  'comfort',
  'achievement',
  'letter',
  'final',
]

const DOT_SCREENS: Screen[] = ['littleThings', 'snapshots', 'chat', 'comfort', 'achievement', 'letter']

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [activeSecret, setActiveSecret] = useState<Secret | null>(null)
  const [easterEggOpen, setEasterEggOpen] = useState(false)

  const go = useCallback((s: Screen) => setScreen(s), [])

  const handleSecretFound = useCallback((secret: Secret) => {
    setActiveSecret(secret)
  }, [])

  const handlePloyEasterEgg = useCallback(() => {
    setEasterEggOpen(true)
  }, [])

  const currentDotIndex = SCREEN_ORDER.indexOf(screen)

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '100dvh' }}>
      {/* Global cassette music player — always visible */}
      <CassetteMusicPlayer />

      {/* Global secret object modal */}
      <SecretModal secret={activeSecret} onClose={() => setActiveSecret(null)} />

      {/* Global easter egg overlay */}
      <EasterEggOverlay open={easterEggOpen} onClose={() => setEasterEggOpen(false)} />

      {/* Screens */}
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <div key="landing" className="absolute inset-0">
            <Screen1Landing
              onEnter={() => go('littleThings')}
              onPloyEasterEgg={handlePloyEasterEgg}
              onSecretFound={handleSecretFound}
            />
          </div>
        )}

        {screen === 'littleThings' && (
          <div key="littleThings" className="absolute inset-0">
            <ScreenLittleThings
              onContinue={() => go('snapshots')}
              onSecretFound={handleSecretFound}
            />
          </div>
        )}

        {screen === 'snapshots' && (
          <div key="snapshots" className="absolute inset-0">
            <ScreenSnapshots
              onContinue={() => go('chat')}
              onSecretFound={handleSecretFound}
            />
          </div>
        )}

        {screen === 'chat' && (
          <div key="chat" className="absolute inset-0">
            <Screen2Chat onContinue={() => go('comfort')} />
          </div>
        )}

        {screen === 'comfort' && (
          <div key="comfort" className="absolute inset-0">
            <Screen3Comfort
              onUnlock={() => go('achievement')}
              onSecretFound={handleSecretFound}
            />
          </div>
        )}

        {screen === 'achievement' && (
          <div key="achievement" className="absolute inset-0">
            <Screen4Achievement onOpenLetter={() => go('letter')} />
          </div>
        )}

        {screen === 'letter' && (
          <div key="letter" className="absolute inset-0">
            <Screen5Letter
              onComplete={() => go('final')}
              onSecretFound={handleSecretFound}
            />
          </div>
        )}

        {screen === 'final' && (
          <div key="final" className="absolute inset-0">
            <Screen6Final />
          </div>
        )}
      </AnimatePresence>

      {/* Progress dots — visible on all middle screens */}
      {DOT_SCREENS.includes(screen) && (
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-40 pointer-events-none">
          {DOT_SCREENS.map(s => (
            <div
              key={s}
              className="rounded-full transition-all duration-300"
              style={{
                width: screen === s ? 16 : 6,
                height: 6,
                background: screen === s
                  ? 'rgba(245,147,176,0.9)'
                  : 'rgba(200,180,232,0.4)',
              }}
            />
          ))}
        </div>
      )}

      {/* Invisible dot index for TypeScript — keeps currentDotIndex used */}
      {currentDotIndex < 0 && null}
    </div>
  )
}
