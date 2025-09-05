<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <section class="bg-gradient-to-r from-green-600 to-teal-700 text-white py-16 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-4xl font-bold mb-4">
          Things to Do in Mysuru
        </h1>
        <p class="text-xl opacity-90 max-w-2xl mx-auto">
          Immerse yourself in Mysuru's rich culture, history, and natural beauty with our curated activities
        </p>
      </div>
    </section>

    <!-- Search and Filters -->
    <search-filter-activity
      :filters="filters"
      :available-categories="availableCategories"
      :available-durations="availableDurations"
      @update-filter="updateFilter"
    />

    <!-- Activities Grid -->
    <section class="py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Results Count -->
        <div class="flex items-center justify-between mb-8">
          <p class="text-gray-600">
            Showing {{ filteredActivities.length }} of {{ activities?.length || 0 }} activities
          </p>
          <div class="flex items-center gap-2">
            <ui-button
              variant="outline"
              size="sm"
              :class="{ 'bg-green-50 border-green-200': viewMode === 'grid' }"
              @click="viewMode = 'grid'"
            >
              <icon
                name="lucide:grid"
                class="w-4 h-4"
              />
            </ui-button>
            <ui-button
              variant="outline"
              size="sm"
              :class="{ 'bg-green-50 border-green-200': viewMode === 'list' }"
              @click="viewMode = 'list'"
            >
              <icon
                name="lucide:list"
                class="w-4 h-4"
              />
            </ui-button>
          </div>
        </div>

        <!-- Activities Grid/List -->
        <div
          v-if="filteredActivities.length > 0"
          :class="viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'"
        >
          <ActivityCard
            v-for="activity in filteredActivities"
            :key="activity.path"
            :activity="activity"
            :view-mode="viewMode"
            @add-to-wishlist="addToWishlist"
          />
        </div>

        <!-- No Results -->
        <div
          v-else
          class="text-center py-16"
        >
          <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <icon
              name="lucide:search"
              class="w-12 h-12 text-gray-400"
            />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            No activities found
          </h3>
          <p class="text-gray-600 mb-6">
            Try adjusting your search criteria or browse all available activities
          </p>
          <ui-button
            variant="outline"
            @click="clearFilters"
          >
            Clear All Filters
          </ui-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ActivitiesCollectionItem } from '@nuxt/content';

type Activity = ActivitiesCollectionItem;

// SEO
useHead({
  title: 'Things to Do in Mysuru - Activities & Tours',
  meta: [
    { name: 'description', content: 'Discover exciting activities and tours in Mysuru. From cultural experiences to adventure activities, find the perfect way to explore this beautiful city.' },
  ],
});

// Stores
const wishlistStore = useWishlistStore();

// Data
// Fetch activities data using Nuxt Content v3
const { data: activities } = await useAsyncData<Activity[]>(
  'activities',
  () =>
    queryCollection('activities')
      .where('type', '=', 'activity')
      .all(),
);

// State
const viewMode = ref<'grid' | 'list'>('grid');
const filters = ref({
  search: '',
  category: 'all', // Initialize with 'all' instead of empty string
  duration: 'all', // Initialize with 'all' instead of empty string
  rating: '4.0', // Keep rating filter
});

// Computed properties for dynamic filter options
const availableCategories = computed(() => {
  if (!activities.value) return [];
  return [...new Set(activities.value.map(activity => activity.category))];
});

const availableDurations = computed(() => {
  if (!activities.value) return [];
  return [...new Set(activities.value.map(activity => activity.duration))];
});

// Computed
const filteredActivities = computed(() => {
  if (!activities.value) return [];

  return activities.value.filter((activity) => {
    // Search filter
    if (filters.value.search && !activity.title.toLowerCase().includes(filters.value.search.toLowerCase())) {
      return false;
    }

    // Category filter
    if (filters.value.category !== 'all' && activity.category !== filters.value.category) {
      return false;
    }

    // Duration filter
    if (filters.value.duration !== 'all' && activity.duration !== filters.value.duration) {
      return false;
    }

    // Rating filter
    if (filters.value.rating && activity.rating < parseFloat(filters.value.rating)) {
      return false;
    }

    return true;
  });
});

// Methods
const updateFilter = (key: string, value: string) => {
  filters.value[key] = value;
};

const addToWishlist = (item: { path?: string; title: string; images?: string[]; location: string }) => {
  if (wishlistStore.canAddMore) {
    wishlistStore.addItem({
      id: item.path || item.title,
      type: 'activity',
      title: item.title,
      image: item.images?.[0] || '/images/placeholder.svg',
      location: item.location,
    });
  }
};

const clearFilters = () => {
  filters.value = {
    search: '',
    category: 'all',
    duration: 'all',
    rating: '4.0',
  };
};
</script>
