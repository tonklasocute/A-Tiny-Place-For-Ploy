import { useRef, useState, useCallback, useEffect } from 'react'

type OscNode = { osc: OscillatorNode; gain: GainNode }

// Soft lo-fi ambient chord tones (Cmaj7 / Am7 voicings)
const CHORD_NOTES = [
  [261.63, 329.63, 392.0, 493.88],  // Cmaj7
  [220.0, 261.63, 329.63, 392.0],   // Am7
  [293.66, 369.99, 440.0, 554.37],  // Dmaj7 / Bm7
  [174.61, 220.0, 261.63, 329.63],  // Fmaj7
]

export function useAmbientMusic() {
  const ctxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const nodesRef = useRef<OscNode[]>([])
  const chordIndexRef = useRef(0)
  const chordTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [hasStarted, setHasStarted] = useState(false)

  const createCtx = useCallback(() => {
    if (ctxRef.current) return ctxRef.current
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    ctxRef.current = ctx

    const master = ctx.createGain()
    master.gain.setValueAtTime(0, ctx.currentTime)
    master.connect(ctx.destination)
    masterGainRef.current = master
    return ctx
  }, [])

  const stopAllOscillators = useCallback(() => {
    nodesRef.current.forEach(({ osc, gain }) => {
      try {
        gain.gain.setTargetAtTime(0, ctxRef.current!.currentTime, 0.3)
        osc.stop(ctxRef.current!.currentTime + 1)
      } catch {
        // already stopped
      }
    })
    nodesRef.current = []
  }, [])

  const playChord = useCallback((ctx: AudioContext, notes: number[]) => {
    stopAllOscillators()
    const newNodes: OscNode[] = []

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()

      // Add gentle detuning for warmth
      osc.type = i === 0 ? 'sine' : 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, ctx.currentTime)

      gainNode.gain.setValueAtTime(0, ctx.currentTime)
      // Soft attack
      gainNode.gain.linearRampToValueAtTime(0.04 / (i + 1), ctx.currentTime + 2)
      // Sustain
      gainNode.gain.setValueAtTime(0.04 / (i + 1), ctx.currentTime + 6)
      // Release
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 9)

      osc.connect(gainNode)
      gainNode.connect(masterGainRef.current!)
      osc.start()
      osc.stop(ctx.currentTime + 10)

      newNodes.push({ osc, gain: gainNode })
    })

    nodesRef.current = newNodes
  }, [stopAllOscillators])

  const scheduleNext = useCallback(() => {
    if (!ctxRef.current || ctxRef.current.state === 'closed') return
    const ctx = ctxRef.current
    const nextChord = CHORD_NOTES[chordIndexRef.current % CHORD_NOTES.length]
    playChord(ctx, nextChord)
    chordIndexRef.current++

    chordTimerRef.current = setTimeout(scheduleNext, 9000)
  }, [playChord])

  const start = useCallback(() => {
    const ctx = createCtx()
    if (ctx.state === 'suspended') ctx.resume()
    setHasStarted(true)
    setIsMuted(false)
    if (masterGainRef.current) {
      masterGainRef.current.gain.setTargetAtTime(0.8, ctx.currentTime, 0.5)
    }
    scheduleNext()
  }, [createCtx, scheduleNext])

  const toggleMute = useCallback(() => {
    if (!hasStarted) {
      start()
      return
    }
    const ctx = ctxRef.current
    if (!ctx || !masterGainRef.current) return
    if (ctx.state === 'suspended') ctx.resume()

    if (isMuted) {
      masterGainRef.current.gain.setTargetAtTime(0.8, ctx.currentTime, 0.3)
      setIsMuted(false)
      if (nodesRef.current.length === 0) scheduleNext()
    } else {
      masterGainRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.3)
      setIsMuted(true)
    }
  }, [hasStarted, isMuted, start, scheduleNext])

  useEffect(() => {
    return () => {
      if (chordTimerRef.current) clearTimeout(chordTimerRef.current)
      ctxRef.current?.close()
    }
  }, [])

  return { isMuted, toggleMute, hasStarted }
}
