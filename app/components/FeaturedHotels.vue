<template>
  <!-- Featured Hotels Section -->
  <section
    id="hotels"
    class="py-20 px-4 bg-white"
  >
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          Featured Stays
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose from our carefully curated selection of hotels, resorts, and homestays in Mysuru
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <HotelCard
          v-for="hotel in featuredHotels || []"
          :key="hotel.id"
          :hotel="hotel"
        />
      </div>

      <div class="text-center">
        <ui-button
          as="nuxt-link"
          to="/hotels"
          size="lg"
          variant="outline"
        >
          View All Stays
          <icon
            name="lucide:arrow-right"
            class="w-5 h-5 ml-2"
          />
        </ui-button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: featuredHotels } = await useAsyncData(
  'featured-hotels',
  () =>
    queryCollection('hotels')
      .where('type', '=', 'hotel')
      .where('isFeatured', '=', true)
      .all(),
);
</script>
