import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import logo from '@/assets/statsCoreLogo.png'
import soccer from '@/assets/soccerBall.png'
import glob from '@/assets/glob.png'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useHeader } from '@/hooks/useheader'
import { CountrySelect } from '../countriesSelect'
import { useLocation, useNavigate } from 'react-router-dom'

function AppHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { leagues, countries, loading, error } = useHeader()
  const location = useLocation()
  const navigate = useNavigate()
  const NAV_ITEMS = [
    { label: 'Live', path: '/' },
    { label: 'Matches', path: '/matches' },
    { label: 'Standings', path: '/standings' },
    { label: 'Teams', path: '/teams' },
    { label: 'Comparison', path: '/comparison' },
    { label: 'Statistics', path: '/statistics' },
    { label: 'Venues', path: '/venues' },
  ]
  return (
    <header className="bg-sportprimary font-secondary text-white">
      <div className="flex h-[60px] items-center justify-between px-5 md:px-10">
        <img src={logo} alt="logo" className="h-8 md:h-10" />
        <nav className="hidden gap-4 text-sm font-medium md:flex">
          {NAV_ITEMS.map(item => {
            const isActive = location.pathname === item.path
            return (
              <Button
                key={item.path}
                onClick={() => navigate(item.path)}
                variant="ghost"
                className={[
                  'rounded-none px-2 py-1 text-[18px] font-normal',
                  'hover:bg-transparent hover:text-white',
                  isActive ? 'text-sportsaccent border-sportsaccent border-b-2' : 'text-white',
                ].join(' ')}
              >
                {item.label}
              </Button>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="h-10 w-10 rounded-full bg-[#00000026] p-2">
            <img src={glob} alt="glob" className="h-6 w-6" />
          </Button>

          <Button variant="ghost" className="h-10 w-10 rounded-full bg-[#00000026] p-2">
            <img src={soccer} alt="soccer" className="h-6 w-6" />
          </Button>

          <Select>
            <SelectTrigger className="h-10 w-[120px] rounded-full border-none bg-[#00000026] px-3 py-2 text-sm text-white focus:ring-0 md:w-[206px] md:px-4 [&_*]:text-white">
              <SelectValue placeholder="2025/2026" />
            </SelectTrigger>
            <SelectContent className="bg-sportBlack text-sportsaccent rounded-xl border-none shadow-lg">
              <SelectItem value="2025/2026" className="focus:bg-sportprimary focus:text-white">
                2025/2026
              </SelectItem>
              <SelectItem value="2024/2025" className="focus:bg-sportprimary focus:text-white">
                2024/2025
              </SelectItem>
              <SelectItem value="2023/2024" className="focus:bg-sportprimary focus:text-white">
                2023/2024
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="hidden items-center gap-3 md:flex">
            <Select>
              <SelectTrigger className="h-10 w-[206px] rounded-full border-none bg-[#00000026] px-4 py-2 text-white focus:ring-0 [&_*]:text-white">
                <SelectValue placeholder={loading ? 'Loading...' : 'Select League'} />
              </SelectTrigger>

              <SelectContent className="bg-sportBlack text-sportsaccent rounded-xl border-none shadow-lg">
                {error && <div className="px-4 py-2 text-red-400">Failed to load leagues</div>}
                {!loading &&
                  leagues.map(league => (
                    <SelectItem
                      key={league.idLeague}
                      value={league.strLeague}
                      className="focus:bg-sportprimary focus:text-white"
                    >
                      {league.strLeague}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <CountrySelect countries={countries} />
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              className="h-10 w-10 rounded-full bg-[#00000026] p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="bg-sportprimary w-full px-5 py-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-3">
            {NAV_ITEMS.map(item => {
              const isActive = location.pathname === item.path
              return (
                <Button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path)
                    setMobileMenuOpen(false)
                  }}
                  variant="ghost"
                  className={[
                    'w-full rounded-lg px-2 py-2 text-left text-white',
                    isActive
                      ? 'text-sportsaccent bg-[#1F1F1F]'
                      : 'hover:bg-[#222222] hover:text-white',
                  ].join(' ')}
                >
                  {item.label}
                </Button>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}

export default AppHeader
