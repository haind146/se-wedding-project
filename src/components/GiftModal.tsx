'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Media } from '@/payload-types'

interface GiftModalProps {
  brideName: string
  groomName: string
  brideQRCode?: string | Media | null
  groomQRCode?: string | Media | null
  side?: 'bride' | 'groom' | 'default'
}

export const GiftModal = ({
  brideName,
  groomName,
  brideQRCode,
  groomQRCode,
  side = 'default',
}: GiftModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const defaultTab = side === 'groom' ? 'groom' : 'bride'
  const [activeTab, setActiveTab] = useState<'bride' | 'groom'>(defaultTab)

  const getImageUrl = (media: string | Media | null | undefined) => {
    if (!media) return null
    if (typeof media === 'string') return media
    return media.url || null
  }

  const brideQR = getImageUrl(brideQRCode)
  const groomQR = getImageUrl(groomQRCode)

  return (
    <>
      {/* Trigger Button - Always show */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 bg-transparent border-2 border-text text-text rounded-lg font-medium hover:bg-text hover:text-cream transition-colors font-sans"
      >
        Mừng cưới
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title */}
              <h3
                className="text-2xl md:text-3xl text-center text-text mb-6 font-light"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Mừng cưới
              </h3>

              {!brideQR && !groomQR ? (
                <p className="text-center text-secondary">
                  Thông tin mừng cưới sẽ được cập nhật sớm
                </p>
              ) : (
                <>
                  {/* Tabs */}
                  <div className="flex gap-2 mb-6">
                    {brideQR && (
                      <button
                        onClick={() => setActiveTab('bride')}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors border-2 font-sans ${
                          activeTab === 'bride'
                            ? 'bg-text text-cream border-text'
                            : 'bg-transparent text-text border-text hover:bg-text hover:text-cream'
                        }`}
                      >
                        Cô dâu
                      </button>
                    )}
                    {groomQR && (
                      <button
                        onClick={() => setActiveTab('groom')}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors border-2 font-sans ${
                          activeTab === 'groom'
                            ? 'bg-text text-cream border-text'
                            : 'bg-transparent text-text border-text hover:bg-text hover:text-cream'
                        }`}
                      >
                        Chú rể
                      </button>
                    )}
                  </div>

                  {/* QR Code Display */}
                  <div className="text-center">
                    <p className="text-lg text-text mb-4 font-medium">
                      {activeTab === 'bride' ? brideName : groomName}
                    </p>
                    {((activeTab === 'bride' && brideQR) || (activeTab === 'groom' && groomQR)) && (
                      <div className="relative w-full aspect-square max-w-sm mx-auto bg-gray-50 rounded-lg overflow-hidden">
                        <Image
                          src={activeTab === 'bride' ? brideQR! : groomQR!}
                          alt={`QR Code ${activeTab === 'bride' ? brideName : groomName}`}
                          fill
                          className="object-contain p-4"
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
