import { useRef, useState, useCallback } from 'react'

export function useEasterEgg(targetTaps = 5, windowMs = 10000, onTrigger?: () => void) {
  const timestampsRef = useRef<number[]>([])
  const [count, setCount] = useState(0)
  const [triggered, setTriggered] = useState(false)

  const onTap = useCallback(() => {
    if (triggered) return
    const now = Date.now()
    timestampsRef.current = [...timestampsRef.current, now].filter(t => now - t <= windowMs)
    const current = timestampsRef.current.length
    setCount(current)

    if (current >= targetTaps) {
      setTriggered(true)
      onTrigger?.()
    }
  }, [triggered, targetTaps, windowMs, onTrigger])

  const reset = useCallback(() => {
    timestampsRef.current = []
    setCount(0)
    setTriggered(false)
  }, [])

  return { onTap, count, triggered, reset }
}
