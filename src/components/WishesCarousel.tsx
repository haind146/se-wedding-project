'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Guest {
  id: string
  name: string
  wishes?: string | null
}

interface WishesCarouselProps {
  guests: Guest[]
}

export const WishesCarousel = ({ guests }: WishesCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Filter guests with wishes
  const guestsWithWishes = guests.filter((g) => g.wishes && g.wishes.trim())

  useEffect(() => {
    if (guestsWithWishes.length === 0) return

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % guestsWithWishes.length)
    }, 3000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [guestsWithWishes.length])

  if (guestsWithWishes.length === 0) return null

  const currentGuest = guestsWithWishes[currentIndex]

  return (
    <section className="pb-16 bg-cream">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="relative min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentGuest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-xl md:text-2xl text-text mb-4 italic leading-relaxed">
                &ldquo;{currentGuest.wishes}&rdquo;
              </p>
              <p className="text-base md:text-lg text-secondary font-medium">
                — {currentGuest.name}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots indicator */}
        {guestsWithWishes.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {guestsWithWishes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-text w-6' : 'bg-text/30'
                }`}
                aria-label={`Go to wish ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
