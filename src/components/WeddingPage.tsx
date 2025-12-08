import { getPayload } from 'payload'
import config from '@payload-config'
import { Hero } from '@/components/Hero'
import { CoupleIntro } from '@/components/CoupleIntro'
import { Timeline } from '@/components/Timeline'
import { Gallery } from '@/components/Gallery'
import { RSVP } from '@/components/RSVP'
import { Quote } from '@/components/Quote'
import { StorySection } from '@/components/StorySection'
import { WishesCarousel } from '@/components/WishesCarousel'

interface WeddingPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  side?: 'bride' | 'groom' | 'default'
}

export async function WeddingPage({ searchParams, side = 'default' }: WeddingPageProps) {
  const payload = await getPayload({ config })
  const params = await searchParams
  const guestCode = typeof params.guest === 'string' ? params.guest : undefined

  // Fetch Wedding Details based on side
  const globalSlug =
    side === 'bride'
      ? 'bride-wedding-details'
      : side === 'groom'
        ? 'groom-wedding-details'
        : 'wedding-details'

  const weddingDetails = (await payload.findGlobal({
    slug: globalSlug as any,
    depth: 2,
  })) as any

  // Determine Guest Collection
  const guestCollection =
    side === 'bride' ? 'bride-guests' : side === 'groom' ? 'groom-guests' : 'guests'

  // Fetch Guest if code is present
  let guest = null
  if (guestCode) {
    const guests = await payload.find({
      collection: guestCollection as any,
      where: {
        code: {
          equals: guestCode,
        },
      },
    })
    if (guests.docs.length > 0) {
      guest = guests.docs[0]
    }
  }

  // Fetch all confirmed guests with wishes for carousel
  const confirmedGuests = await payload.find({
    collection: guestCollection as any,
    where: {
      status: {
        equals: 'confirmed',
      },
      wishes: {
        exists: true,
      },
    },
    limit: 100,
  })

  // Determine order and defaults based on side
  // Default is Groom & Bride (traditional?) or just as is.
  // If 'bride', prioritize bride. If 'groom', prioritize groom.

  // Actually, usually "Groom" side puts Groom name first. "Bride" side puts Bride name first.
  // The current Hero component might need props to swap.
  // But let's look at what we can control from here.

  // We'll pass `side` to components that might care.
  // For now, let's keep it simple and just pass the data.
  // Customization will happen inside components or wrapper props.

  return (
    <main className="min-h-screen bg-cream overflow-x-hidden flex flex-col">
      <Hero
        guest={guest}
        bride={weddingDetails.bride || null}
        groom={weddingDetails.groom || null}
        side={side}
      />

      <Quote
        quote={weddingDetails.quote || null}
        author={weddingDetails.quoteAuthor || null}
        backgroundImage={weddingDetails.quoteBackgroundImage || null}
      />

      {weddingDetails.bride && weddingDetails.groom && (
        <CoupleIntro
          bride={weddingDetails.bride}
          groom={weddingDetails.groom}
          backgroundImage={weddingDetails.coupleBackgroundImage || null}
          guestName={guest?.name}
          ceremony={weddingDetails.ceremony || null}
          side={side}
        />
      )}

      {weddingDetails.timeline && (
        <Timeline
          events={weddingDetails.timeline.map((e: any) => ({
            ...e,
            id: e.id || null,
            description: e.description || null,
            location: e.location || null,
            mapUrl: e.mapUrl || null,
          }))}
        />
      )}

      {/* Custom Sections from Admin */}
      {weddingDetails.customSections && weddingDetails.customSections.length > 0 && (
        <>
          {weddingDetails.customSections.map((section: any, index: number) => (
            <StorySection
              key={index}
              title={section.title || null}
              content={section.content || null}
              backgroundImage={section.backgroundImage || null}
              parallaxSpeed={section.parallaxSpeed || null}
              minHeight={section.minHeight || null}
              enabled={section.enabled !== false}
            />
          ))}
        </>
      )}

      <Gallery images={weddingDetails.galleryImages || []} />

      <RSVP
        guest={guest}
        giftInfo={weddingDetails.giftConfig || null}
        brideName={weddingDetails.bride?.name || 'Cô dâu'}
        groomName={weddingDetails.groom?.name || 'Chú rể'}
        side={side}
      />

      <WishesCarousel
        guests={confirmedGuests.docs.map((g) => ({
          id: g.id,
          name: g.name,
          wishes: g.wishes || null,
        }))}
      />

      {/* Footer */}
      <footer className="bg-text text-cream py-8 text-center mt-auto">
        <p className="font-serif text-xl font-light">
          {weddingDetails.groom?.name && weddingDetails.bride?.name
            ? side === 'bride'
              ? `${weddingDetails.bride.name} & ${weddingDetails.groom.name} • 2025`
              : `${weddingDetails.groom.name} & ${weddingDetails.bride.name} • 2025`
            : 'Se & Huong • 2025'}
        </p>
      </footer>
    </main>
  )
}
