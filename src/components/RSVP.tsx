'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { updateGuestRSVP, submitRSVP } from '@/app/actions'
import { GiftModal } from './GiftModal'
import { Media } from '@/payload-types'

interface RSVPProps {
  guest?: {
    id: string
    name: string
    status?: 'pending' | 'confirmed' | 'declined' | null
    wishes?: string | null
    numberOfGuests?: number | null
  } | null
  giftInfo?: {
    brideQRCode?: string | Media | null
    groomQRCode?: string | Media | null
  } | null
  brideName?: string
  groomName?: string
  side?: 'bride' | 'groom' | 'default'
}

export const RSVP = ({ guest, giftInfo, brideName, groomName, side }: RSVPProps) => {
  const [name, setName] = useState(guest?.name || '')
  const [numberOfGuests, setNumberOfGuests] = useState(guest?.numberOfGuests || 1)
  const [wishes, setWishes] = useState(guest?.wishes || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setMessage('Vui lòng nhập tên của bạn')
      return
    }

    if (numberOfGuests < 1) {
      setMessage('Số lượng người tham dự phải lớn hơn 0')
      return
    }

    setIsSubmitting(true)
    setMessage('')

    try {
      if (guest?.id) {
        // Update existing guest
        await updateGuestRSVP(
          guest.id,
          {
            status: 'confirmed',
            wishes,
            numberOfGuests,
          },
          side,
        )
      } else {
        // Create new guest
        await submitRSVP(
          {
            name: name.trim(),
            numberOfGuests,
            wishes,
          },
          side,
        )
      }
      setIsSubmitted(true)
      setMessage('Cảm ơn bạn đã xác nhận tham dự!')
    } catch (_error) {
      setMessage('Đã có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-cream p-8 md:p-12 rounded-lg text-center max-w-3xl mx-auto"
          >
            <h2
              className="text-3xl md:text-4xl text-text mb-4 font-light"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Cảm ơn bạn!
            </h2>
            <p className="text-text font-sans mb-6">
              {message || 'Chúng tôi rất mong được gặp bạn trong ngày đặc biệt này!'}
            </p>

            {/* Gift Modal in success state */}
            <div>
              <GiftModal
                brideName={brideName || 'Cô dâu'}
                groomName={groomName || 'Chú rể'}
                brideQRCode={giftInfo?.brideQRCode}
                groomQRCode={giftInfo?.groomQRCode}
                side={side}
              />
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="py-10 bg-cream">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-cream md:p-12 rounded-lg max-w-3xl mx-auto"
        >
          <h2
            className="text-3xl md:text-4xl text-center text-text mb-8 font-light"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Xác nhận tham dự
          </h2>
          <p className="text-center text-text mb-6 font-sans">
            Vui lòng điền thông tin để xác nhận tham dự
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text mb-2 font-sans">
                Tên của bạn <span className="text-secondary">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 border-2 border-text rounded-lg bg-transparent focus:ring-2 focus:ring-text/50 focus:border-text outline-none transition-shadow font-sans disabled:bg-gray-100"
                placeholder="Nhập tên của bạn"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2 font-sans">
                Số lượng người tham dự <span className="text-secondary">*</span>
              </label>
              <input
                type="number"
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(parseInt(e.target.value) || 1)}
                min={1}
                required
                className="w-full p-3 border-2 border-text rounded-lg bg-transparent focus:ring-2 focus:ring-text/50 focus:border-text outline-none transition-shadow font-sans"
                placeholder="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2 font-sans">
                Lời chúc của bạn
              </label>
              <textarea
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                className="w-full p-3 border-2 border-text rounded-lg bg-transparent focus:ring-2 focus:ring-text/50 focus:border-text outline-none transition-shadow font-sans"
                rows={4}
                placeholder="Gửi lời chúc đến cặp đôi..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-text text-cream rounded-lg font-medium hover:bg-secondary transition-colors disabled:opacity-50 font-sans"
            >
              {isSubmitting ? 'Đang gửi...' : 'Xác nhận tham dự'}
            </button>

            {message && (
              <p
                className={`text-center font-medium font-sans ${
                  message.includes('Cảm ơn') ? 'text-secondary' : 'text-red-600'
                }`}
              >
                {message}
              </p>
            )}
          </form>

          {/* Gift Modal - Outside form so it's always visible */}
          <div className="mt-6">
            <GiftModal
              brideName={brideName || 'Cô dâu'}
              groomName={groomName || 'Chú rể'}
              brideQRCode={giftInfo?.brideQRCode}
              groomQRCode={giftInfo?.groomQRCode}
              side={side}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
