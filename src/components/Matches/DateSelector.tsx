import { useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import dayjs from 'dayjs'

interface DateSelectorProps {
  initialDate?: Date
  onDateChange?: (date: Date) => void
}

export function DateSelector({ initialDate, onDateChange }: DateSelectorProps) {
  const [selectedDate, setSelectedDate] = useState(initialDate || new Date())

  const handlePrevDay = () => {
    const newDate = dayjs(selectedDate).subtract(1, 'day').toDate()
    setSelectedDate(newDate)
    onDateChange?.(newDate)
  }

  const handleNextDay = () => {
    const newDate = dayjs(selectedDate).add(1, 'day').toDate()
    setSelectedDate(newDate)
    onDateChange?.(newDate)
  }

  const today = dayjs()
  const yesterday = today.subtract(1, 'day')
  const tomorrow = today.add(1, 'day')

  let displayText: string
  if (dayjs(selectedDate).isSame(today, 'day')) {
    displayText = 'Today'
  } else if (dayjs(selectedDate).isSame(yesterday, 'day')) {
    displayText = 'Yesterday'
  } else if (dayjs(selectedDate).isSame(tomorrow, 'day')) {
    displayText = 'Tomorrow'
  } else {
    displayText = dayjs(selectedDate).format('MMM D, YYYY')
  }

  // Generate 5-day strip like the image
  const mobileDates = Array.from({ length: 8 }, (_, i) => {
    const date = dayjs().subtract(2, 'day').add(i, 'day')
    return {
      label: date.isSame(today, 'day') ? 'Today' : date.format('ddd').toUpperCase(),
      dateText: date.format('D MMM').toUpperCase(),
      isToday: date.isSame(today, 'day'),
    }
  })

  return (
    <>
      {/* ✅ Desktop Version */}
      <div className="bg-sportbackground relative mx-auto hidden h-14 w-full max-w-7xl items-center justify-center rounded-2xl px-4 text-white md:flex">
        <ChevronLeft
          className="absolute left-4 h-5 w-5 cursor-pointer text-white"
          onClick={handlePrevDay}
        />
        <ChevronRight
          className="absolute right-4 h-5 w-5 cursor-pointer text-white"
          onClick={handleNextDay}
        />

        <div className="flex items-start gap-2">
          <CalendarDays className="h-5 w-5 text-white" />
          <span className="text-[14px] font-semibold">{displayText}</span>
        </div>
      </div>

      {/* ✅ Mobile Version */}
      {/* ✅ Mobile Version (Improved) */}
      <div className="relative w-full md:hidden">
        {/* Fade Left */}
        <div className="from-sportbackground pointer-events-none absolute top-0 left-0 h-full w-20 bg-gradient-to-r to-transparent"></div>

        {/* Fade Right */}
        <div className="from-sportbackground pointer-events-none absolute top-0 right-0 h-full w-20 bg-gradient-to-l to-transparent"></div>

        <div className="bg-sportbackground flex w-full items-center rounded-2xl px-2 py-3 text-white">
          <div className="scrollbar-none flex w-full gap-6 overflow-x-auto scroll-smooth whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none]">
            {mobileDates.map(({ label, dateText, isToday }, idx) => {
              const isSelected = dayjs(selectedDate).isSame(
                dayjs().subtract(2, 'day').add(idx, 'day'),
                'day'
              )

              return (
                <div
                  key={dateText}
                  className={`flex min-w-[55px] cursor-pointer flex-col items-center text-[12px] font-medium transition-all duration-200 ${isSelected ? 'scale-110 font-semibold text-green-400' : ''} `}
                  onClick={() => {
                    const newDate = dayjs().subtract(2, 'day').add(idx, 'day').toDate()
                    setSelectedDate(newDate)
                    onDateChange?.(newDate)
                  }}
                >
                  <span className={isToday ? 'font-semibold text-green-400' : ''}>{label}</span>
                  <span>{dateText}</span>
                </div>
              )
            })}
          </div>

          {/* Calendar Icon */}
          <div className="ml-4 flex items-center justify-center rounded-full border border-green-400 p-2 shadow-[0_0_10px_rgba(34,197,94,0.6)]">
            <CalendarDays className="h-5 w-5 text-green-400" />
          </div>
        </div>
      </div>
    </>
  )
}
