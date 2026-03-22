"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import {
  getCountdownTargetDate,
  getNextFestivityDate,
  formatFestivityDate,
  getGoogleCalendarLink,
} from "@/utils/festivity-dates"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function DynamicPromoCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [festivityName, setFestivityName] = useState("Christmas")
  const [festivityDate, setFestivityDate] = useState<Date>(new Date())
  const [targetDate, setTargetDate] = useState("")
  const [calendarLink, setCalendarLink] = useState("")

  useEffect(() => {
    // Set the festivity name and target date
    const { name, date } = getNextFestivityDate()
    setFestivityName(name)
    setFestivityDate(date)
    setTargetDate(getCountdownTargetDate())
    setCalendarLink(getGoogleCalendarLink(name, date))

    const calculateTimeLeft = () => {
      const difference = +new Date(getCountdownTargetDate()) - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })

        // Refresh the target date if the countdown has ended
        const { name: newName, date: newDate } = getNextFestivityDate()
        setFestivityName(newName)
        setFestivityDate(newDate)
        setTargetDate(getCountdownTargetDate())
        setCalendarLink(getGoogleCalendarLink(newName, newDate))
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="h-4 w-4 text-white/80" />
        <p className="text-base sm:text-lg font-semibold">{festivityName} Countdown:</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={calendarLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Calendar className="h-4 w-4" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to Google Calendar: {formatFestivityDate(festivityDate)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex gap-2 md:gap-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 md:p-3 text-center min-w-[50px] sm:min-w-[60px]">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold">{timeLeft.days}</div>
          <div className="text-xs md:text-sm">Days</div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 md:p-3 text-center min-w-[50px] sm:min-w-[60px]">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold">{timeLeft.hours}</div>
          <div className="text-xs md:text-sm">Hours</div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 md:p-3 text-center min-w-[50px] sm:min-w-[60px]">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold">{timeLeft.minutes}</div>
          <div className="text-xs md:text-sm">Mins</div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 md:p-3 text-center min-w-[50px] sm:min-w-[60px]">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold">{timeLeft.seconds}</div>
          <div className="text-xs md:text-sm">Secs</div>
        </div>
      </div>
    </div>
  )
}
