import { useEffect, useState } from 'react'
import type { TimelineEvent, SportEvent } from '@/types/events/type'
import { fetchEvent, fetchTimeline } from '@/services/events'

export function useMatchTimeline(eventId: string) {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [match, setMatch] = useState<SportEvent | null>(null)

  const [loadingEvents, setLoadingEvents] = useState(true)
  const [loadingMatch, setLoadingMatch] = useState(true)

  const [errorEvents, setErrorEvents] = useState<string | null>(null)
  const [errorMatch, setErrorMatch] = useState<string | null>(null)

  useEffect(() => {
    fetchTimeline(eventId).then(res => {
      if (res.error) {
        setErrorEvents(res.error)
      } else if (res.data) {
        setEvents(res.data)
      }
      setLoadingEvents(false)
    })
    fetchEvent(eventId).then(res => {
      if (res.error) {
        setErrorMatch(res.error)
      } else if (res.data) {
        setMatch(res.data)
      }
      setLoadingMatch(false)
    })
  }, [eventId])

  return {
    events,
    match,
    loadingEvents,
    loadingMatch,
    errorEvents,
    errorMatch,
  }
}