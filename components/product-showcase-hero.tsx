'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { Zap, Heart, Leaf, Flame, Droplet } from 'lucide-react'

interface NutrientButton {
  icon: React.ComponentType<{ size: number; className: string }>
  label: string
  value: string
}

const nutrients: NutrientButton[] = [
  { icon: Droplet, label: 'Protein', value: '8g' },
  { icon: Flame, label: 'Healthy Fats', value: '16g' },
  { icon: Heart, label: 'Vitamins', value: 'B, E' },
  { icon: Zap, label: 'Energy', value: '188 cal' },
  { icon: Leaf, label: 'Fiber', value: '3g' },
]

export default function ProductShowcaseHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const productRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<(HTMLDivElement | null)[]>([])
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Product GIF animation on load
      gsap.fromTo(
        productRef.current,
        { opacity: 0, scale: 0.7, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
        }
      )

      // Subtle floating animation for product
      gsap.to(productRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Nutrient buttons staggered animation
      buttonsRef.current.forEach((button, index) => {
        if (!button) return

        // Initial state
        gsap.set(button, { opacity: 0, scale: 0.6, y: 40 })

        // Staggered pop-in animation
        gsap.to(button, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'back.out',
        })

        // Floating animation
        gsap.to(button, {
          y: -10,
          duration: 2.5 + index * 0.2,
          delay: index * 0.15 + 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })

        // Pulsing glow animation
        gsap.to(button, {
          boxShadow: [
            '0 0 20px rgba(245, 158, 11, 0.3)',
            '0 0 40px rgba(245, 158, 11, 0.6)',
            '0 0 20px rgba(245, 158, 11, 0.3)',
          ],
          duration: 3,
          delay: index * 0.15 + 0.8,
          repeat: -1,
          ease: 'sine.inOut',
        })
      })

      // Particle animation (subtle background movement)
      const particles = particlesRef.current?.querySelectorAll('.particle')
      particles?.forEach((particle, index) => {
        gsap.to(particle, {
          x: gsap.utils.random(-30, 30),
          y: gsap.utils.random(-30, 30),
          opacity: [0.1, 0.3, 0.1],
          duration: gsap.utils.random(4, 8),
          repeat: -1,
          delay: index * 0.3,
          ease: 'sine.inOut',
        })
      })

      // Hover animations
      buttonsRef.current.forEach((button) => {
        if (!button) return

        const originalOnMouseEnter = button.onmouseenter
        const originalOnMouseLeave = button.onmouseleave

        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.08,
            duration: 0.3,
            overwrite: 'auto',
          })
          // Increase glow on hover
          gsap.to(button, {
            boxShadow: '0 0 50px rgba(245, 158, 11, 0.8)',
            duration: 0.3,
            overwrite: 'auto',
          })
          gsap.to(button, {
            backdropFilter: 'blur(20px)',
            duration: 0.3,
            overwrite: 'auto',
          })
        })

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.4,
            overwrite: 'auto',
          })
          gsap.to(button, {
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)',
            duration: 0.4,
            overwrite: 'auto',
          })
          gsap.to(button, {
            backdropFilter: 'blur(10px)',
            duration: 0.4,
            overwrite: 'auto',
          })
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-amber-100 to-white" />

      {/* Ambient Glow Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-96 h-96 bg-amber-300 rounded-full blur-3xl opacity-20" />
        <div className="absolute w-80 h-80 bg-orange-300 rounded-full blur-3xl opacity-15 ml-32 mt-32" />
      </div>

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-amber-400 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-4xl">
          {/* Heading */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-amber-900 mb-4">
              Crafted with <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Precision</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              100% Natural Peanut Butter, Handcrafted to Perfection
            </p>
          </div>

          {/* Product and Nutrients Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Product GIF */}
            <div className="lg:col-span-6 flex justify-center">
              <div
                ref={productRef}
                className="relative w-64 h-80 md:w-72 md:h-96 flex items-center justify-center"
                style={{
                  filter: 'drop-shadow(0 20px 50px rgba(245, 158, 11, 0.2))',
                }}
              >
                <Image
                  src="/images/stilla-product-showcase.gif"
                  alt="Stilla Peanut Butter Product"
                  width={300}
                  height={400}
                  priority
                  className="object-contain drop-shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 0 30px rgba(245, 158, 11, 0.3))',
                  }}
                />
              </div>
            </div>

            {/* Nutrient Buttons Grid */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-3 md:gap-4">
                {nutrients.map((nutrient, index) => {
                  const Icon = nutrient.icon
                  return (
                    <div
                      key={index}
                      ref={(el) => {
                        if (el) buttonsRef.current[index] = el
                      }}
                      className="glass-morphism-card group relative p-4 md:p-5 rounded-2xl cursor-pointer transition-all duration-300 will-change-transform"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)',
                      }}
                    >
                      {/* Glow overlay on hover */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.1), transparent)',
                        }}
                      />

                      {/* Content */}
                      <div className="relative z-10 text-center">
                        <div className="flex justify-center mb-2">
                          <Icon className="w-6 h-6 md:w-7 md:h-7 text-amber-600" />
                        </div>
                        <p className="text-xs md:text-sm font-semibold text-amber-900">{nutrient.label}</p>
                        <p className="text-sm md:text-base font-bold text-amber-600 mt-1">{nutrient.value}</p>
                      </div>

                      {/* Inner glow */}
                      <div
                        className="absolute inset-1 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: 'radial-gradient(circle at top left, rgba(255, 255, 255, 0.2), transparent)',
                        }}
                      />
                    </div>
                  )
                })}
              </div>

              {/* Call to Action */}
              <div className="mt-8 md:mt-10 text-center lg:text-left">
                <p className="text-gray-700 mb-4 text-sm md:text-base">
                  Discover the journey from farm to table
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <a
                    href="#process"
                    className="px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    See the Process
                  </a>
                  <a
                    href="/checkout/stillapay-checkout"
                    className="px-6 md:px-8 py-2.5 md:py-3 bg-white text-amber-900 font-semibold rounded-xl border-2 border-amber-200 hover:bg-amber-50 transition-all duration-300"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  )
}
