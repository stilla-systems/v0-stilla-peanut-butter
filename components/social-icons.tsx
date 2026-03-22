"use client"

import { motion } from "framer-motion"
import Link from "next/link"

// Animated Facebook Icon
export const FacebookIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <motion.path
      d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"
      initial={{ pathLength: 0, opacity: 0.2 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
    />
  </motion.svg>
)

// Animated Twitter/X Icon
export const TwitterIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <motion.path
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      initial={{ pathLength: 0, opacity: 0.2 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
    />
  </motion.svg>
)

// Animated YouTube Icon
export const YoutubeIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <motion.path
      d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
      initial={{ pathLength: 0, opacity: 0.2 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
    />
  </motion.svg>
)

// Social Media Links Component
export const SocialLinks = () => {
  return (
    <div className="flex space-x-6">
      <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
        <Link
          href="https://web.facebook.com/people/Stilla-Trading/61569012634572/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-400 transition-colors"
          aria-label="Facebook"
        >
          <FacebookIcon />
        </Link>
      </motion.div>

      <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
        <Link
          href="https://x.com/StillaPeanutButter"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-400 transition-colors"
          aria-label="X (Twitter)"
        >
          <TwitterIcon />
        </Link>
      </motion.div>

      <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
        <Link
          href="https://www.youtube.com/channel/UCgB00tpkoIzPQMv_Ox3Czvw"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-400 transition-colors"
          aria-label="YouTube"
        >
          <YoutubeIcon />
        </Link>
      </motion.div>
    </div>
  )
}
