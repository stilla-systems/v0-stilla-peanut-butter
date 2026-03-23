'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { ScrollAnimationWrapper } from '@/components/scroll-animations'

export default function HomepageVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => setIsLoading(false)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

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
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
            {/* Video Container */}
            <div className="relative w-full bg-black aspect-video">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                preload="metadata"
                muted={isMuted}
                playsInline
              >
                <source src="/videos/homepage-showcase.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Loading Spinner */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}

              {/* Play/Pause Overlay */}
              <motion.button
                onClick={togglePlay}
                className="absolute inset-0 w-full h-full flex items-center justify-center group cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="bg-white/20 backdrop-blur-sm p-4 rounded-full group-hover:bg-white/30 transition-all"
                  whileHover={{ scale: 1.1 }}
                >
                  {isPlaying ? (
                    <Pause className="w-12 h-12 text-white fill-white" />
                  ) : (
                    <Play className="w-12 h-12 text-white fill-white ml-1" />
                  )}
                </motion.div>
              </motion.button>

              {/* Controls */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
                <motion.button
                  onClick={toggleMute}
                  className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all"
                  whileHover={{ scale: 1.1 }}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </motion.button>
              </div>
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
