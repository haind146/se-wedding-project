import { CollectionConfig } from 'payload'

export const BrideGuests: CollectionConfig = {
  slug: 'bride-guests',
  labels: {
    singular: 'Bride Guest',
    plural: 'Bride Guests',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'code', 'numberOfGuests', 'status'],
    group: 'Bride Family',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
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
