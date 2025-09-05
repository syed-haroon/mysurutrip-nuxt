import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),
    activities: defineCollection({
      type: 'page',
      source: 'activities/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        type: z.string(),
        category: z.string(),
        location: z.string(),
        duration: z.string(),
        price: z.string(),
        rating: z.number(),
        images: z.array(z.string()),
        highlights: z.array(z.string()),
        contact: z.object({
          phone: z.string(),
          email: z.string(),
          whatsapp: z.string(),
        }),
        coordinates: z.object({
          lat: z.number(),
          lng: z.number(),
        }),
        path: z.string().optional(), // Add path field for slug-based querying
      }),
    }),
    hotels: defineCollection({
      type: 'page',
      source: 'hotels/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        type: z.string(),
        category: z.string(),
        location: z.string(),
        rating: z.number(),
        priceRange: z.string(),
        images: z.array(z.string()),
        amenities: z.array(z.string()),
        features: z.array(z.string()),
        contact: z.object({
          phone: z.string(),
          email: z.string(),
          whatsapp: z.string(),
        }),
        coordinates: z.object({
          lat: z.number(),
          lng: z.number(),
        }),
        path: z.string().optional(), // Add path field for slug-based querying
      }),
    }),
    explore: defineCollection({
      type: 'page',
      source: 'explore/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        type: z.string(),
        category: z.string(),
        location: z.string(),
        rating: z.number(),
        visitDuration: z.string(),
        images: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional(),
        entryFee: z.string().optional(),
        timings: z.string().optional(),
        bestTimeToVisit: z.string().optional(),
        nearbyAttractions: z.array(z.string()).optional(),
        path: z.string().optional(),
      }),
    }),
  },
});
