import { Card } from '@/components/ui/card'
import { Badge, EllipsisVertical } from 'lucide-react'
import type { SportEvent } from '@/types/events/type'
import { useNavigate } from 'react-router-dom'

export function MatchResultCard(match: SportEvent) {
  const navigate = useNavigate()

  return (
    <Card
      onClick={() => navigate(`/match/${match.idEvent}`)}
      className="bg-sportbackground relative mt-2 mb-2 flex w-full justify-between gap-4 rounded-xl border-none px-4 py-3 text-white cursor-pointer"
    >
      <div className="absolute top-0 left-0 h-full w-1 rounded-l-xl bg-red-500" />
      <div className="flex h-full items-center justify-center gap-5">
        {match.strStatus == 'Match Finished' ? 'FT' : match.strTime}
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
            {/* {aggregateaway && aggregatehome && (
              <div className="text-lightScoreColor flex flex-col">
                <h3>[{aggregatehome}]</h3>
                <h3>[{aggregateaway}]</h3>
              </div>
            )} */}
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
