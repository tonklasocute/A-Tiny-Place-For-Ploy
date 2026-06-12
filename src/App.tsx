import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Screen1Landing from './components/Screen1Landing'
import Screen2Chat from './components/Screen2Chat'
import Screen3Comfort from './components/Screen3Comfort'
import Screen4Achievement from './components/Screen4Achievement'
import Screen5Letter from './components/Screen5Letter'
import Screen6Final from './components/Screen6Final'
import MusicButton from './components/MusicButton'
import { useAmbientMusic } from './hooks/useAmbientMusic'

type Screen = 1 | 2 | 3 | 4 | 5 | 6

export default function App() {
  const [screen, setScreen] = useState<Screen>(1)
  const { isMuted, toggleMute } = useAmbientMusic()

  const go = (s: Screen) => setScreen(s)

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ height: '100dvh' }}
    >
      {/* Music toggle — always visible */}
      <MusicButton isMuted={isMuted} onToggle={toggleMute} />

      {/* Screen transitions */}
      <AnimatePresence mode="wait">
        {screen === 1 && (
          <div key="s1" className="absolute inset-0">
            <Screen1Landing onEnter={() => go(2)} />
          </div>
        )}
        {screen === 2 && (
          <div key="s2" className="absolute inset-0">
            <Screen2Chat onContinue={() => go(3)} />
          </div>
        )}
        {screen === 3 && (
          <div key="s3" className="absolute inset-0">
            <Screen3Comfort onUnlock={() => go(4)} />
          </div>
        )}
        {screen === 4 && (
          <div key="s4" className="absolute inset-0">
            <Screen4Achievement onOpenLetter={() => go(5)} />
          </div>
        )}
        {screen === 5 && (
          <div key="s5" className="absolute inset-0">
            <Screen5Letter onComplete={() => go(6)} />
          </div>
        )}
        {screen === 6 && (
          <div key="s6" className="absolute inset-0">
            <Screen6Final />
          </div>
        )}
      </AnimatePresence>

      {/* Screen indicator dots */}
      {screen !== 1 && screen !== 6 && (
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-40 pointer-events-none">
          {([1, 2, 3, 4, 5] as Screen[]).map(s => (
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
    </div>
  )
}
