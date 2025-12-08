import type { GlobalConfig } from 'payload'
import { WeddingDetails } from './WeddingDetails'

export const BrideWeddingDetails: GlobalConfig = {
  ...WeddingDetails,
  slug: 'bride-wedding-details',
  label: 'Bride Wedding Details',
  admin: {
    group: 'Bride Family',
  },
}
