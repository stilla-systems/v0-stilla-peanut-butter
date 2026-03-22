import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Gift, Award, CreditCard } from "lucide-react"

export default function PromotionSection() {
  return (
    <section className="py-16 bg-amber-100">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Buy, Scratch, and Win!</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Purchase Stilla Peanut Butter, reveal your scratch card, and enter your promo code for a chance to win
              amazing prizes!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-yellow-500/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Purchase</h3>
              <p>Buy any Stilla Peanut Butter product from our store or authorized retailers.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-yellow-500/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Scratch</h3>
              <p>Find the scratch card on your product and reveal your unique promo code.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-yellow-500/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Win</h3>
              <p>Enter your code on our website to see if you've won one of our amazing prizes!</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold mb-4">Prizes Include:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-yellow-500 text-white p-1 rounded-full mr-2 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span>Luxurious hotel Christmas giveaway</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-yellow-500 text-white p-1 rounded-full mr-2 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span>Airtime vouchers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-yellow-500 text-white p-1 rounded-full mr-2 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span>Free jars of Stilla Peanut Butter</span>
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-yellow-100 rounded-lg border border-yellow-300">
                  <p className="font-semibold">
                    Use Promo code: <span className="text-yellow-700">SPB500</span> for free delivery when you purchase
                    a Combo Pack or more than GHC1500.
                  </p>
                </div>

                <div className="mt-6">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">Redeem Your Code</Button>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <div className="relative h-64 md:h-80">
                  <Image src="/images/scratch-card.png" alt="Scratch Card" fill className="object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
