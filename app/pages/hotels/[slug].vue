<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hotel Detail -->
    <div v-if="hotel">
      <!-- Hero Section -->
      <div class="relative">
        <HeroSection
          :images="hotel.images || []"
          :title="getDisplayName(hotel)"
          :location="hotel.location"
        />
        <div class="absolute top-0 right-0 p-4 z-10">
          <SocialShareDropdown
            :title="getDisplayName(hotel)"
            :description="hotel.description || `Experience luxury at ${getDisplayName(hotel)} in ${hotel.location}. Book your perfect stay in Mysuru.`"
            :image="getFeaturedImage(hotel.images)"
          />
        </div>
        <div
          v-if="hotel"
          class="absolute bottom-0 right-0 p-4 z-10"
        >
          <ImageGalleryDialog
            :images="hotel.allImages || hotel.images || []"
            :title="getDisplayName(hotel)"
            :model-value="isImageGalleryOpen"
            button-style="blue"
            @update:model-value="isImageGalleryOpen = $event"
          />
        </div>
      </div>

      <div class="max-w-7xl mx-auto pt-8 pb-12 px-4">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Hotel Info -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-bold text-gray-900">
                  About This Property
                </h2>
                <div class="flex items-center gap-3">
                  <div class="flex items-center gap-2">
                    <div class="flex items-center">
                      <icon
                        name="lucide:star"
                        class="w-5 h-5 text-yellow-400 fill-current"
                      />
                      <span class="ml-1 font-semibold">{{ hotel.rating }}</span>
                    </div>
                    <ui-badge variant="secondary">
                      {{ hotel.category }}
                    </ui-badge>
                  </div>
                </div>
              </div>

              <div class="prose max-w-none">
                <div
                  v-if="hotel.description"
                  class="prose-content"
                >
                  {{ hotel.description }}
                </div>
                <p
                  v-else
                  class="text-gray-600"
                >
                  Experience luxury and comfort at {{ getDisplayName(hotel) }}. Located in the heart of {{ hotel.location }},
                  this property offers exceptional amenities and warm hospitality for your perfect stay in Mysuru.
                </p>
              </div>
            </div>

            <!-- Amenities -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4">
                Amenities
              </h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="flex items-center gap-3">
                  <icon
                    name="lucide:wifi"
                    class="w-5 h-5 text-green-600"
                  />
                  <span>Free WiFi</span>
                </div>
                <div class="flex items-center gap-3">
                  <icon
                    name="lucide:parking-circle"
                    class="w-5 h-5 text-green-600"
                  />
                  <span>Free Parking</span>
                </div>
                <div class="flex items-center gap-3">
                  <icon
                    name="lucide:utensils"
                    class="w-5 h-5 text-green-600"
                  />
                  <span>Restaurant</span>
                </div>
                <div class="flex items-center gap-3">
                  <icon
                    name="lucide:dumbbell"
                    class="w-5 h-5 text-green-600"
                  />
                  <span>Fitness Center</span>
                </div>
                <div class="flex items-center gap-3">
                  <icon
                    name="lucide:droplets"
                    class="w-5 h-5 text-green-600"
                  />
                  <span>Swimming Pool</span>
                </div>
                <div class="flex items-center gap-3">
                  <icon
                    name="lucide:car"
                    class="w-5 h-5 text-green-600"
                  />
                  <span>Airport Shuttle</span>
                </div>
              </div>
            </div>

            <!-- Location -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4">
                Location
              </h3>
              <div class="flex items-start gap-4">
                <icon
                  name="lucide:map-pin"
                  class="w-6 h-6 text-red-500 mt-1"
                />
                <div>
                  <p class="font-medium">
                    {{ hotel.location }}
                  </p>
                  <p class="text-gray-600 text-sm mt-1">
                    Conveniently located near major attractions and transportation hubs
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <DetailSidebar
            type="hotel"
            :item="hotel"
            :is-in-wishlist="isInWishlist"
            :show-price-card="true"
            @add-to-wishlist="addToWishlist"
          />
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-else-if="pending"
      class="min-h-screen flex items-center justify-center"
    >
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4" />
        <p class="text-gray-600">
          Loading hotel details...
        </p>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else
      class="min-h-screen flex items-center justify-center"
    >
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">
          Hotel Not Found
        </h2>
        <p class="text-gray-600 mb-6">
          The hotel you're looking for doesn't exist.
        </p>
        <ui-button
          variant="outline"
          @click="navigateTo('/hotels')"
        >
          Back to Hotels
        </ui-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HotelsCollectionItem } from '@nuxt/content';

