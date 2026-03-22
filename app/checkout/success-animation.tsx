"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"

interface SuccessAnimationProps {
  show: boolean
}

export default function SuccessAnimation({ show }: SuccessAnimationProps) {
  useEffect(() => {
    if (!show) return

    // Trigger confetti effect
    if (typeof window !== "undefined") {
      import("canvas-confetti").then((confetti) => {
        // Initial burst
        confetti.default({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#FFD700", "#FF0000", "#FFA500", "#32CD32"],
        })

        // Follow with a cannon left and right
        setTimeout(() => {
          confetti.default({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ["#FFD700", "#FF0000", "#FFA500"],
          })
        }, 250)

        setTimeout(() => {
          confetti.default({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ["#FFD700", "#FF0000", "#FFA500"],
          })
        }, 400)

        // Final celebratory burst
        setTimeout(() => {
          confetti.default({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.8 },
            gravity: 0.8,
            colors: ["#FFD700", "#FF0000", "#FFA500", "#32CD32", "#1E90FF"],
            scalar: 1.2,
          })
        }, 1000)
      })
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{
              scale: [0, 1.2, 1],
              boxShadow: [
                "0 0 0 0 rgba(74, 222, 128, 0)",
                "0 0 0 20px rgba(74, 222, 128, 0.3)",
                "0 0 0 40px rgba(74, 222, 128, 0)",
              ],
            }}
            transition={{
              duration: 1,
              times: [0, 0.6, 1],
              boxShadow: { duration: 1.5, repeat: 3, repeatType: "loop" },
            }}
          >
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{
                scale: 1,
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                delay: 0.3,
                duration: 0.5,
                rotate: { delay: 0.3, duration: 0.5, times: [0, 0.3, 0.6, 1] },
              }}
            >
              <Check className="h-16 w-16 text-green-600" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
