<template>
  <div class="space-y-6">
    <!-- Price Card (optional) -->
    <div
      v-if="showPriceCard"
      class="bg-white rounded-lg shadow-sm p-6 sticky top-20 z-10"
    >
      <div class="text-center mb-6">
        <!-- Prominent Phone Number -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4 border border-blue-100">
          <div class="flex items-center justify-center gap-3">
            <div class="flex size-10 bg-blue-500 rounded-full p-2">
              <icon
                name="lucide:phone"
                class="text-xl text-white m-auto"
              />
            </div>
            <div>
              <div class="text-sm text-blue-600 font-medium">
                Call Now
              </div>
              <a
                href="tel:+91-9845448902"
                class="text-xl font-bold text-blue-700 hover:text-blue-800 transition-colors"
              >
                +91 98454 48902
              </a>
            </div>
          </div>
        </div>

        <div class="text-3xl font-bold text-gray-900 mb-2">
          Contact for Pricing
        </div>
        <p class="text-gray-600">
          Get your personalized quote
        </p>
      </div>

      <div class="space-y-4">
        <ui-button
          class="w-full"
          :disabled="!wishlistStore.canAddMore && !isInWishlist"
          @click="addToWishlist"
        >
          <icon-heart
            v-if="!isInWishlist"
            variant="outline"
            size="sm"
            class="mr-2"
          />
          <icon-heart
            v-else
            variant="filled"
            size="sm"
            class="mr-2 text-red-500"
          />
          {{ isInWishlist ? 'Added to Wishlist' : 'Add to Wishlist' }}
        </ui-button>

        <ui-button
          variant="outline"
          class="w-full"
          @click="handleGetQuote"
        >
          <icon
            name="lucide:message-square"
            class="w-4 h-4 mr-2"
          />
          Get Quote
        </ui-button>
      </div>

      <!-- Time Information -->
      <div class="mt-6 pt-6 border-t border-gray-200">
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-600">{{ timeLabels.start }}:</span>
          <span class="font-medium">{{ timeValues.start }}</span>
        </div>
        <div class="flex items-center justify-between text-sm mt-2">
          <span class="text-gray-600">{{ timeLabels.end }}:</span>
          <span class="font-medium">{{ timeValues.end }}</span>
        </div>
        <!-- Additional timing info for explore items -->
        <div
          v-if="type === 'explore' && item.timings"
          class="pt-2 mt-2 border-t border-gray-100"
        >
          <div class="text-xs text-gray-500">
            Full timings: {{ item.timings }}
          </div>
        </div>
      </div>
    </div>

    <!-- Time Information (when price card is hidden) -->
    <div
      v-else
      class="bg-white rounded-lg shadow-sm p-6"
    >
      <h4 class="font-semibold text-gray-900 mb-4">
        {{ timeLabels.start }} & {{ timeLabels.end }}
      </h4>
      <div class="space-y-3 text-sm">
        <div class="flex items-center justify-between">
          <span class="text-gray-600">{{ timeLabels.start }}:</span>
          <span class="font-medium">{{ timeValues.start }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-gray-600">{{ timeLabels.end }}:</span>
          <span class="font-medium">{{ timeValues.end }}</span>
        </div>
      </div>
    </div>

    <!-- Additional Info (optional slot) -->
    <slot name="additional-info" />
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';

interface Props {
  type: 'activity' | 'hotel' | 'explore';
  item: {
    path?: string;
    title: string;
    images?: string[];
    location: string;
    timings?: string;
    duration?: string;
    visitDuration?: string;
  };
  isInWishlist: boolean;
  showPriceCard?: boolean;
  customTimeLabels?: {
    start: string;
    end: string;
  };
  customTimeValues?: {
    start: string;
    end: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  showPriceCard: true,
});

const emit = defineEmits<{
  addToWishlist: [];
}>();

// Stores
const wishlistStore = useWishlistStore();
const siteStore = useSiteStore();

// Computed properties for dynamic content
const timeLabels = computed(() => {
  if (props.customTimeLabels) {
    return props.customTimeLabels;
  }

  switch (props.type) {
    case 'activity':
      return { start: 'Duration', end: 'Schedule' };
    case 'hotel':
      return { start: 'Check-in', end: 'Check-out' };
    case 'explore':
      return { start: 'Open Time', end: 'Close Time' };
    default:
      return { start: 'Start Time', end: 'End Time' };
  }
});

const timeValues = computed(() => {
  if (props.customTimeValues) {
    return props.customTimeValues;
  }

  switch (props.type) {
    case 'activity':
      // Use duration from content if available, otherwise default
      if (props.item.duration) {
        return { start: props.item.duration, end: 'Contact for schedule' };
      }
      return { start: '2-3 hours', end: 'Contact for schedule' };
    case 'hotel':
      return { start: '2:00 PM', end: '11:00 AM' };
    case 'explore':
      // Use timings from content if available, otherwise default
      if (props.item.timings) {
        const [openTime, closeTime] = props.item.timings.split(' - ');
        return { start: openTime || '9:00 AM', end: closeTime || '6:00 PM' };
      }
      // Use visitDuration if available
      if (props.item.visitDuration) {
        return { start: props.item.visitDuration, end: 'Contact for timings' };
      }
      return { start: '9:00 AM', end: '6:00 PM' };
    default:
      return { start: '9:00 AM', end: '6:00 PM' };
  }
});

// Methods
const addToWishlist = () => {
  emit('addToWishlist');
  toast('Added to wishlist', {
    description: `${props.item.displayName} has been added to your wishlist`,
    action: {
      label: 'Get Quote',
      onClick: () => { siteStore.openQuoteSheet(); },
    },
  });
};

const handleGetQuote = () => {
  emit('addToWishlist');
  siteStore.openQuoteSheet();
};
</script>
