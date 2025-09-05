<template>
  <section class="pt-8 md:py-8 px-4 bg-white border-b">
    <div class="max-w-7xl mx-auto">
      <!-- Mobile Filter Toggle -->
      <div class="md:hidden mb-4">
        <ui-button
          variant="outline"
          class="w-full justify-between"
          @click="toggleMobileFilters"
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
            v-if="hasFilterValue(filters.search, '')"
            :class="`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getFilterBadgeColor('search')}`"
          >
            <icon
              :name="getFilterIcon('search')"
              class="w-3 h-3"
            />
            {{ filters.search }}
          </div>
          <div
            v-if="hasFilterValue(filters.category, 'all')"
            :class="`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getFilterBadgeColor('category')}`"
          >
            <icon
              :name="getFilterIcon('category')"
              class="w-3 h-3"
            />
            {{ filters.category }}
          </div>
          <div
            v-if="hasFilterValue(filters.duration, 'all')"
            :class="`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getFilterBadgeColor('dynamic')}`"
          >
            <icon
              :name="getFilterIcon('dynamic')"
              class="w-3 h-3"
            />
            {{ filters.duration }}
          </div>
          <div
            v-if="hasFilterValue(filters.rating, '4.0')"
            :class="`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getFilterBadgeColor('rating')}`"
          >
            <icon
              :name="getFilterIcon('rating')"
              class="w-3 h-3"
            />
            {{ filters.rating }}+ Stars
          </div>
        </div>
      </div>

      <!-- Filter Grid -->
      <div
        :class="[
          'grid gap-4 transition-all duration-300 ease-in-out pb-8 md:pb-0',
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
            placeholder="Search activities..."
            class="w-full"
            @update:model-value="updateFilter('search', String($event))"
          />
        </div>

        <!-- Category -->
        <div>
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

        <!-- Duration -->
        <div>
          <ui-label
            for="duration"
            class="text-sm font-medium text-gray-700 mb-2 block"
          >
            Duration
          </ui-label>
          <ui-select
            :model-value="filters.duration"
            class="w-full"
            @update:model-value="updateFilter('duration', String($event))"
          >
            <ui-select-trigger class="w-full">
              <ui-select-value placeholder="Any Duration" />
            </ui-select-trigger>
            <ui-select-content>
              <ui-select-item value="all">
                Any Duration
              </ui-select-item>
              <ui-select-item
                v-for="duration in availableDurations"
                :key="duration"
                :value="duration"
              >
                {{ duration }}
              </ui-select-item>
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
  filters: {
    search: string;
    category: string;
    duration: string;
    rating: string;
  };
  availableCategories: string[];
  availableDurations: string[];
}

defineProps<Props>();

const emit = defineEmits<{
  updateFilter: [key: string, value: string];
}>();

// Use the shared composable
const {
  isMobileFiltersOpen,
  toggleMobileFilters,
  hasFilterValue,
  getFilterBadgeColor,
  getFilterIcon,
} = useSearchFilters();

// Methods
const updateFilter = (key: string, value: string) => {
  emit('updateFilter', key, value);
};
</script>
