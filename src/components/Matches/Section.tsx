import { ChevronRight } from 'lucide-react'
import { MatchResultCard } from './MatchCard'
import type { SportEvent } from '@/types/events/type'
type Props = {
  title: string
  matches?: SportEvent[]
}

export function Section({ title, matches = [] }: Props) {
  return (
    <div className="bg-sportbackground flex w-full max-w-7xl flex-col gap-4 rounded-2xl px-4 py-3">
      {/* ✅ Header */}
      <div className="flex items-center justify-between text-white">
        <h2 className="text-lg font-semibold">{title}</h2>
        <ChevronRight className="h-5 w-5" />
      </div>

      {/* ✅ Matches */}
      <div className="flex flex-col divide-y divide-gray-700/50">
        {matches.length > 0 ? (
          matches.map((match, i) => (
            <div key={i} className="py-1">
              <MatchResultCard {...match} />
            </div>
          ))
        ) : (
          <div className='text-white w-full text-center'>No Match found</div>
        )}
      </div>
    </div>
  )
}
