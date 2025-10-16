<template>
  <div class="relative">
    <!-- Single Image Background (when only one image) -->
    <div
      v-if="processedImages && processedImages.length === 1"
      class="relative h-96 md:h-[500px] w-full"
    >
      <nuxt-img
        :src="processedImages[0]"
        :alt="`${title} - Hero Image`"
        class="w-full h-full object-cover"
        sizes="100vw"
        quality="90"
      />
      <div class="absolute inset-0 bg-black/40" />
    </div>

    <!-- Image Carousel (when multiple images) -->
    <ImageCarousel
      v-else-if="processedImages && processedImages.length > 1"
      :images="processedImages"
      :title="title"
    />

    <!-- Fallback Placeholder (when no images) -->
    <div
      v-else
      class="relative h-96 md:h-[500px] w-full bg-gradient-to-br from-orange-400 to-orange-600"
    >
      <div class="absolute inset-0 bg-black/20" />
    </div>

    <!-- Overlay Content (for single images and fallback) -->
    <div
      v-if="!processedImages || processedImages.length <= 1"
      class="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div class="text-center text-white">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          {{ title }}
        </h1>
        <p
          v-if="subtitle"
          class="text-xl md:text-2xl drop-shadow-lg"
        >
          {{ subtitle }}
        </p>
        <p
          v-else-if="location"
          class="text-xl md:text-2xl drop-shadow-lg"
        >
          {{ location }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  images?: unknown[];
  title: string;
  subtitle?: string;
  location?: string;
}

const props = defineProps<Props>();

// Process featured images (isFeatured: true) for carousel
const processedImages = computed(() => {
  if (!props.images || props.images.length === 0) return [];

  // Filter featured images and extract URLs
  const featuredImages = props.images.filter(img => img && img.isFeatured === true);
  return featuredImages.map(img => img.imgURL);
});
</script>
