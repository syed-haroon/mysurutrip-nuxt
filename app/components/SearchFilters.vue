<template>
  <section class="py-8 px-4 bg-white border-b">
    <div class="max-w-7xl mx-auto">
      <!-- Mobile Filter Toggle -->
      <div class="md:hidden">
        <ui-button
          variant="outline"
          class="w-full justify-between"
          @click="isMobileFiltersOpen = !isMobileFiltersOpen"
        >
          <span class="flex items-center gap-2">
            <icon
              name="lucide:filter"
              class="w-4 h-4"
            />
            Filters
          </span>
          <icon
            :name="isMobileFiltersOpen ? 'lucide:chevron-up' : 'lucide:chevron-down'"
            class="w-4 h-4"
          />
        </ui-button>

        <!-- Active Filters Summary (when collapsed) -->
        <div
          v-if="!isMobileFiltersOpen"
          class="mt-3 flex flex-wrap gap-2"
        >
          <div
            v-if="filters.search"
            class="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
          >
            <icon
              name="lucide:search"
              class="w-3 h-3"
            />
            {{ filters.search }}
          </div>
          <div
            v-if="filters.category !== 'all' && type !== 'explore'"
            class="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
          >
            <icon
              name="lucide:tag"
              class="w-3 h-3"
            />
            {{ filters.category }}
          </div>
          <div
            v-if="filters[dynamicFilterKey] && filters[dynamicFilterKey] !== 'all'"
            class="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
          >
            <icon
              name="lucide:clock"
              class="w-3 h-3"
            />
            {{ filters[dynamicFilterKey] }}
          </div>
          <div
            v-if="filters.rating !== '4.0'"
            class="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full"
          >
            <icon
              name="lucide:star"
              class="w-3 h-3"
            />
            {{ filters.rating }}+ Stars
          </div>
        </div>
      </div>

      <!-- Filter Grid -->
      <div
        :class="[
          'grid gap-4 transition-all duration-300 ease-in-out',
          'md:grid-cols-4', // Always 4 columns on desktop
          isMobileFiltersOpen ? 'grid-cols-1' : 'hidden md:grid', // Mobile: hidden when collapsed, visible when expanded
        ]"
      >
        <!-- Search -->
        <div>
          <ui-label
            for="search"
            class="text-sm font-medium text-gray-700 mb-2 block"
          >
            Search
          </ui-label>
          <ui-input
            id="search"
            :model-value="filters.search"
            :placeholder="`Search ${type}...`"
            class="w-full"
            @update:model-value="updateFilter('search', String($event))"
          />
        </div>

        <!-- Category -->
        <div v-if="type !== 'explore'">
          <ui-label
            for="category"
            class="text-sm font-medium text-gray-700 mb-2 block"
          >
            Category
          </ui-label>
          <ui-select
            :model-value="filters.category"
            class="w-full"
            @update:model-value="updateFilter('category', String($event))"
          >
            <ui-select-trigger class="w-full">
              <ui-select-value placeholder="All Categories" />
            </ui-select-trigger>
            <ui-select-content>
              <ui-select-item value="all">
                All Categories
              </ui-select-item>
              <ui-select-item
                v-for="category in availableCategories"
                :key="category"
                :value="category"
              >
                {{ category }}
              </ui-select-item>
            </ui-select-content>
          </ui-select>
        </div>

        <!-- Dynamic Filter (Duration for activities, Price Range for hotels, Type for explore) -->
        <div>
          <ui-label
            for="dynamicFilter"
            class="text-sm font-medium text-gray-700 mb-2 block"
          >
            {{ dynamicFilterLabel }}
          </ui-label>
          <ui-select
            :model-value="filters[dynamicFilterKey]"
            class="w-full"
            @update:model-value="updateFilter(dynamicFilterKey, String($event))"
          >
            <ui-select-trigger class="w-full">
              <ui-select-value :placeholder="`Any ${dynamicFilterLabel}`" />
            </ui-select-trigger>
            <ui-select-content>
              <ui-select-item
                v-if="type === 'hotels'"
                value=""
              >
                All Prices
              </ui-select-item>
              <ui-select-item
                v-else
                value="all"
              >
                Any {{ dynamicFilterLabel }}
              </ui-select-item>

              <!-- Hotel Price Ranges -->
              <template v-if="type === 'hotels'">
                <ui-select-item value="budget">
                  Budget (₹1,000 - ₹3,000)
                </ui-select-item>
                <ui-select-item value="mid-range">
                  Mid-Range (₹3,000 - ₹8,000)
                </ui-select-item>
                <ui-select-item value="luxury">
                  Luxury (₹8,000+)
                </ui-select-item>
              </template>

              <!-- Dynamic options for activities/explore -->
              <template v-if="dynamicOptions && dynamicOptions.length > 0">
                <ui-select-item
                  v-for="option in dynamicOptions"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </ui-select-item>
              </template>
            </ui-select-content>
          </ui-select>
        </div>

        <!-- Rating -->
        <div>
          <ui-label
            for="rating"
            class="text-sm font-medium text-gray-700 mb-2 block"
          >
            Minimum Rating
          </ui-label>
          <ui-select
            :model-value="filters.rating"
            class="w-full"
            @update:model-value="updateFilter('rating', String($event))"
          >
            <ui-select-trigger class="w-full">
              <ui-select-value placeholder="Any Rating" />
            </ui-select-trigger>
            <ui-select-content>
              <ui-select-item value="4.5">
                4.5+ Stars
              </ui-select-item>
              <ui-select-item value="4.0">
                4.0+ Stars
              </ui-select-item>
              <ui-select-item value="3.5">
                3.5+ Stars
              </ui-select-item>
            </ui-select-content>
          </ui-select>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  type: 'activities' | 'hotels' | 'explore';
  filters: {
    search: string;
    category: string;
    rating: string;
    [key: string]: string;
  };
  availableCategories: string[];
  dynamicOptions?: string[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  updateFilter: [key: string, value: string];
}>();

// Computed properties for dynamic filter
const dynamicFilterKey = computed(() => {
  switch (props.type) {
    case 'activities':
      return 'duration';
    case 'hotels':
      return 'priceRange';
    case 'explore':
      return 'category'; // Use category for explore items
    default:
      return 'duration';
  }
});

const dynamicFilterLabel = computed(() => {
  switch (props.type) {
    case 'activities':
      return 'Duration';
    case 'hotels':
      return 'Price Range';
    case 'explore':
      return 'Category'; // Use Category for explore items
    default:
      return 'Duration';
  }
});

// State for mobile filter visibility
const isMobileFiltersOpen = ref(false);

// Methods
const updateFilter = (key: string, value: string) => {
  emit('updateFilter', key, value);
};
</script>
