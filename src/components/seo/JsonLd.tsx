import React from 'react';

export const JsonLd: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'YogaStudio',
    name: 'YOGGO - Modern Yoga Studio',
    alternateName: 'YOGGO Studio',
    url: 'https://yoggo-psi.vercel.app',
    logo: 'https://yoggo-psi.vercel.app/images/YOGGO.png',
    image: 'https://yoggo-psi.vercel.app/images/desktop.png',
    description:
      'Connect your body to your soul. Experience transformative yoga classes, certified instructors, daily schedules, and free trial classes at YOGGO Studio.',
    telephone: '+1-555-019-9446',
    email: 'contact@yoggostudio.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '124 Harmony Way',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94103',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.7749,
      longitude: -122.4194,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '06:00',
        closes: '21:00',
      },
    ],
    sameAs: [
      'https://www.instagram.com',
      'https://www.tiktok.com',
      'https://www.youtube.com',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Yoga Classes & Programs',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hatha Yoga',
            description:
              'Cultivate strength and alignment with foundational postures and deliberate breathing techniques.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Vinyasa Flow',
            description:
              'Flow with breath and dynamic movement in a continuous, cardiovascular sequence.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Kundalini Yoga',
            description:
              'Awaken inner energy and spiritual vitality through breathwork, kriyas, and chanting.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Ashtanga Yoga',
            description:
              'Structured athletic sequences designed for endurance, discipline, and detoxifying internal heat.',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
