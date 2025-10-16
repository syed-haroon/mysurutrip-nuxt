<template>
  <ui-dialog
    :open="modelValue"
    @update:open="handleDialogOpenChange"
  >
    <ui-dialog-trigger as-child>
      <button
        :class="buttonClasses"
      >
        <icon
          name="lucide:images"
          class="w-5 h-5 transition-transform group-hover:scale-110"
        />
        <span class="font-medium">View Gallery</span>
      </button>
    </ui-dialog-trigger>

    <ui-dialog-content
      class="fixed inset-0 translate-0 w-screen h-screen max-w-screen sm:max-w-screen bg-black/95 backdrop-blur-md rounded-none border-0 p-0 text-white"
      @pointer-down-outside="
        (event) => {
          const originalEvent = event.detail.originalEvent;
          const target = originalEvent.target as HTMLElement;
          if (
            originalEvent.offsetX > target.clientWidth
            || originalEvent.offsetY > target.clientHeight
          ) {
            event.preventDefault();
          }
        }
      "
    >
      <div class="relative h-full">
        <!-- Modern Header with Glassmorphism -->
        <div class="absolute top-0 left-0 right-10 z-50">
          <div class="flex items-center justify-between p-4 sm:p-6">
            <div class="flex-1 min-w-0">
              <ui-dialog-title class="text-lg sm:text-2xl font-bold truncate bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {{ title }}
              </ui-dialog-title>
              <div class="flex items-center gap-2 mt-1">
                <span class="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs sm:text-sm font-medium border border-white/20">
                  {{ imageCategory }}
                </span>
                <span class="text-xs sm:text-sm text-gray-400">
                  {{ activeSlideIndex + 1 }} / {{ processedImages.length }}
                </span>
              </div>
            </div>
            <ui-dialog-description class="sr-only">
              Image gallery for {{ title }} with {{ processedImages.length }} photos
            </ui-dialog-description>
          </div>
        </div>

        <!-- Swiper Gallery -->
        <div
          :key="`gallery-${dialogKey}`"
          class="fixed inset-0"
        >
          <!-- Main Swiper Container -->
          <div class="fixed inset-0 pt-20 pb-28">
            <Swiper
              :style="{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
                '--swiper-navigation-size': '44px',
              }"
              :loop="false"
              :space-between="20"
              :navigation="true"
              :thumbs="{ swiper: thumbsSwiper }"
              :modules="modules"
              :slides-per-view="1"
              :auto-height="false"
              :keyboard="{ enabled: true }"
              :mousewheel="{ forceToAxis: true }"
              class="h-full gallery-swiper"
              @swiper="setMainSwiper"
            >
              <SwiperSlide
                v-for="(image, index) in processedImages"
                :key="index"
                class="!flex items-center justify-center !w-full !h-full"
              >
                <div class="w-full h-full flex items-center justify-center px-4">
                  <div class="relative group max-w-full max-h-full">
                    <nuxt-img
                      :src="image.imgURL"
                      :alt="image.alt || `${title} - Image ${index + 1}`"
                      class="max-w-full max-h-full object-contain rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                      quality="90"
                      loading="eager"
                    />
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <!-- Modern Thumbnail Carousel -->
          <div class="absolute bottom-0 left-0 right-0 z-50 py-4">
            <div class="max-w-7xl mx-auto px-4">
              <Swiper
                :loop="false"
                :slides-per-view="'auto'"
                :space-between="12"
                :free-mode="true"
                :watch-slides-progress="true"
                :modules="modules"
                :centered-slides="false"
                class="thumbnail-swiper"
                @swiper="setThumbsSwiper"
              >
                <SwiperSlide
                  v-for="(image, index) in processedImages"
                  :key="index"
                  class="!w-auto"
                >
                  <button
                    class="group relative overflow-hidden rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                    :class="[
                      activeSlideIndex === index
                        ? 'ring-2 ring-white shadow-lg shadow-white/20 scale-105'
                        : 'ring-1 ring-white/20 hover:ring-white/40 hover:scale-105',
                    ]"
                    @click="goToSlide(index)"
                  >
                    <div class="relative">
                      <nuxt-img
                        :src="image.thumbURL || image.imgURL"
                        :alt="image.alt || `Thumbnail ${index + 1}`"
                        class="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover transition-all duration-300"
                        :class="[
                          activeSlideIndex === index
                            ? 'opacity-100'
                            : 'opacity-60 group-hover:opacity-100',
                        ]"
                        quality="60"
                        loading="lazy"
                      />
                      <!-- Overlay gradient -->
                      <div
                        class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-300"
                        :class="[
                          activeSlideIndex === index
                            ? 'opacity-0'
                            : 'opacity-100 group-hover:opacity-0',
                        ]"
                      />
                      <!-- Active indicator -->
                      <div
                        v-if="activeSlideIndex === index"
                        class="absolute top-2 right-2 w-2 h-2 bg-white rounded-full shadow-lg"
                      />
                    </div>
                  </button>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </ui-dialog-content>
  </ui-dialog>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Navigation, Thumbs, Keyboard, Mousewheel } from 'swiper/modules';

