"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, MessageCircle, Send } from "lucide-react"

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [autoMessage, setAutoMessage] = useState("")
  const phoneNumber = "0597397912" // Updated phone number

  // Show widget after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Simulate typing effect when widget opens
  useEffect(() => {
    if (isOpen) {
      const fullMessage = "👋 Yɛma wo akwaaba! Yɛhia wo paaa.\n\nHow can we help you today?"
      let index = 0
      setIsTyping(true)

      const typingInterval = setInterval(() => {
        if (index <= fullMessage.length) {
          setAutoMessage(fullMessage.substring(0, index))
          index++
        } else {
          clearInterval(typingInterval)
          setIsTyping(false)
        }
      }, 20)

      return () => clearInterval(typingInterval)
    } else {
      setAutoMessage("")
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message)
    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")

    // Reset the form
    setMessage("")
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-20 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl mb-4 w-[300px] sm:w-[320px] overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-50/90 to-gray-100/90 backdrop-blur-md text-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <motion.div
                    className="relative w-10 h-10 mr-3 bg-white rounded-full overflow-hidden border-2 border-white shadow-md"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Image
                      src="/images/stilla-peanut-butter.png"
                      alt="Stilla Peanut Butter Logo"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-gray-800">Stilla Peanut Butter Support</h3>
                    <p className="text-xs text-gray-500 flex items-center">
                      <motion.span
                        className={`inline-block w-2 h-2 rounded-full mr-1 ${isTyping ? "bg-yellow-400" : "bg-green-300"}`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      ></motion.span>
                      {isTyping ? "typing..." : "online"}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-green-200 transition-colors p-2"
                  aria-label="Close chat"
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            {/* Chat area */}
            <div className="p-4 bg-gray-50 h-[240px] overflow-y-auto">
              <motion.div
                className="bg-gradient-to-br from-gray-50/90 to-gray-100/90 backdrop-blur-sm p-3 rounded-lg rounded-tl-none max-w-[80%] mb-4 shadow-sm border border-gray-100/50"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <p className="text-gray-800">
                  {autoMessage}
                  {isTyping && (
                    <motion.span
                      className="inline-block w-1 h-4 ml-1 bg-gray-500"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    ></motion.span>
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </motion.div>
            </div>

            {/* Input area */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-100/50 flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-200/50 rounded-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent bg-white/80 backdrop-blur-sm"
              />
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  type="submit"
                  size="sm"
                  className="ml-2 bg-transparent border border-gray-200/30 hover:bg-gray-100/50 text-gray-500 hover:text-gray-700 rounded-full h-10 w-10 p-0 flex items-center justify-center shadow-sm transition-all duration-300"
                >
                  <Send size={18} />
                </Button>
              </motion.div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button with notification indicator and animations */}
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        whileTap={{ scale: 0.9 }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        onClick={() => setIsOpen(!isOpen)}
        className="group bg-white/10 backdrop-blur-sm border border-gray-200/10 text-gray-500 hover:text-gray-700 rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shadow-sm relative transition-all duration-300 hover:shadow-md hover:bg-white/20"
        aria-label="Chat with us"
      >
        {/* Glossy white transparent frame */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm border border-white/30 shadow-inner pointer-events-none"></div>

        <motion.div
          className="absolute inset-0 rounded-full bg-transparent"
          animate={{
            boxShadow: ["0 0 0 0px rgba(255, 255, 255, 0.2)", "0 0 0 10px rgba(255, 255, 255, 0)"],
          }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
        />

        {!isOpen && (
          <motion.span
            className="absolute -top-1 -right-1 bg-red-400/60 backdrop-blur-sm text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            1
          </motion.span>
        )}

        <motion.div
          animate={isOpen ? { rotate: 0 } : { rotate: [0, -10, 10, -10, 10, 0] }}
          transition={isOpen ? {} : { duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 4 }}
        >
          <MessageCircle
            size={20}
            className="sm:text-[24px] text-gray-700 group-hover:text-gray-900 transition-colors relative z-10"
          />
        </motion.div>
      </motion.button>
    </div>
  )
}
