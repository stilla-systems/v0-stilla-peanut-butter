'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function HowItsMadeHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setIsLoaded(true)
      video.play().catch((error) => {
        console.log('Autoplay initiated')
      })
    }

    video.addEventListener('canplay', handleCanPlay)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 w-full h-full"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/how-its-made-hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      {/* Content Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4"
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg leading-tight">
          Crafted with Tradition
        </h1>
        <p className="text-xl md:text-2xl text-gray-100 max-w-2xl drop-shadow-md mb-8">
          Discover the artistry behind every jar of Stilla Peanut Butter
        </p>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-200">Scroll to explore</span>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </motion.div>

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-3 border-amber-600 border-t-transparent rounded-full"
          />
        </div>
      )}
    </section>
  )
}
