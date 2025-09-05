<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <section class="bg-gradient-to-r from-purple-600 to-pink-700 text-white py-16 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-4xl font-bold mb-4">
          Explore Mysuru's Top Attractions
        </h1>
        <p class="text-xl opacity-90 max-w-2xl mx-auto">
          Discover the rich heritage, stunning architecture, and natural beauty of Mysuru's most iconic destinations
        </p>
      </div>
    </section>

    <!-- Search and Filters -->
    <search-filter-explore
      :filters="filters"
      :available-categories="availableCategories"
      @update-filter="updateFilter"
    />

    <!-- Explore Grid -->
    <section class="py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Results Count -->
        <div class="flex items-center justify-between mb-8">
          <p class="text-gray-600">
            Showing {{ filteredExplore.length }} of {{ explore?.length || 0 }} attractions
          </p>
          <div class="flex items-center gap-2">
            <ui-button
              variant="outline"
              size="sm"
              :class="{ 'bg-purple-50 border-purple-200': viewMode === 'grid' }"
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
              :class="{ 'bg-purple-50 border-purple-200': viewMode === 'list' }"
              @click="viewMode = 'list'"
            >
              <icon
                name="lucide:list"
                class="w-4 h-4"
              />
            </ui-button>
          </div>
        </div>

        <!-- Explore Grid/List -->
        <div
          v-if="filteredExplore.length > 0"
          :class="viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'"
        >
          <ExploreCard
            v-for="item in filteredExplore"
            :key="item.path"
            :explore="item"
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
            No attractions found
          </h3>
          <p class="text-gray-600 mb-6">
            Try adjusting your search criteria or browse all available attractions
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
import type { ExploreCollectionItem } from '@nuxt/content';

type Explore = ExploreCollectionItem;

// SEO
useHead({
  title: 'Explore Mysuru - Top Tourist Attractions & Places to Visit',
  meta: [
    { name: 'description', content: 'Discover the best tourist attractions in Mysuru. From historic palaces to beautiful gardens, explore the top places to visit in the cultural capital of Karnataka.' },
  ],
});

// Stores
const wishlistStore = useWishlistStore();

// Data
// Fetch explore data using Nuxt Content v3
const { data: explore } = await useAsyncData<Explore[]>(
  'explore',
  () =>
    queryCollection('explore')
      .where('type', '=', 'explore')
      .all(),
);

// State
const viewMode = ref<'grid' | 'list'>('grid');
const filters = ref({
  search: '',
  category: 'all',
  rating: '4.0',
});

// Computed properties for dynamic filter options
const availableCategories = computed(() => {
  if (!explore.value) return [];
  return [...new Set(explore.value.map(item => item.category))];
});

// Computed
const filteredExplore = computed(() => {
  if (!explore.value) return [];

  return explore.value.filter((item) => {
    // Search filter
    if (filters.value.search && !item.title.toLowerCase().includes(filters.value.search.toLowerCase())) {
      return false;
    }

    // Category filter
    if (filters.value.category !== 'all' && item.category !== filters.value.category) {
      return false;
    }

    // Rating filter
    if (filters.value.rating && item.rating < parseFloat(filters.value.rating)) {
      return false;
    }

    return true;
  });
});

// Methods
const updateFilter = (key: keyof typeof filters.value, value: string) => {
  filters.value[key] = value;
};

const addToWishlist = (item: { path?: string; title: string; images?: string[]; location: string }) => {
  if (wishlistStore.canAddMore) {
    wishlistStore.addItem({
      id: item.path || item.title,
      type: 'activity', // Using activity type for explore items
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
    rating: '4.0',
  };
};
</script>
