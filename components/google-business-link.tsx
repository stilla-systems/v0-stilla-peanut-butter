"use client"

import Link from "next/link"
import { MapPin, Star, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

export default function GoogleBusinessLink() {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-4 border border-gray-200 max-w-md mx-auto"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start">
        <div className="mr-3 mt-1">
          <div className="bg-blue-50 p-2 rounded-full">
            <MapPin className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-1">Stilla Trading</h3>
          <p className="text-sm text-gray-600 mb-2">Kwamo rd, Ejisu, Kumasi, Ghana</p>

          <div className="flex items-center mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 text-yellow-400" fill={star <= 4.8 ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">4.8 (127 reviews)</span>
          </div>

          <div className="text-sm text-gray-600 mb-3">
            <p>📞 +233 59 630 2403</p>
            <p>⏰ Open 24 hours</p>
          </div>

          <Link
            href="https://g.co/kgs/ypv7C2v"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View on Google Maps
            <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
