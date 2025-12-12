import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type Team = {
  name: string
  logo: string
}

type MatchHeaderProps = {
  homeTeam: Team
  awayTeam: Team
  score: { home: number; away: number }
  status: string
  date: string
  activeTab?: string
  tabs?: string[]
}

export function MatchHeader({
  homeTeam,
  awayTeam,
  score,
  status,
  date,
  activeTab = 'Events',
  tabs = ['Details', 'Odds', 'Lineups', 'Events', 'Stats', 'Standings'],
}: MatchHeaderProps) {
    const navigate=useNavigate();
  return (
    <div className="bg-sportbackground flex w-full max-w-7xl flex-col gap-4 rounded-t-2xl p-4 sm:p-6">
      {/* Top Bar */}
      <div className="flex items-center gap-2 sm:gap-3 font-semibold text-white text-sm sm:text-base cursor-pointer mb-3" onClick={()=>navigate("/matches")}>
        <ArrowLeft className="h-5 w-5" />
        <h1 className="truncate">English Premier League</h1>
      </div>

      {/* Match Header */}
      <div className="flex w-full flex-row items-center justify-evenly gap-2 sm:gap-6">
        {/* Home Team */}
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <Avatar className="h-16 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28">
            <AvatarImage src={homeTeam.logo} alt={homeTeam.name} />
          </Avatar>
          <span className="text-xs sm:text-sm md:text-base font-semibold text-white text-center truncate max-w-[80px] sm:max-w-[100px] md:max-w-[120px]">
            {homeTeam.name}
          </span>
        </div>

        {/* Score + Info */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] sm:text-xs text-amber-50">{date}</span>
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {score.home} - {score.away}
          </div>
          <span className="text-[10px] sm:text-xs text-white">{status}</span>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <Avatar className="h-16 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28">
            <AvatarImage src={awayTeam.logo} alt={awayTeam.name} />
          </Avatar>
          <span className="text-xs sm:text-sm md:text-base font-semibold text-white text-center truncate max-w-[80px] sm:max-w-[100px] md:max-w-[120px]">
            {awayTeam.name}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <nav className="flex w-full justify-center overflow-x-auto scrollbar-hidden gap-2 sm:gap-4 md:gap-6 text-sm sm:text-base font-medium">
        {tabs.map(item => {
          const path = item.toLowerCase()
          const isActive = item === activeTab

          return (
            <Button
              key={path}
              variant="ghost"
              className={[
                'rounded-none px-2 py-1 whitespace-nowrap text-sm sm:text-base md:text-lg font-normal',
                'hover:bg-transparent hover:text-white',
                isActive ? 'text-sportsaccent border-b-2 border-sportsaccent' : 'text-white',
              ].join(' ')}
            >
              {item}
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
