"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface ScrollAnimationProps {
  children: React.ReactNode
  animationType?:
    | "fadeInUp"
    | "fadeInDown"
    | "fadeInLeft"
    | "fadeInRight"
    | "scaleUp"
    | "rotateIn"
    | "parallax"
  duration?: number
  delay?: number
  stagger?: boolean
  parallaxIntensity?: number
  className?: string
}

export function ScrollAnimationWrapper({
  children,
  animationType = "fadeInUp",
  duration = 0.8,
  delay = 0,
  stagger = false,
  parallaxIntensity = 0.5,
  className = "",
}: ScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current
    const isMobile = window.innerWidth < 768

    if (animationType === "parallax") {
      // Parallax effect - element moves slower than scroll
      gsap.to(element, {
        y: isMobile ? 0 : -50 * parallaxIntensity,
        scrollTrigger: {
          trigger: element,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          markers: false,
        },
      })
    } else {
      // Set initial state
      const initialState: Record<string, any> = {}
      const animationState: Record<string, any> = { opacity: 1 }

      switch (animationType) {
        case "fadeInUp":
          initialState.opacity = 0
          initialState.y = 40
          animationState.y = 0
          break
        case "fadeInDown":
          initialState.opacity = 0
          initialState.y = -40
          animationState.y = 0
          break
        case "fadeInLeft":
          initialState.opacity = 0
          initialState.x = -40
          animationState.x = 0
          break
        case "fadeInRight":
          initialState.opacity = 0
          initialState.x = 40
          animationState.x = 0
          break
        case "scaleUp":
          initialState.opacity = 0
          initialState.scale = 0.8
          animationState.scale = 1
          break
        case "rotateIn":
          initialState.opacity = 0
          initialState.rotation = -10
          animationState.rotation = 0
          break
      }

      gsap.set(element, initialState)

      gsap.to(element, {
        ...animationState,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "top 20%",
          markers: false,
        },
        duration,
        delay,
        ease: "power2.out",
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [animationType, duration, delay, parallaxIntensity])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Hook for manual GSAP animations
export function useScrollAnimation() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  return {
    gsap,
    ScrollTrigger,
  }
}
