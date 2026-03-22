// This utility helps manage animations across the site to prevent multiple animations
// from running simultaneously and potentially conflicting with each other

// Animation types
export const ANIMATION_TYPES = {
  PROMO_COUNTDOWN: "promo-countdown",
  PROMO_SEAL: "promo-seal",
  SPECIAL_OFFER: "special-offer",
} as const

export type AnimationType = (typeof ANIMATION_TYPES)[keyof typeof ANIMATION_TYPES]

// Check if an animation has been shown in the current session
export const hasAnimationBeenShown = (animationType: AnimationType): boolean => {
  if (typeof window === "undefined") return false

  const key = `animation-shown-${animationType}`
  return sessionStorage.getItem(key) === "true"
}

// Mark an animation as shown for the current session
export const markAnimationAsShown = (animationType: AnimationType): void => {
  if (typeof window === "undefined") return

  const key = `animation-shown-${animationType}`
  sessionStorage.setItem(key, "true")
}

// Clear animation history for testing purposes
export const clearAnimationHistory = (): void => {
  if (typeof window === "undefined") return

  Object.values(ANIMATION_TYPES).forEach((type) => {
    sessionStorage.removeItem(`animation-shown-${type}`)
  })
}

// Ensure only one animation plays at a time
export const shouldShowAnimation = (animationType: AnimationType, priority = 1): boolean => {
  if (typeof window === "undefined") return false

  // Check if this specific animation has already been shown
  if (hasAnimationBeenShown(animationType)) return false

  // Check if a currently playing animation is stored
  const currentlyPlaying = sessionStorage.getItem("currently-playing-animation")
  const currentPriority = Number.parseInt(sessionStorage.getItem("current-animation-priority") || "0")

  // If something is playing with higher priority, don't show this animation
  if (currentlyPlaying && currentPriority >= priority) return false

  // Otherwise, this animation can play - mark it as the currently playing animation
  sessionStorage.setItem("currently-playing-animation", animationType)
  sessionStorage.setItem("current-animation-priority", priority.toString())

  return true
}

// Mark an animation as finished playing
export const markAnimationAsFinished = (animationType: AnimationType): void => {
  if (typeof window === "undefined") return

  // Only clear if this animation is the currently playing one
  if (sessionStorage.getItem("currently-playing-animation") === animationType) {
    sessionStorage.removeItem("currently-playing-animation")
    sessionStorage.removeItem("current-animation-priority")
  }

  // Mark this animation as shown
  markAnimationAsShown(animationType)
}
