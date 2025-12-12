import { FilterTabs } from '@/components/FilterTabs'
import { DateSelector } from '@/components/Matches/DateSelector'
import { Section } from '@/components/Matches/Section'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useLeagueMatches } from '@/hooks/useleagueMatches'
import { LiveSimulation } from '@/components/live/LiveSimulation'
type MatchPagesProps = {
  season: string
  leagueId: string
  leagueName: string
}

export default function MatchesPage({ season, leagueId, leagueName }: MatchPagesProps) {
  const { filter, loading, error, matches, handleFilterChange } = useLeagueMatches(leagueId, season)
  const handleDateChange = (date: Date) => {
    //Fetch Matches Based on Date
    console.log(date)
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h1 className="w-full max-w-7xl px-4 text-left text-[20px] font-semibold text-white">
        Matches
      </h1>
      <DateSelector onDateChange={handleDateChange} />
      <FilterTabs
        value={filter}
        onChange={handleFilterChange}
        counts={{
          all: matches.length,
          live: filter === 'live' ? matches.length : 0,
          favorites: filter === 'favorite' ? matches.length : 0,
        }}
      />
      {/* LOADING */}
      {loading && (
        <div className="flex w-full max-w-7xl flex-col gap-4 px-4">
          <Skeleton className="h-6 w-40 rounded-lg" />
          <div className="flex flex-col gap-3">
            <Skeleton className="bg-sportsaccent h-20 w-full rounded-xl" />
            <Skeleton className="bg-sportsaccent h-20 w-full rounded-xl" />
            <Skeleton className="bg-sportsaccent h-20 w-full rounded-xl" />
          </div>
        </div>
      )}
      {/* ERROR */}
      {!loading && error && (
        <div className="w-full max-w-7xl px-4">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}
      {/* MATCHES */}
      {!loading &&
        !error &&
        (filter === 'live' ? (
          <LiveSimulation />
        ) : (
          <Section title={leagueName} matches={matches} />
        ))}{' '}
    </div>
  )
}
