"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Food Blogger",
      image: "/images/testimonial-1.jpg",
      quote:
        "Stilla Peanut Butter has transformed my morning routine. The smooth texture and rich flavor are unmatched by any other brand I've tried. It's become a staple in my kitchen!",
    },
    {
      name: "Michael Osei",
      role: "Fitness Coach",
      image: "/images/testimonial-2.jpg",
      quote:
        "As a fitness professional, I'm very particular about what I recommend to my clients. Stilla Peanut Butter is my go-to for a clean protein source with no added sugars or oils. Simply the best!",
    },
    {
      name: "Amara Mensah",
      role: "Chef & Restaurateur",
      image: "/images/testimonial-3.jpg",
      quote:
        "The depth of flavor in Stilla Peanut Butter is exceptional. I use it in both sweet and savory dishes at my restaurant, and my customers always rave about it. A truly premium product.",
    },
  ]

  useEffect(() => {
    let interval

    if (autoplay) {
      interval = setInterval(() => {
        setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-amber-900">What Our Customers Say</h2>
          <p className="text-lg text-gray-700">
            Don't just take our word for it. Hear from our satisfied customers who have made Stilla Peanut Butter a part
            of their daily lives.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-amber-50 rounded-3xl p-8 md:p-12 shadow-lg"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <Image
                    src={testimonials[current].image || "/placeholder.svg"}
                    alt={testimonials[current].name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="text-amber-600 mb-4">
                    <Quote className="h-10 w-10 opacity-50" />
                  </div>
                  <blockquote className="text-xl md:text-2xl italic mb-6 text-gray-700">
                    "{testimonials[current].quote}"
                  </blockquote>
                  <div>
                    <div className="font-bold text-xl text-amber-900">{testimonials[current].name}</div>
                    <div className="text-gray-600">{testimonials[current].role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full border-amber-300 text-amber-900 hover:bg-amber-100"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous</span>
            </Button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === current ? "bg-amber-600 w-6" : "bg-amber-300"
                  }`}
                  onClick={() => {
                    setAutoplay(false)
                    setCurrent(index)
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full border-amber-300 text-amber-900 hover:bg-amber-100"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
