import type { SportEvent, TimelineEvent } from '@/types/events/type'
import subs from '@/assets/Arrows.png'
import goal from '@/assets/goal.png'
import corner from '@/assets/corner.png'
import redCard from '@/assets/redCard.png'
import yellowCard from '@/assets/yellowCard.png'
type MatchTimelineProps = {
  match?: SportEvent | null
  events: TimelineEvent[]
}

export function MatchTimeline({ match, events }: MatchTimelineProps) {
  if (!match) return null

  const homeTeam = match.strHomeTeam

  const isHomeEvent = (event: TimelineEvent) =>
    event.strTeam.toLowerCase() === homeTeam.toLowerCase()

  const getIcon = (event: TimelineEvent) => {
    const d = event.strTimelineDetail.toLowerCase()
    if (d.includes('goal')) return goal
    if (d.includes('yellow')) return yellowCard
    if (d.includes('red')) return redCard
    if (event.strTimeline === 'subst') return subs
    if (d.includes('penalty')) return goal
    if (d.includes('corner')) return corner
    return '•'
  }

  // Filter events
  const halfTimeEvents = events.filter(e => Number(e.intTime) > 0 && Number(e.intTime) <= 45)
  const fullTimeEvents = events.filter(e => Number(e.intTime) > 45)

  const renderSection = (title: string, sectionEvents: TimelineEvent[]) => (
    <div className="mb-10">
      {/* Section Header */}
      <div className="relative mb-6 flex items-center text-white">
        <div className="grow border-t border-[#292B41]" />
        <span className="mx-4 text-xs font-semibold sm:text-sm md:text-base">{title}</span>
        <div className="grow border-t border-[#292B41]" />
      </div>

      {/* Events */}
      {sectionEvents.length === 0 ? (
        <p className="text-muted-foreground text-xs sm:text-sm">No events</p>
      ) : (
        <div className="relative mx-auto w-full max-w-3xl">
          <ul className="flex flex-col-reverse space-y-6">
            {sectionEvents.map(event => {
              const home = isHomeEvent(event)
              const icon = getIcon(event)
              const isScoringEvent = (event: TimelineEvent) => {
                const d = event.strTimelineDetail.toLowerCase()
                return d.includes('goal') || d.includes('penalty')
              }
              return (
                <li key={event.idTimeline} className="grid w-full grid-cols-3 items-center">
                  {/* LEFT SIDE (Home) */}
                  <div className="flex justify-end pr-4">
                    {home && (
                      <div className="text-right">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <span className="text-xs text-white sm:text-sm md:text-base">
                            {event.strPlayer}
                          </span>
                          {icon && (
                            <img
                              src={icon}
                              alt="event icon"
                              className="h-4 w-4 object-contain sm:h-5 sm:w-5"
                            />
                          )}
                        </div>

                        {event.strAssist && (
                          <div className="text-lightScoreColor text-[9px] sm:text-xs">
                            Assist: {event.strAssist}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {/* CENTER TIME WITH CONNECTION LINES */}
                  <div className="relative flex flex-col items-center text-[10px] sm:text-xs md:text-sm">
                    {/* Time Badge */}
                    <span
                      className={`z-10 rounded-full px-2 py-0.5 font-medium ${
                        isScoringEvent(event)
                          ? 'bg-sportsaccent text-black'
                          : 'bg-[#292B41] text-white'
                      } `}
                    >
                      {event.intTime}'
                    </span>

                    {/* Horizontal line to HOME side */}
                    {!home && (
                      <div className="absolute top-1/2 left-1/2 h-[1px] w-[80px] -translate-y-1/2 bg-[#444]" />
                    )}

                    {/* Horizontal line to AWAY side */}
                    {home && (
                      <div className="absolute top-1/2 right-1/2 h-[1px] w-[80px] -translate-y-1/2 bg-[#444]" />
                    )}
                  </div>

                  {/* RIGHT SIDE (Away) */}
                  <div className="flex justify-start pl-4">
                    {!home && (
                      <div className='flex flex-col gap-1'>
                        <div className="flex items-center gap-1 sm:gap-2">
                          {icon && (
                            <img
                              src={icon}
                              alt="event icon"
                              className="h-4 w-4 object-contain sm:h-5 sm:w-5"
                            />
                          )}
                          <span className="text-xs text-white sm:text-sm md:text-base">
                            {event.strPlayer}
                          </span>
                        </div>

                        {event.strAssist && (
                          <div className="text-lightScoreColor text-[9px] sm:text-xs pl-3">
                            Assist: {event.strAssist}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )

  return (
    <div className="bg-sportbackground w-full max-w-7xl rounded-b-2xl px-4 py-6">
      <h2 className="mb-6 text-left text-base font-semibold text-white sm:text-lg md:text-xl">
        Events
      </h2>

      {renderSection(
        `Full Time ${match.intHomeScore ?? '-'} - ${match.intAwayScore ?? '-'}`,
        fullTimeEvents
      )}

      {renderSection('Half Time', halfTimeEvents)}

      {/* Kickoff */}
      <div className="relative mb-10 flex items-center text-white">
        <div className="grow border-t border-[#292B41]" />
        <span className="mx-4 text-xs font-semibold sm:text-sm md:text-base">Kickoff</span>
        <div className="grow border-t border-[#292B41]" />
      </div>
    </div>
  )
}
