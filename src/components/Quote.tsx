'use client'

import { motion } from 'framer-motion'
import { ParallaxSection } from './ParallaxSection'
import { Media } from '@/payload-types'

interface QuoteProps {
  quote?: string | null
  author?: string | null
  backgroundImage?: string | Media | null
}

export const Quote = ({ quote, author, backgroundImage }: QuoteProps) => {
  const defaultQuote =
    'Tình yêu không phải là nhìn nhau, mà là cùng nhìn về một hướng. Hôm nay, chúng ta bắt đầu viết chương đầu tiên của câu chuyện tuyệt vời mà không ai trên đời này đã từng đọc: một câu chuyện sẽ kéo dài mãi mãi, và mỗi chương mới sẽ tuyệt vời hơn chương trước.'

  return (
    <ParallaxSection
      backgroundImage={backgroundImage}
      className="flex items-center justify-center"
      speed={0.4}
      minHeight="60vh"
    >
      <div className="container mx-auto px-4 max-w-3xl py-20">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p
            className="text-2xl md:text-3xl lg:text-4xl text-text italic leading-relaxed mb-4"
            style={{ fontFamily: 'var(--font-handwriting)' }}
          >
            &ldquo;{quote || defaultQuote}&rdquo;
          </p>
          {author && <p className="text-sm text-secondary font-sans">{author}</p>}
        </motion.blockquote>
      </div>
    </ParallaxSection>
  )
}
