import type { GlobalConfig } from 'payload'

export const WeddingDetails: GlobalConfig = {
  slug: 'wedding-details',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'bride',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'bio', type: 'textarea' },
        { name: 'photo', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'groom',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'bio', type: 'textarea' },
        { name: 'photo', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'timeline',
      type: 'array',
      fields: [
        { name: 'time', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'location', type: 'text' },
        { name: 'mapUrl', type: 'text', label: 'Map URL' },
      ],
    },
    {
      name: 'quote',
      type: 'textarea',
      label: 'Quote',
    },
    {
      name: 'quoteAuthor',
      type: 'text',
      label: 'Quote Author',
    },
    {
      name: 'quoteBackgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Quote Section Background Image',
    },
    {
      name: 'coupleBackgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Couple Section Background Image',
    },
    {
      name: 'ceremony',
      type: 'group',
      label: 'Ceremony Information',
      fields: [
        { name: 'time', type: 'text', label: 'Time (e.g., 11 GIỜ)', required: true },
        { name: 'date', type: 'text', label: 'Date (e.g., 02 THÁNG 01 25)', required: true },
        { name: 'dayOfWeek', type: 'text', label: 'Day of Week (e.g., CHỦ NHẬT)' },
        {
          name: 'lunarDate',
          type: 'text',
          label: 'Lunar Date (e.g., Túc ngày 13 tháng 09 năm Ất Tỵ)',
        },
        { name: 'venueName', type: 'text', label: 'Venue Name', required: true },
        { name: 'venueAddress', type: 'textarea', label: 'Venue Address', required: true },
        { name: 'mapUrl', type: 'text', label: 'Google Maps URL' },
      ],
    },
    {
      name: 'giftConfig',
      type: 'group',
      label: 'Gift/Donation Information',
      fields: [
        { name: 'brideQRCode', type: 'upload', relationTo: 'media', label: 'Bride QR Code' },
        { name: 'groomQRCode', type: 'upload', relationTo: 'media', label: 'Groom QR Code' },
      ],
    },
    {
      name: 'venue',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'address', type: 'textarea', required: true },
        { name: 'mapUrl', type: 'text' },
      ],
    },
    {
      name: 'customSections',
      type: 'array',
      label: 'Custom Sections',
      admin: {
        description: 'Add custom sections with parallax background images',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Section',
          defaultValue: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
        },
        {
          name: 'content',
          type: 'textarea',
          label: 'Section Content',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
        },
        {
          name: 'parallaxSpeed',
          type: 'number',
          label: 'Parallax Speed',
          defaultValue: 0.5,
          admin: {
            description: 'Speed of parallax effect (0.1 - 1.0, lower = slower)',
          },
          min: 0.1,
          max: 1.0,
          step: 0.1,
        },
        {
          name: 'minHeight',
          type: 'text',
          label: 'Minimum Height',
          defaultValue: '70vh',
          admin: {
            description: 'CSS value (e.g., 70vh, 500px)',
          },
        },
      ],
    },
    {
      name: 'galleryImages',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      label: 'Gallery Images',
      admin: {
        description:
          'Select images to display in the "Our Moments" gallery section. If empty, no images will be shown.',
      },
    },
  ],
}
