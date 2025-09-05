<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Explore Detail -->
    <div v-if="explore">
      <!-- Hero Section -->
      <div class="relative">
        <HeroSection
          :images="explore.images || []"
          :title="explore.title"
          :location="explore.location"
        />
        <div class="absolute top-0 right-0 p-4 z-10">
          <SocialShareDropdown
            :title="explore.title"
            :description="explore.description || `Discover the beauty and significance of ${explore.title} in ${explore.location}. This attraction showcases the rich heritage and culture of Mysuru.`"
            :image="explore.images?.[0]"
          />
        </div>
      </div>

      <div class="max-w-7xl mx-auto pt-8 pb-12 px-4">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Attraction Info -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-bold text-gray-900">
                  About This Attraction
                </h2>
                <div class="flex items-center gap-3">
                  <div class="flex items-center gap-2">
                    <div class="flex items-center">
                      <icon
                        name="lucide:star"
                        class="w-5 h-5 text-yellow-400 fill-current"
                      />
                      <span class="ml-1 font-semibold">{{ explore.rating }}</span>
                    </div>
                    <ui-badge variant="secondary">
                      {{ explore.category }}
                    </ui-badge>
                  </div>
                </div>
              </div>

              <div class="prose max-w-none">
                <div
                  v-if="explore.description"
                  class="prose-content"
                >
                  {{ explore.description }}
                </div>
                <p
                  v-else
                  class="text-gray-600"
                >
                  Discover the beauty and significance of {{ explore.title }} in {{ explore.location }}.
                  This attraction showcases the rich heritage and culture of Mysuru.
                </p>
              </div>
            </div>

            <!-- Visit Details -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4">
                Visit Information
              </h3>
              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div class="flex items-center gap-3">
                    <icon
                      name="lucide:clock"
                      class="w-5 h-5 text-blue-600"
                    />
                    <div>
                      <p class="font-medium">
                        Visit Duration
                      </p>
                      <p class="text-gray-600">
                        {{ explore.visitDuration }}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <icon
                      name="lucide:calendar"
                      class="w-5 h-5 text-purple-600"
                    />
                    <div>
                      <p class="font-medium">
                        Timings
                      </p>
                      <p class="text-gray-600">
                        {{ explore.timings || '9:00 AM - 6:00 PM' }}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <icon
                      name="lucide:map-pin"
                      class="w-5 h-5 text-red-600"
                    />
                    <div>
                      <p class="font-medium">
                        Location
                      </p>
                      <p class="text-gray-600">
                        {{ explore.location }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="space-y-4">
                  <div class="flex items-center gap-3">
                    <icon
                      name="lucide:tag"
                      class="w-5 h-5 text-green-600"
                    />
                    <div>
                      <p class="font-medium">
                        Entry Fee
                      </p>
                      <p class="text-gray-600">
                        {{ explore.entryFee || 'Contact for pricing' }}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <icon
                      name="lucide:sun"
                      class="w-5 h-5 text-orange-600"
                    />
                    <div>
                      <p class="font-medium">
                        Best Time
                      </p>
                      <p class="text-gray-600">
                        {{ explore.bestTimeToVisit || 'October to March' }}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <icon
                      name="lucide:camera"
                      class="w-5 h-5 text-indigo-600"
                    />
                    <div>
                      <p class="font-medium">
                        Photography
                      </p>
                      <p class="text-gray-600">
                        Allowed (charges may apply)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tags/Highlights -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4">
                Highlights
              </h3>
              <div class="flex flex-wrap gap-2">
                <ui-badge
                  v-for="tag in explore.tags"
                  :key="tag"
                  variant="outline"
                  class="text-sm"
                >
                  {{ tag }}
                </ui-badge>
              </div>
            </div>

            <!-- Nearby Attractions -->
            <div
              v-if="explore.nearbyAttractions?.length"
              class="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 class="text-xl font-bold text-gray-900 mb-4">
                Nearby Attractions
              </h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div
                  v-for="attraction in explore.nearbyAttractions"
                  :key="attraction"
                  class="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
                >
                  <icon
                    name="lucide:map-pin"
                    class="w-5 h-5 text-red-500"
                  />
                  <span>{{ attraction }}</span>
                </div>
              </div>
            </div>

            <!-- Location & Directions -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4">
                Location & Directions
              </h3>
              <div class="flex items-start gap-4">
                <icon
                  name="lucide:map-pin"
                  class="w-6 h-6 text-red-500 mt-1"
                />
                <div>
                  <p class="font-medium">
                    {{ explore.location }}
                  </p>
                  <p class="text-gray-600 text-sm mt-1">
                    Easily accessible by public transport and private vehicles.
                    Parking available on-site.
                  </p>
                  <div class="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 class="font-medium text-gray-900 mb-2">
                      How to Get There:
                    </h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• By Bus: Regular city buses available</li>
                      <li>• By Auto: Easily accessible from city center</li>
                      <li>• By Car: Parking facilities available</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <DetailSidebar
            type="explore"
            :item="explore"
            :is-in-wishlist="isInWishlist"
            :show-price-card="false"
            @add-to-wishlist="addToWishlist"
          >
            <template #additional-info>
              <!-- Visit Tips -->
              <div class="bg-white rounded-lg shadow-sm p-6">
                <h4 class="font-semibold text-gray-900 mb-4">
                  Visit Tips
                </h4>
                <div class="text-sm text-gray-600 space-y-2">
                  <p>• Visit early morning to avoid crowds</p>
                  <p>• Carry water and wear comfortable shoes</p>
                  <p>• Respect local customs and dress codes</p>
                  <p>• Check timings before visiting</p>
                </div>
              </div>
            </template>
          </DetailSidebar>
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
          Loading attraction details...
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
          Attraction Not Found
        </h2>
        <p class="text-gray-600 mb-6">
          The attraction you're looking for doesn't exist.
        </p>
        <ui-button
          variant="outline"
          @click="navigateTo('/explore')"
        >
          Back to Explore
        </ui-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExploreCollectionItem } from '@nuxt/content';
