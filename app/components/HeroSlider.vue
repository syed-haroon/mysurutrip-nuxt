<template>
  <div class="hero-slider">
    <swiper
      :modules="[SwiperAutoplay, SwiperEffectFade]"
      :effect="'fade'"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      :loop="true"
      :speed="1000"
      class="w-full h-full"
    >
      <swiper-slide
        v-for="(image, index) in images"
        :key="index"
        class="w-full h-full"
      >
        <div class="absolute inset-0">
          <img
            :src="image.src"
            :alt="image.alt"
            class="w-full h-full object-cover"
          >
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

// Swiper modules
const SwiperAutoplay = Autoplay;
const SwiperEffectFade = EffectFade;

// Props
interface HeroImage {
  src: string;
  alt: string;
}

interface Props {
  images?: HeroImage[];
}

withDefaults(defineProps<Props>(), {
  images: () => [
    {
      src: '/images/hero/mys-palace-1.webp',
      alt: 'Mysuru Palace - Majestic Architecture',
    },
    {
      src: '/images/hero/mys-palace-2.webp',
      alt: 'Mysuru Palace - Royal Heritage',
    },
    {
      src: '/images/hero/mys-palace-3.webp',
      alt: 'Mysuru Palace - Cultural Splendor',
    },
    {
      src: '/images/hero/mys-palace-4.webp',
      alt: 'Mysuru Palace - Historical Grandeur',
    },
  ],
});
</script>

<style scoped>
.hero-slider {
  width: 100%;
  height: 100%;
}

.hero-slider :deep(.swiper) {
  width: 100%;
  height: 100%;
}

.hero-slider :deep(.swiper-slide) {
  width: 100%;
  height: 100%;
}

.hero-slider :deep(.swiper-slide img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
