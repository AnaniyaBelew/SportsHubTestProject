import { useMatchTimeline } from '@/hooks/useMatchDetails'
import { useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { MatchHeader } from '@/components/Matches/MatchHeader'
import { MatchTimeline } from '@/components/Matches/MatchTimeline'
import { formatDate } from '@/utils/dateUtils'

export default function MatchDetailPage() {
  const { eventId } = useParams()
  const { events, loadingEvents,loadingMatch, errorEvents,errorMatch,match } = useMatchTimeline(eventId ?? '')

  const score = { home:Number(match?.intHomeScore??0), away: Number(match?.intAwayScore??0) }
  const status = match?.strStatus==="Match Finished"?'FT':"In Progress"
  const date = formatDate(match?.dateEvent)

  if (loadingEvents || loadingMatch) {
    return (
      <div className="flex w-full justify-center py-10">
        <Loader2 className="text-muted animate-spin" />
      </div>
    )
  }

  if (errorEvents || !events || errorMatch) {
    return (
      <div className="text-destructive flex w-full justify-center py-10">
        Failed to load match details.
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-4 py-6">
      <MatchHeader
        homeTeam={{name:match?.strHomeTeam??"",logo:match?.strHomeTeamBadge??""}}
        awayTeam={{name:match?.strAwayTeam??"",logo:match?.strAwayTeamBadge??""}}
        score={score}
        status={status}
        date={date}
      />
      <MatchTimeline events={events} match={match}/>
    </div>
  )
}
