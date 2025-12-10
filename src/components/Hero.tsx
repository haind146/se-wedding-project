'use client'

import { motion } from 'framer-motion'

interface HeroProps {
  guest?: {
    name: string
    isGeneralInvite?: boolean | null
  } | null
  bride?: {
    name: string
  } | null
  groom?: {
    name: string
  } | null
  side?: 'bride' | 'groom' | 'default'
}

export const Hero = ({ guest, bride, groom, side = 'default' }: HeroProps) => {
  const showBrideFirst = side === 'bride'

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-cream text-center p-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 max-w-4xl mx-auto"
      >
        <h3
          className="text-lg md:text-xl text-secondary mb-12 font-light tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {'SAVE THE DATE'}
        </h3>

        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-text font-light tracking-tight">
            {groom?.name && bride?.name ? (
              <>
                <div className="text-left ml-0 md:ml-[-2rem]">
                  {showBrideFirst ? bride.name : groom.name}
                </div>
                <div className="text-right mr-0 md:mr-[-2rem] mt-4 md:mt-6">
                  {showBrideFirst ? groom.name : bride.name}
                </div>
              </>
            ) : (
              <>
                <div className="text-left ml-0 md:ml-[-2rem]">
                  {showBrideFirst ? 'Thu Hương' : 'Tùng Anh'}
                </div>
                <div className="text-right mr-0 md:mr-[-2rem] mt-4 md:mt-6">
                  {showBrideFirst ? 'Tùng Anh' : 'Thu Hương'}
                </div>
              </>
            )}
          </h1>
        </div>

        <p
          className="text-base md:text-lg text-secondary mb-6 font-light"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          The wedding day
        </p>

        <p
          className="text-3xl md:text-4xl text-text mb-12 font-light"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          31.12.2025
        </p>

        {guest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-12"
          >
            <p className="text-text font-sans leading-relaxed text-lg">
              {guest.isGeneralInvite
                ? 'Chúng tôi rất vinh dự được mời bạn tham dự ngày đặc biệt của chúng tôi.'
                : 'Cùng với gia đình, chúng tôi mời bạn đến tham dự lễ cưới của chúng tôi.'}
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
