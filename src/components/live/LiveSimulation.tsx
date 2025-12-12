import { useLiveMatchSimulation } from '@/hooks/useLiveSimulation'
import { Section } from '../Matches/Section'
import { generateDummyMatches } from '@/utils/generateMatches'

export function LiveSimulation() {
  const matches = useLiveMatchSimulation(generateDummyMatches())

  return <Section title="Live Matches" matches={matches} />
}