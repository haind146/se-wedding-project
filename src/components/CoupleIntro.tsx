'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Media } from '@/payload-types'
import { ParallaxSection } from './ParallaxSection'

interface CoupleIntroProps {
  bride: {
    name: string
    bio?: string | null
    photo?: string | Media | null
  }
  groom: {
    name: string
    bio?: string | null
    photo?: string | Media | null
  }
  backgroundImage?: string | Media | null
  guestName?: string | null
  ceremony?: {
    time?: string | null
    date?: string | null
    dayOfWeek?: string | null
    lunarDate?: string | null
    venueName?: string | null
    venueAddress?: string | null
    mapUrl?: string | null
  } | null
  side?: 'bride' | 'groom' | 'default'
}

export const CoupleIntro = ({
  bride,
  groom,
  backgroundImage,
  guestName,
  ceremony,
  side,
}: CoupleIntroProps) => {
  const getImageUrl = (media: string | Media | null | undefined) => {
    if (!media) return '/placeholder.jpg'
    if (typeof media === 'string') return media
    return media.url || '/placeholder.jpg'
  }

  return (
    <ParallaxSection
      backgroundImage={backgroundImage}
      className="flex items-center justify-center"
      speed={0.5}
      minHeight="80vh"
    >
      <div className="w-full py-20">
        <div className="text-center mb-12 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl text-text font-light mb-8 tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Trân Trọng Kính Mời
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl text-[#b48b3e] font-medium mb-8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {guestName || 'Quý Khách'}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-secondary font-light"
          >
            Đến dự lễ thành hôn của Hai chúng tôi
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row w-full gap-4 md:gap-6 px-4 md:px-8">
          {side === 'bride' ? (
            <>
              {/* Bride First */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full md:flex-1 aspect-[3/4] md:min-h-[600px] rounded-2xl overflow-hidden shadow-xl"
              >
                <Image
                  src={getImageUrl(bride.photo)}
                  alt={bride.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-0 right-0 text-center text-white">
                  <span className="block text-2xl md:text-3xl mb-1 text-white/90 font-serif tracking-widest">
                    Cô dâu
                  </span>
                  <h3
                    className="text-4xl md:text-5xl uppercase"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {bride.name}
                  </h3>
                </div>
              </motion.div>

              {/* Groom Second */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full md:flex-1 aspect-[3/4] md:min-h-[600px] rounded-2xl overflow-hidden shadow-xl"
              >
                <Image
                  src={getImageUrl(groom.photo)}
                  alt={groom.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-0 right-0 text-center text-white">
                  <span className="block text-2xl md:text-3xl mb-1 text-white/90 font-serif tracking-widest">
                    Chú rể
                  </span>
                  <h3
                    className="text-4xl md:text-5xl uppercase"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {groom.name}
                  </h3>
                </div>
              </motion.div>
            </>
          ) : (
            <>
              {/* Groom First (Default) */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full md:flex-1 aspect-[3/4] md:min-h-[600px] rounded-2xl overflow-hidden shadow-xl"
              >
                <Image
                  src={getImageUrl(groom.photo)}
                  alt={groom.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-0 right-0 text-center text-white">
                  <span className="block text-2xl md:text-3xl mb-1 text-white/90 font-serif tracking-widest">
                    Chú rể
                  </span>
                  <h3
                    className="text-4xl md:text-5xl uppercase"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {groom.name}
                  </h3>
                </div>
              </motion.div>

              {/* Bride Second */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full md:flex-1 aspect-[3/4] md:min-h-[600px] rounded-2xl overflow-hidden shadow-xl"
              >
                <Image
                  src={getImageUrl(bride.photo)}
                  alt={bride.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-0 right-0 text-center text-white">
                  <span className="block text-2xl md:text-3xl mb-1 text-white/90 font-serif tracking-widest">
                    Cô dâu
                  </span>
                  <h3
                    className="text-4xl md:text-5xl uppercase"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {bride.name}
                  </h3>
                </div>
              </motion.div>
            </>
          )}
        </div>

        {/* Ceremony Information */}
        {ceremony && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 md:mt-16 text-center px-4 max-w-3xl mx-auto"
          >
            <h3 className="text-xl md:text-2xl text-text mb-16 font-light">
              Hôn lễ được tổ chức vào
            </h3>

            {/* Time and Date */}
            <div className="flex justify-center items-stretch gap-4 md:gap-8 mb-12 max-w-4xl mx-auto">
              <div className="flex-1 max-w-[200px] text-center flex items-center justify-center">
                <span className="text-2xl md:text-4xl font-light text-text tracking-wider whitespace-pre-line">
                  {ceremony.time?.replace(/ /g, '\n') || '11\nGIỜ'}
                </span>
              </div>
              <div className="w-px self-stretch bg-text/30"></div>
              <div className="flex-1 max-w-[200px] text-center flex items-center justify-center">
                <div className="text-3xl md:text-5xl font-light text-text tracking-wide whitespace-pre-line">
                  {ceremony.date?.replace(/ /g, '\n') || '02\n01\n25'}
                </div>
              </div>
              <div className="w-px self-stretch bg-text/30"></div>
              <div className="flex-1 max-w-[200px] text-center flex items-center justify-center">
                <span className="text-2xl md:text-4xl font-light text-text tracking-wider whitespace-pre-line">
                  {ceremony.dayOfWeek?.replace(/ /g, '\n') || 'CHỦ\nNHẬT'}
                </span>
              </div>
            </div>

            {/* Lunar Date */}
            {ceremony.lunarDate && (
              <p className="text-sm md:text-base text-secondary mb-16">({ceremony.lunarDate})</p>
            )}

            {/* Venue */}
            <div className="mb-20">
              <h4 className="text-lg md:text-xl text-text mb-2 font-medium">Địa điểm</h4>
              {ceremony.mapUrl ? (
                <a
                  href={ceremony.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl md:text-2xl font-medium text-text mb-2 uppercase tracking-wide underline hover:text-primary transition-colors block"
                >
                  {ceremony.venueName || 'TRUNG TÂM TIỆC CƯỚI VINADECO'}
                </a>
              ) : (
                <p className="text-xl md:text-2xl font-medium text-text mb-2 uppercase tracking-wide">
                  {ceremony.venueName || 'TRUNG TÂM TIỆC CƯỚI VINADECO'}
                </p>
              )}
              <p className="text-base md:text-lg text-text">
                {ceremony.venueAddress ||
                  'Địa chỉ: Số 133 Trần Nhân Tông, Phường Quảng Yên, Quảng Ninh'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#rsvp"
                className="px-8 py-3 bg-transparent border-2 border-text text-text font-medium rounded-full hover:bg-text hover:text-white transition-colors duration-300 uppercase tracking-wide"
              >
                Xác nhận tham dự
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </ParallaxSection>
  )
}
