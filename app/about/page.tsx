import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import GoogleBusinessLink from "@/components/google-business-link"

export const metadata: Metadata = {
  title: "About Stilla Peanut Butter | Premium Peanut Butter in Ghana",
  description:
    "Learn about Stilla Peanut Butter, a premium peanut butter manufacturer in Ghana. Discover our story, mission, and commitment to quality natural products.",
  keywords: ["Stilla Peanut Butter", "about us", "peanut butter Ghana", "natural food", "Kumasi", "food manufacturer"],
  alternates: {
    canonical: "https://www.stillapeanutbutter.com/about",
  },
}

export default function AboutPage() {
  return (
    <main className="pt-20 pb-16 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-amber-900 mb-6 text-center">About Stilla Peanut Butter</h1>

          <div className="mb-12 relative h-80 rounded-xl overflow-hidden">
            <Image src="/images/peanut-farm.png" alt="Peanut farm in Ghana" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Our Story</h2>
                <p className="text-white/90">From farm to jar - creating Ghana's finest peanut butter since 2015</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                At Stilla Peanut Butter, our mission is to create the highest quality, 100% natural peanut butter while
                supporting local farmers and sustainable agriculture practices in Ghana.
              </p>
              <p className="text-gray-700 mb-4">
                We believe that healthy food should be delicious, affordable, and accessible to everyone. That's why we
                focus on creating products with no additives, no preservatives - just pure peanut goodness.
              </p>
              <p className="text-gray-700">
                Every jar of Stilla Peanut Butter is packed with essential nutrients, including protein, healthy fats,
                vitamins, and minerals, providing a great energy boost for your daily activities.
              </p>
            </div>

            <div className="relative rounded-xl overflow-hidden h-64 md:h-auto">
              <Image
                src="/images/stilla-founder-new.jpg"
                alt="Stilla Trading founder"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          <div className="bg-amber-50 p-8 rounded-xl mb-16">
            <h2 className="text-2xl font-bold text-amber-900 mb-6 text-center">Our Production Process</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 text-amber-800 font-bold">
                  1
                </div>
                <h3 className="font-bold text-lg mb-2">Sourcing</h3>
                <p className="text-gray-700">
                  We source the finest peanuts from local farmers in Ghana, ensuring quality and supporting the local
                  economy.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 text-amber-800 font-bold">
                  2
                </div>
                <h3 className="font-bold text-lg mb-2">Processing</h3>
                <p className="text-gray-700">
                  Our peanuts are carefully roasted and ground to perfection, preserving their natural oils and
                  nutrients.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 text-amber-800 font-bold">
                  3
                </div>
                <h3 className="font-bold text-lg mb-2">Packaging</h3>
                <p className="text-gray-700">
                  We package our peanut butter in high-quality jars to maintain freshness and deliver it to your
                  doorstep.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-amber-900 mb-6 text-center">Visit Us</h2>
            <p className="text-center text-gray-700 mb-8">
              We're located in Kumasi, Ghana. Come visit our store or find us on Google Maps!
            </p>

            <GoogleBusinessLink />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Ready to Try Stilla Peanut Butter?</h2>
            <p className="text-gray-700 mb-6">Experience the rich, natural taste of our premium peanut butter today!</p>
            <Link
              href="/shop"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
