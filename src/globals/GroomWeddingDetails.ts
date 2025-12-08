import type { GlobalConfig } from 'payload'
import { WeddingDetails } from './WeddingDetails'

export const GroomWeddingDetails: GlobalConfig = {
  ...WeddingDetails,
  slug: 'groom-wedding-details',
  label: 'Groom Wedding Details',
  admin: {
    group: 'Groom Family',
  },
}
