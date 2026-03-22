"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <main className="pt-20 pb-16">
      <section className="bg-amber-50 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-amber-900">Contact Us</h1>
            <p className="text-lg text-gray-700">
              Have questions about our products? Want to place a bulk order? Or just want to say hello? We'd love to
              hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h2 className="text-2xl font-bold mb-6 text-amber-900">Get In Touch</h2>

              {submitted ? (
                <motion.div
                  className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
                  <p className="text-green-700">
                    Your message has been sent successfully. We'll get back to you as soon as possible.
                  </p>
                  <Button
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="How can we help you?"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message here..."
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-amber-900 hover:bg-amber-800 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h2 className="text-2xl font-bold mb-6 text-amber-900">Contact Information</h2>

              <div className="bg-amber-50 rounded-xl p-6 mb-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-amber-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Our Location</h3>
                      <p className="text-gray-700">
                        123 Premium Lane
                        <br />
                        Accra, Ghana
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-amber-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Phone Number</h3>
                      <p className="text-gray-700">0597397912</p>
                      <p className="text-gray-500 text-sm">Monday to Friday, 9am to 5pm</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-amber-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email Address</h3>
                      <p className="text-gray-700">info@stillapeanutbutter.com</p>
                      <p className="text-gray-500 text-sm">We'll respond as soon as possible</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-amber-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Business Hours</h3>
                      <p className="text-gray-700">
                        Monday - Friday: 9:00 AM - 5:00 PM
                        <br />
                        Saturday: 10:00 AM - 2:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-semibold text-lg mb-4 text-amber-900">Frequently Asked Questions</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-amber-900">Do you offer wholesale pricing?</h4>
                    <p className="text-gray-600 text-sm">
                      Yes, we offer special pricing for bulk orders. Please contact our sales team for more information.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-amber-900">What is your shipping policy?</h4>
                    <p className="text-gray-600 text-sm">
                      We ship throughout Ghana with delivery typically within 2-3 business days. Free shipping on orders
                      over GHC 150.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-amber-900">Are your products available in stores?</h4>
                    <p className="text-gray-600 text-sm">
                      Yes, Stilla Peanut Butter is available in select premium grocery stores across Ghana. Check our
                      store locator for details.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6 text-amber-900">Connect With Us</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Follow us on social media for recipes, promotions, and behind-the-scenes glimpses of how we craft the
            perfect jar of peanut butter.
          </p>

          <div className="flex justify-center space-x-6">
            {["facebook", "twitter", "instagram", "youtube"].map((platform) => (
              <motion.a
                key={platform}
                href={`https://${platform}.com`}
                className="bg-white p-4 rounded-full shadow-md hover:shadow-lg transition-all"
                whileHover={{ y: -5, scale: 1.1 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={`/images/${platform}-icon.png`} alt={`${platform} icon`} className="w-8 h-8" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
