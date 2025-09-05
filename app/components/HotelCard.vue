<template>
  <ui-card
    :class="[
      'group hover:shadow-xl transition-all duration-300 overflow-hidden p-0 gap-0',
      viewMode === 'list' ? 'flex' : '',
    ]"
  >
    <div class="relative">
      <nuxt-img
        :src="hotel.images?.[0] || '/images/placeholder.svg'"
        :alt="hotel.title"
        class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        quality="80"
      />
      <!-- Rating Badge - Top Right -->
      <div class="absolute top-4 right-4">
        <div class="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
          <icon
            name="lucide:star"
            class="w-4 h-4 text-yellow-400 fill-current"
          />
          <span class="text-gray-900 font-semibold text-sm">{{ hotel.rating }}</span>
        </div>
      </div>
      <!-- Category Badge - Top Left -->
      <div class="absolute top-4 left-4">
        <ui-badge
          :variant="hotel.category === 'luxury' ? 'default' : 'secondary'"
          class="bg-white/90 text-gray-900"
        >
          {{ hotel.category }}
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
      <div class="flex items-start justify-between mb-3">
        <h3 class="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
          {{ hotel.title }}
        </h3>
      </div>

      <!-- Location -->
      <div class="flex items-center gap-2 mb-4">
        <icon
          name="lucide:map-pin"
          class="w-4 h-4 text-gray-400"
        />
        <span class="text-gray-600 text-sm">{{ hotel.location }}</span>
      </div>

      <!-- Description -->
      <p class="text-gray-600 mb-4 line-clamp-2">
        {{ hotel.description }}
      </p>

      <!-- Amenities -->
      <div class="flex flex-wrap gap-2 mb-4">
        <ui-badge
          v-for="amenity in hotel.amenities?.slice(0, 3)"
          :key="amenity"
          variant="outline"
          class="text-xs"
        >
          {{ amenity }}
        </ui-badge>
        <ui-badge
          v-if="hotel.amenities?.length > 3"
          variant="outline"
          class="text-xs"
        >
          +{{ hotel.amenities.length - 3 }} more
        </ui-badge>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3">
        <ui-button
          as="nuxt-link"
          :to="`/hotels/${hotel.path}`"
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
          as="nuxt-link"
          to="/get-quote"
          class="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
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
import type { HotelsCollectionItem } from '@nuxt/content';

type Hotel = HotelsCollectionItem;

interface Props {
  hotel: Hotel;
  viewMode?: 'grid' | 'list';
}

const props = defineProps<Props>();

const wishlistStore = useWishlistStore();

const isInWishlist = computed(() =>
  wishlistStore.isInWishlist(props.hotel.path || props.hotel.title),
);

const canAdd = computed(() => wishlistStore.canAddMore);

const wishlistTooltip = computed(() => {
  if (isInWishlist.value) return 'Remove from wishlist';
  if (!canAdd.value) return 'Wishlist is full (max 3 items)';
  return 'Add to wishlist';
});

const toggleWishlist = () => {
  if (isInWishlist.value) {
    wishlistStore.removeItem(props.hotel.path || props.hotel.title);
  }
  else if (canAdd.value) {
    const item = {
      id: props.hotel.path || props.hotel.title,
      type: 'hotel' as const,
      title: props.hotel.title,
      image: props.hotel.images?.[0] || '/images/placeholder.svg',
      location: props.hotel.location,
    };
    wishlistStore.addItem(item);
  }
};
</script>
