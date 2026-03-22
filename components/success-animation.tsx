"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface SuccessAnimationProps {
  show: boolean
}

export default function SuccessAnimation({ show }: SuccessAnimationProps) {
  useEffect(() => {
    if (show) {
      // Trigger confetti effect
      import("canvas-confetti").then((confetti) => {
        const myConfetti = confetti.default

        // Initial burst
        myConfetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#FFD700", "#FF0000", "#FFA500", "#32CD32"],
        })

        // Cannon left
        setTimeout(() => {
          myConfetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ["#FFD700", "#FF0000", "#FFA500"],
          })
        }, 250)

        // Cannon right
        setTimeout(() => {
          myConfetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ["#FFD700", "#FF0000", "#FFA500"],
          })
        }, 400)
      })
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full mx-auto text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <motion.div
              className="w-16 sm:w-20 h-16 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
            >
              <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
            </motion.div>

            <motion.h2
              className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Payment Successful!
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg text-gray-600 mb-5 sm:mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Thank you for your purchase. Your order has been successfully placed.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white w-full sm:w-auto" asChild>
                <Link href="/">Return to Home</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
