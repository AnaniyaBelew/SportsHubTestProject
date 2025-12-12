// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout'
import MatchesPage from './pages/MatchesPage'
import MatchDetailsPage from './pages/MatchDetailsPage'

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout wrapper */}
        <Route path="/" element={<Layout />}>
          <Route path="matches" element={<MatchesPage leagueId="4328" season="2024-2025" leagueName='Preimer League' />} />
          <Route path="match/:eventId" element={<MatchDetailsPage />} />
          <Route path="match/live" element={<MatchDetailsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
