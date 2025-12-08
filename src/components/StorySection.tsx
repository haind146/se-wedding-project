'use client'

import { motion } from 'framer-motion'
import { ParallaxSection } from './ParallaxSection'
import { Media } from '@/payload-types'

interface StorySectionProps {
  title?: string | null
  content?: string | null
  backgroundImage?: string | Media | null
  parallaxSpeed?: number | null
  minHeight?: string | null
  enabled?: boolean | null
}

export const StorySection = ({
  title,
  content,
  backgroundImage,
  parallaxSpeed = 0.6,
  minHeight = '70vh',
  enabled = true,
}: StorySectionProps) => {
  // Show section if enabled and has either background image, title, or content
  if (!enabled || (!backgroundImage && !title && !content)) return null

  return (
    <ParallaxSection
      backgroundImage={backgroundImage}
      className="flex items-center justify-center"
      speed={parallaxSpeed || 0.6}
      minHeight={minHeight || '70vh'}
    >
      {(title || content) && (
        <div className="container mx-auto px-4 max-w-4xl py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {title && (
              <h2
                className="text-3xl md:text-4xl text-text mb-8 font-light"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {title}
              </h2>
            )}
            {content && (
              <div className="text-lg font-sans text-text leading-relaxed whitespace-pre-line">
                {content}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </ParallaxSection>
  )
}
