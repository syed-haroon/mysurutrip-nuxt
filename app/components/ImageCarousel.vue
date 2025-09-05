<template>
  <Swiper
    :modules="modules"
    :slides-per-view="'auto'"
    :space-between="16"
    :centered-slides="false"
    :grab-cursor="true"
    :pagination="{
      type: 'progressbar',
      clickable: true,
    }"
    :navigation="true"
    :breakpoints="{
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      768: {
        slidesPerView: 'auto',
        spaceBetween: 16,
      },
    }"
    class="w-full"
  >
    <SwiperSlide
      v-for="(image, index) in images"
      :key="index"
      class="!w-[calc(100vw/1.5)] md:!w-[calc(100vw/1.5)] max-w-none"
    >
      <div class="relative h-80 md:h-96">
        <nuxt-img
          :src="image"
          :alt="`${title} - Image ${index + 1}`"
          class="w-full h-full object-cover rounded-none"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66.67vw, 50vw"
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
  color: #f97316;
  background: rgba(255, 255, 255, 0.9);
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: rgba(255, 255, 255, 1);
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 16px;
  font-weight: bold;
}
</style>
