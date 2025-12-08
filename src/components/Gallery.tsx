'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Media } from '@/payload-types'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryRow {
  ratio: [number, number] // [leftImageWidth, rightImageWidth] e.g., [1, 1] or [1, 2]
}

interface GalleryProps {
  images: (string | Media)[]
  /**
   * Optional: specify width ratio for each row. Each row has 2 images.
   * Examples:
   * - [{ ratio: [1, 1] }] - First row: 1:1 (equal width)
   * - [{ ratio: [1, 2] }] - First row: 1:2 (right image is 2x wider)
   * - [{ ratio: [1, 1] }, { ratio: [1, 2] }] - First row 1:1, second row 1:2
   * If not provided, defaults to 1:1 for all rows
   */
  rows?: GalleryRow[]
}

export const Gallery = ({ images, rows }: GalleryProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  if (!images || images.length === 0) return null

  const getImageUrl = (media: string | Media) => {
    if (typeof media === 'string') return media
    return media.url || ''
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedId === null) return
    setSelectedId((selectedId + 1) % images.length)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedId === null) return
    setSelectedId((selectedId - 1 + images.length) % images.length)
  }

  // Group images into rows of 2
  const imageRows: Array<[string | Media, (string | Media) | null, GalleryRow]> = []
  for (let i = 0; i < images.length; i += 2) {
    const leftImage = images[i]
    const rightImage = i + 1 < images.length ? images[i + 1] : null
    const rowIndex = Math.floor(i / 2)
    const rowConfig =
      rows && rows[rowIndex] ? rows[rowIndex] : { ratio: [1, 1] as [number, number] }
    imageRows.push([leftImage, rightImage, rowConfig])
  }

  return (
    <section className="py-10 md:py-20 bg-white">
      <div className="container mx-auto px-2 md:px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl md:text-4xl text-center text-text mb-8 md:mb-12 font-light"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Our Moments
        </motion.h2>

        <div className="space-y-1 md:space-y-6">
          {imageRows.map(([leftImage, rightImage, rowConfig], rowIndex) => {
            const [leftRatio, rightRatio] = rowConfig.ratio
            const totalRatio = leftRatio + rightRatio
            const leftWidth = `${(leftRatio / totalRatio) * 100}%`
            const rightWidth = rightImage ? `${(rightRatio / totalRatio) * 100}%` : '0%'

            return (
              <div key={rowIndex} className="flex gap-2 md:gap-6 w-full">
                {/* Left Image */}
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{ width: leftWidth }}
                  className="relative cursor-pointer overflow-hidden shadow-md hover:shadow-xl transition-shadow md:rounded-lg"
                  onClick={() => {
                    const imageIndex = rowIndex * 2
                    setSelectedId(imageIndex)
                  }}
                >
                  <div className="relative aspect-square w-full">
                    <Image
                      src={getImageUrl(leftImage)}
                      alt={`Gallery image ${rowIndex * 2 + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 40vw"
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </motion.div>

                {/* Right Image */}
                {rightImage && (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    style={{ width: rightWidth }}
                    className="relative cursor-pointer overflow-hidden shadow-md hover:shadow-xl transition-shadow md:rounded-lg"
                    onClick={() => {
                      const imageIndex = rowIndex * 2 + 1
                      setSelectedId(imageIndex)
                    }}
                  >
                    <div className="relative aspect-square w-full">
                      <Image
                        src={getImageUrl(rightImage)}
                        alt={`Gallery image ${rowIndex * 2 + 2}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 40vw"
                        className="object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>

        <AnimatePresence>
          {selectedId !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedId(null)}
            >
              <button
                className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
                onClick={() => setSelectedId(null)}
              >
                <X size={32} />
              </button>

              <button
                className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full hidden md:block"
                onClick={handlePrev}
              >
                <ChevronLeft size={40} />
              </button>

              <motion.div
                key={selectedId}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="relative w-full max-w-4xl aspect-[4/3] md:aspect-[16/9]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={getImageUrl(images[selectedId])}
                  alt="Gallery view"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-contain"
                />
              </motion.div>

              <button
                className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full hidden md:block"
                onClick={handleNext}
              >
                <ChevronRight size={40} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
