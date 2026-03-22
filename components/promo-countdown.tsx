"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar } from "lucide-react"
import { formatFestivityDate, getGoogleCalendarLink } from "@/utils/festivity-dates"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"
import { ANIMATION_TYPES, shouldShowAnimation, markAnimationAsFinished } from "@/utils/animation-control"

interface PromoCountdownProps {
  targetDate?: string
}

export default function PromoCountdown({ targetDate }: PromoCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [calculatedTargetDate, setCalculatedTargetDate] = useState<string>("")
  const [festivityName, setFestivityName] = useState("Festivity")
  const [calendarLink, setCalendarLink] = useState("")
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // If a specific target date is provided, use it
    if (targetDate) {
      setCalculatedTargetDate(targetDate)
      setFestivityName("Christmas") // Default to Christmas for specific dates

      // Create calendar link
      const date = new Date(targetDate)
      setCalendarLink(getGoogleCalendarLink("Christmas", date))
    } else {
      // Otherwise, calculate the next festivity date (Christmas or Easter)
      const now = new Date()
      const currentYear = now.getFullYear()

      // Calculate Christmas date (December 25th)
      const christmas = new Date(currentYear, 11, 25) // Month is 0-indexed, so 11 = December

      // Calculate Easter date (it varies each year, this is a simplified calculation)
      // For a more accurate calculation, you would need a specific algorithm
      // This is a placeholder calculation - Easter is usually in March or April
      const easter = new Date(currentYear, 3, 15) // Approximate Easter to April 15th

      // If we're past Easter but before Christmas
      if (now > easter && now < christmas) {
        setCalculatedTargetDate(christmas.toISOString())
        setFestivityName("Christmas")
        setCalendarLink(getGoogleCalendarLink("Christmas", christmas))
      }
      // If we're past Christmas or before Easter
      else if (now > christmas || now < easter) {
        // If we're past Christmas, use next year's Easter
        if (now > christmas) {
          easter.setFullYear(currentYear + 1)
        }
        setCalculatedTargetDate(easter.toISOString())
        setFestivityName("Easter")
        setCalendarLink(getGoogleCalendarLink("Easter", easter))
      }

      // Add 2 months to the current date as a fallback
      const twoMonthsFromNow = new Date()
      twoMonthsFromNow.setMonth(now.getMonth() + 2)
      if (!calculatedTargetDate) {
        setCalculatedTargetDate(twoMonthsFromNow.toISOString())
        setFestivityName("Promotion")
        setCalendarLink(getGoogleCalendarLink("Promotion", twoMonthsFromNow))
      }
    }
  }, [targetDate, calculatedTargetDate])

  useEffect(() => {
    if (!calculatedTargetDate) return

    const calculateTimeLeft = () => {
      const difference = +new Date(calculatedTargetDate) - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [calculatedTargetDate])

  // Control the banner animation
  useEffect(() => {
    // Force clear any existing animation state for testing
    if (typeof window !== "undefined") {
      // For testing/development - uncomment to reset animation state
      // window.sessionStorage.clear();
    }

    // Check if we should show this animation (with high priority)
    const shouldShow = shouldShowAnimation(ANIMATION_TYPES.PROMO_COUNTDOWN, 10)
    setShowBanner(shouldShow)

    if (shouldShow) {
      // Hide the banner after 30 seconds
      const timer = setTimeout(() => {
        setShowBanner(false)
        markAnimationAsFinished(ANIMATION_TYPES.PROMO_COUNTDOWN)
      }, 30000) // 30 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div className="flex flex-col items-center relative">
      <div className="flex items-center gap-2 mb-2">
        <p className="text-sm font-medium">{festivityName} Ends:</p>
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
              <p>Add to Google Calendar: {formatFestivityDate(new Date(calculatedTargetDate))}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex gap-2 md:gap-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 md:p-3 text-center min-w-[60px]">
          <div className="text-2xl md:text-3xl font-bold">{timeLeft.days}</div>
          <div className="text-xs md:text-sm">Days</div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 md:p-3 text-center min-w-[60px]">
          <div className="text-2xl md:text-3xl font-bold">{timeLeft.hours}</div>
          <div className="text-xs md:text-sm">Hours</div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 md:p-3 text-center min-w-[60px]">
          <div className="text-2xl md:text-3xl font-bold">{timeLeft.minutes}</div>
          <div className="text-xs md:text-sm">Mins</div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 md:p-3 text-center min-w-[60px]">
          <div className="text-2xl md:text-3xl font-bold">{timeLeft.seconds}</div>
          <div className="text-xs md:text-sm">Secs</div>
        </div>
      </div>

      {/* Translucent Banner with Sales Pitch - ONLY animation */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            className="absolute top-0 left-0 right-0 h-[50%] bg-gradient-to-b from-amber-600/60 to-red-600/60 backdrop-blur-sm flex items-center justify-center z-10 rounded-t-lg overflow-hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="px-4 py-2"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <p className="text-white font-medium text-center text-sm md:text-base drop-shadow-md">
                Countdown to greatness! Stilla Peanut Butter's next big promo is almost here—don't miss your chance to
                stock up!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
