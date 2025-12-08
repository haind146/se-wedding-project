'use client'

import { motion } from 'framer-motion'

interface TimelineEvent {
  id?: string | null
  time: string
  title: string
  description?: string | null
  location?: string | null
  mapUrl?: string | null
}

interface TimelineProps {
  events: TimelineEvent[]
}

export const Timeline = ({ events }: TimelineProps) => {
  if (!events || events.length === 0) return null

  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl md:text-4xl text-center text-text mb-16 font-light"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Chương trình
        </motion.h2>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[120px] md:left-[180px] top-0 bottom-0 w-[2px] bg-text/40"></div>

          {/* Events */}
          <div className="space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={event.id || index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex gap-8 md:gap-12 items-start"
              >
                {/* Time - Left Column */}
                <div className="w-[100px] md:w-[160px] text-right flex-shrink-0">
                  <div className="text-xl md:text-2xl text-secondary font-light">{event.time}</div>
                </div>

                {/* Dot - Absolutely positioned on the line */}
                <div className="absolute left-[115px] md:left-[175px] top-2">
                  <div className="w-3 h-3 rounded-full bg-text relative z-10"></div>
                </div>

                {/* Spacer for dot */}
                <div className="w-[20px] flex-shrink-0"></div>

                {/* Content - Right Column */}
                <div className="flex-1 pb-8">
                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl text-text mb-3 font-medium">{event.title}</h3>

                  {/* Location */}
                  {event.location && (
                    <div className="text-base md:text-lg text-secondary mb-2">
                      {event.mapUrl ? (
                        <a
                          href={event.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-primary transition-colors"
                        >
                          {event.location}
                        </a>
                      ) : (
                        event.location
                      )}
                    </div>
                  )}

                  {/* Description */}
                  {event.description && (
                    <p className="text-base md:text-lg text-text whitespace-pre-line">
                      {event.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
