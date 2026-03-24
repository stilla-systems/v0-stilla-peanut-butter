"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Instagram, MapPin, Mail, Phone } from "lucide-react"

// Animated social media icons
const FacebookIcon = () => (
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

const TwitterIcon = () => (
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

const YoutubeIcon = () => (
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

export default function Footer() {
  return (
    <footer className="bg-amber-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div>
            <div className="flex items-center mb-4">
              <div className="relative w-10 h-10 mr-2 bg-white rounded-full p-1">
                <Image
                  src="/images/stilla-peanut-butter.png"
                  alt="Stilla Peanut Butter Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl">Stilla Peanut Butter</span>
            </div>
            <p className="mb-4 text-amber-100">
              100% natural peanut butter made from premium quality peanuts. No additives, no preservatives - just pure
              peanut goodness.
            </p>
            <div className="flex space-x-6 mb-8 md:mb-0">
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

              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link
                  href="https://instagram.com/stillapeanutbutter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="md:pl-8">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-1.5">
              <li>
                <Link href="/" className="text-amber-100 hover:text-red-400 transition-colors block py-0.5">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/promotions" className="text-amber-100 hover:text-red-400 transition-colors block py-0.5">
                  Promotions
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-amber-100 hover:text-red-400 transition-colors block py-0.5"
                >
                  Shop Now
                </Link>
              </li>
              <li>
                <Link
                  href="https://g.co/kgs/ypv7C2v"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-100 hover:text-red-400 transition-colors block py-0.5"
                >
                  Google Business Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <address className="not-italic text-amber-100 space-y-2">
              <p className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>Kwamo rd, Ejisu, Kumasi, Ghana</span>
              </p>
              <p className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>info@stillapeanutbutter.com</span>
              </p>
              <p className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>0597397912</span>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-amber-800 mt-8 pt-4 text-sm text-amber-200">
          <p className="text-center">&copy; {new Date().getFullYear()} Stilla Peanut Butter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
