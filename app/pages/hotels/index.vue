<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <section class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-4xl font-bold mb-4">
          Discover Amazing Stays in Mysuru
        </h1>
        <p class="text-xl opacity-90 max-w-2xl mx-auto">
          From luxury hotels to eco-friendly resorts, find the perfect accommodation for your Mysuru adventure
        </p>
      </div>
    </section>

    <!-- Search and Filters -->
    <search-filter-hotel
      :filters="filters"
      :available-categories="availableCategories"
      @update-filter="updateFilter"
    />

    <!-- Hotels Grid -->
    <section class="py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Results Count -->
        <div class="flex items-center justify-between mb-8">
          <p class="text-gray-600">
            Showing {{ filteredHotels.length }} of {{ hotels?.length || 0 }} hotels
          </p>
          <div class="flex items-center gap-2">
            <ui-button
              variant="outline"
              size="sm"
              :class="{ 'bg-orange-50 border-orange-200': viewMode === 'grid' }"
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
              :class="{ 'bg-orange-50 border-orange-200': viewMode === 'list' }"
              @click="viewMode = 'list'"
            >
              <icon
                name="lucide:list"
                class="w-4 h-4"
              />
            </ui-button>
          </div>
        </div>

        <!-- Hotels Grid/List -->
        <div
          v-if="filteredHotels.length > 0"
          :class="viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'"
        >
          <HotelCard
            v-for="hotel in filteredHotels"
            :key="hotel.path"
            :hotel="hotel"
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
            No hotels found
          </h3>
          <p class="text-gray-600 mb-6">
            Try adjusting your search criteria or browse all available hotels
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
import type { HotelsCollectionItem } from '@nuxt/content';

type Hotel = HotelsCollectionItem;

// SEO
useHead({
  title: 'Hotels & Stays in Mysuru - Find Your Perfect Accommodation',
  meta: [
    { name: 'description', content: 'Discover the best hotels, resorts, and homestays in Mysuru. From luxury accommodations to budget-friendly options, find your perfect stay.' },
  ],
});

// Stores
const wishlistStore = useWishlistStore();

// Data
// Fetch hotels data using Nuxt Content v3
const { data: hotels } = await useAsyncData<Hotel[]>(
  'hotels',
  () =>
    queryCollection('hotels')
      .where('type', '=', 'hotel')
      .all(),
);

// State
const viewMode = ref<'grid' | 'list'>('grid');
const filters = ref({
  search: '',
  category: 'all', // Initialize with 'all' instead of empty string
  priceRange: '', // No default price range filter
  rating: '4.0', // Keep rating filter
});

// Computed properties for dynamic filter options
const availableCategories = computed(() => {
  if (!hotels.value) return [];
  return [...new Set(hotels.value.map(hotel => hotel.category))];
});

// Computed
const filteredHotels = computed(() => {
  if (!hotels.value) return [];

  return hotels.value.filter((hotel) => {
    // Search filter
    if (filters.value.search && !hotel.title.toLowerCase().includes(filters.value.search.toLowerCase())) {
      return false;
    }

    // Category filter
    if (filters.value.category !== 'all' && hotel.category !== filters.value.category) {
      return false;
    }

    // Price range filter
    if (filters.value.priceRange) {
      const price = hotel.priceRange;
      if (filters.value.priceRange === 'budget' && !price.includes('₹1,000') && !price.includes('₹2,000') && !price.includes('₹3,000')) {
        return false;
      }
      if (filters.value.priceRange === 'mid-range' && !price.includes('₹3,000') && !price.includes('₹4,000') && !price.includes('₹5,000') && !price.includes('₹6,000') && !price.includes('₹7,000') && !price.includes('₹8,000')) {
        return false;
      }
      if (filters.value.priceRange === 'luxury' && !price.includes('₹8,000') && !price.includes('₹9,000') && !price.includes('₹10,000') && !price.includes('₹15,000') && !price.includes('₹20,000') && !price.includes('₹25,000')) {
        return false;
      }
    }

    // Rating filter
    if (filters.value.rating && hotel.rating < parseFloat(filters.value.rating)) {
      return false;
    }

    return true;
  });
});

// Methods
const updateFilter = (key: keyof typeof filters.value, value: string) => {
  filters.value[key] = value;
};

const addToWishlist = (item: { path?: string; title: string; images?: string[]; priceRange: string; location: string }) => {
  if (wishlistStore.canAddMore) {
    wishlistStore.addItem({
      id: item.path || item.title,
      type: 'hotel',
      title: item.title,
      image: item.images?.[0] || '/images/placeholder.jpg',
      location: item.location,
    });
  }
};

const clearFilters = () => {
  filters.value = {
    search: '',
    category: 'all',
    priceRange: '',
    rating: '4.0',
  };
};
</script>
