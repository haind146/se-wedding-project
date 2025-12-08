'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'

interface ParallaxSectionProps {
  backgroundImage?: string | Media | null
  children: React.ReactNode
  className?: string
  speed?: number // Parallax speed (0.1 - 1.0, lower = slower)
  minHeight?: string
}

export const ParallaxSection = ({
  backgroundImage,
  children,
  className = '',
  speed = 0.5,
  minHeight = '100vh',
}: ParallaxSectionProps) => {
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const sectionHeight = rect.height
        const sectionTop = rect.top

        // Calculate how much of the section has been scrolled
        // When section top is at viewport top: progress = 0
        // When section bottom is at viewport bottom: progress = 1
        const totalScrollable = windowHeight + sectionHeight
        const scrolled = windowHeight - sectionTop
        const scrollProgress = Math.max(0, Math.min(1, scrolled / totalScrollable))

        // Image height is larger than section to allow scrolling through it
        // Calculate how much the image should move to show the corresponding part
        // Image moves opposite to scroll direction (parallax effect)
        const imageExtraHeight = sectionHeight * 2 // Image is 3x section height
        const maxTranslate = imageExtraHeight * speed

        // Map scroll progress to image position
        // At start (progress = 0): show top of image (translateY = 0)
        // At end (progress = 1): show bottom of image (translateY = -maxTranslate)
        const translateY = -scrollProgress * maxTranslate

        setScrollY(translateY)
      }
    }

    const handleScrollThrottled = () => {
      requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', handleScrollThrottled, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScrollThrottled)
  }, [speed])

  const getImageUrl = (media: string | Media | null | undefined) => {
    if (!media) return ''
    if (typeof media === 'string') return media
    return media.url || ''
  }

  const imageUrl = getImageUrl(backgroundImage)

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight }}
    >
      {/* Parallax Background Image */}
      {imageUrl && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className="relative w-full"
            style={{
              transform: `translateY(${scrollY}px)`,
              willChange: 'transform',
              height: '300%', // 3x section height to allow scrolling through image
              top: 0, // Start from top
            }}
          >
            <Image
              src={imageUrl}
              alt="Background"
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
              quality={95}
            />
          </div>
        </div>
      )}

      {/* Content */}
      {children && <div className="relative z-10">{children}</div>}
    </section>
  )
}
