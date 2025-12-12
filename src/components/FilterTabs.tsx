import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Props = {
  value: string
  onChange: (value:"all" | "live" | "favorite") => void
  counts: {
    all: number
    live: number
    favorites: number
  }
}
type tab={
  key: "all" | "live" | "favorite", label: string, count: number
}

export function FilterTabs({ value, onChange, counts }: Props) {
  const tabs:tab[] = [
    { key: "all", label: "All", count: counts.all },
    { key: "live", label: "Live", count: counts.live },
    { key: "favorite", label: "Favorites", count: counts.favorites },
  ]

  return (
    <div className="flex w-full max-w-7xl text-left gap-5">
      {tabs.map(tab => {
        const isActive = tab.key === value
        return (
          <Button
            key={tab.key}
            variant="ghost"
            onClick={() => onChange(tab.key)}
            className={[
              "flex items-center gap-1 px-4 py-2 text-sm",
              isActive ? "bg-sportsaccent text-sportBlack" : "bg-sportBlack text-white",
            ].join(" ")}
          >
            {tab.label}
            <Badge className="bg-sportbackground text-white">{tab.count}</Badge>
          </Button>
        )
      })}
    </div>
  )
}