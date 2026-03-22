"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, Shield, Award, Leaf, Heart, Clock } from "lucide-react"

export default function ProductFeatures() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: <Check className="h-6 w-6 text-amber-600" />,
      title: "100% Natural",
      description: "Made with only premium peanuts, no additives or preservatives.",
    },
    {
      icon: <Shield className="h-6 w-6 text-amber-600" />,
      title: "Quality Certified",
      description: "FDA approved and meets the highest safety standards.",
    },
    {
      icon: <Award className="h-6 w-6 text-amber-600" />,
      title: "Award Winning",
      description: "Recognized for exceptional taste and quality.",
    },
    {
      icon: <Leaf className="h-6 w-6 text-amber-600" />,
      title: "Sustainably Sourced",
      description: "Supporting local farmers and sustainable practices.",
    },
    {
      icon: <Heart className="h-6 w-6 text-amber-600" />,
      title: "Heart Healthy",
      description: "Rich in monounsaturated fats that support heart health.",
    },
    {
      icon: <Clock className="h-6 w-6 text-amber-600" />,
      title: "Freshly Made",
      description: "Small batches ensure maximum freshness and flavor.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="py-20 bg-amber-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-amber-900">Why Choose Stilla</h2>
          <p className="text-lg text-gray-700">
            Our commitment to quality and excellence sets us apart. Discover what makes Stilla Peanut Butter the premium
            choice for discerning customers.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm flex items-start gap-4"
              variants={itemVariants}
            >
              <div className="bg-amber-100 p-3 rounded-full">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-amber-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
