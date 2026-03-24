'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollAnimationWrapper } from '@/components/scroll-animations'

export default function HomepageVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => setIsLoading(false)
    video.addEventListener('loadeddata', handleLoadedData)

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [])

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-amber-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollAnimationWrapper
          animationType="fadeInDown"
          duration={0.8}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            Experience Stilla
          </h2>
          <p className="text-lg text-gray-700">
            Discover the story behind every jar of Stilla Peanut Butter - from farm to table with 100% natural goodness.
          </p>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper
          animationType="scaleUp"
          duration={0.8}
          className="relative w-full"
        >
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
            {/* Video Container - Full Width Responsive with Aspect Ratio */}
            <div className="relative w-full bg-black aspect-video">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                preload="auto"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/homepage-showcase.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Loading Spinner */}
              {isLoading && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/40"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                </motion.div>
              )}
            </div>

            {/* Bottom Accent */}
            <div className="h-1 bg-gradient-to-r from-amber-400 via-red-500 to-amber-400" />
          </div>

          {/* Video Description */}
          <motion.div
            className="mt-8 bg-amber-50 p-6 rounded-lg border border-amber-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-700 leading-relaxed">
              Watch how Stilla Peanut Butter is crafted with care and precision. Every step of our process is designed to
              preserve the natural flavors and nutritional benefits of premium peanuts, ensuring you get the finest
              quality in every bite.
            </p>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  )
}
