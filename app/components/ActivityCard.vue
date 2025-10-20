<template>
  <ui-card class="group hover:shadow-xl transition-all duration-300 overflow-hidden p-0 gap-0">
    <div class="relative">
      <nuxt-img
        :src="activity.images?.[0] || '/images/placeholder.svg'"
        :alt="activity.title"
        class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        quality="80"
      />
      <!-- Rating Badge - Top Right -->
      <div class="absolute top-4 right-4 flex items-center gap-2">
        <div class="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
          <icon
            name="lucide:star"
            class="w-4 h-4 text-yellow-400 fill-current"
          />
          <span class="text-gray-900 font-semibold text-sm">{{ activity.rating }}</span>
        </div>
      </div>
      <!-- Category Badge - Top Left -->
      <div class="absolute top-4 left-4">
        <ui-badge
          :variant="activity.category === 'cultural' ? 'default' : 'secondary'"
          class="bg-white/90 text-gray-900"
        >
          {{ activity.category }}
        </ui-badge>
      </div>
      <!-- Wishlist Button - Below Category -->
      <button
        class="absolute top-16 left-4 w-8 h-8 pb-0.5 rounded-full bg-white/90 hover:bg-white transition-colors"
        :class="{ 'text-red-500': isInWishlist, 'text-gray-400': !isInWishlist }"
        :disabled="!canAdd && !isInWishlist"
        :title="wishlistTooltip"
        @click="toggleWishlist"
      >
        <icon-heart
          :variant="isInWishlist ? 'filled' : 'outline'"
          :class="isInWishlist ? 'text-red-500' : ''"
          class="w-5 h-5"
        />
      </button>
    </div>

    <div class="p-6">
      <h3 class="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors mb-3">
        {{ activity.title }}
      </h3>

      <!-- Location -->
      <div class="flex items-center gap-2 mb-3">
        <icon
          name="lucide:map-pin"
          class="w-4 h-4 text-gray-400"
        />
        <span class="text-gray-600 text-sm">{{ activity.location }}</span>
      </div>

      <!-- Key Info Row -->
      <div class="flex items-center gap-4 mb-4 text-sm text-gray-600">
        <div class="flex items-center gap-1">
          <icon
            name="lucide:clock"
            class="w-4 h-4"
          />
          <span>{{ activity.duration }}</span>
        </div>
        <div class="flex items-center gap-1">
          <icon
            name="lucide:tag"
            class="w-4 h-4"
          />
          <span class="text-orange-600 font-medium">Custom pricing</span>
        </div>
      </div>

      <!-- Description -->
      <p class="text-gray-600 mb-4 line-clamp-2">
        {{ activity.description }}
      </p>

      <!-- Highlights -->
      <div class="flex flex-wrap gap-2 mb-4">
        <ui-badge
          v-for="highlight in activity.highlights?.slice(0, 2)"
          :key="highlight"
          variant="outline"
          class="text-xs"
        >
          {{ highlight }}
        </ui-badge>
        <ui-badge
          v-if="activity.highlights?.length > 2"
          variant="outline"
          class="text-xs"
        >
          +{{ activity.highlights.length - 2 }} more
        </ui-badge>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3">
        <ui-button
          as="nuxt-link"
          :to="`/activities/${activity.path}`"
          variant="outline"
          class="flex-1"
        >
          <icon
            name="lucide:eye"
            class="w-4 h-4 mr-2"
          />
          View Details
        </ui-button>
        <ui-button
          class="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
          @click="siteStore.openQuoteSheet"
        >
          <icon
            name="lucide:message-square"
            class="w-4 h-4 mr-2"
          />
          Get Quote
        </ui-button>
      </div>
    </div>
  </ui-card>
</template>

<script setup lang="ts">
import type { ActivitiesCollectionItem } from '@nuxt/content';

type Activity = ActivitiesCollectionItem;

interface Props {
  activity: Activity;
  viewMode?: 'grid' | 'list';
}

const props = defineProps<Props>();

const wishlistStore = useWishlistStore();
const siteStore = useSiteStore();

const isInWishlist = computed(() =>
  wishlistStore.isInWishlist(props.activity.path || props.activity.title),
);

const canAdd = computed(() => wishlistStore.canAddMore);

const wishlistTooltip = computed(() => {
  if (isInWishlist.value) return 'Remove from wishlist';
  if (!canAdd.value) return 'Wishlist is full (max 3 items)';
  return 'Add to wishlist';
});

const toggleWishlist = () => {
  if (isInWishlist.value) {
    wishlistStore.removeItem(props.activity.path || props.activity.title);
  }
  else if (canAdd.value) {
    const item = {
      id: props.activity.path || props.activity.title,
      type: 'activity' as const,
      title: props.activity.title,
      image: props.activity.images?.[0] || '/images/placeholder.svg',
      location: props.activity.location,
    };
    wishlistStore.addItem(item);
  }
};
</script>