interface ImageObject {
  imgURL: string;
  thumbURL?: string;
  alt?: string;
  isFeatured?: boolean;
  type?: string;
}

interface Props {
  images: ImageObject[];
  title: string;
  modelValue?: boolean;
  buttonStyle?: 'default' | 'blue' | 'orange';
}

const props = withDefaults(defineProps<Props>(), {
  buttonStyle: 'default',
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const mainSwiper = ref(null);
const thumbsSwiper = ref(null);
const modules = [FreeMode, Navigation, Thumbs, Keyboard, Mousewheel];
const dialogKey = ref(0);
const activeSlideIndex = ref(0);

// Computed property for button styling
const buttonClasses = computed(() => {
  const baseClasses = 'group relative overflow-hidden text-white px-6 py-2.5 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2.5';

  switch (props.buttonStyle) {
    case 'blue':
      return `${baseClasses} bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800`;
    case 'orange':
      return `${baseClasses} bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600`;
    default:
      return `${baseClasses} bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700`;
  }
});

const setMainSwiper = (swiper: unknown) => {
  mainSwiper.value = swiper;

  // Track active slide changes
  if (swiper) {
    swiper.on('slideChange', () => {
      activeSlideIndex.value = swiper.realIndex;
    });
  }
};

const setThumbsSwiper = (swiper: unknown) => {
  thumbsSwiper.value = swiper;
};

const goToSlide = (index: number) => {
  if (mainSwiper.value) {
    mainSwiper.value.slideTo(index);
  }
};

const cleanupSwipers = () => {
  if (mainSwiper.value) {
    try {
      mainSwiper.value.destroy(true, true);
    }
    catch (error) {
      console.warn('Error destroying main swiper:', error);
    }
    mainSwiper.value = null;
  }

  if (thumbsSwiper.value) {
    try {
      thumbsSwiper.value.destroy(true, true);
    }
    catch (error) {
      console.warn('Error destroying thumbs swiper:', error);
    }
    thumbsSwiper.value = null;
  }
};

// Force component remount when dialog opens
const handleDialogOpenChange = (open: boolean) => {
  emit('update:modelValue', open);

  if (open) {
    dialogKey.value++;
    activeSlideIndex.value = 0;
    nextTick(() => {
      // Reset swiper instances after remount
      mainSwiper.value = null;
      thumbsSwiper.value = null;
    });
  }
  else {
    // Cleanup when dialog closes
    cleanupSwipers();
  }
};

// Extract category from image filename
const extractCategoryFromFilename = (filename: string): string => {
  // Remove leading slash and file extension
  const cleanName = filename.replace(/^\/|\.[^/.]+$/g, '');

  // Split by hyphen and take the first part as category
  const parts = cleanName.split('-');

  if (parts.length > 1) {
    // Join all parts except the last one (which is usually the number)
    const categoryParts = parts.slice(0, -1);
    return categoryParts.join(' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  return cleanName.replace(/\b\w/g, l => l.toUpperCase());
};

// Process images - ensure we have proper image objects
const processedImages = computed(() => {
  if (!props.images || props.images.length === 0) return [];
  return props.images.map(img => ({
    imgURL: img.imgURL || img,
    thumbURL: img.thumbURL || img.imgURL || img,
    alt: img.alt || 'Gallery image',
    isFeatured: img.isFeatured || false,
    type: img.type || 'gallery',
  }));
});

// Get the category from the currently active image
const imageCategory = computed(() => {
  if (!props.images || props.images.length === 0) return 'Photos';

  const currentImage = props.images[activeSlideIndex.value];
  const imageUrl = currentImage.imgURL || currentImage;

  // Extract filename from URL
  const filename = imageUrl.split('/').pop() || '';

  return extractCategoryFromFilename(filename);
});

onUnmounted(() => {
  cleanupSwipers();
});
</script>

<style scoped>
/* Custom navigation button styling */
:deep(.gallery-swiper .swiper-button-next),
:deep(.gallery-swiper .swiper-button-prev) {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

:deep(.gallery-swiper .swiper-button-next:hover),
:deep(.gallery-swiper .swiper-button-prev:hover) {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

:deep(.gallery-swiper .swiper-button-next::after),
:deep(.gallery-swiper .swiper-button-prev::after) {
  font-size: 20px;
  font-weight: bold;
}

/* Hide scrollbar for thumbnail swiper */
:deep(.thumbnail-swiper) {
  overflow: visible;
}
</style>
