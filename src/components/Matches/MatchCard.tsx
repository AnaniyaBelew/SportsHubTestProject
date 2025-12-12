import { Card } from '@/components/ui/card'
import { Badge, EllipsisVertical } from 'lucide-react'
import type { SportEvent } from '@/types/events/type'
import { useNavigate } from 'react-router-dom'

export function MatchResultCard(match: SportEvent) {
  const navigate = useNavigate()
  const isLive = match.strStatus !== 'Match Finished'

  return (
    <Card
      onClick={() => (isLive ? null : navigate(`/match/${match.idEvent}`))}
      className="bg-sportbackground relative mt-2 mb-2 flex w-full cursor-pointer justify-between gap-4 rounded-xl border-none px-4 py-3 text-white"
    >
      {/* Left red bar */}
      <div
        className={`absolute top-0 left-0 h-full w-1 rounded-l-xl ${
          isLive ? 'bg-sportsaccent' : 'bg-red-500'
        }`}
      />

      <div className="flex h-full items-center justify-center gap-5">
        {/* LIVE or FT */}
        {isLive ? (
          <div className="text-sportsaccent flex flex-col items-center font-bold">
            <span>{match.minute}'</span>
            <span
              className="bg-sportsaccent mt-0.5 block h-[2px] w-4 origin-left"
              style={{ animation: 'underline-morph-slide 1.8s ease-in-out infinite' }}
            />
          </div>
        ) : (
          <span>FT</span>
        )}

        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <img
                src={match.strHomeTeamBadge ?? ''}
                alt={match.strHomeTeam}
                className="h-6 w-6 object-contain"
              />
              <h3>{match.strHomeTeam}</h3>
              <Badge className="h-4 w-4" />
            </div>

            <div className="flex items-center gap-2">
              <img
                src={match.strAwayTeamBadge ?? ''}
                alt={match.strAwayTeam}
                className="h-6 w-6 object-contain"
              />
              <h3>{match.strAwayTeam}</h3>
              <Badge className="h-4 w-4" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <h3>{match.intHomeScore}</h3>
              <h3>{match.intAwayScore}</h3>
            </div>
            <EllipsisVertical />
          </div>
        </div>
      </div>
    </Card>
  )
}