type Hotel = HotelsCollectionItem;

// Route params
const route = useRoute();
const slug = route.params.slug as string;

// Gallery dialog state
const isImageGalleryOpen = ref(false);

// Stores
const wishlistStore = useWishlistStore();
const siteStore = useSiteStore();

// Helper function to get featured image or first image
const getFeaturedImage = (images: unknown[] | undefined) => {
  if (!images || images.length === 0) return null;

  // If images is an array of objects with imgURL property
  if (typeof images[0] === 'object' && images[0] && 'imgURL' in images[0]) {
    const featuredImage = images.find(img => img && typeof img === 'object' && 'isFeatured' in img && img.isFeatured);
    return featuredImage && typeof featuredImage === 'object' && 'imgURL' in featuredImage
      ? featuredImage.imgURL as string
      : (images[0] as { imgURL: string }).imgURL;
  }

  // If images is an array of strings (legacy format)
  return images[0] as string;
};

// Helper function to get display name based on admin status
const getDisplayName = (hotel: Hotel) => {
  if (siteStore.isAdmin) {
    return `${hotel.displayName || hotel.title} (${hotel.title})`;
  }
  return hotel.displayName || hotel.title;
};

// Fetch hotel data using Nuxt Content v3
const { data: hotel, pending } = await useAsyncData<Hotel | null>(
  `hotel-${slug}`,
  () =>
    queryCollection('hotels')
      .where('path', '=', slug)
      .first(),
);

// SEO - After data fetching
const siteUrl = 'https://mysurutrip.com';
const currentUrl = computed(() => `${siteUrl}/hotels/${slug}`);

useHead({
  title: computed(() => hotel.value ? `${getDisplayName(hotel.value)} - Mysuru Hotels` : 'Hotel Details'),
  meta: [
    // Basic Meta Tags
    {
      name: 'description',
      content: computed(() => hotel.value ? `Book your stay at ${getDisplayName(hotel.value)} in ${hotel.value.location}. Experience luxury and comfort in Mysuru. ${hotel.value.description || ''}`.slice(0, 160) : 'Hotel details'),
    },
    {
      name: 'keywords',
      content: computed(() => hotel.value ? `${getDisplayName(hotel.value)}, ${hotel.value.location}, Mysuru hotels, ${hotel.value.category}, accommodation` : ''),
    },

    // Open Graph Tags
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:title',
      content: computed(() => hotel.value ? `${getDisplayName(hotel.value)} - Luxury Stay in ${hotel.value.location}` : 'Hotel Details'),
    },
    {
      property: 'og:description',
      content: computed(() => hotel.value ? `Experience luxury at ${getDisplayName(hotel.value)} in ${hotel.value.location}. ${hotel.value.description || 'Book your perfect stay in Mysuru.'}`.slice(0, 300) : 'Hotel details'),
    },
    {
      property: 'og:url',
      content: currentUrl,
    },
    {
      property: 'og:image',
      content: computed(() => getFeaturedImage(hotel.value?.images) || '/images/placeholder.svg'),
    },
    {
      property: 'og:image:alt',
      content: computed(() => hotel.value ? `${getDisplayName(hotel.value)} - Hotel in ${hotel.value.location}` : 'Hotel image'),
    },
    {
      property: 'og:site_name',
      content: 'Mysuru Tours',
    },

    // Twitter Card Tags
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: computed(() => hotel.value ? `${getDisplayName(hotel.value)} - Mysuru Hotels` : 'Hotel Details'),
    },
    {
      name: 'twitter:description',
      content: computed(() => hotel.value ? `Book your stay at ${getDisplayName(hotel.value)} in ${hotel.value.location}. Experience luxury and comfort in Mysuru.`.slice(0, 200) : 'Hotel details'),
    },
    {
      name: 'twitter:image',
      content: computed(() => getFeaturedImage(hotel.value?.images) || '/images/placeholder.svg'),
    },

    // Additional Meta Tags
    {
      name: 'author',
      content: 'Mysuru Tours',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: currentUrl,
    },
  ],
});

// Computed
const isInWishlist = computed(() => {
  if (!hotel.value) return false;
  return wishlistStore.items.some(item => item.id === hotel.value?.path);
});

// Methods
const addToWishlist = () => {
  if (!hotel.value || !wishlistStore.canAddMore) return;

  wishlistStore.addItem({
    id: hotel.value.path,
    type: 'hotel',
    title: hotel.value.title,
    image: getFeaturedImage(hotel.value.images) || '/images/placeholder.svg',
    location: hotel.value.location,
  });
};
</script>
