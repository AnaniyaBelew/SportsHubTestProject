import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge, EllipsisVertical } from 'lucide-react'
import type { SportEvent } from '@/types/events/type'
import { useNavigate } from 'react-router-dom'

type Props = {
  match: SportEvent
}

export function MatchResultCard({ match }: Props) {
  const navigate = useNavigate()
  const isLive = match?.strStatus !== 'Match Finished'
  const [minute, setMinute] = useState<number>(0)

  useEffect(() => {
    if (!isLive) return
    setMinute(0)
    const interval = setInterval(() => {
      setMinute((prev) => (prev < 90 ? prev + 1 : prev))
    }, 60000) 
    return () => clearInterval(interval)
  }, [isLive])

  return (
    <Card
      onClick={() => navigate(`/match/${match.idEvent}`)}
      className={`relative mt-2 mb-2 flex w-full justify-between gap-4 rounded-xl border-none px-4 py-3 text-white cursor-pointer ${
        isLive ? 'border-l-4 border-sportsaccent' : ''
      }`}
    >
      {/* Left border handled via class above */}
      <div className="flex h-full items-center justify-center gap-5 w-full">
        {/* Live indicator or match finished */}
        <div className="flex flex-col items-center">
          {isLive ? (
            <div className="flex items-center gap-1 text-sportsaccent font-bold">
              {/* Rocking dot */}
              <span className="h-2 w-2 rounded-full bg-sportsaccent animate-pulse block" />
              <span>{minute}'</span>
            </div>
          ) : (
            <span>{match.strTime || 'FT'}</span>
          )}
        </div>

        {/* Teams and scores */}
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-3">
            {/* Home team */}
            <div className="flex items-center gap-2">
              {match?.strHomeTeamBadge && (
                <img
                  src={match?.strHomeTeamBadge}
                  alt={match?.strHomeTeam}
                  className="h-6 w-6 object-contain"
                />
              )}
              <h3>{match?.strHomeTeam}</h3>
              <Badge className="h-4 w-4" />
            </div>

            {/* Away team */}
            <div className="flex items-center gap-2">
              {match?.strAwayTeamBadge && (
                <img
                  src={match?.strAwayTeamBadge}
                  alt={match?.strAwayTeam}
                  className="h-6 w-6 object-contain"
                />
              )}
              <h3>{match?.strAwayTeam}</h3>
              <Badge className="h-4 w-4" />
            </div>
          </div>

          {/* Scores */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <h3>{match?.intHomeScore}</h3>
              <h3>{match?.intAwayScore}</h3>
            </div>
            <EllipsisVertical />
          </div>
        </div>
      </div>
    </Card>
  )
}
