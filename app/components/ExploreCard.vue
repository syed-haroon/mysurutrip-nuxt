<template>
  <ui-card
    :class="[
      'group cursor-pointer transition-all duration-300 hover:shadow-lg overflow-hidden p-0 gap-0',
      viewMode === 'list' ? 'flex flex-row' : 'flex flex-col',
    ]"
    @click="navigateTo(`/explore/${explore.path}`)"
  >
    <!-- Image -->
    <div
      :class="[
        'relative',
        viewMode === 'list' ? 'w-48 h-32' : 'w-full h-48',
      ]"
    >
      <NuxtImg
        :src="explore.images?.[0] || '/images/placeholder.svg'"
        :alt="explore.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <!-- Rating Badge - Top Right -->
      <div class="absolute top-3 right-3">
        <div class="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
          <icon
            name="lucide:star"
            class="w-3 h-3 text-yellow-400 fill-current"
          />
          <span class="text-gray-900 font-semibold text-xs">{{ explore.rating }}</span>
        </div>
      </div>
      <!-- Category Badge - Top Left -->
      <div class="absolute top-3 left-3">
        <ui-badge
          variant="secondary"
          class="bg-white/90 text-gray-700 text-xs"
        >
          {{ explore.category }}
        </ui-badge>
      </div>
    </div>

    <!-- Content -->
    <div
      :class="[
        'flex flex-col',
        viewMode === 'list' ? 'flex-1 p-4' : 'p-4',
      ]"
    >
      <div class="flex-1">
        <h3 class="font-semibold text-lg text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
          {{ explore.title }}
        </h3>

        <!-- Key Info Row -->
        <div class="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div class="flex items-center gap-1">
            <icon
              name="lucide:map-pin"
              class="w-4 h-4 text-gray-400"
            />
            <span>{{ explore.location }}</span>
          </div>
          <div class="flex items-center gap-1">
            <icon
              name="lucide:clock"
              class="w-4 h-4 text-gray-400"
            />
            <span>{{ explore.visitDuration }}</span>
          </div>
        </div>

        <!-- Description -->
        <p class="text-gray-600 text-sm mb-4 line-clamp-2">
          {{ explore.description || `Discover the beauty and history of ${explore.title} in ${explore.location}. A must-visit attraction in Mysuru.` }}
        </p>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <ui-badge
            v-for="tag in explore.tags?.slice(0, 3)"
            :key="tag"
            variant="outline"
            class="text-xs"
          >
            {{ tag }}
          </ui-badge>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-between pt-3 border-t border-gray-100">
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <icon
            name="lucide:eye"
            class="w-4 h-4"
          />
          <span>View Details</span>
        </div>
        <ui-button
          as="nuxt-link"
          :to="`/explore/${explore.path}`"
          variant="outline"
          size="sm"
        >
          Explore
        </ui-button>
      </div>
    </div>
  </ui-card>
</template>

<script setup lang="ts">
import type { ExploreCollectionItem } from '@nuxt/content';

type Explore = ExploreCollectionItem;

interface Props {
  explore: Explore;
  viewMode: 'grid' | 'list';
}

defineProps<Props>();
</script>
