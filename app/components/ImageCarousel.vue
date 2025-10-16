<template>
  <Swiper
    :modules="modules"
    slides-per-view="auto"
    :space-between="16"
    :centered-slides="false"
    :loop="false"
    :grab-cursor="true"
    :pagination="{
      type: 'progressbar',
      clickable: true,
    }"
    :navigation="true"
    :breakpoints="{
      320: {
        slidesPerView: 1.2,
        spaceBetween: 2,
      },
      768: {
        slidesPerView: 2.5,
        spaceBetween: 2,
      },
      1024: {
        slidesPerView: 3.5,
        spaceBetween: 2,
      },
    }"
    class="w-full"
  >
    <SwiperSlide
      v-for="(image, index) in images"
      :key="index"
      class="!w-80 md:!w-96"
    >
      <div class="relative h-80 md:h-96">
        <nuxt-img
          :src="image"
          :alt="`${title} - Image ${index + 1}`"
          class="w-full h-full object-cover"
          sizes="(max-width: 768px) 320px, 384px"
          quality="80"
        />
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Props {
  images: string[];
  title: string;
}

defineProps<Props>();

const modules = [Pagination, Navigation];
</script>

<style scoped>
:deep(.swiper-pagination-progressbar) {
  background: rgba(255, 255, 255, 0.3);
}

:deep(.swiper-pagination-progressbar-fill) {
  background: #f97316;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 20px;
  font-weight: bold;
}
</style>
