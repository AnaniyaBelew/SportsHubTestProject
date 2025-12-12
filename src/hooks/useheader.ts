import { useEffect, useState } from 'react'
import type { League } from '@/types/league/type'
import type { country } from '@/types/countries/type'
import { fetchAllLeagues } from '@/services/leagues'
import { fetchAllCountries } from '@/services/countries'

export function useHeader() {
  const [leagues, setLeagues] = useState<League[]>([])
  const [countries, setCountries] = useState<country[]>([])

  const [loadingLeagues, setLoadingLeagues] = useState(true)
  const [loadingCountries, setLoadingCountries] = useState(true)

  const [errorLeagues, setErrorLeagues] = useState<string | null>(null)
  const [errorCountries, setErrorCountries] = useState<string | null>(null)

  useEffect(() => {
    // Fetch leagues
    fetchAllLeagues().then(res => {
      if (res.error) {
        setErrorLeagues(res.error)
      } else if (res.data) {
        setLeagues(res.data)
      }
      setLoadingLeagues(false)
    })

    // Fetch countries
    fetchAllCountries().then(res => {
      if (res.error) {
        setErrorCountries(res.error)
      } else if (res.data) {
        setCountries(res.data)
      }
      setLoadingCountries(false)
    })
  }, [])

  return {
    leagues,
    countries,
    loading: loadingLeagues || loadingCountries,
    error: errorLeagues || errorCountries,
  }
}