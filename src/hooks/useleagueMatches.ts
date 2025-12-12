import { useEffect, useState } from "react"
import { fetchLeagueEvents } from "@/services/events"
import type { SportEvent } from "@/types/events/type"

export type MatchFilter = "all" | "live" | "favorite"

export function useLeagueMatches(leagueId: string, season: string) {
  const [filter, setFilter] = useState<MatchFilter>("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [matches, setMatches] = useState<SportEvent[]>([])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setError(null)
      setLoading(true)

      const res = await fetchLeagueEvents(leagueId, season)
      if (cancelled) return

      if (res.error) {
        setError(res.error)
      } else if (res.data) {
        setMatches(res.data)
      }

      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [leagueId, season, filter])

  return {
    filter,
    setFilter,
    loading,
    error,
    matches,
  }
}
