"use client"

import { motion } from "framer-motion"
import { CreditCard, ShieldCheck } from "lucide-react"

export default function StillapayLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-b from-amber-50 to-amber-100">
      {/* Animated logo */}
      <motion.div
        className="relative w-24 h-24 mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 bg-amber-600 rounded-full opacity-20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <CreditCard className="h-12 w-12 text-amber-800" />
        </div>
      </motion.div>

      {/* Loading text */}
      <motion.h2
        className="text-2xl font-bold text-amber-900 mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Stillapay
      </motion.h2>

      <motion.p
        className="text-amber-700 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Preparing your secure payment...
      </motion.p>

      {/* Loading indicator */}
      <motion.div
        className="w-48 h-1.5 bg-amber-200 rounded-full overflow-hidden mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="h-full bg-amber-600 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "easeInOut" }}
        />
      </motion.div>

      {/* Security badge */}
      <motion.div
        className="flex items-center text-green-700 bg-green-50 px-4 py-2 rounded-full border border-green-200"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <ShieldCheck className="h-4 w-4 mr-2" />
        <span className="text-sm">Secure Payment Processing</span>
      </motion.div>
    </div>
  )
}
