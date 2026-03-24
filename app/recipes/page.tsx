"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, Users, Search, Filter } from "lucide-react"
import RecipeModal from "@/components/recipe-modal"

export default function RecipesPage() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const recipes = [
    {
      id: 1,
      title: "Peanut Butter Banana Smoothie",
      description: "Start your day with this protein-packed smoothie featuring Stilla Peanut Butter.",
      image: "/images/recipe-smoothie.jpg",
      prepTime: "5 mins",
      servings: 2,
      category: "breakfast",
    },
    {
      id: 2,
      title: "Thai Peanut Sauce Stir Fry",
      description: "A savory dinner option with vegetables and a rich peanut sauce.",
      image: "/images/recipe-stirfry.jpg",
      prepTime: "25 mins",
      servings: 4,
      category: "dinner",
    },
    {
      id: 3,
      title: "Peanut Butter Energy Balls",
      description: "No-bake energy balls perfect for a quick snack or pre-workout boost.",
      image: "/images/recipe-energy-balls.jpg",
      prepTime: "15 mins",
      servings: 12,
      category: "snack",
    },
    {
      id: 4,
      title: "Chocolate Peanut Butter Cookies",
      description: "Decadent cookies that combine the perfect balance of chocolate and peanut butter.",
      image: "/images/recipe-cookies.jpg",
      prepTime: "30 mins",
      servings: 24,
      category: "dessert",
    },
    {
      id: 5,
      title: "Peanut Butter Overnight Oats",
      description: "Prepare the night before for a nutritious grab-and-go breakfast.",
      image: "/images/recipe-oats.jpg",
      prepTime: "5 mins + overnight",
      servings: 1,
      category: "breakfast",
    },
    {
      id: 6,
      title: "West African Peanut Soup",
      description: "A hearty and flavorful soup inspired by traditional West African cuisine.",
      image: "/images/recipe-soup.jpg",
      prepTime: "45 mins",
      servings: 6,
      category: "dinner",
    },
  ]

  const filteredRecipes = recipes.filter((recipe) => {
    // Apply category filter
    if (filter !== "all" && recipe.category !== filter) {
      return false
    }

    // Apply search filter
    if (searchQuery && !recipe.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    return true
  })

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
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-amber-900">Delicious Recipes</h1>
            <p className="text-lg text-gray-700 mb-8">
              Discover creative ways to enjoy Stilla Peanut Butter with our collection of recipes. From breakfast to
              dessert, we've got you covered.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search recipes..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="h-10 rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="snack">Snacks</option>
                  <option value="dinner">Dinner</option>
                  <option value="dessert">Dessert</option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setFilter("all")
                  setSearchQuery("")
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="relative h-48">
                    <Image src={recipe.image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" />
                    <div className="absolute top-4 right-4 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full uppercase">
                      {recipe.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-amber-900">{recipe.title}</h3>
                    <p className="text-gray-600 mb-4">{recipe.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{recipe.prepTime}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>Serves {recipe.servings}</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-amber-900 hover:bg-amber-800 text-white"
                      onClick={() => {
                        setSelectedRecipe(recipe)
                        setIsModalOpen(true)
                      }}
                    >
                      View Recipe
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-amber-900">Share Your Creations</h2>
            <p className="text-lg text-gray-700 mb-8">
              Have a delicious recipe featuring Stilla Peanut Butter? We'd love to see it! Tag us on social media or
              submit your recipe to be featured on our website.
            </p>
            <Button size="lg" className="bg-amber-900 hover:bg-amber-800 text-white font-bold">
              Submit Your Recipe
            </Button>
          </div>
        </div>
      </section>

      {/* Recipe Modal */}
      <RecipeModal 
        recipe={selectedRecipe} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  )
}
