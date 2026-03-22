"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Gift } from "lucide-react"
import { shouldShowPromotionalSeal, getNextChristmasDate } from "@/utils/festivity-dates"
import { ANIMATION_TYPES, shouldShowAnimation, markAnimationAsFinished } from "@/utils/animation-control"

export default function PromotionalSeal() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasBeenShown, setHasBeenShown] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [showSeal, setShowSeal] = useState(false)

  useEffect(() => {
    // Check if the seal should be visible based on the date
    const shouldShow = shouldShowPromotionalSeal()

    // Show the seal only once per page load if it should be visible
    if (shouldShow && !hasBeenShown) {
      setIsVisible(true)
      setHasBeenShown(true)

      // Auto-expand after 1 second
      const expandTimer = setTimeout(() => {
        setIsExpanded(true)
      }, 1000)

      return () => clearTimeout(expandTimer)
    }
  }, [hasBeenShown])

  useEffect(() => {
    // Calculate time left until Christmas
    const calculateTimeLeft = () => {
      const christmasDate = getNextChristmasDate()
      const difference = +christmasDate - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  // Auto-hide after 15 seconds if expanded
  useEffect(() => {
    let hideTimer: NodeJS.Timeout

    if (isExpanded) {
      hideTimer = setTimeout(() => {
        setIsExpanded(false)
      }, 15000)
    }

    return () => {
      if (hideTimer) clearTimeout(hideTimer)
    }
  }, [isExpanded])

  useEffect(() => {
    // Check if we should show this animation (with lower priority than countdown)
    const shouldShow = shouldShowAnimation(ANIMATION_TYPES.PROMO_SEAL, 5)

    // Don't show the seal if the countdown banner is active
    if (shouldShow) {
      setShowSeal(true)

      // Mark as finished after some time
      const timer = setTimeout(() => {
        setShowSeal(false)
        markAnimationAsFinished(ANIMATION_TYPES.PROMO_SEAL)
      }, 15000) // 15 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  // If not showing, return null
  if (!isVisible && !showSeal) return null

  if (showSeal)
    return (
      <AnimatePresence>
        {showSeal && (
          <motion.div
            className="fixed bottom-20 right-4 z-50 hidden" // Hidden to prevent showing
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Seal content */}
            <div className="bg-transparent w-0 h-0"></div>
          </motion.div>
        )}
      </AnimatePresence>
    )

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-28 right-4 z-50 drop-shadow-lg"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          {/* Collapsed seal */}
          {!isExpanded && (
            <motion.button
              onClick={() => setIsExpanded(true)}
              className="bg-red-600/90 backdrop-blur-sm text-white rounded-full p-3 shadow-lg flex items-center justify-center border border-white/20"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.05, 1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <Gift size={32} />
            </motion.button>
          )}

          {/* Expanded seal */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="bg-gradient-to-br from-red-600/90 to-red-700/90 backdrop-blur-md text-white rounded-lg p-4 shadow-lg max-w-xs border border-white/20"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
              >
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-2 right-2 text-white/80 hover:text-white"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>

                <div className="flex flex-col items-center">
                  <motion.div
                    className="mb-2"
                    animate={{
                      rotate: [0, 10, 0, -10, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    <Gift size={32} className="text-yellow-300" />
                  </motion.div>

                  <h3 className="font-bold text-lg mb-2 text-center">Christmas Promotion Countdown!</h3>

                  <div className="flex gap-2 mb-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded p-1 text-center min-w-[40px]">
                      <div className="text-lg font-bold">{timeLeft.days}</div>
                      <div className="text-xs">Days</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded p-1 text-center min-w-[40px]">
                      <div className="text-lg font-bold">{timeLeft.hours}</div>
                      <div className="text-xs">Hrs</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded p-1 text-center min-w-[40px]">
                      <div className="text-lg font-bold">{timeLeft.minutes}</div>
                      <div className="text-xs">Mins</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded p-1 text-center min-w-[40px]">
                      <div className="text-lg font-bold">{timeLeft.seconds}</div>
                      <div className="text-xs">Secs</div>
                    </div>
                  </div>

                  <p className="text-sm text-center mb-3">
                    Stock up on Stilla Peanut Butter now! Our Christmas promotion offers amazing prizes including a
                    luxury stay at Mövenpick Hotel!
                  </p>

                  <motion.button
                    className="bg-yellow-500 hover:bg-yellow-400 text-red-900 font-bold py-2 px-4 rounded-full text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => (window.location.href = "/checkout/stillapay-checkout")}
                  >
                    Shop Now
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
