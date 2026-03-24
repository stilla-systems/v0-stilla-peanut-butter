'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

interface Recipe {
  id: number
  title: string
  description: string
  image: string
  prepTime: string
  servings: number
  category: string
  ingredients?: string[]
  instructions?: string[]
}

interface RecipeModalProps {
  recipe: Recipe | null
  isOpen: boolean
  onClose: () => void
}

const recipeDetails: Record<number, { ingredients: string[]; instructions: string[] }> = {
  1: {
    ingredients: [
      '2 ripe bananas',
      '2 tablespoons Stilla Peanut Butter',
      '1 cup unsweetened almond milk',
      '1/2 cup Greek yogurt',
      '1 tablespoon honey',
      'Ice cubes',
      'Optional: protein powder',
    ],
    instructions: [
      'Add bananas, peanut butter, and milk to blender',
      'Add Greek yogurt and honey',
      'Blend until smooth and creamy',
      'Add ice cubes and blend again',
      'Pour into glasses and serve immediately',
      'Optional: Top with granola or peanut bits',
    ],
  },
  2: {
    ingredients: [
      '3 tablespoons Stilla Peanut Butter',
      '2 bell peppers, diced',
      '1 cup broccoli florets',
      '1 cup snap peas',
      '2 carrots, sliced',
      '3 cloves garlic, minced',
      '2 tablespoons soy sauce',
      '1 tablespoon lime juice',
      'Cooked rice for serving',
      'Sesame oil',
    ],
    instructions: [
      'Heat oil in a large wok or skillet over high heat',
      'Add garlic and stir-fry for 30 seconds',
      'Add harder vegetables first (carrots, broccoli)',
      'Stir-fry for 3-4 minutes until partially cooked',
      'Add remaining vegetables and stir-fry for 2-3 minutes',
      'Mix peanut butter, soy sauce, and lime juice in a bowl',
      'Pour sauce over vegetables and toss to coat',
      'Stir-fry for 1-2 minutes more until everything is tender',
      'Serve over cooked rice with sesame oil drizzle',
    ],
  },
  3: {
    ingredients: [
      '1 cup Stilla Peanut Butter',
      '1/2 cup honey or maple syrup',
      '1 cup oats',
      '1/2 cup ground flaxseed',
      '1/4 cup cocoa powder',
      'Pinch of sea salt',
    ],
    instructions: [
      'Mix peanut butter and honey together',
      'Fold in oats, flaxseed, and salt',
      'Roll into 1-inch balls',
      'Roll in cocoa powder if desired',
      'Refrigerate for 30 minutes',
      'Store in an airtight container in the fridge',
      'Enjoy as a pre-workout snack or anytime treat',
    ],
  },
  4: {
    ingredients: [
      '2 cups all-purpose flour',
      '1 cup Stilla Peanut Butter',
      '1/2 cup butter, softened',
      '3/4 cup sugar',
      '1/4 cup brown sugar',
      '2 eggs',
      '1 teaspoon vanilla extract',
      '1 teaspoon baking soda',
      '1/4 teaspoon salt',
      '1 cup chocolate chips',
    ],
    instructions: [
      'Preheat oven to 350°F (175°C)',
      'Cream butter and sugars together',
      'Beat in peanut butter, eggs, and vanilla',
      'Mix flour, baking soda, and salt',
      'Combine wet and dry ingredients',
      'Fold in chocolate chips',
      'Drop spoonfuls on baking sheet',
      'Bake for 10-12 minutes until golden',
      'Cool on wire rack before serving',
    ],
  },
  5: {
    ingredients: [
      '1/2 cup oats',
      '1/2 cup milk (dairy or plant-based)',
      '1/4 cup Stilla Peanut Butter',
      '1/2 ripe banana, mashed',
      '1 tablespoon honey',
      '1/4 teaspoon cinnamon',
      'Toppings: berries, granola, honey',
    ],
    instructions: [
      'Add oats and milk to a mason jar',
      'Stir in peanut butter and mashed banana',
      'Add honey and cinnamon',
      'Stir well to combine',
      'Cover and refrigerate overnight',
      'In the morning, stir and add more milk if needed',
      'Top with berries and granola',
      'Eat cold or heat in microwave for 1-2 minutes',
    ],
  },
  6: {
    ingredients: [
      '2 tablespoons vegetable oil',
      '1 onion, diced',
      '3 cloves garlic, minced',
      '4 cups vegetable broth',
      '1 can diced tomatoes',
      '1/2 cup Stilla Peanut Butter',
      '1 sweet potato, diced',
      '1 cup spinach',
      'Salt and pepper to taste',
      'Optional: scotch bonnet pepper',
    ],
    instructions: [
      'Heat oil and sauté onion and garlic',
      'Add vegetable broth and tomatoes',
      'Add diced sweet potato and bring to simmer',
      'Cook for 10 minutes until potatoes soften',
      'Stir in peanut butter until dissolved',
      'Add spinach and cook until wilted',
      'Season with salt, pepper, and optional hot pepper',
      'Simmer for 5 more minutes',
      'Serve hot with crusty bread',
    ],
  },
}

export default function RecipeModal({ recipe, isOpen, onClose }: RecipeModalProps) {
  if (!recipe) return null

  const details = recipeDetails[recipe.id] || { ingredients: [], instructions: [] }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <div className="sticky top-0 flex justify-between items-center p-6 border-b bg-white z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-amber-900">{recipe.title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-amber-50 rounded-full transition"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Recipe Image */}
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Recipe Meta */}
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-600">Prep Time</p>
                      <p className="font-semibold text-amber-900">{recipe.prepTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-600">Servings</p>
                      <p className="font-semibold text-amber-900">{recipe.servings}</p>
                    </div>
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <h3 className="text-xl font-bold text-amber-900 mb-4">Ingredients</h3>
                  <ul className="space-y-2">
                    {details.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-amber-600 font-bold mt-1">•</span>
                        <span className="text-gray-700">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-xl font-bold text-amber-900 mb-4">Instructions</h3>
                  <ol className="space-y-3">
                    {details.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-4">
                        <span className="text-amber-600 font-bold flex-shrink-0">{index + 1}.</span>
                        <span className="text-gray-700">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* CTA */}
                <div className="pt-6 border-t flex gap-4">
                  <Button
                    className="flex-1 bg-amber-900 hover:bg-amber-800 text-white font-bold py-3"
                    asChild
                  >
                    <Link href="/shop">Get Stilla Peanut Butter</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-amber-900 text-amber-900 py-3"
                    onClick={onClose}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
