import type { CollectionConfig } from 'payload'

export const Guests: CollectionConfig = {
  slug: 'guests',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'code', 'numberOfGuests', 'status'],
  },
  access: {
    read: () => true,
    create: () => true, // Allow public creation for RSVP? Or maybe just update?
    update: () => true, // Allow public update for RSVP
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'isGeneralInvite',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Declined', value: 'declined' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'wishes',
      type: 'textarea',
    },
    {
      name: 'numberOfGuests',
      type: 'number',
      label: 'Number of Guests',
      min: 1,
      defaultValue: 1,
    },
  ],
}
