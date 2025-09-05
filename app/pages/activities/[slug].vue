<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Activity Detail -->
    <div v-if="activity">
      <!-- Hero Section -->
      <div class="relative">
        <HeroSection
          :images="activity.images || []"
          :title="activity.title"
          :location="activity.location"
        />
        <div class="absolute top-0 right-0 p-4 z-10">
          <SocialShareDropdown
            :title="activity.title"
            :description="activity.description || `Experience the magic of ${activity.title} in ${activity.location}. Book your adventure in Mysuru today.`"
            :image="activity.images?.[0]"
          />
        </div>
      </div>

      <div class="max-w-7xl mx-auto pt-8 pb-12 px-4">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Activity Info -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-bold text-gray-900">
                  About This Activity
                </h2>
                <div class="flex items-center gap-3">
                  <div class="flex items-center gap-2">
                    <div class="flex items-center">
                      <icon
                        name="lucide:star"
                        class="w-5 h-5 text-yellow-400 fill-current"
                      />
                      <span class="ml-1 font-semibold">{{ activity.rating }}</span>
                    </div>
                    <ui-badge variant="secondary">
                      {{ activity.category }}
                    </ui-badge>
                  </div>
                </div>
              </div>

              <div class="prose max-w-none">
                <div
                  v-if="activity.description"
                  class="prose-content"
                >
                  {{ activity.description }}
                </div>
                <p
                  v-else
                  class="text-gray-600"
                >
                  Discover the magic of {{ activity.title }} in {{ activity.location }}.
                  This unique experience offers an unforgettable adventure that showcases the best of Mysuru's culture and heritage.
                </p>
              </div>
            </div>

            <!-- Activity Details -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4">
                Activity Details
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
                        Duration
                      </p>
                      <p class="text-gray-600">
                        {{ activity.duration }}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <icon
                      name="lucide:users"
                      class="w-5 h-5 text-green-600"
                    />
                    <div>
                      <p class="font-medium">
                        Group Size
                      </p>
                      <p class="text-gray-600">
                        2-15 people
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
                        Available
                      </p>
                      <p class="text-gray-600">
                        Daily (except Mondays)
                      </p>
                    </div>
                  </div>
                </div>
                <div class="space-y-4">
                  <div class="flex items-center gap-3">
                    <icon
                      name="lucide:map-pin"
                      class="w-5 h-5 text-red-600"
                    />
                    <div>
                      <p class="font-medium">
                        Meeting Point
                      </p>
                      <p class="text-gray-600">
                        {{ activity.location }}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <icon
                      name="lucide:languages"
                      class="w-5 h-5 text-orange-600"
                    />
                    <div>
                      <p class="font-medium">
                        Languages
                      </p>
                      <p class="text-gray-600">
                        English, Hindi, Kannada
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <icon
                      name="lucide:shield"
                      class="w-5 h-5 text-indigo-600"
                    />
                    <div>
                      <p class="font-medium">
                        Safety
                      </p>
                      <p class="text-gray-600">
                        COVID-19 protocols followed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- What's Included -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4">
                What's Included
              </h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="flex items-center gap-3">
                  <icon
                    name="lucide:check-circle"
                    class="w-5 h-5 text-green-600"
                  />
                  <span>Professional guide</span>
                </div>
                <div class="flex items-center gap-3">
                  <icon
                    name="lucide:check-circle"
                    class="w-5 h-5 text-green-600"
                  />
                  <span>All entrance fees</span>
                </div>
                <div class="flex items-center gap-3">
                  <icon
                    name="lucide:check-circle"
                    class="w-5 h-5 text-green-600"
                  />
                  <span>Transportation</span>
                </div>
                <div class="flex items-center gap-3">
                  <icon
                    name="lucide:check-circle"
                    class="w-5 h-5 text-green-600"
                  />
                  <span>Refreshments</span>
                </div>
                <div class="flex items-center gap-3">
                  <icon
                    name="lucide:check-circle"
                    class="w-5 h-5 text-green-600"
                  />
                  <span>Photo opportunities</span>
                </div>
                <div class="flex items-center gap-3">
                  <icon
                    name="lucide:check-circle"
                    class="w-5 h-5 text-green-600"
                  />
                  <span>Local insights</span>
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
                    {{ activity.location }}
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
                      <li>• By Bus: Take route 1, 2, or 3 from City Center</li>
                      <li>• By Auto: 15-minute ride from Mysuru Palace</li>
                      <li>• By Car: 10-minute drive from City Center</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <DetailSidebar
            type="activity"
            :item="activity"
            :is-in-wishlist="isInWishlist"
            :show-price-card="true"
            @add-to-wishlist="addToWishlist"
          >
            <template #additional-info>
              <!-- Cancellation Policy -->
              <div class="bg-white rounded-lg shadow-sm p-6">
                <h4 class="font-semibold text-gray-900 mb-4">
                  Cancellation Policy
                </h4>
                <div class="text-sm text-gray-600 space-y-2">
                  <p>• Free cancellation up to 24 hours before</p>
                  <p>• 50% refund for cancellations within 24 hours</p>
                  <p>• No refund for same-day cancellations</p>
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
          Loading activity details...
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
          Activity Not Found
        </h2>
        <p class="text-gray-600 mb-6">
          The activity you're looking for doesn't exist.
        </p>
        <ui-button
          variant="outline"
          @click="navigateTo('/activities')"
        >
          Back to Activities
        </ui-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ActivitiesCollectionItem } from '@nuxt/content';