import HeroSection from '~/components/HeroSection.vue';

type Explore = ExploreCollectionItem;

// Route params
const route = useRoute();
const slug = route.params.slug as string;

// Stores
const wishlistStore = useWishlistStore();

// Fetch explore data using Nuxt Content v3
const { data: explore, pending } = await useAsyncData<Explore | null>(
  `explore-${slug}`,
  () =>
    queryCollection('explore')
      .where('path', '=', slug)
      .first(),
);

// SEO - After data fetching
const siteUrl = 'https://mysurutrip.com';
const currentUrl = computed(() => `${siteUrl}/explore/${slug}`);

useHead({
  title: computed(() => explore.value ? `${explore.value.title} - Explore Mysuru` : 'Attraction Details'),
  meta: [
    // Basic Meta Tags
    {
      name: 'description',
      content: computed(() => explore.value ? `Visit ${explore.value.title} in ${explore.value.location}. ${explore.value.description || `Discover the beauty and significance of ${explore.value.title} in ${explore.value.location}. This attraction showcases the rich heritage and culture of Mysuru.`}`.slice(0, 160) : 'Attraction details'),
    },
    {
      name: 'keywords',
      content: computed(() => explore.value ? `${explore.value.title}, ${explore.value.location}, Mysuru attractions, ${explore.value.category}, tourism, heritage` : ''),
    },

    // Open Graph Tags
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:title',
      content: computed(() => explore.value ? `${explore.value.title} - Attraction in ${explore.value.location}` : 'Attraction Details'),
    },
    {
      property: 'og:description',
      content: computed(() => explore.value ? `Discover the beauty and significance of ${explore.value.title} in ${explore.value.location}. ${explore.value.description || 'This attraction showcases the rich heritage and culture of Mysuru.'}`.slice(0, 300) : 'Attraction details'),
    },
    {
      property: 'og:url',
      content: currentUrl,
    },
    {
      property: 'og:image',
      content: computed(() => explore.value?.images?.[0] || '/images/placeholder.svg'),
    },
    {
      property: 'og:image:alt',
      content: computed(() => explore.value ? `${explore.value.title} - Attraction in ${explore.value.location}` : 'Attraction image'),
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
      content: computed(() => explore.value ? `${explore.value.title} - Explore Mysuru` : 'Attraction Details'),
    },
    {
      name: 'twitter:description',
      content: computed(() => explore.value ? `Visit ${explore.value.title} in ${explore.value.location}. ${explore.value.description || 'Discover the beauty and significance of this attraction.'}`.slice(0, 200) : 'Attraction details'),
    },
    {
      name: 'twitter:image',
      content: computed(() => explore.value?.images?.[0] || '/images/placeholder.svg'),
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
  if (!explore.value) return false;
  return wishlistStore.items.some(item => item.id === explore.value?.path);
});

// Methods
const addToWishlist = () => {
  if (!explore.value || !wishlistStore.canAddMore) return;

  wishlistStore.addItem({
    id: explore.value.path,
    type: 'activity', // Using activity type for explore items
    title: explore.value.title,
    image: explore.value.images?.[0] || '/images/placeholder.svg',
    location: explore.value.location,
  });
};
</script>
