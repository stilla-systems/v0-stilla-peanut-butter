"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingBag, ShoppingCart, Home, Gift, Leaf } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine if scrolled past threshold
      setScrolled(currentScrollY > 50)

      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-3"
      }`}
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10 mr-2">
              <Image
                src="/images/stilla-peanut-butter.png"
                alt="Stilla Peanut Butter Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className={`font-bold text-lg md:text-xl ${scrolled ? "text-amber-900" : "text-amber-900"}`}>
              Stilla Peanut Butter
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`font-medium hover:text-red-600 transition-colors ${
                scrolled ? "text-gray-800" : "text-gray-800"
              }`}
            >
              Home
            </Link>
            <Link
              href="/promotions"
              className={`font-medium hover:text-red-600 transition-colors ${
                scrolled ? "text-gray-800" : "text-gray-800"
              }`}
            >
              Promotions
            </Link>
            <Link
              href="/how-its-made"
              className={`font-medium hover:text-red-600 transition-colors ${
                scrolled ? "text-gray-800" : "text-gray-800"
              }`}
            >
              How it's Made
            </Link>
            <Button className="bg-red-600 hover:bg-red-700 text-white" asChild>
              <Link href="/checkout/stillapay-checkout">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Buy Now
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-md ${scrolled ? "text-gray-800" : "text-gray-800"}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col p-4">
              <Link
                href="/"
                className="flex items-center text-gray-800 hover:text-red-600 transition-colors py-4 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-5 w-5 mr-3" />
                Home
              </Link>
              <Link
                href="/promotions"
                className="flex items-center text-gray-800 hover:text-red-600 transition-colors py-4 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <Gift className="h-5 w-5 mr-3" />
                Promotions
              </Link>
              <Link
                href="/how-its-made"
                className="flex items-center text-gray-800 hover:text-red-600 transition-colors py-4 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <Leaf className="h-5 w-5 mr-3" />
                How it's Made
              </Link>
              <div className="pt-4">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white w-full py-4 text-lg"
                  onClick={() => setIsMenuOpen(false)}
                  asChild
                >
                  <Link href="/checkout/stillapay-checkout">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Buy Now
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