import HeroSection from '~/components/HeroSection.vue';
import DetailSidebar from '~/components/DetailSidebar.vue';

type Activity = ActivitiesCollectionItem;

// Route params
const route = useRoute();
const slug = route.params.slug as string;

// Stores
const wishlistStore = useWishlistStore();

// Fetch activity data using Nuxt Content v3
const { data: activity, pending } = await useAsyncData<Activity | null>(
  `activity-${slug}`,
  () =>
    queryCollection('activities')
      .where('path', '=', slug)
      .first(),
);

// SEO - After data fetching
const siteUrl = 'https://mysurutrip.com';
const currentUrl = computed(() => `${siteUrl}/activities/${slug}`);

useHead({
  title: computed(() => activity.value ? `${activity.value.title} - Mysuru Activities` : 'Activity Details'),
  meta: [
    // Basic Meta Tags
    {
      name: 'description',
      content: computed(() => activity.value ? `Experience ${activity.value.title} in ${activity.value.location}. Book your adventure in Mysuru today. ${activity.value.description || ''}`.slice(0, 160) : 'Activity details'),
    },
    {
      name: 'keywords',
      content: computed(() => activity.value ? `${activity.value.title}, ${activity.value.location}, Mysuru activities, ${activity.value.category}, adventure, tourism` : ''),
    },

    // Open Graph Tags
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:title',
      content: computed(() => activity.value ? `${activity.value.title} - Adventure in ${activity.value.location}` : 'Activity Details'),
    },
    {
      property: 'og:description',
      content: computed(() => activity.value ? `Experience the magic of ${activity.value.title} in ${activity.value.location}. ${activity.value.description || 'Book your adventure in Mysuru today.'}`.slice(0, 300) : 'Activity details'),
    },
    {
      property: 'og:url',
      content: currentUrl,
    },
    {
      property: 'og:image',
      content: computed(() => activity.value?.images?.[0] || '/images/placeholder.svg'),
    },
    {
      property: 'og:image:alt',
      content: computed(() => activity.value ? `${activity.value.title} - Activity in ${activity.value.location}` : 'Activity image'),
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
      content: computed(() => activity.value ? `${activity.value.title} - Mysuru Activities` : 'Activity Details'),
    },
    {
      name: 'twitter:description',
      content: computed(() => activity.value ? `Experience ${activity.value.title} in ${activity.value.location}. Book your adventure in Mysuru today.`.slice(0, 200) : 'Activity details'),
    },
    {
      name: 'twitter:image',
      content: computed(() => activity.value?.images?.[0] || '/images/placeholder.svg'),
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
  if (!activity.value) return false;
  return wishlistStore.items.some(item => item.id === activity.value?.path);
});

// Methods
const addToWishlist = () => {
  if (!activity.value || !wishlistStore.canAddMore) return;

  wishlistStore.addItem({
    id: activity.value.path,
    type: 'activity',
    title: activity.value.title,
    image: activity.value.images?.[0] || '/images/placeholder.svg',
    location: activity.value.location,
  });
};
</script>
