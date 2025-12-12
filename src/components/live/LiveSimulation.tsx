import { useEffect, useState } from 'react'
import type { SportEvent } from '@/types/events/type'
import { Section } from '../Matches/Section'

// Dummy data with logos for real teams
function generateDummyMatches(): SportEvent[] {
  return [
    {
      idEvent: '1',
      idAPIfootball: null,
      strEvent: 'Arsenal vs Manchester United',
      strEventAlternate: null,
      strFilename: null,
      strSport: 'Soccer',
      idLeague: '100',
      strLeague: 'Premier League',
      strLeagueBadge: null,
      strSeason: '2025',
      strDescriptionEN: null,
      strHomeTeam: 'Arsenal',
      strAwayTeam: 'Manchester United',
      intHomeScore: '0',
      intAwayScore: '0',
      intRound: null,
      intSpectators: null,
      strOfficial: null,
      strTimestamp: null,
      dateEvent: '2025-12-12',
      dateEventLocal: '2025-12-12',
      strTime: '18:00',
      strTimeLocal: '18:00',
      strGroup: null,
      idHomeTeam: '101',
      strHomeTeamBadge:
        'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
      idAwayTeam: '102',
      strAwayTeamBadge:
        'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
      intScore: null,
      intScoreVotes: null,
      strResult: null,
      idVenue: null,
      strVenue: null,
      strCountry: null,
      strCity: null,
      strPoster: null,
      strSquare: null,
      strFanart: null,
      strThumb: null,
      strBanner: null,
      strMap: null,
      strTweet1: null,
      strVideo: null,
      strStatus: 'Live',
      strPostponed: null,
      strLocked: null
    },
    {
      idEvent: '2',
      idAPIfootball: null,
      strEvent: 'Chelsea vs Liverpool',
      strEventAlternate: null,
      strFilename: null,
      strSport: 'Soccer',
      idLeague: '100',
      strLeague: 'Premier League',
      strLeagueBadge: null,
      strSeason: '2025',
      strDescriptionEN: null,
      strHomeTeam: 'Chelsea',
      strAwayTeam: 'Liverpool',
      intHomeScore: '0',
      intAwayScore: '0',
      intRound: null,
      intSpectators: null,
      strOfficial: null,
      strTimestamp: null,
      dateEvent: '2025-12-12',
      dateEventLocal: '2025-12-12',
      strTime: '19:00',
      strTimeLocal: '19:00',
      strGroup: null,
      idHomeTeam: '103',
      strHomeTeamBadge:
        'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
      idAwayTeam: '104',
      strAwayTeamBadge:
        'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
      intScore: null,
      intScoreVotes: null,
      strResult: null,
      idVenue: null,
      strVenue: null,
      strCountry: null,
      strCity: null,
      strPoster: null,
      strSquare: null,
      strFanart: null,
      strThumb: null,
      strBanner: null,
      strMap: null,
      strTweet1: null,
      strVideo: null,
      strStatus: 'Live',
      strPostponed: null,
      strLocked: null
    }
  ]
}

export function LiveSimulation() {
  const [matches, setMatches] = useState<SportEvent[]>(generateDummyMatches())

  useEffect(() => {
    const interval = setInterval(() => {
      setMatches((prev) =>
        prev.map((match) => {
          // Update score randomly
          const homeScore = parseInt(match.intHomeScore || '0', 10)
          const awayScore = parseInt(match.intAwayScore || '0', 10)

          // 50% chance to increase home or away score
          const newHomeScore = Math.random() < 0.5 ? homeScore + 1 : homeScore
          const newAwayScore = Math.random() < 0.5 ? awayScore + 1 : awayScore

          return {
            ...match,
            intHomeScore: newHomeScore.toString(),
            intAwayScore: newAwayScore.toString()
          }
        })
      )
    }, 15000 + Math.random() * 5000) // 15–20 sec

    return () => clearInterval(interval)
  }, [])

  return <Section title="Live Matches" matches={matches} />
}
