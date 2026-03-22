// This file manages the festivity dates and countdown logic

// Function to calculate Easter date for a given year
// This uses the Meeus/Jones/Butcher algorithm for calculating Easter
export function calculateEasterDate(year: number): Date {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1 // 0-based month
  const day = ((h + l - 7 * m + 114) % 31) + 1

  return new Date(year, month, day)
}

// Function to get the next Christmas date
export function getNextChristmasDate(): Date {
  const now = new Date()
  const currentYear = now.getFullYear()
  const christmasDate = new Date(currentYear, 11, 25) // December 25th

  // If Christmas has already passed this year, set for next year
  if (now > christmasDate) {
    christmasDate.setFullYear(currentYear + 1)
  }

  return christmasDate
}

// Function to get the next Easter date
export function getNextEasterDate(): Date {
  const now = new Date()
  const currentYear = now.getFullYear()
  let easterDate = calculateEasterDate(currentYear)

  // If Easter has already passed this year, calculate for next year
  if (now > easterDate) {
    easterDate = calculateEasterDate(currentYear + 1)
  }

  return easterDate
}

// Function to get the next festivity date (Christmas is prioritized as the most recent)
export function getNextFestivityDate(): { date: Date; name: "Easter" | "Christmas" } {
  // Always return Christmas as the most recent festival as requested
  return { date: getNextChristmasDate(), name: "Christmas" }
}

// Function to get a date that's 2 months before the next festivity
export function getPromotionStartDate(): Date {
  const { date: festivityDate } = getNextFestivityDate()
  const promotionStartDate = new Date(festivityDate)
  promotionStartDate.setMonth(promotionStartDate.getMonth() - 2)
  return promotionStartDate
}

// Function to get the target date for the countdown (festivity date)
export function getCountdownTargetDate(): string {
  const { date } = getNextFestivityDate()
  return date.toISOString()
}

// Function to get the current festivity name for display
export function getCurrentFestivityName(): string {
  return "Christmas" // Always return Christmas as the most recent festival
}

// Function to check if the promotional seal should be visible
export function shouldShowPromotionalSeal(): boolean {
  const now = new Date()
  const currentYear = now.getFullYear()
  const startDate = new Date(currentYear, 10, 1) // November 1st
  const endDate = new Date(currentYear, 11, 24) // December 24th

  return now >= startDate && now <= endDate
}

// Function to format date for display
export function formatFestivityDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return date.toLocaleDateString("en-US", options)
}

// Function to get Google Calendar link for the event
export function getGoogleCalendarLink(festivityName: string, date: Date): string {
  const startDate = date.toISOString().replace(/-|:|\.\d+/g, "")
  const endDate = new Date(date.getTime() + 24 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d+/g, "")

  const title = encodeURIComponent(`Stilla ${festivityName} Promotion Ends`)
  const details = encodeURIComponent(`Last day to redeem your Stilla Peanut Butter ${festivityName} promotion codes!`)

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&sf=true&output=xml`
}
