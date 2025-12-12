import { Outlet } from 'react-router-dom'
import AppHeader from './header/appHeader'

export function Layout() {
  return (
    <div className="flex flex-col">
      <AppHeader />

      {/* Page content */}
      <main className="flex-1 w-full px-5 md:px-10 py-5">
          <Outlet />
      </main>
    </div>
  )
}
