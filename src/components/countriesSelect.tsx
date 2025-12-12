import { useState } from "react"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import type { country } from "@/types/countries/type"

type Props = {
  countries: country[]
}

export function CountrySelect({ countries }: Props) {
  const [selected, setSelected] = useState<string>("")


  const selectedCountry = countries.find(c => c.name_en === selected)

  return (
    <Select value={selected} onValueChange={setSelected}>
      <SelectTrigger className="h-11 w-20 rounded-full border-none text-white focus:ring-0 [&_*]:text-white">

        {/* ✅ Custom trigger content */}
        <div className="flex items-center">
          {selectedCountry ? (
            <img
              src={selectedCountry.flag_url_32}
              alt={selectedCountry.name_en}
              className="h-5 w-5 rounded-full"
            />
          ) : (
            <span>{countries[0]?.name_en}</span>
          )}
        </div>

      </SelectTrigger>

      <SelectContent className="bg-sportBlack text-sportsaccent rounded-xl border-none shadow-lg">
        {countries.map(c => (
          <SelectItem
            key={c.name_en}
            value={c.name_en}
            className="flex items-center gap-2 focus:bg-sportprimary focus:text-white"
          >
            <img src={c.flag_url_32} alt={c.name_en} className="h-5 w-5 rounded-full" />
            {c.name_en}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}