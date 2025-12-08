'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function updateGuestRSVP(
  id: string,
  data: {
    status: 'confirmed' | 'declined'
    wishes: string
    numberOfGuests?: number
  },
  side?: 'bride' | 'groom' | 'default',
) {
  const payload = await getPayload({ config })
  const collection =
    side === 'bride' ? 'bride-guests' : side === 'groom' ? 'groom-guests' : 'guests'

  await payload.update({
    collection: collection as any,
    id,
    data: {
      status: data.status,
      wishes: data.wishes,
      numberOfGuests: data.numberOfGuests,
    },
  })
}

export async function submitRSVP(
  data: {
    name: string
    numberOfGuests: number
    wishes: string
  },
  side?: 'bride' | 'groom' | 'default',
) {
  const payload = await getPayload({ config })
  const collection =
    side === 'bride' ? 'bride-guests' : side === 'groom' ? 'groom-guests' : 'guests'

  // Generate a unique code for the guest
  const code = `guest-${Date.now()}-${Math.random().toString(36).substring(7)}`

  const guest = await payload.create({
    collection: collection as any,
    data: {
      name: data.name,
      code,
      status: 'confirmed',
      wishes: data.wishes,
      numberOfGuests: data.numberOfGuests,
      isGeneralInvite: true,
    },
  })

  return guest
}
