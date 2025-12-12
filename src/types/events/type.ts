export interface SportEvent {
  idEvent: string
  idAPIfootball: string | null
  strEvent: string
  strEventAlternate: string | null
  strFilename: string | null
  strSport: string
  idLeague: string
  strLeague: string
  strLeagueBadge: string | null
  strSeason: string
  strDescriptionEN: string | null
  strHomeTeam: string
  strAwayTeam: string
  intHomeScore: string | null
  intAwayScore: string | null
  intRound: string | null
  intSpectators: number | null
  strOfficial: string | null
  strTimestamp: string | null
  dateEvent: string
  dateEventLocal: string
  strTime: string | null
  strTimeLocal: string | null
  strGroup: string | null
  idHomeTeam: string
  strHomeTeamBadge: string | null
  idAwayTeam: string
  strAwayTeamBadge: string | null
  intScore: string | null
  intScoreVotes: string | null
  strResult: string | null
  idVenue: string | null
  strVenue: string | null
  strCountry: string | null
  strCity: string | null
  strPoster: string | null
  strSquare: string | null
  strFanart: string | null
  strThumb: string | null
  strBanner: string | null
  strMap: string | null
  strTweet1: string | null
  strVideo: string | null
  strStatus: string | null
  strPostponed: string | null
  strLocked: string | null
  minute?: number
}
export interface TimelineEvent {
  idTimeline: string
  idEvent: string
  strTimeline: 'Card' | 'subst' | string
  strTimelineDetail: string
  strHome: 'Yes' | 'No'
  strEvent: string
  idAPIfootball: string
  idPlayer: string
  strPlayer: string
  strCountry: string | null
  idAssist: string | null
  strAssist: string
  intTime: string
  idTeam: string
  strTeam: string
  strComment: string
  dateEvent: string
  strSeason: string
}
