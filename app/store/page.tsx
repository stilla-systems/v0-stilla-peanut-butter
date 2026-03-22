import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export default function StorePage() {
  const products = [
    {
      id: 1,
      name: "Stilla Peanut Butter - Smooth",
      price: 45.0,
      image: "/images/peanut-butter-smooth.png",
      description:
        "Our classic smooth peanut butter made from 100% roasted peanuts. Perfect for spreading on bread or adding to smoothies.",
    },
    {
      id: 2,
      name: "Stilla Peanut Butter - Crunchy",
      price: 45.0,
      image: "/images/peanut-butter-crunchy.png",
      description:
        "Our crunchy peanut butter with delicious peanut pieces for added texture. Made from 100% roasted peanuts.",
    },
    {
      id: 3,
      name: "Stilla Combo Pack",
      price: 85.0,
      image: "/images/peanut-butter-combo.png",
      description:
        "Get both our smooth and crunchy peanut butter in this value combo pack. Perfect for families who enjoy variety.",
    },
    {
      id: 4,
      name: "Stilla Peanut Butter - Large Jar",
      price: 75.0,
      image: "/images/peanut-butter-large.png",
      description:
        "Our premium peanut butter in a large 500g jar. Perfect for peanut butter lovers who can't get enough.",
    },
  ]

  return (
    <main className="pt-20 pb-16">
      <section className="bg-amber-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Products</h1>
          <p className="text-lg text-center max-w-3xl mx-auto mb-8">
            Discover our range of premium peanut butter products made from 100% natural ingredients. No additives, no
            added sugar - just pure, delicious peanut goodness.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">GHC {product.price.toFixed(2)}</span>
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-amber-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Bulk Orders & Special Requests</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            Looking for bulk orders for your business or special requests? Contact our sales team for custom pricing and
            delivery options.
          </p>
          <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
            Contact Sales
          </Button>
        </div>
      </section>
    </main>
  )
}
