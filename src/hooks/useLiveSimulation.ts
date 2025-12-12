import { useEffect, useState } from 'react'
import type { SportEvent } from '@/types/events/type'

export function useLiveMatchSimulation(initialMatches: SportEvent[]) {
  const [matches, setMatches] = useState(initialMatches)

  useEffect(() => {
    const interval = setInterval(() => {
      setMatches(prev =>
        prev.map(match => {
          if (match.strStatus === 'Match Finished') return match
          const minute = (match.minute ?? 0) + 1
          const homeScore = parseInt(match.intHomeScore || '0', 10)
          const awayScore = parseInt(match.intAwayScore || '0', 10)
          const newHomeScore = Math.random() < 0.1 ? homeScore + 1 : homeScore
          const newAwayScore = Math.random() < 0.1 ? awayScore + 1 : awayScore
          return {
            ...match,
            minute,
            intHomeScore: newHomeScore.toString(),
            intAwayScore: newAwayScore.toString(),
            strStatus: minute >= 90 ? 'Match Finished' : 'Live'
          }
        })
      )
    }, 5000) 
    return () => clearInterval(interval)
  }, [])

  return matches
}