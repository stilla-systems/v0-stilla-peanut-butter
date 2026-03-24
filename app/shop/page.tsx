"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Check, Minus, Plus } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export default function ShopPage() {
  const [selectedSize, setSelectedSize] = useState("medium")
  const [quantity, setQuantity] = useState(1)
  const [isSticky, setIsSticky] = useState(false)

  // Handle sticky product info on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setIsSticky(offset > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleBuyNow = () => {
    // Redirect to Stillapay with Paystack integration
    window.location.href = "https://paystack.shop/pay/8sim7vb1jf"
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const products = [
    {
      id: "smooth",
      name: "Stilla Smooth Peanut Butter",
      description: "Our signature smooth peanut butter with a silky texture and rich flavor.",
      image: "/images/premium-jar.png",
      price: {
        small: 35,
        medium: 55,
        large: 85,
      },
    },
    {
      id: "crunchy",
      name: "Stilla Crunchy Peanut Butter",
      description: "Premium peanut butter with crunchy peanut pieces for added texture.",
      image: "/images/crunchy-jar.png",
      price: {
        small: 35,
        medium: 55,
        large: 85,
      },
    },
    {
      id: "organic",
      name: "Stilla Organic Peanut Butter",
      description: "Made with certified organic peanuts for the purest taste experience.",
      image: "/images/organic-jar.png",
      price: {
        small: 45,
        medium: 65,
        large: 95,
      },
    },
  ]

  return (
    <main className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-amber-900">Shop Premium Peanut Butter</h1>
          <p className="text-lg text-gray-700">
            Discover our range of artisanal peanut butter, crafted with care from the finest ingredients. Choose your
            favorite variety and size to experience pure luxury in every spoonful.
          </p>
        </motion.div>

        <Tabs defaultValue="smooth" className="w-full">
          <TabsList className="grid grid-cols-3 max-w-2xl mx-auto mb-12">
            <TabsTrigger value="smooth" className="text-lg">
              Smooth
            </TabsTrigger>
            <TabsTrigger value="crunchy" className="text-lg">
              Crunchy
            </TabsTrigger>
            <TabsTrigger value="organic" className="text-lg">
              Organic
            </TabsTrigger>
          </TabsList>

          {products.map((product) => (
            <TabsContent key={product.id} value={product.id} className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="sticky top-24 bg-amber-50/50 rounded-3xl p-8 backdrop-blur-sm">
                    <div className="relative h-[400px] md:h-[600px] mx-auto max-w-md">
                      <motion.div
                        initial={{ rotate: -5 }}
                        animate={{ rotate: 5 }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          ease: "easeInOut",
                        }}
                      >
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-contain drop-shadow-2xl"
                        />
                      </motion.div>

                      <motion.div
                        className="absolute -top-10 -right-10 bg-yellow-500 text-black font-bold rounded-full w-24 h-24 flex items-center justify-center text-center text-sm"
                        initial={{ rotate: -10, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                      >
                        100% Natural
                      </motion.div>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-4">
                      <div className="bg-white rounded-xl p-4 text-center">
                        <div className="font-bold text-amber-900 mb-1">Protein</div>
                        <div className="text-2xl font-bold">7g</div>
                        <div className="text-xs text-gray-500">per serving</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center">
                        <div className="font-bold text-amber-900 mb-1">Calories</div>
                        <div className="text-2xl font-bold">190</div>
                        <div className="text-xs text-gray-500">per serving</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center">
                        <div className="font-bold text-amber-900 mb-1">Sugar</div>
                        <div className="text-2xl font-bold">0g</div>
                        <div className="text-xs text-gray-500">added</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className={cn("transition-all duration-300", isSticky ? "lg:sticky lg:top-24" : "")}>
                    <div className="bg-white rounded-3xl p-8 shadow-lg">
                      <h2 className="text-3xl font-bold text-amber-900 mb-2">{product.name}</h2>
                      <div className="flex items-center mb-4">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-gray-600">4.9 (128 reviews)</span>
                      </div>

                      <p className="text-lg text-gray-700 mb-6">{product.description}</p>

                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-3">Select Size</h3>
                        <RadioGroup
                          value={selectedSize}
                          onValueChange={setSelectedSize}
                          className="flex flex-wrap gap-4"
                        >
                          <div className="flex items-center">
                            <RadioGroupItem value="small" id="small" className="peer sr-only" />
                            <Label
                              htmlFor="small"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-amber-500 [&:has([data-state=checked])]:border-amber-500 cursor-pointer"
                            >
                              <span className="font-semibold">Small</span>
                              <span className="text-xs text-gray-500">250g</span>
                              <span className="mt-2 font-bold text-lg">GHC {product.price.small}</span>
                            </Label>
                          </div>

                          <div className="flex items-center">
                            <RadioGroupItem value="medium" id="medium" className="peer sr-only" />
                            <Label
                              htmlFor="medium"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-amber-500 [&:has([data-state=checked])]:border-amber-500 cursor-pointer"
                            >
                              <span className="font-semibold">Medium</span>
                              <span className="text-xs text-gray-500">500g</span>
                              <span className="mt-2 font-bold text-lg">GHC {product.price.medium}</span>
                            </Label>
                          </div>

                          <div className="flex items-center">
                            <RadioGroupItem value="large" id="large" className="peer sr-only" />
                            <Label
                              htmlFor="large"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-amber-500 [&:has([data-state=checked])]:border-amber-500 cursor-pointer"
                            >
                              <span className="font-semibold">Large</span>
                              <span className="text-xs text-gray-500">1kg</span>
                              <span className="mt-2 font-bold text-lg">GHC {product.price.large}</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                        <div className="flex items-center">
                          <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="mx-6 text-xl font-semibold">{quantity}</span>
                          <Button variant="outline" size="icon" onClick={incrementQuantity}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <div className="text-sm text-gray-500">Total Price</div>
                          <div className="text-3xl font-bold text-amber-900">
                            GHC {(product.price[selectedSize as keyof typeof product.price] * quantity).toFixed(2)}
                          </div>
                        </div>
                        <div className="flex items-center text-green-600">
                          <Check className="h-5 w-5 mr-1" />
                          <span>In Stock</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          size="lg"
                          className="bg-amber-900 hover:bg-amber-800 text-white font-bold text-lg flex-1"
                          onClick={handleBuyNow}
                        >
                          Buy Now
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className="border-amber-900 text-amber-900 hover:bg-amber-900/10 font-medium text-lg"
                        >
                          <Heart className="h-5 w-5 mr-2" />
                          Add to Wishlist
                        </Button>
                      </div>

                      <div className="mt-6 text-center text-sm text-gray-500">
                        Secure payment powered by Stilla Pay + Paystack. Free shipping on orders over GHC 150.
                      </div>
                    </div>

                    <div className="mt-8">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="ingredients">
                          <AccordionTrigger className="text-lg font-semibold">Ingredients</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-gray-700">
                              100% roasted peanuts. No added sugar, salt, oils, or preservatives. Just pure, natural
                              peanut goodness.
                            </p>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="nutrition">
                          <AccordionTrigger className="text-lg font-semibold">Nutrition Facts</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              <div className="flex justify-between border-b pb-1">
                                <span>Serving Size</span>
                                <span>2 tbsp (32g)</span>
                              </div>
                              <div className="flex justify-between border-b pb-1">
                                <span>Calories</span>
                                <span>190</span>
                              </div>
                              <div className="flex justify-between border-b pb-1">
                                <span>Total Fat</span>
                                <span>16g</span>
                              </div>
                              <div className="flex justify-between border-b pb-1">
                                <span>Saturated Fat</span>
                                <span>2g</span>
                              </div>
                              <div className="flex justify-between border-b pb-1">
                                <span>Trans Fat</span>
                                <span>0g</span>
                              </div>
                              <div className="flex justify-between border-b pb-1">
                                <span>Cholesterol</span>
                                <span>0mg</span>
                              </div>
                              <div className="flex justify-between border-b pb-1">
                                <span>Sodium</span>
                                <span>0mg</span>
                              </div>
                              <div className="flex justify-between border-b pb-1">
                                <span>Total Carbohydrate</span>
                                <span>7g</span>
                              </div>
                              <div className="flex justify-between border-b pb-1">
                                <span>Dietary Fiber</span>
                                <span>3g</span>
                              </div>
                              <div className="flex justify-between border-b pb-1">
                                <span>Total Sugars</span>
                                <span>1g</span>
                              </div>
                              <div className="flex justify-between border-b pb-1">
                                <span>Protein</span>
                                <span>7g</span>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="shipping">
                          <AccordionTrigger className="text-lg font-semibold">Shipping & Returns</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-gray-700 mb-2">
                              We ship throughout Ghana with delivery typically within 2-3 business days. Free shipping
                              on orders over GHC 150.
                            </p>
                            <p className="text-gray-700">
                              If you're not completely satisfied with your purchase, you can return it within 14 days
                              for a full refund or exchange.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Related Products */}
        <section className="mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-amber-900">You May Also Like</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Stilla Gift Box",
                description: "Perfect for gifting, includes 3 small jars of our premium varieties.",
                price: 120,
                image: "/images/gift-box.png",
              },
              {
                name: "Peanut Butter Spreader",
                description: "Handcrafted wooden spreader, perfect for your Stilla experience.",
                price: 25,
                image: "/images/spreader.png",
              },
              {
                name: "Stilla Recipe Book",
                description: "50+ delicious recipes featuring our premium peanut butter.",
                price: 35,
                image: "/images/recipe-book.png",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="relative h-48">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain p-4" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-amber-900">GHC {item.price}</span>
                    <Button variant="outline" size="sm" className="border-amber-900 text-amber-900">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
